(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const tasks = window.DRONE_PUR_TASKS;
  const resources = window.DRONE_PUR_RESOURCES;
  const brandIcons = {
    arXiv: '<path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h4M8 11l8 7m0-7-8 7"/>',
    GitHub: '<path fill="currentColor" stroke="none" d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.78c-2.93.64-3.55-1.24-3.55-1.24-.48-1.22-1.17-1.54-1.17-1.54-.96-.66.07-.65.07-.65 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.46 1.15 3.06.88.1-.68.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.09 1.08-2.82-.11-.27-.47-1.34.1-2.78 0 0 .89-.28 2.89 1.08A10.1 10.1 0 0 1 12 6.72c.89 0 1.78.12 2.62.35 2-1.36 2.88-1.08 2.88-1.08.58 1.44.22 2.51.11 2.78.67.73 1.08 1.67 1.08 2.82 0 4.04-2.46 4.93-4.81 5.19.38.33.71.97.71 1.96v2.71c0 .28.19.61.72.51A10.5 10.5 0 0 0 12 1.5z"/>',
    ModelScope: '<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10"/>'
  };
  for (const [key, resource] of Object.entries(resources)) {
    const el = document.createElement(resource.url ? 'a' : 'button');
    el.className = `resource-button resource-${key}`;
    el.innerHTML = `<span class="resource-platform"><svg viewBox="0 0 24 24" aria-hidden="true">${brandIcons[resource.platform]}</svg>${resource.platform}</span><span class="resource-badge">${resource.badge}</span>`;
    el.title = resource.url ? resource.label : `${resource.label} — Coming soon`;
    el.setAttribute('aria-label', `${resource.label} on ${resource.platform}${resource.url ? '' : ' — coming soon'}`);
    if (resource.url) {
      el.href = resource.url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.type = 'button';
      el.addEventListener('click', () => {
        $('#resource-dialog-title').textContent = resource.label;
        $('#resource-dialog-message').textContent = resource.note;
        const manuscript = $('#manuscript-link');
        manuscript.hidden = !resource.fallbackUrl;
        if (resource.fallbackUrl) manuscript.href = resource.fallbackUrl;
        $('#resource-dialog').showModal();
      });
    }
    $('#resource-links').append(el);
  }

  const taskPositions = new Map();
  let activeTaskId = 'mvr';
  let boxesVisible = false;
  let autoAdvanceTimer = null;
  let examplesInView = false;
  const svgNS = 'http://www.w3.org/2000/svg';
  const currentTask = () => tasks.find(task => task.id === activeTaskId);
  const currentSample = () => currentTask().samples[taskPositions.get(activeTaskId) || 0];

  function cancelAutoAdvance() {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }

  function scheduleAutoAdvance() {
    cancelAutoAdvance();
    if (!examplesInView || document.hidden || document.querySelector('dialog[open]') || currentTask().samples.length < 2) return;
    autoAdvanceTimer = window.setTimeout(() => {
      if (document.hidden || document.querySelector('dialog[open]')) return;
      moveSample(1);
    }, 4000);
  }

  function svgElement(name, attributes) {
    const element = document.createElementNS(svgNS, name);
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
    return element;
  }

  function makeOverlay(photo) {
    const width = photo.width;
    const height = photo.height;
    const svg = svgElement('svg', {viewBox:`0 0 ${width} ${height}`,class:'bbox-overlay','aria-hidden':'true'});
    for (const box of (photo.boxes || [])) {
      const [x1,y1,x2,y2] = box.xyxy;
      const color = box.kind === 'answer' ? '#238567' : '#dc4c3e';
      svg.append(svgElement('rect', {x:x1*width,y:y1*height,width:(x2-x1)*width,height:(y2-y1)*height,fill:'none',stroke:color,'stroke-width':2,'vector-effect':'non-scaling-stroke'}));
      const size = width * .018;
      const labelWidth = Math.max(size * 1.1, box.label.length * size * .61 + size * .45);
      const x = Math.max(0, Math.min(x1*width, width-labelWidth));
      const y = Math.max(0, y1*height-size*1.3);
      svg.append(svgElement('rect', {x,y,width:labelWidth,height:size*1.3,fill:color,rx:size*.08}));
      const label = svgElement('text', {x:x+size*.22,y:y+size*.99,fill:'#fff','font-size':size,'font-family':'Arial, sans-serif','font-weight':'600'});
      label.textContent = box.label;
      svg.append(label);
    }
    return svg;
  }

  function buildTaskNavigation() {
    const navigation = $('#task-groups');
    navigation.replaceChildren();
    for (const dimension of ['perception','understanding','reasoning']) {
      const group = document.createElement('div');
      group.className = `task-group ${dimension}`;
      const heading = document.createElement('h4');
      heading.textContent = dimension[0].toUpperCase()+dimension.slice(1);
      const buttons = document.createElement('div');
      buttons.className = 'task-buttons';
      for (const task of tasks.filter(task => task.dimension === dimension)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = task.id.toUpperCase();
        button.title = task.title;
        button.setAttribute('aria-label', `${task.title} (${task.id.toUpperCase()})`);
        button.dataset.taskId = task.id;
        button.setAttribute('aria-pressed', String(task.id === activeTaskId));
        button.addEventListener('click', () => {
          cancelAutoAdvance();
          activeTaskId = task.id;
          renderSample();
        });
        buttons.append(button);
      }
      group.append(heading, buttons);
      navigation.append(group);
    }
  }

  function updateBoxes() {
    $$('#case-images .bbox-overlay').forEach(overlay => { overlay.toggleAttribute('hidden', !boxesVisible); });
    $('#bbox-toggle').setAttribute('aria-pressed', String(boxesVisible));
    $('#bbox-toggle').textContent = boxesVisible ? 'Hide bounding boxes' : 'Show bounding boxes';
    const kinds = new Set(currentSample().images.flatMap(photo => (photo.boxes || []).map(box => box.kind)));
    const legend = $('#bbox-legend');
    legend.replaceChildren();
    for (const kind of kinds) {
      const label = document.createElement('span');
      label.className = `box-key ${kind}`;
      label.textContent = kind === 'answer' ? 'Correct answer' : 'Question region';
      legend.append(label);
    }
    legend.hidden = !boxesVisible;
  }

  function renderSample() {
    const task = currentTask();
    const position = taskPositions.get(activeTaskId) || 0;
    const sample = task.samples[position];
    const browser = $('#example-browser');
    browser.dataset.task = task.id;
    browser.dataset.dimension = task.dimension;
    browser.dataset.sample = sample.id;
    $$('#task-groups button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.taskId === activeTaskId)));
    $('#case-title').textContent = task.title;
    $('#case-id').textContent = sample.id;
    $('#case-subtype').textContent = sample.subtype || '';
    $('#case-subtype').hidden = !sample.subtype;
    $('#case-counter').textContent = `${position+1} / ${task.samples.length}`;
    for (const id of ['previous-sample','next-sample']) $('#'+id).disabled = task.samples.length < 2;
    $('#case-question').textContent = sample.question;
    const hasAnswerKey = Object.prototype.hasOwnProperty.call(sample.options || {}, sample.answerKey);
    $('#case-answer').textContent = `${hasAnswerKey ? sample.answerKey+'. ' : ''}${sample.answer}`;
    $('#case-answer').classList.toggle('coordinate-answer', task.id === 'od' || /^\[/.test(sample.answer));
    const list = $('#distractor-list');
    list.replaceChildren();
    const alternatives = Object.entries(sample.options || {}).filter(([key]) => key !== sample.answerKey).sort(([a],[b]) => a.localeCompare(b));
    for (const [key, value] of alternatives) {
      const item = document.createElement('li');
      const letter = document.createElement('span');
      letter.className = 'option-letter';
      letter.textContent = key+'.';
      const text = document.createElement('span');
      text.textContent = String(value);
      item.append(letter,text);
      list.append(item);
    }
    $('#distractors').hidden = true;
    $('#distractors-toggle').hidden = ['od','cj'].includes(task.id) || !alternatives.length;
    $('#distractors-toggle').setAttribute('aria-expanded', 'false');
    $('#distractors-toggle').innerHTML = 'Show other options <span aria-hidden="true">＋</span>';
    boxesVisible = sample.images.some(photo => (photo.boxes || []).length);
    const gallery = $('#case-images');
    gallery.className = `sample-gallery ${sample.images.length===1 ? 'single' : sample.images.length===2 ? 'pair' : 'sequence'}`;
    gallery.replaceChildren();
    for (const [index, photo] of sample.images.entries()) {
      const figure = document.createElement('figure');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sample-image-button';
      button.dataset.exampleImage = String(index);
      button.setAttribute('aria-label', `Enlarge ${photo.label || 'image'} for ${task.title}`);
      const stage = document.createElement('span');
      stage.className = 'media-stage';
      stage.style.setProperty('--image-ratio', String(photo.width/photo.height));
      const image = document.createElement('img');
      image.src = `./assets/${photo.src}`;
      image.alt = `${task.title}${photo.label ? ': '+photo.label : ''}`;
      image.width = photo.width;
      image.height = photo.height;
      image.decoding = 'async';
      stage.append(image);
      if ((photo.boxes || []).length) stage.append(makeOverlay(photo));
      button.append(stage);
      figure.append(button);
      if (photo.label) {
        const caption = document.createElement('figcaption');
        caption.textContent = photo.label;
        figure.append(caption);
      }
      gallery.append(figure);
    }
    $('#bbox-toggle').hidden = !sample.images.some(photo => (photo.boxes || []).length);
    updateBoxes();
    $('#announcement').textContent = `${task.title}${sample.subtype ? ', '+sample.subtype : ''}. Sample ${position+1} of ${task.samples.length}.`;
    scheduleAutoAdvance();
  }

  function moveSample(step) {
    const count = currentTask().samples.length;
    taskPositions.set(activeTaskId, ((taskPositions.get(activeTaskId)||0)+step+count)%count);
    renderSample();
  }

  $('#previous-sample').addEventListener('click', () => moveSample(-1));
  $('#next-sample').addEventListener('click', () => moveSample(1));
  $('#example-browser').addEventListener('keydown', event => {
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !document.querySelector('dialog[open]')) {
      event.preventDefault();
      moveSample(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  $('#bbox-toggle').addEventListener('click', () => {
    scheduleAutoAdvance();
    boxesVisible = !boxesVisible;
    updateBoxes();
  });
  $('#distractors-toggle').addEventListener('click', () => {
    scheduleAutoAdvance();
    const panel = $('#distractors');
    panel.hidden = !panel.hidden;
    $('#distractors-toggle').setAttribute('aria-expanded', String(!panel.hidden));
    $('#distractors-toggle').innerHTML = `${panel.hidden ? 'Show' : 'Hide'} other options <span aria-hidden="true">${panel.hidden ? '＋' : '−'}</span>`;
  });
  $('#example-browser').addEventListener('pointerdown', scheduleAutoAdvance);
  $('#example-browser').addEventListener('keydown', scheduleAutoAdvance);
  document.addEventListener('visibilitychange', scheduleAutoAdvance);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      examplesInView = entries[0].isIntersecting;
      scheduleAutoAdvance();
    }, {threshold:0.02}).observe($('#example-browser'));
  } else {
    examplesInView = true;
  }
  buildTaskNavigation();
  renderSample();

  const imageDialog = $('#image-dialog');
  document.addEventListener('click', event => {
    const exampleTrigger = event.target.closest('[data-example-image]');
    const trigger = event.target.closest('[data-zoom]');
    if (!exampleTrigger && !trigger) return;
    cancelAutoAdvance();
    $('#zoom-stage .bbox-overlay')?.remove();
    if (exampleTrigger) {
      const photo = currentSample().images[Number(exampleTrigger.dataset.exampleImage)];
      $('#enlarged-image').src = `./assets/${photo.src}`;
      $('#enlarged-image').alt = `${currentTask().title} ${photo.label}`;
      $('#image-dialog-caption').textContent = `${currentTask().title}${photo.label ? ' — '+photo.label : ''}`;
      if (boxesVisible && (photo.boxes || []).length) $('#zoom-stage').append(makeOverlay(photo));
    } else {
      $('#enlarged-image').src = trigger.dataset.zoom;
      $('#enlarged-image').alt = trigger.dataset.caption;
      $('#image-dialog-caption').textContent = trigger.dataset.caption;
    }
    imageDialog.showModal();
  });
  $('#close-image').addEventListener('click', () => imageDialog.close());
  $('#close-resource').addEventListener('click', () => $('#resource-dialog').close());
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));
  imageDialog.addEventListener('close', () => { $('#enlarged-image').removeAttribute('src'); $('#zoom-stage .bbox-overlay')?.remove(); });
  $$('dialog').forEach(dialog => dialog.addEventListener('close', scheduleAutoAdvance));


  $('#copy-citation').addEventListener('click', async () => {
    const value = $('#bibtex').textContent;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.append(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      textarea.remove();
      if (!success) {
        $('#copy-citation').textContent = 'Select text to copy';
        $('#announcement').textContent = 'Please select the BibTeX text and copy it manually.';
        return;
      }
    }
    $('#copy-citation').textContent = 'Copied ✓';
    $('#announcement').textContent = 'BibTeX copied to clipboard.';
  });
  const menuToggle = $('.menu-toggle');
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    $('#nav-links').classList.toggle('open', open);
  });
  $$('#nav-links a').forEach(link => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    $('#nav-links').classList.remove('open');
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        $$('#nav-links a').forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      }
    }, {rootMargin:'-15% 0px -60% 0px'});
    ['overview','examples','benchmark','baseline','leaderboard','citation'].forEach(id => observer.observe(document.getElementById(id)));
  }
})();

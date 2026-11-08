(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const tasks = window.DRONE_PUR_TASKS;
  const resources = window.DRONE_PUR_RESOURCES;
  const brandIcons = {
    arXiv: '<path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h4M8 11l8 7m0-7-8 7"/>',
    GitHub: '<path fill="currentColor" stroke="none" d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.78c-2.93.64-3.55-1.24-3.55-1.24-.48-1.22-1.17-1.54-1.17-1.54-.96-.66.07-.65.07-.65 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.46 1.15 3.06.88.1-.68.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.09 1.08-2.82-.11-.27-.47-1.34.1-2.78 0 0 .89-.28 2.89 1.08A10.1 10.1 0 0 1 12 6.72c.89 0 1.78.12 2.62.35 2-1.36 2.88-1.08 2.88-1.08.58 1.44.22 2.51.11 2.78.67.73 1.08 1.67 1.08 2.82 0 4.04-2.46 4.93-4.81 5.19.38.33.71.97.71 1.96v2.71c0 .28.19.61.72.51A10.5 10.5 0 0 0 12 1.5z"/>',
    ModelScope: '<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10"/>',
    "Hugging Face": "<g transform=\"translate(0 0.9) scale(0.252631579)\" stroke=\"none\">\n\t<path fill=\"#FFD21E\" d=\"M47.21 76.5a34.75 34.75 0 1 0 0-69.5 34.75 34.75 0 0 0 0 69.5Z\" />\n\t<path\n\t\tfill=\"#FF9D0B\"\n\t\td=\"M81.96 41.75a34.75 34.75 0 1 0-69.5 0 34.75 34.75 0 0 0 69.5 0Zm-73.5 0a38.75 38.75 0 1 1 77.5 0 38.75 38.75 0 0 1-77.5 0Z\"\n\t/>\n\t<path\n\t\tfill=\"#3A3B45\"\n\t\td=\"M58.5 32.3c1.28.44 1.78 3.06 3.07 2.38a5 5 0 1 0-6.76-2.07c.61 1.15 2.55-.72 3.7-.32ZM34.95 32.3c-1.28.44-1.79 3.06-3.07 2.38a5 5 0 1 1 6.76-2.07c-.61 1.15-2.56-.72-3.7-.32Z\"\n\t/>\n\t<path\n\t\tfill=\"#FF323D\"\n\t\td=\"M46.96 56.29c9.83 0 13-8.76 13-13.26 0-2.34-1.57-1.6-4.09-.36-2.33 1.15-5.46 2.74-8.9 2.74-7.19 0-13-6.88-13-2.38s3.16 13.26 13 13.26Z\"\n\t/>\n\t<path\n\t\tfill=\"#3A3B45\"\n\t\tfill-rule=\"evenodd\"\n\t\td=\"M39.43 54a8.7 8.7 0 0 1 5.3-4.49c.4-.12.81.57 1.24 1.28.4.68.82 1.37 1.24 1.37.45 0 .9-.68 1.33-1.35.45-.7.89-1.38 1.32-1.25a8.61 8.61 0 0 1 5 4.17c3.73-2.94 5.1-7.74 5.1-10.7 0-2.34-1.57-1.6-4.09-.36l-.14.07c-2.31 1.15-5.39 2.67-8.77 2.67s-6.45-1.52-8.77-2.67c-2.6-1.29-4.23-2.1-4.23.29 0 3.05 1.46 8.06 5.47 10.97Z\"\n\t\tclip-rule=\"evenodd\"\n\t/>\n\t<path\n\t\tfill=\"#FF9D0B\"\n\t\td=\"M70.71 37a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM24.21 37a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM17.52 48c-1.62 0-3.06.66-4.07 1.87a5.97 5.97 0 0 0-1.33 3.76 7.1 7.1 0 0 0-1.94-.3c-1.55 0-2.95.59-3.94 1.66a5.8 5.8 0 0 0-.8 7 5.3 5.3 0 0 0-1.79 2.82c-.24.9-.48 2.8.8 4.74a5.22 5.22 0 0 0-.37 5.02c1.02 2.32 3.57 4.14 8.52 6.1 3.07 1.22 5.89 2 5.91 2.01a44.33 44.33 0 0 0 10.93 1.6c5.86 0 10.05-1.8 12.46-5.34 3.88-5.69 3.33-10.9-1.7-15.92-2.77-2.78-4.62-6.87-5-7.77-.78-2.66-2.84-5.62-6.25-5.62a5.7 5.7 0 0 0-4.6 2.46c-1-1.26-1.98-2.25-2.86-2.82A7.4 7.4 0 0 0 17.52 48Zm0 4c.51 0 1.14.22 1.82.65 2.14 1.36 6.25 8.43 7.76 11.18.5.92 1.37 1.31 2.14 1.31 1.55 0 2.75-1.53.15-3.48-3.92-2.93-2.55-7.72-.68-8.01.08-.02.17-.02.24-.02 1.7 0 2.45 2.93 2.45 2.93s2.2 5.52 5.98 9.3c3.77 3.77 3.97 6.8 1.22 10.83-1.88 2.75-5.47 3.58-9.16 3.58-3.81 0-7.73-.9-9.92-1.46-.11-.03-13.45-3.8-11.76-7 .28-.54.75-.76 1.34-.76 2.38 0 6.7 3.54 8.57 3.54.41 0 .7-.17.83-.6.79-2.85-12.06-4.05-10.98-8.17.2-.73.71-1.02 1.44-1.02 3.14 0 10.2 5.53 11.68 5.53.11 0 .2-.03.24-.1.74-1.2.33-2.04-4.9-5.2-5.21-3.16-8.88-5.06-6.8-7.33.24-.26.58-.38 1-.38 3.17 0 10.66 6.82 10.66 6.82s2.02 2.1 3.25 2.1c.28 0 .52-.1.68-.38.86-1.46-8.06-8.22-8.56-11.01-.34-1.9.24-2.85 1.31-2.85Z\"\n\t/>\n\t<path\n\t\tfill=\"#FFD21E\"\n\t\td=\"M38.6 76.69c2.75-4.04 2.55-7.07-1.22-10.84-3.78-3.77-5.98-9.3-5.98-9.3s-.82-3.2-2.69-2.9c-1.87.3-3.24 5.08.68 8.01 3.91 2.93-.78 4.92-2.29 2.17-1.5-2.75-5.62-9.82-7.76-11.18-2.13-1.35-3.63-.6-3.13 2.2.5 2.79 9.43 9.55 8.56 11-.87 1.47-3.93-1.71-3.93-1.71s-9.57-8.71-11.66-6.44c-2.08 2.27 1.59 4.17 6.8 7.33 5.23 3.16 5.64 4 4.9 5.2-.75 1.2-12.28-8.53-13.36-4.4-1.08 4.11 11.77 5.3 10.98 8.15-.8 2.85-9.06-5.38-10.74-2.18-1.7 3.21 11.65 6.98 11.76 7.01 4.3 1.12 15.25 3.49 19.08-2.12Z\"\n\t/>\n\t<path\n\t\tfill=\"#FF9D0B\"\n\t\td=\"M77.4 48c1.62 0 3.07.66 4.07 1.87a5.97 5.97 0 0 1 1.33 3.76 7.1 7.1 0 0 1 1.95-.3c1.55 0 2.95.59 3.94 1.66a5.8 5.8 0 0 1 .8 7 5.3 5.3 0 0 1 1.78 2.82c.24.9.48 2.8-.8 4.74a5.22 5.22 0 0 1 .37 5.02c-1.02 2.32-3.57 4.14-8.51 6.1-3.08 1.22-5.9 2-5.92 2.01a44.33 44.33 0 0 1-10.93 1.6c-5.86 0-10.05-1.8-12.46-5.34-3.88-5.69-3.33-10.9 1.7-15.92 2.78-2.78 4.63-6.87 5.01-7.77.78-2.66 2.83-5.62 6.24-5.62a5.7 5.7 0 0 1 4.6 2.46c1-1.26 1.98-2.25 2.87-2.82A7.4 7.4 0 0 1 77.4 48Zm0 4c-.51 0-1.13.22-1.82.65-2.13 1.36-6.25 8.43-7.76 11.18a2.43 2.43 0 0 1-2.14 1.31c-1.54 0-2.75-1.53-.14-3.48 3.91-2.93 2.54-7.72.67-8.01a1.54 1.54 0 0 0-.24-.02c-1.7 0-2.45 2.93-2.45 2.93s-2.2 5.52-5.97 9.3c-3.78 3.77-3.98 6.8-1.22 10.83 1.87 2.75 5.47 3.58 9.15 3.58 3.82 0 7.73-.9 9.93-1.46.1-.03 13.45-3.8 11.76-7-.29-.54-.75-.76-1.34-.76-2.38 0-6.71 3.54-8.57 3.54-.42 0-.71-.17-.83-.6-.8-2.85 12.05-4.05 10.97-8.17-.19-.73-.7-1.02-1.44-1.02-3.14 0-10.2 5.53-11.68 5.53-.1 0-.19-.03-.23-.1-.74-1.2-.34-2.04 4.88-5.2 5.23-3.16 8.9-5.06 6.8-7.33-.23-.26-.57-.38-.98-.38-3.18 0-10.67 6.82-10.67 6.82s-2.02 2.1-3.24 2.1a.74.74 0 0 1-.68-.38c-.87-1.46 8.05-8.22 8.55-11.01.34-1.9-.24-2.85-1.31-2.85Z\"\n\t/>\n\t<path\n\t\tfill=\"#FFD21E\"\n\t\td=\"M56.33 76.69c-2.75-4.04-2.56-7.07 1.22-10.84 3.77-3.77 5.97-9.3 5.97-9.3s.82-3.2 2.7-2.9c1.86.3 3.23 5.08-.68 8.01-3.92 2.93.78 4.92 2.28 2.17 1.51-2.75 5.63-9.82 7.76-11.18 2.13-1.35 3.64-.6 3.13 2.2-.5 2.79-9.42 9.55-8.55 11 .86 1.47 3.92-1.71 3.92-1.71s9.58-8.71 11.66-6.44c2.08 2.27-1.58 4.17-6.8 7.33-5.23 3.16-5.63 4-4.9 5.2.75 1.2 12.28-8.53 13.36-4.4 1.08 4.11-11.76 5.3-10.97 8.15.8 2.85 9.05-5.38 10.74-2.18 1.69 3.21-11.65 6.98-11.76 7.01-4.31 1.12-15.26 3.49-19.08-2.12Z\"\n\t/>\n</g>"
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

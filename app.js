(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const cases = window.DRONE_PUR_CASES;
  const resources = window.DRONE_PUR_RESOURCES;
  let activeIndex = 7;
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

  function showCase(index) {
    activeIndex = (index + cases.length) % cases.length;
    const example = cases[activeIndex];
    $$('.dimension-tabs button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.dimension === example.dimension)));
    const taskSwitcher = $('#task-switcher');
    taskSwitcher.replaceChildren();
    cases.forEach((task, taskIndex) => {
      if (task.dimension !== example.dimension) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = task.title;
      button.setAttribute('aria-pressed', String(taskIndex === activeIndex));
      button.addEventListener('click', () => showCase(taskIndex));
      taskSwitcher.append(button);
    });
    $('#case-counter').textContent = `${activeIndex + 1} / ${cases.length}`;
    $('#case-title').textContent = example.title;
    $('#case-question').textContent = example.question;
    $('#case-answer').textContent = example.answer;
    const images = $('#case-images');
    images.className = `case-images ${example.images.length === 1 ? 'single' : example.images.length === 2 ? 'pair' : 'sequence'}`;
    images.replaceChildren();
    for (const photo of example.images) {
      const figure = document.createElement('figure');
      figure.className = 'case-image-unit';
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.zoom = `./assets/${photo.src}`;
      button.dataset.caption = `${example.title} — ${photo.label}`;
      button.setAttribute('aria-label', `Enlarge ${photo.label} for ${example.title}`);
      const img = document.createElement('img');
      img.src = `./assets/${photo.src}`;
      img.alt = `${example.title}: ${photo.label}`;
      img.decoding = 'async';
      button.append(img);
      const caption = document.createElement('figcaption');
      caption.textContent = photo.label;
      figure.append(button, caption);
      images.append(figure);
    }
    $('#reference-answer').hidden = true;
    $('#answer-toggle').setAttribute('aria-expanded', 'false');
    $('#answer-toggle').innerHTML = 'Show reference answer <span aria-hidden="true">↗</span>';
    $('#announcement').textContent = `${example.title}, example ${activeIndex + 1} of ${cases.length}.`;
  }
  $$('.dimension-tabs button').forEach(button => button.addEventListener('click', () => {
    const index = cases.findIndex(example => example.dimension === button.dataset.dimension);
    showCase(index);
  }));
  $('#previous-case').addEventListener('click', () => showCase(activeIndex - 1));
  $('#next-case').addEventListener('click', () => showCase(activeIndex + 1));
  $('#example-browser').addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showCase(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  $('#answer-toggle').addEventListener('click', () => {
    const answer = $('#reference-answer');
    answer.hidden = !answer.hidden;
    $('#answer-toggle').setAttribute('aria-expanded', String(!answer.hidden));
    $('#answer-toggle').innerHTML = `${answer.hidden ? 'Show' : 'Hide'} reference answer <span aria-hidden="true">${answer.hidden ? '↗' : '−'}</span>`;
  });
  showCase(activeIndex);

  const imageDialog = $('#image-dialog');
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-zoom]');
    if (!trigger) return;
    $('#enlarged-image').src = trigger.dataset.zoom;
    $('#enlarged-image').alt = trigger.dataset.caption;
    $('#image-dialog-caption').textContent = trigger.dataset.caption;
    imageDialog.showModal();
  });
  $('#close-image').addEventListener('click', () => imageDialog.close());
  $('#close-resource').addEventListener('click', () => $('#resource-dialog').close());
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));
  imageDialog.addEventListener('close', () => { $('#enlarged-image').removeAttribute('src'); });

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
    ['overview','examples','benchmark','baseline','citation'].forEach(id => observer.observe(document.getElementById(id)));
  }
})();

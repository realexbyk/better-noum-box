// Better Noum — shared JS
document.addEventListener('DOMContentLoaded', () => {
  // mobile menu
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if (btn && links) btn.addEventListener('click', () => links.classList.toggle('open'));

  // FAQ accordions
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
  });

  // interactive tray hotspots — content read from each hotspot's data attributes
  document.querySelectorAll('.tray-wrap').forEach(wrap => {
    const pop = document.createElement('div');
    pop.className = 'hotspot-popover';
    wrap.appendChild(pop);
    const arrow = document.createElement('span');
    arrow.className = 'hp-arrow';

    const spots = wrap.querySelectorAll('.hotspot');
    const hide = () => { pop.classList.remove('show'); spots.forEach(x => x.classList.remove('active')); };

    const show = (h) => {
      spots.forEach(x => x.classList.remove('active', 'pulse'));
      h.classList.add('active');
      const img = h.dataset.img
        ? `<img src="${h.dataset.img}" alt="${h.dataset.title || ''}" onerror="this.style.display='none'">`
        : '';
      pop.innerHTML = `<button class="hp-close" aria-label="Close">&times;</button>${img}
        <div class="hp-body"><span class="hp-step">${h.dataset.step || ''}</span><h4>${h.dataset.title || ''}</h4><p>${h.dataset.text || ''}</p></div>`;
      pop.appendChild(arrow);
      const wr = wrap.getBoundingClientRect();
      const hr = h.getBoundingClientRect();
      const cx = hr.left - wr.left + hr.width / 2;
      const cy = hr.top - wr.top + hr.height / 2;
      pop.classList.add('show');
      const pw = pop.offsetWidth, ph = pop.offsetHeight;
      let left = cx - pw / 2;
      left = Math.max(8, Math.min(left, wrap.clientWidth - pw - 8));
      let top = cy - ph - 22; // above the circle
      let below = false;
      if (top < 4) { top = cy + 24; below = true; }
      pop.style.left = left + 'px';
      pop.style.top = top + 'px';
      const ax = cx - left - 7;
      arrow.style.left = Math.max(12, Math.min(ax, pw - 26)) + 'px';
      arrow.style.top = below ? '-7px' : (ph - 7) + 'px';
      arrow.style.transform = below ? 'rotate(225deg)' : 'rotate(45deg)';
      pop.querySelector('.hp-close').addEventListener('click', (e) => { e.stopPropagation(); hide(); });
    };

    spots.forEach(h => {
      h.classList.add('pulse');
      h.addEventListener('click', (e) => {
        e.stopPropagation();
        if (h.classList.contains('active')) { hide(); } else { show(h); }
      });
    });
    document.addEventListener('click', (e) => { if (!pop.contains(e.target) && !e.target.classList.contains('hotspot')) hide(); });
    window.addEventListener('resize', hide);
  });

  // buy panel option toggles — update price and (optionally) a feature list
  document.querySelectorAll('.option-toggle').forEach(group => {
    group.querySelectorAll('.option').forEach(o => {
      o.addEventListener('click', () => {
        group.querySelectorAll('.option').forEach(x => x.classList.remove('selected'));
        o.classList.add('selected');
        const priceEl = document.getElementById(group.dataset.price || '');
        if (priceEl && o.dataset.price) priceEl.innerHTML = o.dataset.price;
        const featsEl = group.dataset.feats ? document.getElementById(group.dataset.feats) : null;
        if (featsEl && o.dataset.feats) featsEl.innerHTML = o.dataset.feats;
      });
    });
  });

  // gift message card add-on
  document.querySelectorAll('.msg-toggle').forEach(t => {
    t.addEventListener('change', () => {
      const panel = t.closest('.buy-panel') || document;
      const field = panel.querySelector('.msg-field');
      if (field) field.hidden = !t.checked;
    });
  });
  document.querySelectorAll('.msg-text').forEach(ta => {
    const c = ta.parentElement.querySelector('.msg-count');
    ta.addEventListener('input', () => { if (c) c.textContent = ta.value.length + ' / 200'; });
  });

  // graceful image fallback
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const d = document.createElement('div');
      d.className = 'img-fallback';
      d.style.minHeight = (img.dataset.h || 280) + 'px';
      d.textContent = img.alt || 'Better Noum';
      img.replaceWith(d);
    });
  });
});

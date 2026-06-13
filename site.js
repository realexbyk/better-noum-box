// Better Noum — Ritual Box shared JS
document.addEventListener('DOMContentLoaded', () => {
  // mobile menu
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if (btn && links) btn.addEventListener('click', () => links.classList.toggle('open'));

  // FAQ accordions
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
  });

  // tray hotspots
  const panel = document.getElementById('hotspot-panel');
  const data = {
    1: ['The Cup', 'Seven caffeine-free nighttime sachets — golden milk, chamomile and botanical blends. Every ritual begins with warmth.'],
    2: ['The Air', 'Pillow & room mist with lavender and cedar, calibrated for night. Two sprays on the pillow, one in the air.'],
    3: ['The Water', 'Single-soak mineral bath salt sachets. No bathtub? A warm foot soak counts.'],
    4: ['The Close', 'Seven ritual cards — three small steps each — and a silk-feel sleep mask to end the evening.'],
  };
  document.querySelectorAll('.hotspot').forEach(h => {
    h.addEventListener('click', () => {
      document.querySelectorAll('.hotspot').forEach(x => x.classList.remove('active'));
      h.classList.add('active');
      const d = data[h.dataset.n];
      if (panel && d) panel.innerHTML = `<h4>${d[0]}</h4><p>${d[1]}</p>`;
    });
  });

  // buy panel option toggles
  document.querySelectorAll('.option-toggle').forEach(group => {
    group.querySelectorAll('.option').forEach(o => {
      o.addEventListener('click', () => {
        group.querySelectorAll('.option').forEach(x => x.classList.remove('selected'));
        o.classList.add('selected');
        const priceEl = document.getElementById(group.dataset.price || '');
        if (priceEl && o.dataset.price) priceEl.innerHTML = o.dataset.price;
      });
    });
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

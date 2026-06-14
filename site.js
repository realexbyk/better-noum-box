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

  // interactive tray hotspots — anchored pop-over on the circle
  const wrap = document.querySelector('.tray-wrap');
  if (wrap) {
    const data = {
      1: ['Step one', 'The Cup', 'step-cup.jpg', 'Seven caffeine-free nighttime blends — golden milk, chamomile and botanicals. Every ritual begins with warmth.'],
      2: ['Step two', 'The Air', 'step-air.jpg', 'Pillow & room mist of lavender and cedar, calibrated for night. Two sprays on the pillow, one in the air.'],
      3: ['Step three', 'The Water', 'step-water.jpg', 'Single-soak mineral bath salts. No bathtub? A warm foot soak counts — every card has a no-tub version.'],
      4: ['Step four', 'The Close', 'step-close.jpg', 'Seven ritual cards — three small steps each — plus a silk-feel sleep mask to end the evening.'],
    };
    const pop = document.createElement('div');
    pop.className = 'hotspot-popover';
    wrap.appendChild(pop);
    const arrow = document.createElement('span');
    arrow.className = 'hp-arrow';

    const hide = () => { pop.classList.remove('show'); document.querySelectorAll('.hotspot').forEach(x => x.classList.remove('active')); };

    const show = (h) => {
      const d = data[h.dataset.n];
      if (!d) return;
      document.querySelectorAll('.hotspot').forEach(x => x.classList.remove('active', 'pulse'));
      h.classList.add('active');
      pop.innerHTML = `<button class="hp-close" aria-label="Close">&times;</button>
        <img src="${d[2]}" alt="${d[1]}" onerror="this.style.display='none'">
        <div class="hp-body"><span class="hp-step">${d[0]}</span><h4>${d[1]}</h4><p>${d[3]}</p></div>`;
      pop.appendChild(arrow);
      // position relative to wrap
      const wr = wrap.getBoundingClientRect();
      const hr = h.getBoundingClient
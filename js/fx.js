const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fondo de red de puntos que reacciona al mouse / dedo.
export function initNetwork(canvas) {
  if (reduced()) { canvas.remove(); return; }
  const ctx = canvas.getContext('2d');
  const pointer = { x: -999, y: -999 };
  let w = 0, h = 0, dots = [], raf = 0;

  const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(70, Math.floor((w * h) / 18000));
    dots = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const rgb = css('--fx-rgb') || '80,160,255';
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      const dx = d.x - pointer.x, dy = d.y - pointer.y, dist = Math.hypot(dx, dy);
      if (dist < 140 && dist > 0) { d.x += (dx / dist) * 1.2; d.y += (dy / dist) * 1.2; }
    }
    for (let i = 0; i < dots.length; i++) {
      const a = dots[i];
      ctx.fillStyle = `rgba(${rgb},.7)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, 6.283); ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const b = dots[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) { ctx.strokeStyle = `rgba(${rgb},${(1 - d / 120) * .35})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
      if (pd < 170) { ctx.strokeStyle = `rgba(0,194,255,${(1 - pd / 170) * .6})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke(); }
    }
    raf = requestAnimationFrame(frame);
  }

  addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
  addEventListener('pointerleave', () => { pointer.x = pointer.y = -999; });
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) raf = requestAnimationFrame(frame);
  });
  resize();
  raf = requestAnimationFrame(frame);
}

// Texto que se escribe y borra solo. getPhrases() devuelve las frases del idioma actual.
export function initTyper(el, getPhrases) {
  if (reduced()) { el.textContent = getPhrases()[0]; return; }
  let i = 0, c = 0, deleting = false;
  function tick() {
    const phrases = getPhrases();
    const p = phrases[i % phrases.length];
    c += deleting ? -1 : 1;
    el.textContent = p.slice(0, Math.max(c, 0));
    let delay = deleting ? 35 : 75;
    if (!deleting && c >= p.length) { deleting = true; delay = 1400; }
    else if (deleting && c <= 0) { deleting = false; i++; delay = 300; }
    setTimeout(tick, delay);
  }
  tick();
}

// Aparición al hacer scroll. Devuelve observe(el) para elementos creados después.
export function initReveal() {
  if (reduced() || !('IntersectionObserver' in window)) return el => el.classList.add('in');
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: .12 });
  return el => { el.classList.add('reveal'); io.observe(el); };
}

// Inclinación 3D y brillo que sigue al cursor.
export function attachTilt(card) {
  if (reduced()) return;
  card.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
    card.style.transform = `perspective(700px) rotateX(${(.5 - y) * 8}deg) rotateY(${(x - .5) * 10}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
}

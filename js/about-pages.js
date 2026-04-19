/* =========================================================
   KIT · About Pages (Our Story + How We Brew) · Interaction
   Ported from the design handoff. The "tweaks" panel /
   edit-mode protocol has been removed since it was only used
   inside Claude Design's preview environment.
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Hero particles (bubbles + hops) ---------- */
  const canvas = document.getElementById('heroParticles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles = [];
    const COLORS = ['#0082CA', '#7FBFEF', '#FFBF3F', '#E96B58', '#249E6B'];
    const COUNT = 38;

    function resize() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function make() {
      return {
        x: Math.random() * W,
        y: H + Math.random() * H,
        r: 2 + Math.random() * 6,
        vy: -0.15 - Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        a: 0.15 + Math.random() * 0.35,
        kind: Math.random() > 0.7 ? 'hop' : 'bubble',
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.02,
      };
    }
    for (let i = 0; i < COUNT; i++) {
      const p = make();
      p.y = Math.random() * H;
      particles.push(p);
    }

    function drawHop(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.a;
      ctx.strokeStyle = p.c;
      ctx.fillStyle = p.c;
      ctx.lineWidth = 1.2;
      const s = p.r * 1.6;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.6, s, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -s); ctx.lineTo(0, s);
      ctx.stroke();
      ctx.restore();
    }
    function drawBubble(p) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.strokeStyle = p.c;
      ctx.fillStyle = p.c;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        if (p.y < -20) {
          Object.assign(p, make());
          p.y = H + 10;
        }
        if (p.x < -20) p.x = W + 10;
        if (p.x > W + 20) p.x = -10;
        p.kind === 'hop' ? drawHop(p) : drawBubble(p);
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------- Timeline scrollytelling ---------- */
  const rows = Array.from(document.querySelectorAll('.timeline-row'));
  const progress = document.getElementById('timelineProgress');
  const track = document.querySelector('.timeline-track');

  if (rows.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('active');
        });
      },
      { threshold: 0.35, rootMargin: '-15% 0px -15% 0px' }
    );
    rows.forEach((r) => observer.observe(r));

    function updateProgress() {
      if (!track || !progress) return;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const seen = Math.max(0, Math.min(total, vh * 0.5 - rect.top));
      progress.style.height = (seen / total) * 100 + '%';
    }
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  /* ---------- Meet the Brew (how-we-brew page) ---------- */
  const orbit = document.getElementById('brewOrbit');
  const info = document.getElementById('brewInfo');
  if (orbit && info) {
    const dots = Array.from(orbit.querySelectorAll('.brew-dot'));
    const items = Array.from(info.querySelectorAll('.brew-info-item'));

    function positionDots() {
      const stage = orbit.getBoundingClientRect();
      const R = Math.min(stage.width, stage.height) / 2 - 28;
      dots.forEach((d) => {
        const a = parseFloat(d.dataset.angle) * Math.PI / 180 - Math.PI / 2;
        const x = Math.cos(a) * R;
        const y = Math.sin(a) * R;
        const pos = `translate(${x}px, ${y}px)`;
        d.style.setProperty('--pos', pos);
        d.style.transform = pos;
      });
    }
    positionDots();
    window.addEventListener('resize', positionDots);

    function select(i) {
      dots.forEach((d) => d.classList.toggle('active', +d.dataset.i === i));
      items.forEach((it) => it.classList.toggle('active', +it.dataset.i === i));
    }
    dots.forEach((d) => {
      d.addEventListener('mouseenter', () => select(+d.dataset.i));
      d.addEventListener('focus', () => select(+d.dataset.i));
      d.addEventListener('click', () => select(+d.dataset.i));
    });

    const nextBtn = document.getElementById('brewNext');
    if (nextBtn) {
      function currentIdx() {
        const active = items.find((it) => it.classList.contains('active'));
        return active ? +active.dataset.i : 0;
      }
      function updateNextLabel() {
        const names = ['Malt', 'Hops', 'Yeast', 'Water'];
        const label = nextBtn.querySelector('.brew-next-label');
        if (label) label.textContent = 'Next: ' + names[currentIdx()];
      }
      updateNextLabel();
      nextBtn.addEventListener('click', () => {
        const next = (currentIdx() + 1) % items.length;
        select(next);
        updateNextLabel();
      });
      dots.forEach((d) => d.addEventListener('click', updateNextLabel));
      dots.forEach((d) => d.addEventListener('mouseenter', updateNextLabel));
    }
  }

})();

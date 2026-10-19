import React, { useEffect, useRef } from 'react';

export default function Starfield({ paused = false }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas.parentElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let stars = [];
    let frame = 0;
    let visible = true;
    let lastTime = 0;
    let elapsed = 0;
    let disposed = false;
    function size() {
      width = hero.clientWidth;
      height = hero.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: width < 600 ? 23 : 62 }, (_, i) => ({
        x: ((i * 137.508 + 21) % 997) / 997 * width,
        y: ((i * 73.17 + 13) % 701) / 701 * height,
        radius: .5 + i % 4 * .28,
        speed: 2 + i % 5 * 1.2,
        phase: i * .8,
      }));
      paint();
    }
    function paint() {
      context.clearRect(0, 0, width, height);
      stars.forEach(star => {
        const y = (star.y - elapsed * star.speed % height + height) % height;
        const opacity = .2 + (Math.sin(elapsed * .6 + star.phase) + 1) * .2;
        context.beginPath();
        context.fillStyle = `rgba(184, 241, 218, ${opacity})`;
        context.arc(star.x, y, star.radius, 0, Math.PI * 2);
        context.fill();
      });
    }
    function draw(time) {
      frame = 0;
      if (disposed || !visible || document.hidden || reducedMotion.matches || paused) return;
      if (time - lastTime >= 40) {
        elapsed += Math.min((time - lastTime) / 1000, .06);
        lastTime = time;
        paint();
      }
      frame = requestAnimationFrame(draw);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = performance.now();
      if (visible && !document.hidden && !reducedMotion.matches && !paused) frame = requestAnimationFrame(draw);
      else paint();
    }
    const resize = new ResizeObserver(size);
    const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    resize.observe(hero);
    intersection.observe(hero);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    size();
    sync();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
    };
  }, [paused]);
  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

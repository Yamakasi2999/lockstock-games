import { useEffect } from 'react';

/** Progressive motion: the page remains readable without JavaScript effects. */
export default function useAtmosphere(paused = false) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const root = document.documentElement;
    const hero = document.querySelector('.concept-hero');
    const progress = document.querySelector('.reading-progress');
    // The live iframe container changes className in React when the game starts.
    // Keep it outside imperative reveal effects so it can never become hidden.
    const revealTargets = [...document.querySelectorAll(
      '.universe-copy, .craft-diagram, .how-heading, .step, .game-section .eyebrow, .section-heading, .studio-copy, .studio-note, .operator-heading, .operator-cards article, .partner-strip, .contact-inner, .about-copy, .crew-manifest, .crew-heading, .crew-card, .crew-signoff, .about-value, .about-invitation'
    )];
    const tiltTargets = [...document.querySelectorAll('.craft-diagram, .step, .studio-note, .operator-cards article, .crew-card, .crew-manifest')];
    let observer;
    let scrollFrame = 0;
    let pointerFrame = 0;
    let lastTilt = null;
    let disposed = false;

    function syncMotion() {
      observer?.disconnect();
      root.classList.remove('motion-ready');
      root.classList.toggle('motion-paused', paused);
      root.classList.toggle('motion-enabled', !reducedMotion.matches && !paused);
      if (paused || reducedMotion.matches || !('IntersectionObserver' in window)) return;
      revealTargets.forEach((target, index) => {
        target.setAttribute('data-reveal', '');
        target.style.setProperty('--reveal-delay', `${target.matches('.step, .operator-cards article, .crew-card') ? index % 3 * 75 : 0}ms`);
      });
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      revealTargets.forEach(target => observer.observe(target));
      root.classList.add('motion-ready');
    }

    function updateScroll() {
      scrollFrame = 0;
      if (disposed) return;
      root.classList.toggle('has-scrolled', window.scrollY > 24);
      const available = root.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
      if (hero && !paused && !reducedMotion.matches && finePointer.matches) {
        const rect = hero.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < innerHeight;
        hero.style.setProperty('--scroll-drift', `${visible ? Math.max(-100, Math.min(100, -rect.top * 0.13)) : 0}px`);
      }
    }
    function onScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }
    function resetTilt() {
      if (!lastTilt) return;
      lastTilt.style.setProperty('--tilt-x', '0deg');
      lastTilt.style.setProperty('--tilt-y', '0deg');
      lastTilt = null;
    }
    function onPointerMove(event) {
      if (paused || reducedMotion.matches || !finePointer.matches || pointerFrame) return;
      const x = event.clientX;
      const y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (disposed) return;
        if (hero) {
          const rect = hero.getBoundingClientRect();
          const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
          hero.style.setProperty('--pointer-x', `${inside ? (x - rect.left - rect.width / 2) * -0.014 : 0}px`);
          hero.style.setProperty('--pointer-y', `${inside ? (y - rect.top - rect.height / 2) * -0.014 : 0}px`);
          hero.style.setProperty('--light-x', `${x - rect.left}px`);
          hero.style.setProperty('--light-y', `${y - rect.top}px`);
          hero.classList.toggle('has-pointer', inside);
        }
        const tilt = target?.closest('[data-tilt]');
        if (tilt !== lastTilt) resetTilt();
        if (tilt) {
          const rect = tilt.getBoundingClientRect();
          tilt.style.setProperty('--tilt-x', `${-(y - rect.top - rect.height / 2) / rect.height * 5}deg`);
          tilt.style.setProperty('--tilt-y', `${(x - rect.left - rect.width / 2) / rect.width * 5}deg`);
          lastTilt = tilt;
        }
      });
    }
    function focusReveal(event) {
      event.target.closest?.('[data-reveal]')?.classList.add('is-visible');
    }
    function leavePage() {
      resetTilt();
      hero?.classList.remove('has-pointer');
      hero?.style.setProperty('--pointer-x', '0px');
      hero?.style.setProperty('--pointer-y', '0px');
    }

    tiltTargets.forEach(target => target.setAttribute('data-tilt', ''));
    syncMotion();
    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', leavePage);
    document.addEventListener('focusin', focusReveal);
    window.addEventListener('blur', leavePage);
    reducedMotion.addEventListener('change', syncMotion);
    return () => {
      disposed = true;
      observer?.disconnect();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      root.classList.remove('motion-ready', 'motion-enabled', 'has-scrolled', 'motion-paused');
      revealTargets.forEach(target => { target.removeAttribute('data-reveal'); target.style.removeProperty('--reveal-delay'); });
      tiltTargets.forEach(target => { target.removeAttribute('data-tilt'); target.style.removeProperty('--tilt-x'); target.style.removeProperty('--tilt-y'); });
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', leavePage);
      document.removeEventListener('focusin', focusReveal);
      window.removeEventListener('blur', leavePage);
      reducedMotion.removeEventListener('change', syncMotion);
    };
  }, [paused]);
}

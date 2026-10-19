import { useRef, useState } from 'react';
import './UfoCashSection.css';

export default function UfoCashSection() {
  const gameRef = useRef(null);
  const [fullscreenMessage, setFullscreenMessage] = useState('');

  async function openFullscreen() {
    try {
      await gameRef.current.requestFullscreen();
      setFullscreenMessage('');
    } catch {
      setFullscreenMessage('Fullscreen is unavailable. You can open the game in a new tab.');
    }
  }

  return (
    <section id="ufo-cash" aria-labelledby="ufo-cash-title" className="ufo-section">
      <p className="ufo-section__eyebrow">02 / STEP INTO THE COCKPIT</p>
      <h2 id="ufo-cash-title">The farm is waiting. Coming?</h2>
      <div ref={gameRef} className="ufo-section__cockpit">
        <iframe
          src="https://api-dev.lockstock-games.com/demo?game=crash&amp;currency=INR"
          title="UFO CASH — LockStock Games"
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
      <div className="ufo-section__controls">
        <span className="ufo-section__label">UFO CASH / LOCKSTOCK GAMES</span>
        <a href="https://api-dev.lockstock-games.com/demo?game=crash&amp;currency=INR" target="_blank" rel="noopener noreferrer">Open in a new tab ↗</a>
        <button type="button" onClick={openFullscreen}>Fullscreen ⛶</button>
      </div>
      <p role="status" className="ufo-section__status">{fullscreenMessage}</p>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';

const GAME_URL = import.meta.env.VITE_GAME_URL || 'https://api-dev.lockstock-games.com/demo?game=crash&currency=INR';
const CONTACT_EMAIL = 'lockstock-games@lockstock.com';
const steps = [
  { number: '01', icon: 'cow', title: 'Abduct cows.', description: 'A UFO arrives at the farm. An ordinary day becomes an extraordinary flight.', footnote: 'CAUTION: COWS ON BOARD' },
  { number: '02', icon: 'ufo', title: 'Climb higher.', description: 'The saucer gains altitude. But company is closing in, determined to bring it down.', footnote: 'SIGNAL FROM ORBIT' },
  { number: '03', icon: 'radar', title: 'Time your exit.', description: 'The flight could end at any time. Cash out before the UFO gets shot down.', footnote: 'KEEP YOUR EYES ON THE FLIGHT' },
];

function Icon({ name = 'arrow', size = 24, ...props }) {
  const shapes = {
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
    play: <path d="m9 5 11 7-11 7Z" />,
    expand: <path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    plus: <path d="M5 12h14M12 5v14" />,
    cow: <><path d="M7 9 3 5l-1 5 5 3m10-4 4-4 1 5-5 3M8 6 6 2m10 4 2-4M7 9c0-5 10-5 10 0v7c0 6-10 6-10 0Z" /><ellipse cx="12" cy="17" rx="5" ry="4" /><path d="M9 11v1m6-1v1m-5 5h.01M14 17h.01" /></>,
    ufo: <><ellipse cx="12" cy="13" rx="10" ry="4" /><path d="M6 11c0-10 12-10 12 0M8 20l1-2m7 2-1-2M6 13h.01M12 15h.01M18 13h.01" /></>,
    radar: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="M12 12 19 5M12 3v2M3 12h2m7 7v2m7-9h2" /><circle cx="9" cy="15" r="1" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{shapes[name]}</svg>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="LockStock Games — home"><span className="brand-mark">LS</span><span className="brand-wordmark">LOCKSTOCK<span>GAMES</span></span></a>;
}

function GameSection({ active, onStart }) {
  const frame = useRef(null);
  const iframe = useRef(null);
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => setShowFallback(true), 12000);
    return () => window.clearTimeout(timer);
  }, [active]);

  async function fullscreen() {
    try {
      if (frame.current.requestFullscreen) await frame.current.requestFullscreen();
      else if (iframe.current?.webkitRequestFullscreen) iframe.current.webkitRequestFullscreen();
      else setMessage('Fullscreen is not supported in this browser. Open the game in a new tab for more room.');
    } catch {
      setMessage('Fullscreen is unavailable. You can open the game in a new tab.');
    }
  }

  return <section id="game" className="game-section section-pad" aria-labelledby="game-title">
    <div className="container">
      <p className="eyebrow">02 / STEP INTO THE COCKPIT</p>
      <div className="section-heading"><h2 id="game-title">The farm is waiting.<br className="mobile-break" /> Coming?</h2><span className="game-tag"><span className="signal-dot" />UFO CASH</span></div>
      <div className={`game-cockpit ${active ? 'is-active' : ''}`} ref={frame} aria-busy={active && !loaded}>
        <button className="exit-fullscreen" type="button" onClick={() => document.exitFullscreen?.().catch(() => setMessage('Use your browser controls to exit fullscreen.'))}>Exit fullscreen<Icon name="close" size={18} /></button>
        <span className="screw screw-tl" /><span className="screw screw-tr" /><span className="screw screw-bl" /><span className="screw screw-br" />
        {active ? <>
          {!loaded && <div className="game-loading"><Icon name="ufo" size={46} /><p>Connecting to the cockpit…</p></div>}
          <iframe ref={iframe} src={GAME_URL} title="UFO CASH by LockStock Games" allow="fullscreen" allowFullScreen onLoad={() => setLoaded(true)} />
        </> : <div className="game-poster">
          <img src="/images/ufo-cash.jpg" alt="UFO CASH concept: a cow in a flying saucer above a farm, with a cockpit below" loading="lazy" width="1728" height="912" />
          <div className="game-poster-overlay"><button className="button button-lime" onClick={onStart}><Icon name="play" size={20} />Enter the cockpit</button><span>Launch the live game</span></div>
        </div>}
      </div>
      <div className="game-toolbar"><span className="game-label">UFO CASH <span>/</span> LOCKSTOCK GAMES</span><div className="game-actions"><a href={GAME_URL} target="_blank" rel="noopener noreferrer">Open in a new tab<Icon size={17} /></a>{active && <button onClick={fullscreen}>Fullscreen<Icon name="expand" size={18} /></button>}</div></div>
      <div className="game-note"><p>{active ? 'Live game hosted by LockStock Games.' : 'Your flight starts here. Enter the cockpit to load the live game.'}</p>{!active && <p className="concept-caption">Illustrative English concept preview.</p>}</div>
      {active && showFallback && <p className="game-help">Having trouble connecting? <a href={GAME_URL} target="_blank" rel="noopener noreferrer">Open the game in a new tab <span aria-hidden="true">↗</span></a></p>}
      <p className="sr-status" role="status">{message}</p>
    </div>
  </section>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  function startGame() { setGameActive(true); setMenuOpen(false); }
  useEffect(() => {
    const closeOnEscape = event => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="top"><div className="container header-inner">
      <Brand />
      <nav id="main-navigation" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#game" onClick={() => setMenuOpen(false)}>UFO CASH</a><a href="#how-to-play" onClick={() => setMenuOpen(false)}>How to play</a><a href="#studio" onClick={() => setMenuOpen(false)}>The studio</a>
        <a className="button button-mint nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>For partners<Icon size={20} /></a>
      </nav>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </div></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div><div className="container hero-inner">
        <div className="hero-copy"><p className="contact-tag"><span className="signal-dot" />UFO CASH / FIRST CONTACT</p><h1 id="hero-title">Cows.<br />Space.<br /><span>Big multipliers.</span></h1><p className="hero-lead">Our story starts on a farm.</p><p className="hero-description">A flying saucer. A few abducted cows.<br />{' '}And a flight that could end at any moment.</p><div className="hero-actions"><a className="button button-lime" href="#game" onClick={startGame}>Play UFO CASH<Icon /></a><a className="button button-ghost" href="#how-to-play">How it works<Icon size={21} /></a></div><p className="hero-signoff">LOCKSTOCK GAMES / GAMES WITH CHARACTER</p></div>
        <div className="hero-art"><svg className="flight-trail" viewBox="0 0 620 680" fill="none" aria-hidden="true"><path d="M39 620C-55 409 210 590 169 283S425 175 606 28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 12" /></svg><span className="moo-badge" aria-hidden="true">MOO!</span><div className="mascot-orbit"><div className="mascot-disc"><img src="/images/mascot.jpg" alt="A cheerful cow flying a blue saucer — the UFO CASH mascot" width="2420" height="2697" fetchPriority="high" /></div></div><span className="flying-badge">COWS FLY HIGHER</span></div>
      </div></section>
      <div className="ticker" aria-label="Games with character"><div className="container ticker-inner"><span>UNIDENTIFIED FLYING PERSONALITY</span><Icon name="plus" size={20} /><span>COWS HAVE ENTERED ORBIT</span><Icon name="plus" size={20} /><span>PLAY UFO CASH</span></div></div>
      <section id="how-to-play" className="how-section section-pad" aria-labelledby="how-title"><div className="container"><p className="eyebrow">01 / THE ABDUCTION PLAN</p><h2 id="how-title">This farm has big plans.</h2><p className="section-intro">A familiar setting. An otherworldly twist.</p><div className="steps">{steps.map(step => <article className="step" key={step.number}><div className="step-top"><span className="step-number">{step.number}</span><Icon name={step.icon} size={43} /></div><h3>{step.title}</h3><p>{step.description}</p><span className="step-footnote">{step.footnote}</span></article>)}</div><p className="rules-note">A guide to the game’s story. Full rules and conditions are available in the game.</p></div></section>
      <GameSection active={gameActive} onStart={startGame} />
      <section id="studio" className="studio-section section-pad" aria-labelledby="studio-title"><div className="container studio-inner"><div className="studio-copy"><p className="eyebrow">03 / MADE AT LOCKSTOCK</p><h2 id="studio-title">Serious about games.<br />Playful about the story.</h2><p className="studio-lead">We are LockStock Games, a casino game developer.</p><p className="studio-description">Our first game world is part farm, part outer space,<br className="desktop-break" /> and full of character. Get to know the studio behind it.</p><a className="button button-navy" href="#contact">Become a partner<Icon /></a></div><div className="radar-art" aria-hidden="true"><div className="radar"><span className="radar-ring" /><span className="radar-sweep" /><i className="radar-dot one" /><i className="radar-dot two" /><Icon name="ufo" size={38} /></div><span>OTHERWORLDLY IDEAS.<br />DOWN-TO-EARTH PEOPLE.</span></div></div></section>
      <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title"><div className="container contact-inner"><div><p className="eyebrow">04 / GROUND CONTROL</p><h2 id="contact-title">Room for a UFO?</h2><p>Let’s talk about the game and working together.</p><a className="button button-mint" href={`mailto:${CONTACT_EMAIL}`}>Contact the studio<Icon /></a><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div><div className="contact-stars" aria-hidden="true"><Icon name="plus" size={78} /><Icon name="plus" size={30} /><Icon name="plus" size={25} /></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><a href="#top" className="footer-brand">LOCKSTOCK GAMES</a><span>© {new Date().getFullYear()} LockStock Games</span><p>Play responsibly. <span className="age-badge">18+</span></p><a className="back-top" href="#top" aria-label="Back to top"><Icon /></a></div></footer>
  </>;
}

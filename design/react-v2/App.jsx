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
  return <a className="brand" href="#top" aria-label="LockStock Games — home"><span className="brand-mark"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 17c0-2 4-4 9-4s9 2 9 4-4 4-9 4-9-2-9-4Z" stroke="currentColor" strokeWidth="2"/><path d="M11 14c0-9 10-9 10 0M12 24l-2 3m12 0-2-3M16 7V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span><span className="brand-wordmark">LOCKSTOCK<span>GAMES</span></span></a>;
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
      <p className="eyebrow">03 / LIVE DEMO</p>
      <div className="section-heading"><h2 id="game-title">Your seat is ready.</h2><span className="game-tag"><span className="signal-dot" />UFO CASH</span></div>
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
      <div className="game-note"><p>{active ? 'You’re in the cockpit. Enjoy your first encounter.' : 'Your flight starts here. Enter the cockpit to load the live game.'}</p>{!active && <p className="concept-caption">Illustrative English concept preview.</p>}</div>
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
        <a className="button button-mint nav-cta" href="#operators" onClick={() => setMenuOpen(false)}>For partners<Icon size={20} /></a>
      </nav>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </div></header>
    <main id="main">
      <section className="hero concept-hero" aria-labelledby="hero-title">
        <div className="world-art" aria-hidden="true"><img src="/images/ufo-world.jpg" alt="" width="1536" height="1024" fetchPriority="high" /></div>
        <div className="world-shade" aria-hidden="true" />
        <div className="hero-stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="container concept-hero-inner">
          <div className="hero-copy">
            <p className="contact-tag"><span className="signal-dot" />INDEPENDENT GAME STUDIO</p>
            <h1 id="hero-title">Small studio.<br /><span>Big universe.</span></h1>
            <p className="hero-lead">Casino games with a world of their own.</p>
            <p className="hero-description">First stop: a quiet farm.<br />And a very unusual visitor.</p>
            <div className="hero-actions"><a className="button button-lime" href="#game" onClick={startGame}>Play UFO CASH<Icon /></a><a className="button button-outline" href="#operators">Partner with us<Icon size={21} /></a></div>
          </div>
          <a className="flight-report" href="#universe"><span className="flight-report-icon"><Icon name="ufo" size={31} /></span><span><small>FIRST CONTACT / GAME 001</small><strong>UFO CASH</strong></span><span className="flight-report-arrow"><Icon size={20} /></span></a>
          <a className="scroll-cue" href="#universe"><span />EXPLORE OUR UNIVERSE</a>
        </div>
        <span className="scene-caption">A LITTLE FARM. A BIG MISUNDERSTANDING.</span>
      </section>
      <div className="ticker" aria-label="Games with character"><div className="container ticker-inner"><span>SMALL TEAM. OTHERWORLDLY IDEAS.</span><Icon name="plus" size={20} /><span>COWS HAVE ENTERED ORBIT</span><Icon name="plus" size={20} /><span>MEET LOCKSTOCK GAMES</span></div></div>
      <section id="universe" className="universe-section section-pad" aria-labelledby="universe-title"><div className="container universe-inner">
        <div className="universe-copy"><p className="eyebrow">01 / OUR FIRST CONTACT</p><h2 id="universe-title">Not your average<br />day on the farm.</h2><p>A flying saucer. A cow with other plans.<br />A sky that’s getting a little crowded.</p><p className="universe-description">Meet UFO CASH, our first crash game. A familiar format with a distinctly LockStock sense of humour.</p><div className="product-chips"><span>CRASH GAME</span><span>FARM × SCI-FI</span><span>PLAYABLE DEMO</span></div><a className="text-link" href="#game" onClick={startGame}>Meet UFO CASH<Icon size={20} /></a></div>
        <div className="craft-diagram" aria-label="UFO CASH spacecraft illustration">
          <span className="diagram-label">LOCKSTOCK FIELD NOTES</span><span className="diagram-corner">001</span>
          <div className="diagram-orbits" aria-hidden="true"><i /><i /><i /></div>
          <svg viewBox="0 0 520 360" fill="none" aria-hidden="true"><defs><linearGradient id="craft-beam" x2="0" y2="1"><stop stopColor="#a0e7d3" stopOpacity=".5"/><stop offset="1" stopColor="#a0e7d3" stopOpacity="0"/></linearGradient></defs><path d="m217 190-65 143h218l-66-143" fill="url(#craft-beam)"/><ellipse cx="260" cy="174" rx="155" ry="49" fill="#223c48" stroke="#a0e7d3" strokeWidth="2"/><path d="M173 162c0-116 174-116 174 0" fill="#4861ad" fillOpacity=".28" stroke="#a0e7d3" strokeWidth="2"/><path d="M194 141c5-43 40-64 66-64" stroke="#a0e7d3" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round"/><ellipse cx="260" cy="160" rx="155" ry="37" fill="#365866" stroke="#a0e7d3" strokeWidth="2"/><path d="M106 161c7 49 301 49 308 0" stroke="#a0e7d3" strokeWidth="2"/><ellipse cx="166" cy="180" rx="11" ry="4" fill="#76ef43"/><ellipse cx="224" cy="192" rx="11" ry="4" fill="#76ef43"/><ellipse cx="292" cy="192" rx="11" ry="4" fill="#76ef43"/><ellipse cx="351" cy="180" rx="11" ry="4" fill="#76ef43"/><path d="M75 117h66l27 27M366 112l24-37h56M327 223l39 37h80" stroke="#70998c" strokeWidth="1"/><circle cx="168" cy="144" r="3" fill="#a0e7d3"/><circle cx="366" cy="112" r="3" fill="#a0e7d3"/><circle cx="327" cy="223" r="3" fill="#a0e7d3"/><text x="67" y="105">UNIDENTIFIED</text><text x="390" y="65">COW-PROOF?</text><text x="367" y="278">MOSTLY HARMLESS</text></svg>
          <div className="diagram-bottom"><span><span className="signal-dot" /> SUBJECT: UFO CASH</span><span>CLASSIFICATION: UNUSUAL</span></div>
        </div>
      </div></section>
      <section id="how-to-play" className="how-section section-pad" aria-labelledby="how-title"><div className="container"><div className="how-heading"><div><p className="eyebrow">02 / THE FLIGHT PLAN</p><h2 id="how-title">From pasture<br />to outer space.</h2></div><p className="section-intro">Three small steps.<br />One very strange journey.</p></div><div className="steps">{steps.map(step => <article className="step" key={step.number}><div className="step-top"><span className="step-number">{step.number}</span><Icon name={step.icon} size={43} /></div><h3>{step.title}</h3><p>{step.description}</p><span className="step-footnote">{step.footnote}</span></article>)}</div><p className="rules-note">A guide to the game’s story. Full rules and conditions are available in the game.</p></div></section>
      <GameSection active={gameActive} onStart={startGame} />
      <section id="studio" className="studio-section section-pad" aria-labelledby="studio-title"><div className="container studio-inner"><div className="studio-copy"><p className="eyebrow">04 / THE STUDIO BEHIND THE SAUCER</p><h2 id="studio-title">Grounded people.<br />Far-out ideas.</h2><p className="studio-lead">We’re LockStock Games.<br />A new casino game studio with a point of view.</p><p className="studio-description">We like memorable characters, unexpected worlds and the details that give a game its personality. UFO CASH is our first chapter.</p><a className="text-link" href="#operators">Get to know your next partner<Icon size={20} /></a></div><div className="studio-note"><span className="note-pin" /><span className="note-eyebrow">ONE VERY UNUSUAL BRIEF</span><p>“What if the cows<br />had other plans?”</p><Icon name="cow" size={66} /><span className="note-signature">A farm. A saucer. A story with character.<br /><strong>UFO CASH / GAME WORLD 001</strong></span></div></div></section>
      <section id="operators" className="operators-section section-pad" aria-labelledby="operators-title"><div className="container"><div className="operator-heading"><div><p className="eyebrow">05 / FOR OPERATORS & PARTNERS</p><h2 id="operators-title">Let’s bring something<br />different to your lobby.</h2></div><p>Start with a game.<br />Build a conversation.</p></div><div className="operator-cards"><article><Icon name="play" size={28} /><span>01 / EXPLORE</span><h3>Take it for a flight.</h3><p>Get a feel for UFO CASH with our playable demo.</p><a className="text-link" href="#game" onClick={startGame}>Explore the game<Icon size={18} /></a></article><article><Icon name="ufo" size={31} /><span>02 / CONNECT</span><h3>Meet the studio.</h3><p>Tell us about your platform, audience and plans.</p><a className="text-link" href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20enquiry`}>Start a conversation<Icon size={18} /></a></article><article><Icon name="radar" size={30} /><span>03 / PLAN</span><h3>Find the right fit.</h3><p>Discuss integration, game details and the next steps with our team.</p><a className="text-link" href={`mailto:${CONTACT_EMAIL}?subject=UFO%20CASH%20integration`}>Talk integration<Icon size={18} /></a></article></div><div className="partner-strip"><Icon name="mail" size={23} /><span>A human on the other end. An unusual game on the table.</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<Icon size={17} /></a></div></div></section>
      <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title"><div className="container contact-inner"><div><p className="eyebrow">06 / GROUND CONTROL</p><h2 id="contact-title">Ready for first contact?</h2><p>Your next game partnership could be out of this world.</p><a className="button button-mint" href={`mailto:${CONTACT_EMAIL}`}>Contact the studio<Icon /></a><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div><div className="contact-stars" aria-hidden="true"><Icon name="plus" size={78} /><Icon name="plus" size={30} /><Icon name="plus" size={25} /></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><a href="#top" className="footer-brand">LOCKSTOCK GAMES</a><span>© {new Date().getFullYear()} LockStock Games</span><p>Play responsibly. <span className="age-badge">18+</span></p><a className="back-top" href="#top" aria-label="Back to top"><Icon /></a></div></footer>
  </>;
}

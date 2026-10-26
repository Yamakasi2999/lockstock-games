import React from 'react';

// Keep the catalogue data separate so future releases can share this presentation.
const games = [
  {
    id: 'ufo-cash',
    title: 'UFO CASH',
    description: 'Narrative crash game packed with character. Players guide an alien saucer through an escalating farm invasion, balancing high-altitude multipliers against sudden hazards. Built on Provably Fair mechanics with dual-bet functionality and lightweight mobile architecture.',
    image: 'images/ufo-cash.jpg',
    features: ['Provably Fair', 'Dual-bet functionality', 'Lightweight mobile architecture'],
    type: 'Crash / Instant Game',
    rtp: '96.5%',
    rtpNote: 'Configurable',
    releaseDate: 'Q4 2026',
  },
];

function Arrow() {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export default function OurGames({ onStart, contactEmail }) {
  return <section id="games" className="catalogue-section section-pad" aria-labelledby="games-title">
    <div className="container">
      <div className="catalogue-heading"><div><p className="eyebrow">01 / OUR GAMES</p><h2 id="games-title">A world of character.<br />Ready for your lobby.</h2></div><p>Discover the first title<br />from LockStock Games.</p></div>
      {games.map(game => <article className="catalogue-game" key={game.id} aria-labelledby={`${game.id}-title`}>
        <div className="catalogue-game-main">
          <div className="catalogue-copy">
            <p className="catalogue-kicker"><span className="signal-dot" />OUR FIRST RELEASE</p>
            <h3 id={`${game.id}-title`}>{game.title}</h3>
            <p className="catalogue-description">{game.description}</p>
            <ul className="catalogue-features" aria-label="Game features">{game.features.map(feature => <li key={feature}><span aria-hidden="true">✦</span>{feature}</li>)}</ul>
            <div className="catalogue-actions"><a className="button button-lime" href="#game" onClick={onStart}>PLAY DEMO<Arrow /></a><a className="button button-outline" href={`mailto:${contactEmail}?subject=UFO%20CASH%20integration`}>REQUEST INTEGRATION<Arrow /></a></div>
          </div>
          <div className="catalogue-art"><img src={`${import.meta.env.BASE_URL}${game.image}`} alt="UFO CASH: a farm invasion with an alien saucer and cow, above the game cockpit" loading="lazy" width="1728" height="912" /><span className="catalogue-art-label">UFO CASH / LOCKSTOCK GAMES</span></div>
        </div>
        <dl className="catalogue-specs" id="game-specs" aria-label="UFO CASH game specifications">
          <div><dt>GAME TYPE</dt><dd>{game.type}</dd></div>
          <div><dt>RTP</dt><dd>{game.rtp}<span>({game.rtpNote})</span></dd></div>
          <div><dt>RELEASE DATE</dt><dd>{game.releaseDate}</dd></div>
        </dl>
      </article>)}
    </div>
  </section>;
}

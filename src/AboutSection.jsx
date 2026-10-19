import React from 'react';
import { team } from './team.js';

function CrewAvatar({ member }) {
  if (member.photo) {
    return <img src={member.photo} alt={member.name} loading="lazy" className="crew-photo" />;
  }
  const gradientId = `crew-glow-${member.id}`;
  return <svg className="crew-avatar" viewBox="0 0 360 275" fill="none" aria-hidden="true">
    <defs><radialGradient id={gradientId}><stop stopColor={member.accent} stopOpacity=".17" /><stop offset="1" stopColor={member.accent} stopOpacity="0" /></radialGradient></defs>
    <ellipse cx="180" cy="145" rx="150" ry="139" fill={`url(#${gradientId})`} />
    <g className="crew-orbit" style={{ transformOrigin: '180px 140px', rotate: `${member.variant * 24 - 45}deg` }}>
      <ellipse cx="180" cy="140" rx="124" ry="68" stroke={member.accent} strokeOpacity=".25" />
      <circle cx="304" cy="140" r="4" fill={member.accent} />
      <circle cx="56" cy="140" r="2.5" fill={member.accent} fillOpacity=".6" />
    </g>
    <path d="M103 275v-14c0-39 34-57 77-57s77 18 77 57v14" fill="#243b46" stroke={member.accent} strokeOpacity=".35" />
    <path d="M147 211v27l33 20 33-20v-27" stroke={member.accent} strokeOpacity=".35" />
    <rect x="110" y="78" width="140" height="144" rx="63" fill="#1e3440" stroke={member.accent} strokeOpacity=".65" strokeWidth="1.4" />
    <rect x="121" y="89" width="118" height="121" rx="53" fill="#142a35" stroke={member.accent} strokeOpacity=".2" />
    <path d="M133 124c6-14 16-21 30-23" stroke={member.accent} strokeWidth="3" strokeLinecap="round" strokeOpacity=".4" />
    <rect x="101" y="133" width="13" height="40" rx="6" fill="#304e55" stroke={member.accent} strokeOpacity=".45" />
    <rect x="246" y="133" width="13" height="40" rx="6" fill="#304e55" stroke={member.accent} strokeOpacity=".45" />
    <path d="M254 173v13c0 9-8 13-21 13h-14" stroke={member.accent} strokeOpacity=".7" />
    <rect x="207" y="195" width="18" height="7" rx="3.5" fill={member.accent} />
    <text x="180" y="168" fill={member.accent} fontSize="61" fontWeight="900" fontFamily="Nunito, Arial, sans-serif" textAnchor="middle">{member.initial}</text>
    <path d="M63 61v10m-5-5h10M283 210v8m-4-4h8" stroke={member.accent} strokeOpacity=".6" strokeLinecap="round" />
    <circle cx="280" cy="75" r="2" fill={member.accent} fillOpacity=".65" />
    <path d="M165 52h30" stroke={member.accent} strokeOpacity=".3" />
  </svg>;
}

export default function AboutSection() {
  return <section id="studio" className="about-section" aria-labelledby="about-title">
    <div className="about-intro section-pad">
      <div className="container about-intro-inner">
        <div className="about-copy">
          <p className="eyebrow">04 / ABOUT LOCKSTOCK</p>
          <h2 id="about-title">Small team.<br />Shared imagination.</h2>
          <p className="about-lead">Unexpected ideas.<br />Unmistakable character.</p>
          <p className="about-description">We’re LockStock Games, a six-person independent studio creating casino games with a world of their own. We believe a great game begins with an idea that makes you look twice — a character, a setting or a playful twist that stays with you.</p>
          <p className="about-description">Our first encounter is UFO CASH. A quiet farm becomes the scene of a very unusual invasion, as a flying saucer lifts cows into a sky full of surprises. It brings our sense of humour to the crash format and introduces the kind of worlds we want to build: distinctive, expressive and full of personality.</p>
          <p className="about-description">Behind every strange idea are real people bringing art direction, development, production and technical operations together. We care about how the whole experience comes together — from the first impression to the smallest detail.</p>
          <div className="about-principles"><span>Character first</span><span>Details matter</span><span>Ideas take flight</span></div>
        </div>
        <div className="crew-manifest" aria-label="Studio crew manifest: 6 people, first release UFO CASH">
          <div className="manifest-header"><span className="manifest-indicator" />LOCKSTOCK / CREW MANIFEST<span>001</span></div>
          <div className="manifest-main"><span className="manifest-number">06</span><span className="manifest-caption">PEOPLE BEHIND<br />THE FIRST CONTACT</span></div>
          <div className="manifest-orbits" aria-hidden="true"><span /><span /><span /><i /><i /><i /><i /><i /><i /><svg viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="27" rx="18" ry="7" stroke="currentColor" strokeWidth="2" /><path d="M13 24c0-19 22-19 22 0M15 39l3-4m15 4-3-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
          <div className="manifest-footer"><span>FIRST RELEASE</span><strong>UFO CASH ↗</strong></div>
        </div>
      </div>
      <div className="container about-story">
        <div className="about-values">
          <article className="about-value"><span>01 / IDENTITY</span><h3>A world worth noticing.</h3><p>Memorable characters. A clear visual voice. A story that gives the game its own place in your lobby. We build around an identity that players can recognise and partners can introduce with confidence.</p></article>
          <article className="about-value"><span>02 / CRAFT</span><h3>Care in every detail.</h3><p>Art, code and production are parts of the same experience. Our ambition is to make them feel at home together, with thoughtful decisions that give each game its rhythm, atmosphere and character.</p></article>
          <article className="about-value"><span>03 / PARTNERSHIP</span><h3>Let’s build a connection.</h3><p>For operators and partners, the introduction starts with a playable game and a direct conversation with our team. Explore UFO CASH, share your plans and let’s discuss where our worlds could meet.</p></article>
        </div>
        <div className="about-invitation"><p>A small crew.<br /><strong>A different kind of first contact.</strong></p><a className="button button-navy" href="#operators">Meet your next game partner<span aria-hidden="true">↗</span></a></div>
      </div>
    </div>
    <div className="crew-section section-pad">
      <div className="container">
        <div className="crew-heading"><div><p className="eyebrow">THE HUMANS BEHIND THE SAUCER</p><h2 id="crew-title">Meet ground control.</h2></div><p>Different minds.<br />One shared orbit.</p></div>
        <div className="crew-grid" aria-labelledby="crew-title">
          {team.map(member => <article className="crew-card" key={member.id} style={{ '--crew-accent': member.accent }} aria-labelledby={`crew-${member.id}-name`}>
            <div className="crew-card-top"><span>LS / CREW {member.id}</span><span className="crew-card-star" aria-hidden="true">✦</span></div>
            <div className="crew-portrait"><CrewAvatar member={member} /><span className="crew-portrait-caption">LOCKSTOCK GAMES</span></div>
            <div className="crew-card-bottom"><div><h3 id={`crew-${member.id}-name`}>{member.name}</h3><p>{member.role}</p></div><span className="crew-id" aria-hidden="true">{member.id}</span></div>
          </article>)}
        </div>
        <div className="crew-signoff"><span aria-hidden="true">✳</span><p>Six humans. Plenty of ideas. <strong>Only one slightly confused cow.</strong></p><span className="crew-signoff-rule" /></div>
      </div>
    </div>
  </section>;
}

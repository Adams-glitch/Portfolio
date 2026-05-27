import React, { useEffect, useRef } from 'react';
import './Hero.css';

const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: '🔗' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: '✕' },
];

function Hero() {
  const orb1 = useRef(null);
  const orb2 = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (orb1.current) {
        orb1.current.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
      }
      if (orb2.current) {
        orb2.current.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__orb hero__orb--1" ref={orb1} aria-hidden="true" />
      <div className="hero__orb hero__orb--2" ref={orb2} aria-hidden="true" />

      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__greeting">
            <span className="hero__greeting-dot" aria-hidden="true" />
            Available for opportunities
          </div>

          <h1 className="hero__name">
            Adams<br />
            <span className="hero__name-accent">Rabiul</span>
          </h1>

          <p className="hero__role">
            Full-Stack Developer &amp; Creative Technologist
          </p>

          <p className="hero__bio">
            I build performant, elegant digital experiences — from clean backend
            APIs to pixel-perfect frontends. Passionate about open source,
            always learning, always shipping.
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary" onClick={scrollToAbout}>
              Explore my work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3L8 13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              href="/adams-rabiul-cv.pdf"
              className="btn btn--outline"
              download
              aria-label="Download résumé"
            >
              Download CV
            </a>
          </div>

          <div className="hero__socials">
            {SOCIAL.map(s => (
              <a
                key={s.label}
                href={s.href}
                className="hero__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <span aria-hidden="true">{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__avatar-ring">
            <div className="hero__avatar">
              <span>AR</span>
            </div>
            <div className="hero__ring hero__ring--1" />
            <div className="hero__ring hero__ring--2" />
          </div>

          <div className="hero__badge hero__badge--1">
            <span>⚡</span> 3+ Years exp.
          </div>
          <div className="hero__badge hero__badge--2">
            <span>🚀</span> 20+ Projects
          </div>
          <div className="hero__badge hero__badge--3">
            <span>🌍</span> Remote Ready
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" onClick={scrollToAbout} role="button" tabIndex={0} aria-label="Scroll down">
        <div className="hero__scroll-wheel" />
      </div>
    </section>
  );
}

export default Hero;
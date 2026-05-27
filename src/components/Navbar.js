import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner container">
        <a href="#top" className="navbar__logo" onClick={e => handleLink(e, 'body')}>
          <span className="navbar__logo-initials">AR</span>
          <span className="navbar__logo-name">Adams Rabiul</span>
        </a>

        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={e => handleLink(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:adams.rabiul@email.com"
          className="btn btn--primary navbar__cta"
        >
          Hire me
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={e => handleLink(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="mailto:adams.rabiul@email.com" className="btn btn--primary" style={{ marginTop: 8 }}>
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
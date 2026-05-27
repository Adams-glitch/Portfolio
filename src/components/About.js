import React from 'react';
import './About.css';

const STATS = [
  { value: '3+', label: 'Years of experience' },
  { value: '20+', label: 'Projects completed' },
  { value: '10+', label: 'Happy clients' },
  { value: '∞', label: 'Lines of code' },
];

function About() {
  return (
    <section className="about section" id="about" aria-label="About Adams Rabiul">
      <div className="container">
        <p className="section__label">About me</p>
        <div className="about__grid">
          <div className="about__text">
            <h2 className="about__heading">
              Turning ideas into <em>exceptional</em> digital products
            </h2>
            <p>
              Hi, I'm <strong>Adams Rabiul</strong> — a full-stack developer with
              a passion for crafting high-quality web applications. I love working
              at the intersection of design and engineering, where clean code
              meets beautiful user experiences.
            </p>
            <p>
              I've worked on a range of projects — from small startups to larger
              platforms — building scalable backend systems with Node.js and
              Django, and responsive frontends with React. I believe the best
              software is both technically sound and genuinely delightful to use.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing
              to open source, or writing about software development.
            </p>
            <div className="about__actions">
              <a
                href="mailto:adams.rabiul@email.com"
                className="btn btn--primary"
              >
                Say hello 👋
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
              >
                View GitHub
              </a>
            </div>
          </div>

          <div className="about__side">
            <div className="about__stats">
              {STATS.map(s => (
                <div className="about__stat card" key={s.label}>
                  <div className="about__stat-value">{s.value}</div>
                  <div className="about__stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="about__interests card">
              <h3>Interests</h3>
              <ul>
                <li>🛠 Open source contribution</li>
                <li>⚡ Web performance</li>
                <li>🤖 AI & machine learning</li>
                <li>📝 Technical writing</li>
                <li>🎮 Video games (yes, really)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
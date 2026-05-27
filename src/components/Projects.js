import React, { useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    title: 'SkyCast',
    desc: 'A real-time weather application with geolocation, 5-day forecasts, and beautiful data visualizations. Built with React and Open-Meteo API.',
    tags: ['React', 'API', 'CSS'],
    emoji: '🌤️',
    color: '#7c6af7',
    github: 'https://github.com/',
    live: 'https://example.com/',
    featured: true,
  },
  {
    id: 2,
    title: 'TaskFlow',
    desc: 'A collaborative project management tool with real-time updates, drag-and-drop boards, and GitHub integration. Scales to 1k+ concurrent users.',
    tags: ['Node.js', 'Socket.io', 'React', 'MongoDB'],
    emoji: '📋',
    color: '#f4c95d',
    github: 'https://github.com/',
    live: 'https://example.com/',
    featured: true,
  },
  {
    id: 3,
    title: 'DevBlog',
    desc: 'A markdown-powered blog engine with full-text search, syntax highlighting, and an RSS feed. Built with Next.js and statically generated.',
    tags: ['Next.js', 'MDX', 'Tailwind'],
    emoji: '✍️',
    color: '#4ade80',
    github: 'https://github.com/',
    live: 'https://example.com/',
    featured: false,
  },
  {
    id: 4,
    title: 'CryptoTracker',
    desc: 'Live cryptocurrency price tracker with portfolio management, price alerts, and historical charts. Integrates with CoinGecko API.',
    tags: ['React', 'Chart.js', 'API'],
    emoji: '📈',
    color: '#f87171',
    github: 'https://github.com/',
    live: 'https://example.com/',
    featured: false,
  },
  {
    id: 5,
    title: 'OpenRecipe',
    desc: 'Community-driven recipe platform with AI-powered ingredient substitutions and nutritional analysis. Django REST + React frontend.',
    tags: ['Django', 'Python', 'React', 'AI'],
    emoji: '🍳',
    color: '#fb923c',
    github: 'https://github.com/',
    live: 'https://example.com/',
    featured: false,
  },
  {
    id: 6,
    title: 'Argus',
    desc: 'Open-source uptime monitoring tool with webhook alerts, incident history, and a status page generator. Used by 200+ developers.',
    tags: ['Go', 'Docker', 'PostgreSQL'],
    emoji: '👁️',
    color: '#60a5fa',
    github: 'https://github.com/',
    live: 'https://example.com/',
    featured: false,
  },
];

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <section className="projects section" id="projects" aria-label="Projects">
      <div className="container">
        <p className="section__label">What I've built</p>
        <div className="projects__header">
          <h2 className="section__title">Selected Projects</h2>
        </div>

        <div className="projects__grid">
          {displayed.map(project => (
            <article
              key={project.id}
              className={`project-card card ${project.featured ? 'project-card--featured' : ''}`}
              style={{ '--project-color': project.color }}
            >
              <div className="project-card__emoji" aria-hidden="true">
                {project.emoji}
              </div>
              {project.featured && (
                <span className="project-card__badge">Featured</span>
              )}
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.desc}</p>
              <div className="project-card__tags">
                {project.tags.map(tag => (
                  <span key={tag} className="project-card__tag">{tag}</span>
                ))}
              </div>
              <div className="project-card__links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  aria-label={`${project.title} source code`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/>
                  </svg>
                  Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link project-card__link--live"
                  aria-label={`${project.title} live demo`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live demo
                </a>
              </div>
            </article>
          ))}
        </div>

        {PROJECTS.length > 4 && (
          <div className="projects__more">
            <button
              className="btn btn--outline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show less ↑' : `Show all ${PROJECTS.length} projects ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
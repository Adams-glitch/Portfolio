import React from 'react';
import './Skills.css';

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    emoji: '🎨',
    skills: ['React', 'Next.js', 'TypeScript', 'CSS / Sass', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    skills: ['Node.js', 'Express', 'Django', 'Python', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database',
    emoji: '🗄️',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Firebase', 'SQLite'],
  },
  {
    category: 'DevOps & Tools',
    emoji: '🛠',
    skills: ['Docker', 'Git', 'CI/CD', 'Linux', 'Vercel', 'AWS'],
  },
];

function Skills() {
  return (
    <section className="skills section" id="skills" aria-label="Skills">
      <div className="container">
        <p className="section__label">What I work with</p>
        <h2 className="section__title">Skills &amp; Technologies</h2>

        <div className="skills__grid">
          {SKILL_GROUPS.map(group => (
            <div className="skills__group card" key={group.category}>
              <div className="skills__group-header">
                <span className="skills__group-icon" aria-hidden="true">{group.emoji}</span>
                <h3 className="skills__group-title">{group.category}</h3>
              </div>
              <ul className="skills__list" role="list">
                {group.skills.map(skill => (
                  <li key={skill} className="skills__item">
                    <span className="skills__item-dot" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="skills__also">
          <h3>Also familiar with</h3>
          <div className="skills__also-tags">
            {['Vue.js', 'Svelte', 'Flutter', 'Rust', 'Java', 'C', 'Figma', 'Storybook', 'Jest', 'Playwright', 'Nginx', 'Kubernetes'].map(tag => (
              <span key={tag} className="skills__also-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
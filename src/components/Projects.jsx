import { useState } from 'react'
import { projects, tools } from '../data/portfolio'
import Reveal from './Reveal'

const s = {
  section: {
    padding: '80px 60px',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '48px',
  },
  label: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
  },
  h2: {
    fontFamily: 'var(--serif)',
    fontSize: '38px',
    fontWeight: 400,
    letterSpacing: '-0.5px',
    marginTop: '8px',
  },
  index: {
    fontFamily: 'var(--serif)',
    fontSize: '64px',
    color: 'rgba(255,255,255,0.04)',
    lineHeight: 1,
    userSelect: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1px',
    border: '1px solid var(--border)',
  },
  card: (hovered) => ({
    padding: '32px 28px',
    background: hovered ? 'rgba(200,137,42,0.05)' : 'var(--surface)',
    borderRight: '1px solid var(--border)',
    transition: 'background 0.25s',
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }),
  num: { fontSize: '11px', color: 'var(--amber)', letterSpacing: '2px' },
  title: {
    fontFamily: 'var(--serif)',
    fontSize: '22px',
    fontWeight: 400,
    lineHeight: 1.2,
  },
  desc: { fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, flex: 1 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' },
  tag: {
    fontSize: '10px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '3px 10px',
    border: '1px solid var(--amber-border)',
    color: 'var(--amber)',
    borderRadius: '2px',
  },
  arrowLink: {
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '2px',
    transition: 'all 0.2s',
    display: 'inline-block',
    marginTop: '12px',
  },
  toolsSection: { marginTop: '60px' },
  toolsLabel: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    marginBottom: '20px',
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '1px',
    border: '1px solid var(--border)',
  },
  toolItem: {
    padding: '24px 20px',
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    textAlign: 'center',
  },
  toolIcon: { fontSize: '22px', color: 'var(--amber)', marginBottom: '10px' },
  toolName: {
    fontSize: '12px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--muted2)',
  },
  toolCat: {
    fontSize: '10px',
    color: 'var(--muted)',
    marginTop: '4px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
}

export default function Projects() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="work" style={s.section}>
      <Reveal>
        <div style={s.header}>
          <div>
            <p style={s.label}>Selected Work</p>
            <h2 style={s.h2}>Projects</h2>
          </div>
          <div style={s.index}>02</div>
        </div>
      </Reveal>

      <div style={s.grid}>
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 100} style={{ display: 'contents' }}>
            <div
              style={s.card(hovered === project.id)}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <p style={s.num}>{project.num}</p>
              <h3 style={s.title}>{project.title}</h3>
              <p style={s.desc}>{project.description}</p>
              <div style={s.tags}>
                {project.tags.map(tag => (
                  <span key={tag} style={s.tag}>{tag}</span>
                ))}
              </div>
              <div>
                <a
                  href={project.github}
                  style={s.arrowLink}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--amber)'
                    e.currentTarget.style.borderColor = 'var(--amber)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  View on GitHub ↗
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100}>
        <div style={s.toolsSection}>
          <p style={s.toolsLabel}>Toolbox</p>
          <div style={s.toolsGrid}>
            {tools.map((tool, i) => (
              <div
                key={tool.name}
                style={{
                  ...s.toolItem,
                  ...(i === tools.length - 1 ? { borderRight: 'none' } : {}),
                }}
              >
                <div style={s.toolIcon}>
                  <i className={`ti ${tool.icon}`} aria-hidden="true" />
                </div>
                <p style={s.toolName}>{tool.name}</p>
                <p style={s.toolCat}>{tool.category}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

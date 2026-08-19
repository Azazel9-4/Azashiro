import { useState } from 'react'
import { projects, tools } from '../data/portfolio'
import Reveal from './Reveal'
import useMediaQuery from '../hooks/useMediaQuery'

const s = {
  section: (isMobile) => ({
    padding: isMobile ? '60px 24px' : '80px 60px',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    zIndex: 1,
  }),
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '48px',
  },
  label: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    marginBottom: '8px',
  },
  index: {
    fontFamily: 'var(--serif)',
    fontSize: '64px',
    color: 'rgba(255,255,255,0.04)',
    lineHeight: 1,
    userSelect: 'none',
  },
  h2: (isMobile) => ({
    fontFamily: 'var(--serif)',
    fontSize: isMobile ? '28px' : '38px',
    fontWeight: 400,
    letterSpacing: '-0.5px',
    marginTop: '16px',
  }),
  grid: (cols) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: '16px',
    alignItems: 'stretch',
  }),
  card: (hovered) => ({
    borderRadius: '12px',
    background: 'var(--surface)',
    border: `1px solid ${hovered ? 'var(--amber-border)' : 'var(--border)'}`,
    boxShadow: hovered ? '0 12px 40px rgba(200,137,42,0.12)' : 'none',
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    transition: 'all 0.3s ease',
    cursor: 'default',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
  topBar: (hovered) => ({
    height: hovered ? '4px' : '3px',
    width: '100%',
    background: 'linear-gradient(90deg, var(--amber), rgba(200,137,42,0.3))',
    transition: 'height 0.3s',
  }),
  cardBody: { padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 },
  num: { fontSize: '11px', color: 'var(--amber)', letterSpacing: '2px' },
  title: {
    fontFamily: 'var(--serif)',
    fontSize: '22px',
    fontWeight: 400,
    lineHeight: 1.2,
  },
  desc: {
    fontSize: '13px',
    color: 'var(--muted)',
    lineHeight: 1.75,
    maxHeight: '95px',
    overflowY: 'auto',
    paddingRight: '4px',
  },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' },
  tag: {
    fontSize: '10px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '3px 10px',
    border: '1px solid var(--amber-border)',
    color: 'var(--amber)',
    borderRadius: '20px',
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
  toolsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    width: '100%',
  },
  toolItemWrapper: {
    flex: '1 1 200px',
    minWidth: '140px',
  },
  toolItem: (isMobile) => ({
    height: '100%',
    padding: isMobile ? '16px 12px' : '24px 20px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    textAlign: 'center',
    transition: 'all 0.25s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  }),
  toolIcon: (isMobile) => ({
    fontSize: isMobile ? '20px' : '22px',
    color: 'var(--amber)',
    marginBottom: isMobile ? '6px' : '10px',
  }),
  toolName: (isMobile) => ({
    fontSize: isMobile ? '11px' : '12px',
    letterSpacing: isMobile ? '0.5px' : '1.5px',
    textTransform: 'uppercase',
    color: 'var(--muted2)',
    fontWeight: 500,
    lineHeight: 1.2,
    wordBreak: 'break-word',
  }),
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
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const projectCols = isMobile ? 1 : isTablet ? 2 : 3

  return (
    <section id="work" style={s.section(isMobile)} className="projects">
      <Reveal>
        <div style={s.header}>
          {/* Left Block: Selected Work stacked directly above 02 */}
          <div>
            <p style={s.label}>Selected Work</p>
            <div style={s.index}>02</div>
            <h2 style={s.h2(isMobile)}>Top Projects</h2>
          </div>
        </div>
      </Reveal>

      <div style={s.grid(projectCols)} className="proj-grid">
        {projects.map((project, i) => {
          const isOrphan =
            projectCols > 1 &&
            i === projects.length - 1 &&
            projects.length % projectCols === 1

          return (
            <Reveal
              key={project.id}
              delay={i * 100}
              style={isOrphan ? { gridColumn: '1 / -1' } : {}}
            >
              <div
                style={s.card(hovered === project.id)}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={s.topBar(hovered === project.id)} />
                <div style={s.cardBody}>
                  <p style={s.num}>{project.num}</p>
                  <h3 style={s.title}>{project.title}</h3>
                  <p style={s.desc} className="proj-desc">{project.description}</p>
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
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={100}>
        <div style={s.toolsSection}>
          <p style={s.toolsLabel}>Toolbox</p>
          <div style={s.toolsContainer}>
            {tools.map(tool => (
              <div key={tool.name} style={s.toolItemWrapper}>
                <div
                  style={s.toolItem(isMobile)}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--amber-border)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={s.toolIcon(isMobile)}>
                    <i className={`ti ${tool.icon}`} aria-hidden="true" />
                  </div>
                  <p style={s.toolName(isMobile)}>{tool.name}</p>
                  <p style={s.toolCat}>{tool.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
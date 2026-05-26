import { skills } from '../data/portfolio'
import Reveal from './Reveal'

const s = {
  section: {
    padding: '80px 60px',
    display: 'grid',
    gridTemplateColumns: '0.3fr 1fr 1.5fr',
    gap: '100px',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    marginBottom: '16px',
  },
  index: {
    fontFamily: 'var(--serif)',
    fontSize: '64px',
    color: 'rgba(255,255,255,0.04)',
    lineHeight: 1,
    userSelect: 'none',
  },
  h2: {
    fontFamily: 'var(--serif)',
    fontSize: '38px',
    fontWeight: 400,
    lineHeight: 1.15,
    marginBottom: '24px',
    letterSpacing: '-0.5px',
  },
  p: {
    fontSize: '15px',
    color: 'var(--muted)',
    lineHeight: 1.9,
    maxWidth: '520px',
    marginBottom: '8px',
  },
  highlight: { color: 'var(--text)' },
  divider: {
    width: '32px',
    height: '1px',
    background: 'var(--amber-border)',
    margin: '20px 0',
  },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  tag: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    padding: '6px 14px',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    transition: 'all 0.2s',
    cursor: 'default',
  },
  imgWrap: {
    width: '100%',
    aspectRatio: '4/4',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid var(--border)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    filter: 'grayscale(20%)',
  },
}

export default function About() {
  return (
    <section id="about" style={s.section}>
      <Reveal>
        <div>
          <p style={s.label}>About</p>
          <div style={s.index}>01</div>
        </div>
      </Reveal>
      <Reveal delay={50}>
        <div style={s.imgWrap}>
          <img src="/me.png" alt="Rommel Glenn Austria" style={s.img} />
        </div>
      </Reveal>
      <div>
        <Reveal delay={100}>
          <h2 style={s.h2}>Developer with a designer's eye.</h2>
        </Reveal>
        <Reveal delay={200}>
          <p style={s.p}>
            I'm <span style={s.highlight}>Rommel Glenn Austria</span>, a fresh{' '}
            <span style={s.highlight}>BS Computer Science</span> graduate
            from <span style={s.highlight}>PhilCST</span>. I've built across different domains — mobile apps, 
            algorithm visualizers, web apps, and branding projects. I also have a background in graphic design, 
            which means I think about how things look, not just how they work.
          </p>
          <p style={{ ...s.p, marginTop: '16px' }}>
          I'm not deep in every area yet, but I pick things up fast 
          and I'm genuinely curious about how things work under the hood. 
          I care about writing clean, purposeful code — and I'm looking to 
          grow in an environment where I can keep doing that.
          </p>
          <div style={s.divider} />
        </Reveal>
        <Reveal delay={300}>
          <div style={s.grid}>
            {skills.map(skill => (
              <span
                key={skill}
                style={s.tag}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--amber-border)'
                  e.currentTarget.style.color = 'var(--amber)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--muted)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

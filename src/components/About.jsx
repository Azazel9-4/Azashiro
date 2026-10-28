import { useState } from 'react'
import Reveal from './Reveal'
import useMediaQuery from '../hooks/useMediaQuery'

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    skills: ['Python', 'PHP', 'React', 'Flutter'],
  },
  {
    title: 'Design Tools',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'SketchUp'],
  },
  {
    title: 'Version Control',
    skills: ['Git', 'GitHub'],
  },
  {
    title: 'Databases & Backend',
    skills: ['MySQL', 'SQLite', 'Supabase', 'Firebase'],
  },
]

const s = {
  section: (stacked, isMobile) => ({
    padding: isMobile ? '60px 24px' : stacked ? '70px 40px' : '80px 60px',
    display: 'grid',
    gridTemplateColumns: stacked
      ? '1fr'
      : 'minmax(0, 0.25fr) minmax(0, 1.1fr) minmax(0, 0.85fr)',
    gap: isMobile ? '36px' : stacked ? '48px' : '64px',
    justifyContent: 'start',
    alignItems: 'start',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    zIndex: 1,
  }),
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
    color: 'rgba(168, 85, 247)',
    lineHeight: 1,
    userSelect: 'none',
  },
  h2: (isMobile) => ({
    fontFamily: 'var(--serif)',
    fontSize: isMobile ? '30px' : '38px',
    fontWeight: 400,
    lineHeight: 1.15,
    marginBottom: '24px',
    letterSpacing: '-0.5px',
  }),
  p: {
    fontSize: '15px',
    color: 'var(--muted)',
    lineHeight: 1.9,
    maxWidth: '520px',
    marginBottom: '8px',
  },
  highlight: { color: 'var(--text)' },

  divider: (isMobile) => ({
    width: isMobile ? '80px' : '140px',
    height: '1px',
    background: 'var(--amber-border)',
    margin: isMobile ? '20px 0 28px 0' : '28px 0 32px 0',
  }),

  cardGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    marginTop: '12px',
  },
  accentCard: {
    borderLeft: '2px solid var(--amber)',
    paddingLeft: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  cardTitle: {
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    fontWeight: 600,
  },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  tag: {
    fontSize: '11px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    padding: '5px 12px',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    transition: 'all 0.2s',
    cursor: 'default',
  },

  /* Right Side Portrait & CV Card */
  portraitCard: (stacked) => ({
    position: 'relative',
    width: '100%',
    maxWidth: stacked ? '320px' : '420px',
    margin: '0 auto' ,
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    background: 'rgba(255, 255, 255, 0.02)',
    boxShadow: '0 24px 50px -15px rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
  }),
  imageWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4 / 4.8',
    overflow: 'hidden',
  },
  portraitImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    filter: 'grayscale(35%) contrast(1.05)',
    transition: 'filter 0.4s ease, transform 0.4s ease',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(to top, rgba(10, 10, 14, 0.95) 0%, rgba(10, 10, 14, 0.2) 60%, transparent 100%)',
  },
  portraitFooter: {
    padding: '20px',
    background: '#0c0c10',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  cvButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 18px',
    borderRadius: '8px',
    background: 'rgba(168, 85, 247, 0.12)',
    border: '1px solid rgba(168, 85, 247, 0.4)',
    color: '#e9d5ff',
    textDecoration: 'none',
    fontSize: '12px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    fontWeight: 600,
    transition: 'all 0.25s ease',
  },
}

export default function About() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const stacked = useMediaQuery('(max-width: 1024px)')
  const [btnHover, setBtnHover] = useState(false)

  return (
    <section id="about" style={s.section(stacked, isMobile)} className="about">
      {/* 01 Index */}
      <Reveal>
        <div>
          <p style={s.label}>About</p>
          <div style={s.index}>01</div>
        </div>
      </Reveal>

      {/* Bio & Skills */}
      <div>
        <Reveal delay={100}>
          <h2 style={s.h2(isMobile)}>Developer with a designer eye.</h2>
        </Reveal>
        <Reveal delay={200}>
          <p style={s.p}>
            I am <span style={s.highlight}>Rommel Glenn Austria</span>, a fresh{' '}
            <span style={s.highlight}>BS Computer Science</span> graduate
            from <span style={s.highlight}>PhilCST</span>. I have built across different domains — mobile apps,
            algorithm visualizers, web apps, and branding projects. I also have a background in graphic design,
            which means I think about how things look, not just how they work.
          </p>
          <p style={{ ...s.p, marginTop: '16px' }}>
            I am not deep in every area yet, but I pick things up fast
            and I am genuinely curious about how things work under the hood.
            I care about writing clean, purposeful code — and I am looking to
            grow in an environment where I can keep doing that.
          </p>

          <div style={s.divider(isMobile)} />
        </Reveal>

        <Reveal delay={300}>
          <div style={s.cardGroup}>
            {skillCategories.map((cat) => (
              <div key={cat.title} style={s.accentCard}>
                <span style={s.cardTitle}>{cat.title}</span>
                <div style={s.grid}>
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      style={s.tag}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--amber-border)'
                        e.currentTarget.style.color = 'var(--amber)'
                        e.currentTarget.style.background = 'var(--amber-dim)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.color = 'var(--muted)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Right Column: Clean Editorial Portrait + Resume Action */}
      <Reveal delay={250}>
        <div style={s.portraitCard(stacked)}>
          <div style={s.imageWrap}>
            <img
              src="Resume-preview.png" // Place your portrait photo here
              alt="Rommel Glenn Austria"
              style={s.portraitImg}
            />
            <div style={s.imageOverlay} />
          </div>

          <div style={s.portraitFooter}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}>
                Rommel Glenn Austria
              </span>
              <span style={{ fontSize: '10px', color: 'var(--amber)', textTransform: 'uppercase' }}>
                Open to Work
              </span>
            </div>

            <a
              href="/Resume-Glenn.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...s.cvButton,
                background: btnHover ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.12)',
                borderColor: btnHover ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.4)',
                transform: btnHover ? 'translateY(-2px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              <span>View Full Résumé</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
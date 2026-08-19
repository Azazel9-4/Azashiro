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
    gridTemplateColumns: stacked ? '1fr' : 'minmax(0, 0.3fr) minmax(0, 1fr) minmax(0, 1.5fr)',
    gap: isMobile ? '32px' : stacked ? '48px' : '100px',
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
    color: 'rgba(255,255,255,0.04)',
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
  
  /* RESPONSIVE DIVIDER */
  divider: (isMobile) => ({
    width: isMobile ? '80px' : '140px',
    height: '1px',
    background: 'var(--amber-border)',
    margin: isMobile ? '20px 0 28px 0' : '28px 0 32px 0',
  }),

  /* OPTION 3 STYLES */
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

  imgWrap: (stacked) => ({
    width: '100%',
    maxWidth: stacked ? '280px' : 'none',
    aspectRatio: '4/4',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid var(--border)',
    position: 'relative',
    transition: 'box-shadow 0.3s, border-color 0.3s',
  }),
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    filter: 'grayscale(20%)',
  },
}

export default function About() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const stacked = useMediaQuery('(max-width: 1024px)')

  return (
    <section id="about" style={s.section(stacked, isMobile)} className="about">
      <Reveal>
        <div>
          <p style={s.label}>About</p>
          <div style={s.index}>01</div>
        </div>
      </Reveal>
      <Reveal delay={50}>
        <div
          style={s.imgWrap(stacked)}
          className="about-img"
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(200,137,42,0.25)'
            e.currentTarget.style.borderColor = 'var(--amber-border)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <img src="/me.png" alt="Rommel Glenn Austria" style={s.img} />
        </div>
      </Reveal>
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
          
          {/* RESPONSIVE DIVIDER CALL */}
          <div style={s.divider(isMobile)} />
        </Reveal>

        {/* SKILLS CARDS */}
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
    </section>
  )
}
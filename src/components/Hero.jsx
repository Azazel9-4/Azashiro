import Reveal from './Reveal'
import useMediaQuery from '../hooks/useMediaQuery'

const s = {
  section: (isMobile) => ({
    padding: isMobile ? '90px 24px 60px' : '110px 60px 100px',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)',
    gap: isMobile ? '36px' : '40px',
    alignItems: isMobile ? 'start' : 'end',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  }),
  orb1: {
    position: 'absolute',
    top: '-80px',
    left: '-100px',
    width: '360px',
    height: '360px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,137,42,0.16), transparent 70%)',
    filter: 'blur(10px)',
    animation: 'floatOrb 8s ease-in-out infinite',
    pointerEvents: 'none',
    zIndex: -1,
  },
  orb2: {
    position: 'absolute',
    bottom: '-100px',
    right: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,137,42,0.1), transparent 70%)',
    filter: 'blur(10px)',
    animation: 'floatOrb 9s ease-in-out infinite 1s',
    pointerEvents: 'none',
    zIndex: -1,
  },
  available: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    background: 'var(--amber-dim)',
    border: '1px solid var(--amber-border)',
    padding: '5px 14px',
    borderRadius: '2px',
    marginBottom: '36px',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--amber)',
    animation: 'pulse 2s infinite',
    display: 'inline-block',
  },
  h1: {
    fontFamily: 'var(--serif)',
    fontSize: 'clamp(40px, 9vw, 80px)',
    fontWeight: 400,
    lineHeight: 1.0,
    letterSpacing: '-1px',
    marginBottom: '12px',
  },
  accent: {
    color: 'var(--amber)',
    fontStyle: 'italic',
    textShadow: '0 0 40px rgba(200,137,42,0.45)',
  },
  sub: {
    fontSize: '15px',
    color: 'var(--muted)',
    maxWidth: '380px',
    lineHeight: 1.85,
    marginTop: '20px',
  },
  right: (isMobile) => ({
    textAlign: isMobile ? 'left' : 'right',
    paddingBottom: isMobile ? 0 : '8px',
  }),
  role: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    marginBottom: '32px',
  },
  btns: (isMobile) => ({
    display: 'flex',
    gap: '10px',
    justifyContent: isMobile ? 'flex-start' : 'flex-end',
    flexWrap: 'wrap',
  }),
  btnPrimary: {
    padding: '13px 28px',
    background: 'var(--amber)',
    color: '#0a0906',
    borderRadius: '2px',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'all 0.2s',
  },
  btnGhost: {
    padding: '13px 28px',
    border: '1px solid var(--border)',
    color: 'var(--muted2)',
    borderRadius: '2px',
    fontSize: '13px',
    transition: 'all 0.2s',
  },
}

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <section style={s.section(isMobile)} className="hero">
      <div style={s.orb1} />
      <div style={s.orb2} />
      <Reveal direction="up" delay={0}>
        <div>
          <div style={s.available}>
            <span style={s.dot} />
            Available for work
          </div>
          <h1 style={s.h1}>
            Building apps<br />
            that <em style={s.accent}>matter.</em>
          </h1>
          <p style={s.sub}>
            CS Graduate with a passion for creating impactful digital experiences.
          </p>
        </div>
      </Reveal>
      <Reveal direction="up" delay={150}>
        <div style={s.right(isMobile)} className="hero-right">
          <p style={s.role}>Python · PHP · Flutter · React</p>
          <div style={s.btns(isMobile)} className="hero-btns">
            <a
              href="#work"
              style={s.btnPrimary}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.04)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,137,42,0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              View Work
            </a>
            <a
              href="#contact"
              style={s.btnGhost}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--amber-border)'
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--muted2)'
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
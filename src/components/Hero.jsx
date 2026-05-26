import Reveal from './Reveal'

const s = {
  section: {
    padding: '110px 60px 100px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'end',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    zIndex: 1,
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
    fontSize: 'clamp(52px, 6vw, 80px)',
    fontWeight: 400,
    lineHeight: 1.0,
    letterSpacing: '-1px',
    marginBottom: '12px',
  },
  accent: { color: 'var(--amber)', fontStyle: 'italic' },
  sub: {
    fontSize: '15px',
    color: 'var(--muted)',
    maxWidth: '380px',
    lineHeight: 1.85,
    marginTop: '20px',
  },
  right: { textAlign: 'right', paddingBottom: '8px' },
  name: {
    fontFamily: 'var(--serif)',
    fontSize: '13px',
    color: 'var(--muted)',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  role: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    marginBottom: '32px',
  },
  btns: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  btnPrimary: {
    padding: '13px 28px',
    background: 'var(--amber)',
    color: '#0a0906',
    borderRadius: '2px',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'opacity 0.2s',
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
  return (
    <section style={s.section}>
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
        <div style={s.right}>
          {/*<p style={s.name}>Azashiro</p>*/}
          <p style={s.role}>Python · PHP · Flutter · React</p>
          <div style={s.btns}>
            <a
              href="#work"
              style={s.btnPrimary}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              View Work
            </a>
            <a
              href="#contact"
              style={s.btnGhost}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
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

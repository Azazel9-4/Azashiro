import { useState, useEffect } from 'react'
import Reveal from './Reveal'
import useMediaQuery from '../hooks/useMediaQuery'

const s = {
  section: (isMobile) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: isMobile ? '100px 24px 80px' : '0 60px',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  }),
  contentRow: (isMobile) => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    gap: isMobile ? '40px' : '72px',
    zIndex: 2,
  }),
  h1: {
    fontFamily: 'var(--serif)',
    fontSize: 'clamp(42px, 8.5vw, 84px)',
    fontWeight: 400,
    lineHeight: 1.05,
    letterSpacing: '-1px',
    marginBottom: '16px',
  },
  accent: {
    color: '#c084fc',
    fontStyle: 'italic',
    textShadow: '0 0 40px rgba(174, 42, 200, 0.4)',
  },
  sub: {
    fontSize: '15px',
    color: 'var(--muted)',
    maxWidth: '460px',
    lineHeight: 1.85,
    marginTop: '16px',
  },

  // ───────── CMD TERMINAL WINDOW ─────────
  terminal: (isMobile) => ({
    width: '100%',
    maxWidth: isMobile ? '100%' : '680px',
    background: 'rgba(8, 5, 14, 0.85)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    border: '1px solid rgba(168, 85, 247, 0.28)',
    borderRadius: isMobile ? '16px' : '20px',
    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(168, 85, 247, 0.22)',
    overflow: 'hidden',
    fontFamily: '"Fira Code", "Courier New", monospace',
  }),
  termBar: (isMobile) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '12px 18px' : '16px 24px',
    background: 'rgba(15, 10, 26, 0.95)',
    borderBottom: '1px solid rgba(168, 85, 247, 0.16)',
  }),
  termDots: {
    display: 'flex',
    gap: '8px',
  },
  dot: (color, isMobile) => ({
    width: isMobile ? '10px' : '13px',
    height: isMobile ? '10px' : '13px',
    borderRadius: '50%',
    backgroundColor: color,
    opacity: 0.85,
  }),
  termTitle: (isMobile) => ({
    fontSize: isMobile ? '11px' : '13px',
    letterSpacing: '1px',
    color: 'rgba(192, 132, 252, 0.65)',
    textTransform: 'lowercase',
  }),
  termBody: (isMobile) => ({
    padding: isMobile ? '24px' : '36px 36px 40px',
    fontSize: isMobile ? '13.5px' : '16.5px',
    lineHeight: 1.75,
    color: '#e2d9f3',
  }),
  promptUser: {
    color: '#c084fc',
    fontWeight: 600,
  },
  promptPath: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  termOutput: (isMobile) => ({
    margin: isMobile ? '14px 0 20px' : '18px 0 26px',
    padding: isMobile ? '14px 16px' : '20px 24px',
    background: 'rgba(147, 51, 234, 0.05)',
    borderLeft: '2px solid rgba(168, 85, 247, 0.4)',
    borderRadius: '0 12px 12px 0',
  }),
  termBtn: (isMobile) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '10px',
    padding: isMobile ? '10px 18px' : '14px 26px',
    fontSize: isMobile ? '12.5px' : '15px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    color: '#ffffff',
    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(109, 40, 217, 0.9))',
    border: '1px solid rgba(192, 132, 252, 0.4)',
    borderRadius: '10px',
    textDecoration: 'none',
    boxShadow: '0 0 20px rgba(147, 51, 234, 0.35)',
    transition: 'all 0.2s ease',
  }),

  // ───────── AURA ─────────
  aura: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '300px',
    pointerEvents: 'none',
    zIndex: 5,
    willChange: 'opacity, transform',
  },
  auraBloom: {
    position: 'absolute',
    left: '50%',
    bottom: '-140px',
    width: '150%',
    height: '340px',
    transform: 'translateX(-50%)',
    background:
      'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(168, 85, 247, 0.55) 0%, rgba(124, 58, 237, 0.26) 38%, transparent 72%)',
    filter: 'blur(26px)',
    animation: 'heroBreathe 7s ease-in-out infinite',
  },
  auraCore: {
    position: 'absolute',
    left: '50%',
    bottom: '-60px',
    width: '46%',
    height: '200px',
    transform: 'translateX(-50%)',
    background:
      'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(125, 211, 252, 0.28) 0%, rgba(125, 211, 252, 0.08) 45%, transparent 75%)',
    filter: 'blur(18px)',
    animation: 'heroBreathe 7s ease-in-out infinite 1.4s',
  },
  auraRays: {
    position: 'absolute',
    inset: 0,
    background:
      'repeating-conic-gradient(from -55deg at 50% 100%, transparent 0deg, rgba(192, 132, 252, 0.09) 3deg, transparent 7deg, transparent 11deg)',
    WebkitMaskImage: 'radial-gradient(ellipse 60% 100% at 50% 100%, #000 0%, transparent 72%)',
    maskImage: 'radial-gradient(ellipse 60% 100% at 50% 100%, #000 0%, transparent 72%)',
    animation: 'heroRays 9s ease-in-out infinite',
  },
  auraLine: {
    position: 'absolute',
    left: '6%',
    right: '6%',
    bottom: '96px',
    height: '1px',
    background:
      'linear-gradient(90deg, transparent 0%, rgba(192, 132, 252, 0.55) 22%, rgba(186, 230, 253, 0.9) 50%, rgba(192, 132, 252, 0.55) 78%, transparent 100%)',
    boxShadow: '0 0 18px 1px rgba(168, 85, 247, 0.45)',
    overflow: 'hidden',
  },
  auraGlint: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '140px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
    animation: 'heroGlint 7s cubic-bezier(0.65, 0, 0.35, 1) infinite',
  },
  auraMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '120px',
    background: 'linear-gradient(to bottom, transparent 0%, rgba(8, 7, 11, 0.85) 50%, #08070b 100%)',
  },

  // ───────── SCROLL CUE ─────────
  scrollCue: {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    zIndex: 6,
    userSelect: 'none',
    willChange: 'opacity, transform',
    transition: 'transform 0.2s ease',
  },
}

const keyframes = `
@keyframes heroBreathe {
  0%, 100% { opacity: 0.75; transform: translateX(-50%) scale(1); }
  50%      { opacity: 1;    transform: translateX(-50%) scale(1.06); }
}
@keyframes heroRays {
  0%, 100% { opacity: 0.35; }
  50%      { opacity: 0.8; }
}
@keyframes heroGlint {
  0%   { transform: translateX(-160px); opacity: 0; }
  12%  { opacity: 1; }
  60%  { opacity: 1; }
  100% { transform: translateX(110vw); opacity: 0; }
}

@keyframes cursorBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.term-cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  background-color: #c084fc;
  vertical-align: middle;
  margin-left: 4px;
  animation: cursorBlink 1.1s infinite;
}

@keyframes chevronPulse {
  0%, 100% {
    opacity: 0.3;
    filter: drop-shadow(0 0 2px rgba(192, 132, 252, 0.2));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 8px rgba(192, 132, 252, 0.9));
  }
}

.chevron-row-1 {
  animation: chevronPulse 2s ease-in-out infinite;
  animation-delay: 0s;
}
.chevron-row-2 {
  animation: chevronPulse 2s ease-in-out infinite;
  animation-delay: 0.33s;
}
.chevron-row-3 {
  animation: chevronPulse 2s ease-in-out infinite;
  animation-delay: 0.66s;
}

.hero-cue:hover {
  transform: translateX(-50%) translateY(3px) !important;
}

.hero-cue:focus-visible {
  outline: 1px solid rgba(192, 132, 252, 0.8);
  outline-offset: 4px;
  border-radius: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .hero-aura *, .hero-cue *, .term-cursor { animation: none !important; }
}
`

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [fadeOpacity, setFadeOpacity] = useState(1)

  // ───────── STATUS TOGGLE ─────────
  // Set to `null` when available for work:
  const [currentWork] = useState(null)

  // OR if you're building something, uncomment:
  /*
  const [currentWork] = useState({
    name: 'Tree-Eyes v2',
    scope: 'AI Inference & Real-time Web Engine',
    desc: 'Refactoring telemetry pipelines and boosting inference latency by 40%.',
    link: '#projects'
  })
  */

  const isAvailable = !currentWork

  useEffect(() => {
    const handleScroll = () => {
      const fadeDistance = 180
      setFadeOpacity(Math.max(0, 1 - window.scrollY / fadeDistance))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section id="home" style={s.section(isMobile)} className="hero">
      <style>{keyframes}</style>

      {/* Balanced 2-Column Container */}
      <div style={s.contentRow(isMobile)}>
        
        {/* Left Column: Heading */}
        <Reveal direction="up" delay={0}>
          <div style={{ maxWidth: isMobile ? '100%' : '600px' }}>
            <h1 style={s.h1}>
              Building apps<br />
              that <em style={s.accent}>matter.</em>
            </h1>
            <p style={s.sub}>
              CS Graduate with a passion for creating impactful digital experiences.
            </p>
          </div>
        </Reveal>

        {/* Right Column: CMD Terminal Window */}
        <Reveal direction="up" delay={isMobile ? 0.1 : 0.2}>
          <div style={s.terminal(isMobile)}>
            
            {/* Terminal Title Bar */}
            <div style={s.termBar(isMobile)}>
              <div style={s.termDots}>
                <div style={s.dot('#ff5f56', isMobile)} />
                <div style={s.dot('#ffbd2e', isMobile)} />
                <div style={s.dot('#27c93f', isMobile)} />
              </div>
              <span style={s.termTitle(isMobile)}>azashiro@portfolio: ~/status.sh</span>
              <span style={{ fontSize: isMobile ? '10px' : '12px', color: 'rgba(255,255,255,0.25)' }}>cmd.exe</span>
            </div>

            {/* Terminal Shell Body */}
            <div style={s.termBody(isMobile)}>
              {/* Command line 1 */}
              <div>
                <span style={s.promptUser}>developer</span>
                <span style={s.promptPath}>:~$</span> ./check-status --live
              </div>

              {/* Status Output Box */}
              <div style={s.termOutput(isMobile)}>
                {isAvailable ? (
                  <>
                    <div style={{ color: '#34d399', fontWeight: 600, marginBottom: '10px', fontSize: isMobile ? '13.5px' : '16.5px' }}>
                      [STATUS] ● CURRENTLY_EMPLOYED {/* CHANGE --> AVAILABLE_FOR_HIRE*/}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? '12.5px' : '15px' }}>
                      <div>├─ role : Data Solutions Engineer</div> {/* CHANGE --> target_roles: Software Developer*/}
                      <div>├─ location     : Philippines (GMT+8)</div> {/* CHANGE --> AVAILABLE_FOR_HIRE*/}
                      <div>├─ since    : October 2026 </div> {/* CHANGE --> readiness: Immediate (Full-Time / Contract)*/}
                      <div>└─ inbox        : Open to good and casual conversations</div> {/* CHANGE --> focus: High-performance, impactful apps*/}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ color: '#c084fc', fontWeight: 600, marginBottom: '10px', fontSize: isMobile ? '13.5px' : '16.5px' }}>
                      [STATUS] ● ACTIVE_DEVELOPMENT
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? '12.5px' : '15px' }}>
                      <div>├─ project : {currentWork.name}</div>
                      <div>├─ scope   : {currentWork.scope}</div>
                      <div>└─ note    : {currentWork.desc}</div>
                    </div>
                  </>
                )}
              </div>

              {/* Command line 2 */}
              <div style={{ marginTop: '16px' }}>
                <span style={s.promptUser}>developer</span>
                <span style={s.promptPath}>:~$</span> {isAvailable ? './contact.sh' : './inspect-project.sh'}
                <span className="term-cursor" />
              </div>

              {/* Action Button styled as a CLI Executable */}
              <div style={{ marginTop: '14px' }}>
                <a
                  href={isAvailable ? '#contact' : (currentWork.link || '#work')}
                  style={s.termBtn(isMobile)}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <span>{isAvailable ? '$ execute ./reach-out ↵' : '$ execute ./view-project ↗'}</span>
                </a>
              </div>
            </div>

          </div>
        </Reveal>

      </div>

      {/* Horizon aura */}
      <div
        className="hero-aura"
        aria-hidden="true"
        style={{
          ...s.aura,
          opacity: fadeOpacity,
          transform: `translateY(${(1 - fadeOpacity) * 40}px)`,
        }}
      >
        <div style={s.auraBloom} />
        <div style={s.auraCore} />
        <div style={s.auraRays} />
        <div style={s.auraLine}>
          <div style={s.auraGlint} />
        </div>
        <div style={s.auraMask} />
      </div>

      {/* Scroll cue: Stacked nested chevrons */}
      <button
        type="button"
        className="hero-cue"
        aria-label="Scroll to the next section"
        onClick={goNext}
        tabIndex={fadeOpacity === 0 ? -1 : 0}
        style={{
          ...s.scrollCue,
          opacity: fadeOpacity,
          transform: `translateX(-50%) translateY(${(1 - fadeOpacity) * 16}px)`,
          pointerEvents: fadeOpacity === 0 ? 'none' : 'auto',
        }}
      >
        <svg
          width="34"
          height="56"
          viewBox="0 0 60 104"
          fill="none"
          stroke="#c084fc"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <g className="chevron-row-1">
            <path d="M 16 11 L 30 20 L 44 11" />
            <path d="M 6 6 V 16 L 30 30 L 54 16 V 6" />
          </g>
          <g className="chevron-row-2">
            <path d="M 16 45 L 30 54 L 44 45" />
            <path d="M 6 40 V 50 L 30 64 L 54 50 V 40" />
          </g>
          <g className="chevron-row-3">
            <path d="M 16 79 L 30 88 L 44 79" />
            <path d="M 6 74 V 84 L 30 98 L 54 84 V 74" />
          </g>
        </svg>
      </button>
    </section>
  )
}
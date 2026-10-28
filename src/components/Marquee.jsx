import { marqueeItems } from '../data/portfolio'
import useMediaQuery from '../hooks/useMediaQuery'

// Multiply 4x so content easily covers ultra-wide screen widths
const quadrupled = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

const s = {
  wrap: {
    padding: '20px 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    width: '100%',
    // Creates seamless fade-out at both left and right edges:
    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
  },
  track: (duration) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    paddingRight: '12px',
    flexShrink: 0,
    animation: `marquee ${duration}s linear infinite`,
  }),
  pill: (isMobile) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: isMobile ? '5px 12px' : '6px 16px',
    borderRadius: '999px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: isMobile ? '10px' : '11px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    transition: 'all 0.25s ease',
    cursor: 'default',
  }),
  dot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#a855f7', // purple accent dot
    display: 'inline-block',
  },
}

export default function Marquee() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const duration = isMobile ? 22 : 32

  const renderTrackItems = (prefix) =>
    quadrupled.map((item, i) => (
      <span
        key={`${prefix}-${i}`}
        style={s.pill(isMobile)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
          e.currentTarget.style.color = '#ffffff'
          e.currentTarget.style.background = 'rgba(168, 85, 247, 0.12)'
          e.currentTarget.style.boxShadow = '0 0 12px rgba(168, 85, 247, 0.25)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <span style={s.dot} />
        {item}
      </span>
    ))

  return (
    <div style={s.wrap}>
      {/* Primary Track */}
      <div style={s.track(duration)}>
        {renderTrackItems('a')}
      </div>

      {/* Duplicate Track for Seamless Infinite Loop */}
      <div style={s.track(duration)} aria-hidden="true">
        {renderTrackItems('b')}
      </div>
    </div>
  )
}
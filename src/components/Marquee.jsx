import { marqueeItems } from '../data/portfolio'
import useMediaQuery from '../hooks/useMediaQuery'

// Multiply 4x so content easily covers ultra-wide screen widths
const quadrupled = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

const s = {
  wrap: {
    padding: '18px 0',
    borderBottom: '1px solid var(--border)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    width: '100%',
  },
  track: (duration) => ({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    animation: `marquee ${duration}s linear infinite`,
  }),
  item: (isMobile) => ({
    fontSize: isMobile ? '10px' : '11px',
    letterSpacing: isMobile ? '2px' : '3px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    padding: isMobile ? '0 20px' : '0 32px',
  }),
  sep: {
    color: 'var(--amber)',
    fontSize: '14px',
    alignSelf: 'center',
  },
}

export default function Marquee() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const duration = isMobile ? 20 : 30

  return (
    <div style={s.wrap}>
      {/* Primary Track */}
      <div style={s.track(duration)}>
        {quadrupled.map((item, i) => (
          <span key={`a-${i}`}>
            <span style={s.item(isMobile)}>{item}</span>
            <span style={s.sep}>·</span>
          </span>
        ))}
      </div>

      {/* Duplicate Track for Seamless Infinite Loop */}
      <div style={s.track(duration)} aria-hidden="true">
        {quadrupled.map((item, i) => (
          <span key={`b-${i}`}>
            <span style={s.item(isMobile)}>{item}</span>
            <span style={s.sep}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
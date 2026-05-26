import { marqueeItems } from '../data/portfolio'

const doubled = [...marqueeItems, ...marqueeItems]

const s = {
  wrap: {
    padding: '18px 0',
    borderBottom: '1px solid var(--border)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    zIndex: 1,
  },
  track: {
    display: 'inline-flex',
    animation: 'marquee 22s linear infinite',
  },
  item: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    padding: '0 32px',
  },
  sep: {
    color: 'var(--amber)',
    fontSize: '14px',
    alignSelf: 'center',
  },
}

export default function Marquee() {
  return (
    <div style={s.wrap}>
      <div style={s.track}>
        {doubled.map((item, i) => (
          <span key={i}>
            <span style={s.item}>{item}</span>
            <span style={s.sep}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'

const items = [
  { id: 'about', label: 'About', icon: 'ti-user' },
  { id: 'work', label: 'Work', icon: 'ti-briefcase' },
  { id: 'contact', label: 'Contact', icon: 'ti-mail' },
]

const s = {
  wrap: {
    position: 'fixed',
    top: '78px',
    right: '24px', // Exactly matches Navbar mobile padding (0 24px)
    zIndex: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // Right-aligns all circles to the button
    gap: 0,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  itemRow: (i, open) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
    opacity: open ? 1 : 0,
    animation: open ? `dialIn 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both` : 'none',
    pointerEvents: open ? 'auto' : 'none',
  }),
  line: (open) => ({
    width: '1px',
    height: '16px',
    background: 'var(--amber-border)',
    marginRight: '21.5px', // Exact center of the 44px circle (44/2 = 22px)
    opacity: open ? 1 : 0,
    transition: 'opacity 0.25s ease',
  }),
  circle: (active) => ({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(21, 16, 31, 0.65)',
    border: `1px solid ${active ? 'var(--amber)' : 'var(--border)'}`,
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: active ? 'var(--amber)' : 'var(--text)',
    fontSize: '17px',
    boxShadow: active ? '0 0 16px rgba(245, 158, 11, 0.25)' : 'none',
    flexShrink: 0,
    textDecoration: 'none',
  }),
  label: {
    fontSize: '12px',
    letterSpacing: '1px',
    color: 'var(--muted2, #aaa)',
    background: 'rgba(13, 13, 17, 0.75)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '5px 12px',
    borderRadius: '20px',
    border: '1px solid var(--border)',
    whiteSpace: 'nowrap',
  },
}

/**
 * MobileSpeedDial
 * Perfectly right-aligned with the Navbar toggle button.
 */
export default function MobileSpeedDial({ open, activeId, onNavigate, anchorRef }) {
  const dialRef = useRef(null)

  // Close on outside tap
  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (dialRef.current?.contains(e.target)) return
      if (anchorRef?.current?.contains(e.target)) return
      onNavigate?.(null, true)
    }
    document.addEventListener('pointerdown', onDocClick)
    return () => document.removeEventListener('pointerdown', onDocClick)
  }, [open, onNavigate, anchorRef])

  if (!open) return null

  return (
    <div style={s.wrap} ref={dialRef}>
      {items.map(({ id, label, icon }, i) => (
        <div key={id} style={s.itemContainer}>
          {/* Vertical line passing straight through the circle centers */}
          {i > 0 && <div style={s.line(open)} />}

          <div style={s.itemRow(i, open)}>
            {/* Label floats on the left */}
            <span style={s.label}>{label}</span>

            {/* Circle is locked on the right axis */}
            <a
              href={`#${id}`}
              onClick={() => onNavigate?.(id)}
              style={s.circle(activeId === id)}
              aria-label={label}
            >
              <i className={`ti ${icon}`} aria-hidden="true" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
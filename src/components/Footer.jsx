import useMediaQuery from '../hooks/useMediaQuery'

const s = {
  footer: (isMobile) => ({
    padding: isMobile ? '24px' : '24px 60px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? '8px' : 0,
    borderTop: '1px solid var(--border)',
    position: 'relative',
    zIndex: 1,
  }),
  left: { fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' },
  dot: { width: '4px', height: '4px', borderRadius: '50%', background: 'var(--amber)' },
  right: {
    fontFamily: 'var(--serif)',
    fontSize: '13px',
    color: 'var(--amber)',
    fontStyle: 'italic',
  },
}

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <footer style={s.footer(isMobile)}>
      <p style={s.left}>
        <span style={s.dot} /> 2026 Azashiro
      </p>
      <p style={s.right}>Built with React + Vite</p>
    </footer>
  )
}
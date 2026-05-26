const s = {
  footer: {
    padding: '24px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid var(--border)',
    position: 'relative',
    zIndex: 1,
  },
  left: { fontSize: '12px', color: 'var(--muted)' },
  right: {
    fontFamily: 'var(--serif)',
    fontSize: '13px',
    color: 'var(--amber)',
    fontStyle: 'italic',
  },
}

export default function Footer() {
  return (
    <footer style={s.footer}>
      <p style={s.left}>© 2026 Azashiro</p>
      <p style={s.right}>Built with React + Vite</p>
    </footer>
  )
}

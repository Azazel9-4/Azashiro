import { useState, useEffect } from 'react'

const s = {
  nav: (scrolled) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '28px 60px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    transition: 'all 0.3s',
    ...(scrolled && {
      background: 'rgba(10,9,6,0.82)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }),
  }),
  logo: {
    fontFamily: 'var(--serif)',
    fontSize: '22px',
    color: 'var(--text)',
    letterSpacing: '-0.5px',
  },
  accent: { color: 'var(--amber)', fontStyle: 'italic' },
  links: { display: 'flex', gap: '40px' },
  link: {
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={s.nav(scrolled)}>
      <span style={s.logo}>
        Azashiro
      </span>
      <div style={s.links}>
        {[['About', 'about'], ['Work', 'work'], ['Contact', 'contact']].map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            style={s.link}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}

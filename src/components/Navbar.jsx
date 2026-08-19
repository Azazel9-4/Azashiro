import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import useMediaQuery from '../hooks/useMediaQuery'

const navLinks = [['About', 'about'], ['Work', 'work'], ['Contact', 'contact']]

const s = {
  nav: (scrolled) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '28px 60px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      boxSizing: 'border-box',
      zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(10,9,6,0.85)' : 'rgba(10,9,6,0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      // ALWAYS VISIBLE BORDER
      borderBottom: '1px solid var(--border)',
    }),
  navMobile: { padding: '20px 24px' },
  logo: {
    fontFamily: 'var(--serif)',
    fontSize: '22px',
    color: 'var(--text)',
    letterSpacing: '-0.5px',
    textDecoration: 'none',
  },
  links: { display: 'flex', gap: '8px' },
  link: (isActive) => ({
    position: 'relative',
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: isActive ? 'var(--amber)' : 'var(--muted)',
    transition: 'color 0.2s',
    cursor: 'pointer',
    padding: '8px 12px',
    textDecoration: 'none',
  }),
  underline: (isActive) => ({
    position: 'absolute',
    bottom: '2px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: isActive ? '16px' : '0px',
    height: '2px',
    background: 'var(--amber)',
    borderRadius: '2px',
    transition: 'width 0.25s ease',
  }),
  menuBtn: {
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text)',
    fontSize: '18px',
    cursor: 'pointer',
  },
  overlay: (open) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100dvh',
    zIndex: 99999,
    background: 'rgba(10,9,6,0.98)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '28px',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'opacity 0.3s ease',
  }),
  overlayClose: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text)',
    fontSize: '18px',
    cursor: 'pointer',
  },
  mobileLink: (isActive, open, delay) => ({
    fontFamily: 'var(--serif)',
    fontSize: '32px',
    fontStyle: 'italic',
    letterSpacing: '-0.5px',
    color: isActive ? 'var(--amber)' : 'var(--text)',
    transition: 'color 0.2s ease, opacity 0.3s ease, transform 0.3s ease',
    opacity: open ? 1 : 0,
    transform: open ? 'translateY(0)' : 'translateY(16px)',
    transitionDelay: open ? `${delay}ms` : '0ms',
    textDecoration: 'none',
  }),
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const isMobile = useMediaQuery('(max-width: 720px)')
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          let current = 'about'
          for (const [, id] of navLinks) {
            const el = document.getElementById(id)
            if (el && el.getBoundingClientRect().top <= 140) current = id
          }
          setActive(current)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
      }
    }
  }, [menuOpen])

  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  const closeMenu = () => setMenuOpen(false)

  const overlayContent = (
    <div style={s.overlay(menuOpen)} onTouchMove={(e) => e.stopPropagation()}>
      <button style={s.overlayClose} onClick={closeMenu} aria-label="Close menu">
        <i className="ti ti-x" aria-hidden="true" />
      </button>
      {navLinks.map(([label, id], i) => (
        <a
          key={id}
          href={`#${id}`}
          style={s.mobileLink(active === id, menuOpen, i * 60)}
          onClick={closeMenu}
        >
          {label}
        </a>
      ))}
    </div>
  )

  return (
    <>
      <nav style={{ ...s.nav(scrolled), ...(isMobile ? s.navMobile : {}) }}>
        <a href="#" style={s.logo}>Azashiro</a>

        {isMobile ? (
          <button
            style={s.menuBtn}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <i className="ti ti-menu-2" aria-hidden="true" />
          </button>
        ) : (
          <div style={s.links}>
            {navLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`} style={s.link(active === id)}>
                {label}
                <span style={s.underline(active === id)} />
              </a>
            ))}
          </div>
        )}
      </nav>

      {typeof document !== 'undefined' && createPortal(overlayContent, document.body)}
    </>
  )
}
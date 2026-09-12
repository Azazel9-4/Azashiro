import Avatar from './Avatar'
import { useState, useEffect, useRef } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import MobileSpeedDial from './MobileSpeedDial'

const navLinks = [['About', 'about'], ['Work', 'work'], ['Contact', 'contact']]

const s = {
  nav: (scrolled) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '84px',
      padding: '0 60px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      boxSizing: 'border-box',
      zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(13,13,17,0.85)' : 'rgba(13,13,17,0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }),
  navMobile: { height: '72px', padding: '0 24px' },
    logoImg: {
      display: 'block',
      width: '65px',
      height: '65px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '1px solid var(--amber-border)',
      flexShrink: 0,
      /*marginLeft=15,*/
    },
    logoImgInner: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'top',
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
menuBtn: (open) => ({
  background: open ? 'rgba(174, 42, 200, 0.35)' : 'rgba(21, 16, 31, 0.65)',
  border: `1px solid ${open ? 'var(--amber)' : 'var(--border)'}`,
  borderRadius: '50%', // Makes it a circle
  width: '44px',       // Matches MobileSpeedDial circle size
  height: '44px',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: open ? 'var(--amber)' : 'var(--text)',
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  boxShadow: open ? '0 0 16px rgba(174, 42, 200, 0.35)' : 'none',
  padding: 0,
}),
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const isMobile = useMediaQuery('(max-width: 720px)')
  const ticking = useRef(false)
  const menuBtnRef = useRef(null)

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
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  // Close the speed-dial automatically once the user starts scrolling
  useEffect(() => {
    if (!menuOpen) return
    const closeOnScroll = () => setMenuOpen(false)
    window.addEventListener('scroll', closeOnScroll, { passive: true })
    return () => window.removeEventListener('scroll', closeOnScroll)
  }, [menuOpen])

  const handleDialNavigate = (id) => {
    // id is null when MobileSpeedDial reports an outside tap (close only)
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{ ...s.nav(scrolled), ...(isMobile ? s.navMobile : {}) }}>
        <div style={s.logoImg}>
          <Avatar normalSrc="/me.png" altSrc="/aizen.jpg" alt="Rommel Glenn Austria" altPosition="center"  altScale={1} eyeX="58%" eyeY="60%" />
        </div>
        {isMobile ? (
<button
  ref={menuBtnRef}
  style={s.menuBtn(menuOpen)}
  onClick={() => setMenuOpen((o) => !o)}
  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={menuOpen}
>
  <i
    className={`ti ${menuOpen ? 'ti-x' : 'ti-menu-deep'}`}
    style={{ fontSize: '20px' }}
    aria-hidden="true"
  />
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

      {isMobile && (
        <MobileSpeedDial
          open={menuOpen}
          activeId={active}
          onNavigate={handleDialNavigate}
          anchorRef={menuBtnRef}
        />
      )}
    </>
  )
}

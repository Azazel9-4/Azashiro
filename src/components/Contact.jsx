import { useState, useEffect } from 'react'
import Reveal from './Reveal'
import useMediaQuery from '../hooks/useMediaQuery'

const tags = ['Software Development', 'Mobile App Development', 'Web Development', 'Others']

const s = {
  section: (stacked, isMobile) => ({
    padding: isMobile ? '60px 24px 80px' : stacked ? '70px 40px 100px' : '80px 60px 120px',
    display: 'grid',
    gridTemplateColumns: stacked ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)',
    gap: isMobile ? '32px' : stacked ? '48px' : '80px',
    alignItems: 'start',
    position: 'relative',
    zIndex: 1,
    borderBottom: '1px solid var(--border)',
    minHeight: '80vh', // Gives enough height for scroll-spy active state
  }),

  label: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    marginBottom: '8px',
  },
  index: {
    fontFamily: 'var(--serif)',
    fontSize: '64px',
    color: 'rgba(255,255,255,0.04)',
    lineHeight: 1,
    userSelect: 'none',
    marginBottom: '16px',
  },

  h2: (isMobile) => ({
    fontFamily: 'var(--serif)',
    fontSize: isMobile ? '30px' : '38px',
    fontWeight: 400,
    lineHeight: 1.15,
    letterSpacing: '-0.5px',
    marginBottom: '20px',
  }),
  accent: {
    color: 'var(--amber)',
    fontStyle: 'italic',
    textShadow: '0 0 30px rgba(200,137,42,0.4)',
  },
  p: {
    fontSize: '15px',
    color: 'var(--muted)',
    lineHeight: 1.85,
    maxWidth: '340px',
  },

  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--muted2)',
    marginTop: '20px',
    padding: '8px 14px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#4cd964',
    boxShadow: '0 0 8px #4cd964',
  },

  /* New Brief / Expectation Card */
  briefCard: {
    marginTop: '32px',
    padding: '20px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '380px',
  },
  briefTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--amber)',
    letterSpacing: '0.5px',
  },
  briefList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--muted)',
    lineHeight: 1.6,
    paddingLeft: '0',
    listStyle: 'none',
  },
  briefItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
  },
  tagPill: (active) => ({
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    border: `1px solid ${active ? 'var(--amber)' : 'var(--border)'}`,
    background: active ? 'var(--amber-dim)' : 'var(--surface)',
    color: active ? 'var(--amber)' : 'var(--muted2)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),

  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: (isMobile) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '14px 16px' : '16px 20px',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    transition: 'all 0.25s',
    cursor: 'pointer',
    background: 'var(--surface)',
    textDecoration: 'none',
  }),
  linkLeft: { display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 },
  iconBadge: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: 'var(--amber-dim)',
    border: '1px solid var(--amber-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.25s',
  },
  linkIcon: { fontSize: '16px', color: 'var(--amber)' },
  linkLabel: {
    fontSize: '13px',
    color: 'var(--muted2)',
    letterSpacing: '0.3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  linkArrow: { fontSize: '16px', color: 'var(--muted)', flexShrink: 0, transition: 'transform 0.25s' },
}

export default function Contact() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const stacked = useMediaQuery('(max-width: 1024px)')
  const [copied, setCopied] = useState(false)
  const [selectedTag, setSelectedTag] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const phtTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date())
      setTime(phtTime)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('austriarommelglenn09@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    const subject = selectedTag ? `?subject=Inquiry regarding ${selectedTag}` : ''
    window.open(`https://mail.google.com/mail/?view=cm&to=austriarommelglenn09@gmail.com${subject}`, '_blank')
  }

  const contactLinks = [
    {
      icon: 'ti-mail',
      label: selectedTag ? `Email about ${selectedTag}` : 'austriarommelglenn09@gmail.com',
      href: `https://mail.google.com/mail/?view=cm&to=austriarommelglenn09@gmail.com${selectedTag ? `&su=Inquiry regarding ${selectedTag}` : ''}`,
      isEmail: true,
    },
    { icon: 'ti-brand-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rommel-glenn-austria-2b88ab423' },
    { icon: 'ti-brand-github', label: 'GitHub', href: 'https://github.com/Azazel9-4' },
    { icon: 'ti-brand-instagram', label: 'Instagram', href: 'https://www.instagram.com/azaashirooo/' },
    { icon: 'ti-file-text', label: 'Resume', href: '/Resume-Glenn.pdf' },
  ]

  return (
    <section id="contact" style={s.section(stacked, isMobile)} className="contact">
      <Reveal direction="right">
        <div>
          <p style={s.label}>Contact</p>
          <div style={s.index}>03</div>

          <h2 style={s.h2(isMobile)}>
            Time to build something <em style={s.accent}>good.</em>
          </h2>
          <p style={s.p}>
            Open to entry or junior level roles, freelance work, or collaborations.
            If you have an interesting problem, I would love to hear about it.
          </p>

          <div style={s.statusBadge}>
            <span style={s.statusDot} />
            <span>Available for work • PH {time && `(${time} PHT)`}</span>
          </div>

          {/* Quick Inquiry Expectations Card */}
          <div style={s.briefCard}>
            <span style={s.briefTitle}>WHAT TO INCLUDE IN YOUR MESSAGE</span>
            <ul style={s.briefList}>
              <li style={s.briefItem}><i className="ti ti-check" style={{ color: 'var(--amber)' }} /> Target scope or project type</li>
              <li style={s.briefItem}><i className="ti ti-check" style={{ color: 'var(--amber)' }} /> Desired timeline or start date</li>
              <li style={s.briefItem}><i className="ti ti-check" style={{ color: 'var(--amber)' }} /> Tech stack requirements (if any)</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div style={s.links}>
        <p style={{ ...s.label, marginBottom: '10px' }}>What are you looking to build?</p>
        <div style={s.tagsContainer}>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              style={s.tagPill(selectedTag === tag)}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {contactLinks.map(({ icon, label, href, isEmail }, i) => (
          <Reveal key={icon + label} delay={i * 80}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={isEmail ? copyEmail : undefined}
              style={s.link(isMobile)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--amber-border)'
                e.currentTarget.style.background = 'var(--amber-dim)'
                e.currentTarget.querySelector('.arrow').style.transform = 'translate(3px, -3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--surface)'
                e.currentTarget.querySelector('.arrow').style.transform = 'translate(0, 0)'
              }}
            >
              <div style={s.linkLeft}>
                <div style={s.iconBadge}>
                  <i className={`ti ${icon}`} style={s.linkIcon} aria-hidden="true" />
                </div>
                <span style={s.linkLabel}>
                  {isEmail && copied ? 'Copied to clipboard!' : label}
                </span>
              </div>
              <i className="ti ti-arrow-up-right arrow" style={s.linkArrow} aria-hidden="true" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

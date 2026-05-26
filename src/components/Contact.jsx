import Reveal from './Reveal'

const contactLinks = [
  {
    icon: 'ti-mail',
    label: 'austriarommelglenn09@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&to=austriarommelglenn09@gmail.com',
  },
  {
    icon: 'ti-brand-github',
    label: 'GitHub',
    href: 'https://github.com/Azazel9-4',
  },
  {
    icon: 'ti-brand-instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/azaashirooo/',
  },
]

const s = {
  section: {
    padding: '80px 60px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  h2: {
    fontFamily: 'var(--serif)',
    fontSize: '48px',
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: '-0.5px',
    marginBottom: '20px',
  },
  accent: { color: 'var(--amber)', fontStyle: 'italic' },
  p: {
    color: 'var(--muted)',
    fontSize: '15px',
    lineHeight: 1.85,
    maxWidth: '340px',
  },
  links: { display: 'flex', flexDirection: 'column', gap: '12px' },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  linkLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  linkIcon: { fontSize: '18px', color: 'var(--amber)' },
  linkLabel: { fontSize: '13px', color: 'var(--muted2)', letterSpacing: '0.3px' },
  linkArrow: { fontSize: '16px', color: 'var(--muted)' },
}

export default function Contact() {
  return (
    <section id="contact" style={s.section}>
      <Reveal direction="right">
        <div>
          <h2 style={s.h2}>
            {"Let's build something "}
            <em style={s.accent}>good.</em>
          </h2>
          <p style={s.p}>
            Open to entry-level roles, freelance work, or collaborations.
            If you have an interesting problem, I would love to hear about it.
          </p>
        </div>
      </Reveal>
      <div style={s.links}>
        {contactLinks.map(({ icon, label, href }, i) => (
          <Reveal key={label} delay={i * 80}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              style={s.link}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--amber-border)'
                e.currentTarget.style.background = 'var(--amber-dim)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <div style={s.linkLeft}>
                <i className={`ti ${icon}`} style={s.linkIcon} aria-hidden="true" />
                <span style={s.linkLabel}>{label}</span>
              </div>
              <i className="ti ti-arrow-up-right" style={s.linkArrow} aria-hidden="true" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
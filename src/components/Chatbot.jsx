import { useState, useRef, useEffect } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'

const API_URL = '/api/chat'

const s = {
  // ───────── FLOATING BUTTON (reveal animation lives on the wrapper) ─────────
  fabWrap: (isMobile, hidden) => ({
    position: 'fixed',
    right: isMobile ? '16px' : '32px',
    bottom: isMobile ? '16px' : '32px',
    zIndex: 200,
    opacity: hidden ? 0 : 1,
    transform: hidden ? 'translateY(28px) scale(0.7)' : 'translateY(0) scale(1)',
    visibility: hidden ? 'hidden' : 'visible',
    pointerEvents: hidden ? 'none' : 'auto',
    transition: hidden
      ? 'opacity 0.3s ease, transform 0.3s ease, visibility 0s linear 0.3s'
      : 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), visibility 0s',
  }),
  fab: () => ({
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'var(--amber)',
    color: '#0a0906',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    boxShadow: '0 8px 24px rgba(155,81,224,0.4)',
    transition: 'transform 0.25s var(--ease)',
  }),

  // ───────── TERMINAL PANEL (same size as before) ─────────
  panel: (isMobile) => ({
    position: 'fixed',
    right: isMobile ? '0' : '32px',
    left: isMobile ? '0' : 'auto',
    bottom: isMobile ? '0' : '100px',
    width: isMobile ? '100%' : '360px',
    height: isMobile ? '85vh' : '480px',
    background: 'rgba(8, 5, 14, 0.92)',
    border: '1px solid rgba(168, 85, 247, 0.28)',
    borderRadius: isMobile ? '16px 16px 0 0' : '16px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 200,
    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px -5px rgba(168, 85, 247, 0.22)',
    fontFamily: '"Fira Code", "Courier New", monospace',
    animation: isMobile ? 'chatPopMobile 0.3s var(--ease)' : 'chatPop 0.3s var(--ease)',
    transformOrigin: 'bottom right',
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: 'rgba(15, 10, 26, 0.95)',
    borderBottom: '1px solid rgba(168, 85, 247, 0.16)',
  },
  winDots: { display: 'flex', gap: '7px', alignItems: 'center' },
  winDot: (color) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
    opacity: 0.85,
  }),
  winDotBtn: (color) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
    opacity: 0.85,
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  }),
  headerTitle: {
    fontSize: '11px',
    letterSpacing: '1px',
    color: 'rgba(192, 132, 252, 0.65)',
    textTransform: 'lowercase',
  },
  headerSub: { fontSize: '10px', color: 'rgba(255,255,255,0.3)' },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

closeBtn: {
  background: 'none',
  border: 'none',
  color: 'rgba(192, 132, 252, 0.8)',
  fontSize: '20px',
  lineHeight: 1,
  padding: '4px',
  cursor: 'pointer',
},
  line: (fromUser) => ({
    fontSize: '12.5px',
    lineHeight: 1.65,
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    animation: 'bubbleIn 0.3s var(--ease)',
    ...(fromUser
      ? { color: '#e2d9f3' }
      : {
          color: 'rgba(255,255,255,0.78)',
          padding: '10px 12px',
          background: 'rgba(147, 51, 234, 0.05)',
          borderLeft: '2px solid rgba(168, 85, 247, 0.4)',
          borderRadius: '0 10px 10px 0',
        }),
  }),
  promptUser: { color: '#c084fc', fontWeight: 600 },
  promptPath: { color: 'rgba(255,255,255,0.5)' },
  typingDots: { display: 'flex', gap: '4px', padding: '4px 0' },
  dot: (delay) => ({
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: '#c084fc',
    animation: `typingDot 1.2s ease-in-out ${delay}s infinite`,
  }),
  suggestions: { display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '0 16px 12px' },
  chip: {
    fontSize: '11px',
    color: '#c084fc',
    border: '1px dashed rgba(168, 85, 247, 0.35)',
    borderRadius: '6px',
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderTop: '1px solid rgba(168, 85, 247, 0.16)',
    background: 'rgba(15, 10, 26, 0.95)',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#e2d9f3',
    caretColor: '#c084fc',
    fontSize: '13px',
    fontFamily: 'inherit',
  },
  sendBtn: {
    background: 'transparent',
    color: '#c084fc',
    border: '1px solid rgba(192, 132, 252, 0.4)',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
}

const suggestedQuestions = [
  'What can you do?',
  'What projects have you built?',
  'What tools do you use?',
  'Are you open to work?',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hey! I'm Azashiro. Ask me anything about Glenn's background, skills, or projects." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const scrollRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [heroVisible, setHeroVisible] = useState(true)
  const hidden = heroVisible && !open
  const fabHidden = hidden || (isMobile && open)
  // Hide the launcher while the Hero (#home) is on screen
  useEffect(() => {
    const hero = document.getElementById('home')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.6 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (isMobile) document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open, isMobile])

  async function send(text) {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setError(false)
    setMessages(m => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map(m => ({
            role: m.role === 'bot' ? 'model' : 'user',
            text: m.text,
          })),
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.detail || `Server returned status ${res.status}`)
      }

      const data = await res.json()
      setMessages(m => [...m, { role: 'bot', text: data.reply }])
    } catch (err) {
      setError(true)
      setMessages(m => [...m, {
        role: 'bot',
        text: `Error: ${err.message}`,
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div style={s.fabWrap(isMobile, fabHidden)}>
        <button
          className="chat-fab press"
          style={s.fab()}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close chat' : 'Open chat'}
          aria-hidden={fabHidden}
          tabIndex={fabHidden ? -1 : 0}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <i
            key={open ? 'x' : 'chat'}
            className={`ti ${open ? 'ti-x' : 'ti-terminal-2'}`}
            style={{ animation: 'iconSwap 0.3s var(--ease)' }}
            aria-hidden="true"
          />
        </button>
      </div>

      {open && (
        <div className="chat-panel" style={s.panel(isMobile)}>
          {/* Title bar */}
          <div style={s.header}>
            <div style={s.winDots}>
              <button style={s.winDotBtn('#ff5f56')} onClick={() => setOpen(false)} aria-label="Close chat" />
              <span style={s.winDot('#ffbd2e')} />
              <span style={s.winDot('#27c93f')} />
            </div>
            <span style={s.headerTitle}>azashiro@portfolio: ~/chat.sh</span>
            {isMobile ? (
              <button style={s.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            ) : (
              <span style={s.headerSub}>{error ? 'offline' : 'online'}</span>
            )}
          </div>

          {/* Messages */}
          <div style={s.messages} ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} style={s.line(m.role === 'user')}>
                {m.role === 'user' ? (
                  <>
                    <span style={s.promptUser}>guest</span>
                    <span style={s.promptPath}>:~$</span> {m.text}
                  </>
                ) : (
                  m.text
                )}
              </div>
            ))}
            {loading && (
              <div style={s.line(false)}>
                <div style={s.typingDots}>
                  <span style={s.dot(0)} />
                  <span style={s.dot(0.15)} />
                  <span style={s.dot(0.3)} />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length < 3 && (
            <div style={s.suggestions}>
              {suggestedQuestions.map(q => (
                <span
                  key={q}
                  style={s.chip}
                  onClick={() => send(q)}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.8)'
                    e.currentTarget.style.background = 'rgba(147, 51, 234, 0.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.35)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  $ {q}
                </span>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={s.inputRow}>
            <span style={s.promptUser}>$</span>
            <input
              style={s.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="type a question..."
            />
            <button style={s.sendBtn} className="press" onClick={() => send(input)}>
              run ↵
            </button>
          </div>
        </div>
      )}
    </>
  )
}
import { useState, useRef, useEffect } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'

const API_URL = '/api/chat'

const s = {
  fab: (isMobile) => ({
    position: 'fixed',
    right: isMobile ? '16px' : '32px',
    bottom: isMobile ? '16px' : '32px',
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
    zIndex: 200,
    boxShadow: '0 8px 24px rgba(200,137,42,0.35)',
    transition: 'transform 0.25s var(--ease)',
  }),
  panel: (isMobile) => ({
    position: 'fixed',
    right: isMobile ? '0' : '32px',
    left: isMobile ? '0' : 'auto',
    bottom: isMobile ? '0' : '100px',
    width: isMobile ? '100%' : '360px',
    height: isMobile ? '85vh' : '480px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: isMobile ? '16px 16px 0 0' : '8px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 200,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    animation: isMobile ? 'chatPopMobile 0.3s var(--ease)' : 'chatPop 0.3s var(--ease)',
  }),
  header: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontFamily: 'var(--serif)', fontSize: '16px', color: 'var(--text)' },
  headerSub: {
    fontSize: '11px',
    color: 'var(--amber)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  closeBtn: { background: 'none', border: 'none', color: 'var(--muted)', fontSize: '18px', cursor: 'pointer' },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  bubbleRow: (fromUser) => ({
    display: 'flex',
    justifyContent: fromUser ? 'flex-end' : 'flex-start',
    animation: 'bubbleIn 0.3s var(--ease)',
  }),
  bubble: (fromUser) => ({
    maxWidth: '78%',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    lineHeight: 1.6,
    background: fromUser ? 'var(--amber)' : 'rgba(255,255,255,0.05)',
    color: fromUser ? '#0a0906' : 'var(--text)',
    border: fromUser ? 'none' : '1px solid var(--border)',
  }),
  typingDots: { display: 'flex', gap: '4px', padding: '10px 14px' },
  dot: (delay) => ({
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--muted2)',
    animation: `typingDot 1.2s ease-in-out ${delay}s infinite`,
  }),
  inputRow: { display: 'flex', gap: '8px', padding: '14px', borderTop: '1px solid var(--border)' },
  input: {
    flex: 1,
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '10px 12px',
    color: 'var(--text)',
    fontSize: '13px',
    fontFamily: 'var(--sans)',
    outline: 'none',
  },
  sendBtn: {
    background: 'var(--amber)',
    color: '#0a0906',
    border: 'none',
    borderRadius: '6px',
    padding: '0 16px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  suggestions: { display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '0 20px 14px' },
  chip: {
    fontSize: '11px',
    color: 'var(--muted2)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
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
    { role: 'bot', text: "Hey! I'm Azashiro's assistant. Ask me anything about Rommel's background, skills, or projects." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const scrollRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 640px)')

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
          history: messages.map(m => ({ role: m.role, text: m.text })),
        }),
      })
      if (!res.ok) throw new Error('Bad response')
      const data = await res.json()
      setMessages(m => [...m, { role: 'bot', text: data.reply }])
    } catch (err) {
      setError(true)
  // This will show the real error in the chat bubble
      setMessages(m => [...m, { 
      role: 'bot', 
      text: "Error: " + err.message 
     }])
}
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className="chat-fab press"
        style={s.fab(isMobile)}
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <i className={`ti ${open ? 'ti-x' : 'ti-message-circle'}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="chat-panel" style={s.panel(isMobile)}>
          <div style={s.header}>
            <div>
              <div style={s.headerTitle}>Ask Azashiro</div>
              <div style={s.headerSub}>{error ? 'Offline' : 'About Rommel'}</div>
            </div>
            <button style={s.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          </div>

          <div style={s.messages} ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} style={s.bubbleRow(m.role === 'user')}>
                <div style={s.bubble(m.role === 'user')}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div style={s.bubbleRow(false)}>
                <div style={{ ...s.bubble(false), padding: 0 }}>
                  <div style={s.typingDots}>
                    <span style={s.dot(0)} />
                    <span style={s.dot(0.15)} />
                    <span style={s.dot(0.3)} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {messages.length < 3 && (
            <div style={s.suggestions}>
              {suggestedQuestions.map(q => (
                <span
                  key={q}
                  style={s.chip}
                  onClick={() => send(q)}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--amber-border)'
                    e.currentTarget.style.color = 'var(--amber)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--muted2)'
                  }}
                >
                  {q}
                </span>
              ))}
            </div>
          )}

          <div style={s.inputRow}>
            <input
              style={s.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Type a question..."
            />
            <button style={s.sendBtn} className="press" onClick={() => send(input)}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}

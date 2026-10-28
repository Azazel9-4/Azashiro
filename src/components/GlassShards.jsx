import { useEffect, useRef } from 'react'

// <SCENE_LOGIC>
/**
 * Reiatsu: crushing pressure + Bleach anime energy surge.
 *
 *  FACADE   Idle & Scrolling: depth parallax with vertical speed streaking.
 *  PRESSURE Long press: towering Bleach Reiatsu strokes, screen darkening,
 *           violent jitter, ground slashes, and motes pulled into the vortex.
 *  RELEASE  Unleashes heavy spiritual shockwaves and camera shake.
 */
const TAU = Math.PI * 2
const BG = '#06050a'
const clamp01 = (v) => Math.max(0, Math.min(1, v))
const smooth = (a, b, t) => { const k = clamp01((t - a) / (b - a)); return k * k * (3 - 2 * k) }
const stageWeights = (s) => [clamp01(1 - s), clamp01(1 - Math.abs(s - 1)), clamp01(1 - Math.abs(s - 2)), clamp01(s - 2)]

function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const STAGE_BLOBS = [
  [[0.08, 0.12, 0.5, 0.22], [0.95, 0.95, 0.45, 0.18], [0.5, 1.08, 0.75, 0.2]],
  [[0.06, 0.22, 0.45, 0.18], [0.86, 0.58, 0.5, 0.18], [0.5, 1.1, 0.7, 0.14]],
  [[0.15, 0.3, 0.5, 0.15], [0.85, 0.3, 0.5, 0.15], [0.5, 1.1, 0.7, 0.12]],
  [[0.4, 0.5, 0.55, 0.12], [0.6, 0.5, 0.55, 0.12], [0.5, 1.1, 0.7, 0.1]],
]
const BLOB_COLORS = ['147,51,234', '109,40,217', '88,28,135']

function buildWorld(W, H, count) {
  const rnd = mulberry32(321)
  const motes = []
  for (let i = 0; i < count; i++) {
    const hy = rnd() * H
    motes.push({
      x: rnd() * W, y: hy, hy, vx: 0, vy: 0, depth: 0.3 + rnd() * 0.7,
      size: 0.8 + Math.pow(rnd(), 3) * 2.0, tw: 0.8 + rnd() * 1.8, ph: rnd() * TAU,
    })
  }
  return {
    motes, shocks: [], P: 0, ep: null, shake: 0,
    hold: { down: false, p: 0, x: 0, y: 0, t0: 0 },
    hintUntil: 14, interacted: false,
  }
}

function pressDown(world, st, x, y) {
  const h = world.hold
  h.down = true; h.p = 0; h.x = x; h.y = y; h.t0 = st.time
  world.interacted = true
}

function pressUp(world, st) {
  const h = world.hold
  if (!h.down) return
  h.down = false
  if (h.p > 0.2) {
    world.shocks.push({ x: h.x, y: h.y, t0: st.time, str: h.p })
    world.shake = Math.max(world.shake, h.p * 1.4)
  } else {
    world.shocks.push({ x: h.x, y: h.y, t0: st.time, str: 0.25 })
  }
}

function pressCancel(world) {
  world.hold.down = false
}

function flowAngle(x, y, t, W, H) {
  const u = x / W, v = y / H
  return Math.sin(u * 5.5 + t * 0.07) * 2.1 + Math.cos(v * 4.2 - t * 0.05) * 2.1 + Math.sin((u + v) * 3.4 + t * 0.04) * 1.4
}

// st: { W, H, time, dt, w[4], mouse{x,y,active}, reduce, scrollDelta }
function update(world, st) {
  const { W, H, time, mouse, reduce, scrollDelta = 0 } = st
  const dt = Math.min(st.dt, 0.033)
  const h = world.hold

  if (!reduce) {
    if (h.down) {
      if (time - h.t0 > 0.08) h.p = Math.min(1, h.p + dt / 1.1)
    } else {
      h.p = Math.max(0, h.p - dt / 0.7)
    }
  }

  world.P = reduce ? 0 : h.p
  world.ep = h.down ? { x: h.x, y: h.y } : null
  world.shake = Math.max(0, world.shake - dt * 2.4)
  world.shocks = world.shocks.filter((s) => time - s.t0 < 1.6)

  const P = world.P
  for (const m of world.motes) {
    if (reduce) continue

    // --- PARALLAX SCROLL DISPLACEMENT ---
    if (Math.abs(scrollDelta) > 0.01) {
      const clampedDelta = Math.max(-90, Math.min(90, scrollDelta))
      const shift = clampedDelta * m.depth * 0.45
      m.y -= shift
      m.hy -= shift
      m.vy -= shift * 1.8
    }

const fa = flowAngle(m.x, m.y, time, W, H)
    let ax = Math.cos(fa) * 5, ay = Math.sin(fa) * 5 + (m.hy - m.y) * 0.3 * (1 - P)

    // Screen-wide crushing spiritual pressure
    if (P > 0.03) {
      // Violent high-frequency particle shudder
      ax += (Math.sin(time * 95 + m.ph * 7) * 0.6 + (Math.random() - 0.5) * 0.4) * P * 1200
      // Heavy downward crushing gravity
      ay += P * 1600 * m.depth
    }


    // Mouse gentle push
    if (mouse.active && P < 0.2) {
      const dx = m.x - mouse.x, dy = m.y - mouse.y, d = Math.hypot(dx, dy)
      if (d < 120 && d > 1) { const f = 1 - d / 120; ax += (dx / d) * f * 60; ay += (dy / d) * f * 60 }
    }

    // Shockwaves
    for (const s of world.shocks) {
      const age = time - s.t0, r = age * 540
      const dx = m.x - s.x, dy = m.y - s.y, d = Math.hypot(dx, dy) + 0.001
      const band = Math.abs(d - r)
      if (band < 46) {
        const f = (1 - band / 46) * (1 - age / 1.6) * s.str
        ax += (dx / d) * f * 1800; ay += (dy / d) * f * 1800 - f * 900
      }
    }

    m.vx += ax * dt; m.vy += ay * dt
    const drag = Math.exp(-(0.5 + P * 1.0) * dt)
    m.vx *= drag; m.vy *= drag
    const sp = Math.hypot(m.vx, m.vy)
    if (sp > 350) { m.vx *= 350 / sp; m.vy *= 350 / sp }
    m.x += m.vx * dt; m.y += m.vy * dt

    // Screen wrap
    if (m.y < -40) {
      m.y += H + 80
      m.hy += H + 80
    } else if (m.y > H + 40) {
      m.y -= H + 80
      m.hy -= H + 80
    }

    if (m.x < -20) m.x += W + 40; else if (m.x > W + 20) m.x -= W + 40
  }
}

// SCREEN-WIDE BLEACH REIATSU ATMOSPHERIC DISTORTION
function drawReiatsuSurge(ctx, P, time, W, H) {
  if (P <= 0.02) return

  ctx.save()

  // 1. Subtle ambient pressure dimming
  ctx.fillStyle = `rgba(3, 1, 6, ${0.35 * P})`
  ctx.fillRect(0, 0, W, H)

  // 2. Ghostly air-refraction bands (barely visible heat mirage)
  const lineCount = Math.floor(W < 768 ? 40 : 70)

  for (let i = 0; i < lineCount; i++) {
    const seed = (i * 123457 + 76543) % 1000000
    const normX = (i / lineCount) + ((seed % 100) / 100 - 0.5) * (1.5 / lineCount)
    
    // High-frequency air shimmer / vibration
    const jitter = Math.sin(time * 60 + i * 13.7) * (1.2 + 3 * P)
    const x = normX * W + jitter

    const speed = 180 + (seed % 220)
    const yOffset = (time * speed + (seed % 1000)) % (H * 1.3) - (H * 0.15)
    const strokeH = H * (0.5 + ((seed >> 3) % 100) / 100 * 0.5)

    // Ultra-low, ghost-level opacity
    const shimmer = 0.5 + 0.5 * Math.sin(time * 20 + i * 6.2)
    const alpha = P * shimmer * 0.07 // Extremely faint

    ctx.beginPath()
    ctx.moveTo(x, yOffset)
    ctx.lineTo(x + Math.sin(time * 12 + i) * 2, yOffset + strokeH)

    if (i % 3 === 0) {
      // Soft wide shadow wave (refraction distortion)
      ctx.lineWidth = 18 + (seed % 24)
      ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 1.8})`
    } else if (i % 3 === 1) {
      // Very faint ethereal violet vapor
      ctx.lineWidth = 8 + (seed % 10)
      ctx.strokeStyle = `rgba(147, 51, 234, ${alpha * 1.2})`
    } else {
      // Subtle atmospheric frequency seam
      ctx.lineWidth = 2 + (seed % 3)
      ctx.strokeStyle = `rgba(192, 132, 252, ${alpha * 1.4})`
    }

    ctx.stroke()
  }

  // 3. Faint rolling atmospheric gravity wave
  const waveY = (time * 70) % H
  const wg = ctx.createLinearGradient(0, waveY - 40, 0, waveY + 40)
  wg.addColorStop(0, 'rgba(107, 33, 168, 0)')
  wg.addColorStop(0.5, `rgba(107, 33, 168, ${0.03 * P})`)
  wg.addColorStop(1, 'rgba(107, 33, 168, 0)')
  ctx.fillStyle = wg
  ctx.fillRect(0, waveY - 40, W, 80)

  ctx.restore()
}

function drawFrame(ctx, st, world) {
  const { W, H, time, w, mouse } = st
  const P = world.P, mn = Math.min(W, H), maxDim = Math.max(W, H)
  ctx.globalAlpha = 1
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)

  ctx.save()

  // Violent screen shake while pressing
  let shX = 0, shY = 0
  if (world.hold.down && world.hold.p > 0.03) {
    const heavyP = Math.pow(world.hold.p, 1.8) * 8.5
    shX += (Math.sin(time * 86) * 0.65 + Math.sin(time * 144) * 0.35) * heavyP
    shY += (Math.cos(time * 94) * 0.65 + Math.cos(time * 162) * 0.35) * heavyP
  }
  if (world.shake > 0.01) {
    const relShake = world.shake * 7.0
    shX += Math.sin(time * 65) * relShake
    shY += Math.cos(time * 57) * relShake
  }
  if (shX !== 0 || shY !== 0) ctx.translate(shX, shY)

  // Ambient purple background glow
  ctx.globalCompositeOperation = 'lighter'
  for (let b = 0; b < 3; b++) {
    let x = 0, y = 0, r = 0, inten = 0
    for (let k = 0; k < 4; k++) { const c = STAGE_BLOBS[k][b]; x += w[k] * c[0]; y += w[k] * c[1]; r += w[k] * c[2]; inten += w[k] * c[3] }
    x += Math.sin(time * 0.11 + b * 1.7) * 0.03; y += Math.cos(time * 0.09 + b * 2.3) * 0.03
    inten *= (0.85 + 0.15 * Math.sin(time * 0.35 + b)) * (1 - 0.6 * P)
    const g = ctx.createRadialGradient(x * W, y * H, 0, x * W, y * H, r * maxDim)
    g.addColorStop(0, `rgba(${BLOB_COLORS[b]},${inten * 0.7})`)
    g.addColorStop(0.45, `rgba(${BLOB_COLORS[b]},${inten * 0.25})`)
    g.addColorStop(1, `rgba(${BLOB_COLORS[b]},0)`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  // Mouse hover glow
  if (mouse.active && P < 0.2) {
    const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110)
    mg.addColorStop(0, 'rgba(126,34,206,0.08)')
    mg.addColorStop(1, 'rgba(126,34,206,0)')
    ctx.fillStyle = mg
    ctx.fillRect(mouse.x - 110, mouse.y - 110, 220, 220)
  }

  ctx.globalCompositeOperation = 'source-over'

  // --- BLEACH REIATSU PRESSURE SURGE (LONG PRESS) ---
// Full-screen atmospheric Reiatsu shimmer
  if (world.hold.down && P > 0.02) {
    drawReiatsuSurge(ctx, P, time, W, H)
  }

  // Motes with depth priority & velocity scroll streaks
  const scrollSpeed = st.scrollDelta || 0
  for (const m of world.motes) {
    const depthScale = 0.55 + 0.45 * m.depth
    const a = (0.35 + 0.45 * (0.5 + 0.5 * Math.sin(time * m.tw + m.ph))) * (1 - 0.3 * P) * depthScale

    const stretch = Math.min(22, Math.abs(scrollSpeed) * m.depth * 0.8)
    const ry = m.size * 1.3 + stretch
    const rx = Math.max(0.6, m.size * 1.3 - stretch * 0.1)

    // Outer violet aura
    ctx.fillStyle = `rgba(107,33,168,${a * 0.22})`
    ctx.beginPath()
    ctx.ellipse(m.x, m.y, rx * 2.5, ry * 2.5, 0, 0, TAU)
    ctx.fill()

    // Dark purple outline
    ctx.strokeStyle = `rgba(147,51,234,${a * 0.95})`
    ctx.lineWidth = 0.8 + 0.6 * m.depth
    ctx.beginPath()
    ctx.ellipse(m.x, m.y, rx, ry, 0, 0, TAU)
    ctx.stroke()

    // Core
    ctx.fillStyle = `rgba(6,2,14,${a * 0.98})`
    ctx.beginPath()
    ctx.ellipse(m.x, m.y, rx * 0.9, ry * 0.9, 0, 0, TAU)
    ctx.fill()
  }



  // Initial Hint
  if (!world.interacted && time > 2.5 && time < world.hintUntil && w[0] > 0.5) {
    const f = smooth(2.5, 4, time) * (1 - smooth(world.hintUntil - 2, world.hintUntil, time)) * w[0]
    const hx = W * 0.72, hy = H * 0.62
    ctx.font = 'italic 15px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = `rgba(168,85,247,${0.65 * f})`
    ctx.fillText('press and hold', hx, hy)
  }

  ctx.restore()

  // Radial vignette edge
  const vg = ctx.createRadialGradient(W / 2, H / 2, mn * (0.35 - 0.22 * P), W / 2, H / 2, Math.hypot(W, H) / 2)
  vg.addColorStop(0, 'rgba(0,0,0,0)')
  vg.addColorStop(1, `rgba(0,0,0,${0.65 + 0.3 * P})`)
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, W, H)
}
// </SCENE_LOGIC>

export default function EndlessBoxesBackground({ sectionIds = ['about', 'work', 'contact'] }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf, W = 0, H = 0, world = null, anchors = [0, 1, 2, 3]
    let s = 0, time = 0, last = performance.now()
    let lastScrollY = window.scrollY
    const mouse = { x: -999, y: -999, active: false }

    const measure = () => {
      const secs = [...document.querySelectorAll('section')]
      const byId = (id) => document.getElementById(id)
      const hero = document.querySelector('.hero') || secs[0]
      const about = byId(sectionIds[0]) || secs[1]
      const contact = byId(sectionIds[2]) || secs[secs.length - 1]
      let work = byId(sectionIds[1]) || byId('projects')
      if (!work) work = secs[Math.floor((secs.indexOf(about) + secs.indexOf(contact)) / 2)]
      const ys = [hero, about, work, contact].map((el) => {
        if (!el) return NaN
        const r = el.getBoundingClientRect()
        return r.top + window.scrollY + r.height / 2
      })
      if (ys.every((y, i) => isFinite(y) && (i === 0 || y > ys[i - 1] + 40))) anchors = ys
      else {
        const span = Math.max(0, document.documentElement.scrollHeight - H)
        anchors = [0, 1, 2, 3].map((k) => H / 2 + (span * k) / 3)
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      world = buildWorld(W, H, W < 768 ? 70 : 120)
      lastScrollY = window.scrollY
      measure()
    }

    const stageFromScroll = () => {
      const focus = window.scrollY + H / 2
      if (focus <= anchors[0]) return 0
      if (focus >= anchors[3]) return 3
      let j = 0
      while (j < 2 && focus >= anchors[j + 1]) j++
      return j + smooth(0.2, 0.8, (focus - anchors[j]) / (anchors[j + 1] - anchors[j]))
    }

    const onMove = (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = e.pointerType !== 'touch'
      if (world && world.hold.down && Math.hypot(e.clientX - world.hold.x, e.clientY - world.hold.y) > 14) pressCancel(world)
    }
    const onDown = (e) => {
      if (reduce || !world || e.button > 0) return
      pressDown(world, { W, H, time }, e.clientX, e.clientY)
    }
    const onUp = () => { if (world) pressUp(world, { W, H, time }) }
    const onCancel = () => { if (world) pressCancel(world) }
    const onScroll = () => { if (world && world.hold.down) pressCancel(world) }
    const onLeave = () => { mouse.active = false }

    const render = (now) => {
      raf = requestAnimationFrame(render)
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (!reduce) time += dt

      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      const target = stageFromScroll()
      s = reduce ? target : s + (target - s) * Math.min(1, dt * 3.5)

      const st = {
        W, H, time, dt,
        w: stageWeights(s),
        mouse: reduce ? { ...mouse, active: false } : mouse,
        reduce,
        scrollDelta,
      }

      update(world, st)
      drawFrame(ctx, st, world)
    }

    resize()
    s = stageFromScroll()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onCancel, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null
    ro && ro.observe(document.body)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onCancel)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerleave', onLeave)
      ro && ro.disconnect()
    }
  }, [sectionIds.join('|')])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
        backgroundColor: '#06050a',
      }}
    />
  )
}
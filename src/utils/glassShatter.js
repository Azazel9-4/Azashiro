// Kyoka Suigetsu shatter trigger.
// Deliberately event-based rather than a ref: GlassShards lives at the App
// root, while things that want to trigger it (Avatar in the navbar, About,
// anywhere else later) live deep in the tree. A CustomEvent avoids prop
// drilling a ref through App -> Navbar -> Avatar just for this one call.

export const GLASS_SHATTER_EVENT = 'kyoka:shatter'

/**
 * triggerGlassShatter
 * Call this from any component to make the background glass shards
 * fracture outward, flash violet, and settle back to their ambient float.
 *
 * @param {Object} opts
 * @param {boolean} opts.playSound - synthesize a short glass-crack sound (default true)
 */
export function triggerGlassShatter({ playSound = true } = {}) {
  window.dispatchEvent(new CustomEvent(GLASS_SHATTER_EVENT))
  if (playSound) playShatterSound()
}

// Synthesizes a brief "crack + glint" sound with the Web Audio API so no
// audio asset needs to ship with the site. Fails silently if the browser
// blocks audio (e.g. no user gesture yet) or doesn't support it.
function playShatterSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime

    // Layer 1: filtered noise burst -> reads as the "crack"
    const duration = 0.28
    const bufferSize = Math.floor(ctx.sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 1800

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.16, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    noise.connect(filter).connect(noiseGain).connect(ctx.destination)
    noise.start(now)
    noise.stop(now + duration)

    // Layer 2: a quick descending sine "glint" -> reads as light catching glass
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(2600, now)
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.15)

    const oscGain = ctx.createGain()
    oscGain.gain.setValueAtTime(0.05, now)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

    osc.connect(oscGain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.2)

    noise.onended = () => ctx.close()
  } catch {
    // Web Audio unavailable or blocked — the visual effect still runs fine.
  }
}

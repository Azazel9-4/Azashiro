import { useEffect, useRef } from 'react'

export default function BackgroundParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Floating Geometric Rings
    const rings = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 80 + 40,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.003,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }))

    // Diagonal Glowing Accent Lines
    const lines = Array.from({ length: 4 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 200 + 100,
      angle: -Math.PI / 4, // 45-degree clean diagonal angle
      pulse: Math.random() * Math.PI,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw Slow Rotating Geometric Rings
      rings.forEach((r) => {
        r.x += r.vx
        r.y += r.vy
        r.rotation += r.vRot

        if (r.x < -100) r.x = width + 100
        if (r.x > width + 100) r.x = -100
        if (r.y < -100) r.y = height + 100
        if (r.y > height + 100) r.y = -100

        ctx.save()
        ctx.translate(r.x, r.y)
        ctx.rotate(r.rotation)

        // Outer Subtle Ring
        ctx.beginPath()
        ctx.arc(0, 0, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Amber Accent Arc Segment
        ctx.beginPath()
        ctx.arc(0, 0, r.radius, 0, Math.PI * 0.4)
        ctx.strokeStyle = 'rgba(200, 137, 42, 0.25)' // Matches --amber
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.restore()
      })

      // 2. Draw Pulsing Diagonal Light Lines
      lines.forEach((l) => {
        l.pulse += 0.015
        const opacity = (Math.sin(l.pulse) + 1) / 2 * 0.2 + 0.05

        const endX = l.x + Math.cos(l.angle) * l.length
        const endY = l.y + Math.sin(l.angle) * l.length

        const grad = ctx.createLinearGradient(l.x, l.y, endX, endY)
        grad.addColorStop(0, 'rgba(200, 137, 42, 0)')
        grad.addColorStop(0.5, `rgba(200, 137, 42, ${opacity})`)
        grad.addColorStop(1, 'rgba(200, 137, 42, 0)')

        ctx.beginPath()
        ctx.moveTo(l.x, l.y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.stroke()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
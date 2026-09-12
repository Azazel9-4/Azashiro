import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GlassShards() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#040209')
    scene.fog = new THREE.FogExp2('#040209', 0.018)

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 18

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.8
    container.appendChild(renderer.domElement)

    // 2. High-Contrast Studio Environment Map
    const envCanvas = document.createElement('canvas')
    envCanvas.width = 1024
    envCanvas.height = 512
    const envCtx = envCanvas.getContext('2d')

    const envGrad = envCtx.createLinearGradient(0, 0, 0, 512)
    envGrad.addColorStop(0, '#020005')
    envGrad.addColorStop(0.5, '#1e0836')
    envGrad.addColorStop(1, '#020005')
    envCtx.fillStyle = envGrad
    envCtx.fillRect(0, 0, 1024, 512)

    // Cool white/cyan softbox light
    const light1 = envCtx.createRadialGradient(240, 180, 0, 240, 180, 170)
    light1.addColorStop(0, 'rgba(255, 255, 255, 1)')
    light1.addColorStop(0.35, 'rgba(56, 189, 248, 0.85)')
    light1.addColorStop(1, 'rgba(0, 0, 0, 0)')
    envCtx.fillStyle = light1
    envCtx.fillRect(0, 0, 512, 380)

    // Royal amethyst/violet rim light
    const light2 = envCtx.createRadialGradient(780, 320, 0, 780, 320, 230)
    light2.addColorStop(0, 'rgba(232, 121, 249, 1)')
    light2.addColorStop(0.45, 'rgba(147, 51, 234, 0.85)')
    light2.addColorStop(1, 'rgba(0, 0, 0, 0)')
    envCtx.fillStyle = light2
    envCtx.fillRect(512, 0, 512, 512)

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = envTexture

    // 3. Directional Lights
    const dirLight1 = new THREE.DirectionalLight('#ffffff', 3.2)
    dirLight1.position.set(12, 14, 8)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight('#a855f7', 4.5)
    dirLight2.position.set(-14, -10, 6)
    scene.add(dirLight2)

    // 4. Physical Mirror/Glass Sheet Material
    const mirrorMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c0d2e'),
      metalness: 0.92,
      roughness: 0.04,
      envMapIntensity: 2.6,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    })

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#f5f3ff'),
      transparent: true,
      opacity: 0.45,
    })

    // 5. Shattered Glass Shapes
    function createGlassFractureShape() {
      const shape = new THREE.Shape()
      const type = Math.random()

      if (type < 0.35) {
        const len = 1.8 + Math.random() * 2.2
        const w = 0.22 + Math.random() * 0.25
        shape.moveTo(0, -len * 0.55)
        shape.lineTo(w * 0.7, (Math.random() - 0.5) * len * 0.15)
        shape.lineTo((Math.random() - 0.5) * w * 0.3, len * 0.45)
        shape.lineTo(-w * 0.6, (Math.random() - 0.5) * len * 0.1)
      } else if (type < 0.68) {
        const w = 0.9 + Math.random() * 0.9
        const h = 1.2 + Math.random() * 1.2
        shape.moveTo(-w * 0.5, -h * 0.5)
        shape.lineTo(w * 0.45, -h * 0.25 + (Math.random() - 0.5) * 0.2)
        shape.lineTo((Math.random() - 0.5) * 0.2, h * 0.5)
        shape.lineTo(-w * 0.35, h * 0.1)
      } else {
        const w1 = 0.9 + Math.random() * 0.7
        const w2 = 0.35 + Math.random() * 0.5
        const h = 0.7 + Math.random() * 0.6
        shape.moveTo(-w1 * 0.5, -h * 0.5)
        shape.lineTo(w1 * 0.5, -h * 0.5)
        shape.lineTo(w2 * 0.5 + (Math.random() - 0.5) * 0.2, h * 0.5)
        shape.lineTo(-w2 * 0.5, h * 0.5)
      }
      return shape
    }

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 1,
    }

    // 6. Spawn Glass Shards
    const isMobile = window.innerWidth < 768
    const SHARD_COUNT = isMobile ? 35 : 75
    const shards = []

    for (let i = 0; i < SHARD_COUNT; i++) {
      const geom = new THREE.ExtrudeGeometry(createGlassFractureShape(), extrudeSettings)
      const mesh = new THREE.Mesh(geom, mirrorMaterial)

      const edgesGeom = new THREE.EdgesGeometry(geom, 25)
      const edgeLine = new THREE.LineSegments(edgesGeom, edgeMaterial)
      mesh.add(edgeLine)

      const sizeRoll = Math.random()
      let scale = 0.6 + Math.random() * 0.5
      if (sizeRoll > 0.85) scale = 1.4 + Math.random() * 0.8
      if (sizeRoll < 0.25) scale = 0.35 + Math.random() * 0.25

      mesh.scale.set(scale, scale, 1)

      const z = -6 + Math.random() * 16
      const spreadX = (z + 16) * 0.65
      const spreadY = (z + 16) * 0.4

      mesh.position.set(
        (Math.random() - 0.5) * spreadX * 2,
        (Math.random() - 0.5) * spreadY * 2,
        z
      )

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )

      scene.add(mesh)

      // Slow, peaceful zero-gravity drift values
      shards.push({
        mesh,
        vx: (Math.random() - 0.5) * 0.0004,
        vy: (Math.random() - 0.5) * 0.0004,
        vz: (Math.random() - 0.5) * 0.0002,
        vRotX: (Math.random() - 0.5) * 0.0006,
        vRotY: (Math.random() - 0.5) * 0.0008,
        vRotZ: (Math.random() - 0.5) * 0.0004,
        boundsX: spreadX + 2,
        boundsY: spreadY + 2,
      })
    }

    // 7. Floating Dust Motes
    const dustCount = isMobile ? 40 : 90
    const dustGeom = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 28
      dustPositions[i + 1] = (Math.random() - 0.5) * 20
      dustPositions[i + 2] = (Math.random() - 0.5) * 18
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dustMat = new THREE.PointsMaterial({
      color: '#e9d5ff',
      size: 0.13,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const dust = new THREE.Points(dustGeom, dustMat)
    scene.add(dust)

    // 8. Calm Mouse Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.6
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 0.6
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // 9. Animation Loop
    let reqId
    const animate = () => {
      reqId = requestAnimationFrame(animate)

      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04
      camera.position.x = mouse.x * 0.8
      camera.position.y = mouse.y * 0.6
      camera.lookAt(0, 0, 0)

      for (let i = 0; i < shards.length; i++) {
        const s = shards[i]
        const m = s.mesh

        m.rotation.x += s.vRotX
        m.rotation.y += s.vRotY
        m.rotation.z += s.vRotZ

        m.position.x += s.vx
        m.position.y += s.vy
        m.position.z += s.vz

        if (m.position.x > s.boundsX) m.position.x = -s.boundsX
        if (m.position.x < -s.boundsX) m.position.x = s.boundsX
        if (m.position.y > s.boundsY) m.position.y = -s.boundsY
        if (m.position.y < -s.boundsY) m.position.y = s.boundsY
      }

      dust.rotation.y += 0.0004
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      scene.clear()
      envTexture.dispose()
      mirrorMaterial.dispose()
      edgeMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#040209',
      }}
    />
  )
}
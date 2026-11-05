import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Dimensions
    const width = container.clientWidth || 300
    const height = container.clientHeight || 300

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.z = 7

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Main 3D Group
    const group = new THREE.Group()
    scene.add(group)

    // 1. Outer Shell: Edges of Icosahedron in Signal Orange
    const outerIcoGeom = new THREE.IcosahedronGeometry(1.9, 1)
    const edgesGeom = new THREE.EdgesGeometry(outerIcoGeom)
    const outerMaterial = new THREE.LineBasicMaterial({
      color: 0xff5b1f,
      transparent: true,
      opacity: prefersReducedMotion ? 0.9 : 0,
    })
    const outerShell = new THREE.LineSegments(edgesGeom, outerMaterial)
    group.add(outerShell)

    // 2. Inner Core: Dense constellation points
    const innerIcoGeom = new THREE.IcosahedronGeometry(1.15, 4)
    const innerMaterial = new THREE.PointsMaterial({
      color: 0xe8e6df,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
    })
    const innerCore = new THREE.Points(innerIcoGeom, innerMaterial)
    group.add(innerCore)

    // 3. Orbit Ring: Tilted Ellipse LineLoop
    const curve = new THREE.EllipseCurve(0, 0, 2.7, 2.7, 0, 2 * Math.PI, false, 0)
    const ringPoints = curve.getPoints(128)
    const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPoints)
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xe8e6df,
      transparent: true,
      opacity: 0.18,
    })
    const orbitRing = new THREE.LineLoop(ringGeom, ringMaterial)
    orbitRing.rotation.x = Math.PI / 2.4
    group.add(orbitRing)

    // Initial scale for intro materialisation
    if (prefersReducedMotion) {
      group.scale.set(1, 1, 1)
    } else {
      group.scale.set(0.6, 0.6, 0.6)
    }

    // Interaction & Animation State Object
    const state = {
      isDragging: false,
      prevPointerX: 0,
      prevPointerY: 0,
      dragSpinX: 0,
      dragSpinY: 0,
      mouseTargetX: 0,
      mouseTargetY: 0,
      currentRotationX: 0,
      currentRotationY: 0,
      autoSpinY: 0,
      isVisible: true,
      animationFrameId: null,
    }

    const startTime = performance.now()

    // Mouse tilt tracking
    const onWindowPointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = (e.clientY / window.innerHeight) * 2 - 1
      state.mouseTargetY = normX * 0.4
      state.mouseTargetX = normY * 0.25

      if (state.isDragging) {
        const deltaX = e.clientX - state.prevPointerX
        const deltaY = e.clientY - state.prevPointerY
        state.dragSpinY += deltaX * 0.01
        state.dragSpinX += deltaY * 0.01
        state.prevPointerX = e.clientX
        state.prevPointerY = e.clientY
      }
    }

    const onCanvasPointerDown = (e) => {
      state.isDragging = true
      state.prevPointerX = e.clientX
      state.prevPointerY = e.clientY
    }

    const onWindowPointerUp = () => {
      state.isDragging = false
    }

    const canvas = renderer.domElement
    canvas.addEventListener('pointerdown', onCanvasPointerDown)
    window.addEventListener('pointermove', onWindowPointerMove)
    window.addEventListener('pointerup', onWindowPointerUp)

    // Resize Handler
    const onResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      if (newWidth === 0 || newHeight === 0) return

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()

    const animate = () => {
      state.animationFrameId = requestAnimationFrame(animate)
      if (!state.isVisible) return

      const elapsedTime = clock.getElapsedTime()
      const now = performance.now()

      // Intro materialisation over ~1 second
      if (!prefersReducedMotion) {
        const introElapsed = (now - startTime) / 1000
        if (introElapsed < 1.0) {
          const progress = Math.min(introElapsed / 1.0, 1)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          group.scale.setScalar(0.6 + 0.4 * easeOut)
          outerMaterial.opacity = 0.9 * easeOut
        } else {
          group.scale.setScalar(1)
          outerMaterial.opacity = 0.9
        }
      }

      // Auto spin on Y
      if (!prefersReducedMotion) {
        state.autoSpinY += 0.0025
        innerCore.rotation.y = -elapsedTime * 0.15
      }

      // Smooth easing toward target rotation
      const targetX = state.mouseTargetX + state.dragSpinX
      const targetY = state.autoSpinY + state.mouseTargetY + state.dragSpinY

      state.currentRotationX += (targetX - state.currentRotationX) * 0.06
      state.currentRotationY += (targetY - state.currentRotationY) * 0.06

      group.rotation.x = state.currentRotationX
      group.rotation.y = state.currentRotationY

      renderer.render(scene, camera)
    }

    // IntersectionObserver to pause rendering when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        state.isVisible = entry ? entry.isIntersecting : false
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    animate()

    // Cleanup on unmount
    return () => {
      if (state.animationFrameId) cancelAnimationFrame(state.animationFrameId)
      observer.disconnect()

      canvas.removeEventListener('pointerdown', onCanvasPointerDown)
      window.removeEventListener('pointermove', onWindowPointerMove)
      window.removeEventListener('pointerup', onWindowPointerUp)
      window.removeEventListener('resize', onResize)

      outerIcoGeom.dispose()
      edgesGeom.dispose()
      outerMaterial.dispose()

      innerIcoGeom.dispose()
      innerMaterial.dispose()

      ringGeom.dispose()
      ringMaterial.dispose()

      renderer.dispose()
      renderer.forceContextLoss()

      if (container.contains(canvas)) {
        container.removeChild(canvas)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab active:cursor-grabbing"
      role="img"
      aria-label="Interactive 3D shape — drag to rotate"
      data-cursor="hot"
    />
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const cleanupRef = useRef(() => {})

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const setupCursor = () => {
      cleanupRef.current()

      // Only enable cursor on fine pointer devices without reduced motion
      if (!pointerQuery.matches || motionQuery.matches) {
        document.body.classList.remove('has-cursor')
        return
      }

      const dot = dotRef.current
      const ring = ringRef.current
      if (!dot || !ring) return

      document.body.classList.add('has-cursor')

      // Center both cursor elements and make them visible
      gsap.set([dot, ring], {
        opacity: 1,
        xPercent: -50,
        yPercent: -50,
        top: 0,
        left: 0,
      })

      // Smooth physics-based follower for the outer ring
      const setRingX = gsap.quickTo(ring, 'x', {
        duration: 0.35,
        ease: 'power3.out',
      })
      const setRingY = gsap.quickTo(ring, 'y', {
        duration: 0.35,
        ease: 'power3.out',
      })

      const onPointerMove = (e) => {
        gsap.set(dot, { x: e.clientX, y: e.clientY })
        setRingX(e.clientX)
        setRingY(e.clientY)
      }

      const onPointerOver = (e) => {
        const target = e.target
        if (!target || !(target instanceof Element)) return

        const isInteractive = target.closest(
          'a, button, input, textarea, [data-cursor="hot"]'
        )

        if (isInteractive) {
          gsap.to(ring, {
            scale: 1.8,
            borderColor: '#ff5b1f',
            duration: 0.25,
            overwrite: 'auto',
          })
        } else {
          gsap.to(ring, {
            scale: 1,
            borderColor: 'rgba(232, 230, 223, 0.6)',
            duration: 0.25,
            overwrite: 'auto',
          })
        }
      }

      window.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerover', onPointerOver)

      cleanupRef.current = () => {
        window.removeEventListener('pointermove', onPointerMove)
        document.removeEventListener('pointerover', onPointerOver)
        document.body.classList.remove('has-cursor')
        if (dot && ring) {
          gsap.set([dot, ring], { opacity: 0 })
        }
      }
    }

    setupCursor()

    pointerQuery.addEventListener('change', setupCursor)
    motionQuery.addEventListener('change', setupCursor)

    return () => {
      cleanupRef.current()
      pointerQuery.removeEventListener('change', setupCursor)
      motionQuery.removeEventListener('change', setupCursor)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-signal rounded-full pointer-events-none z-[999] opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 border border-bone/60 rounded-full pointer-events-none z-[999] opacity-0"
      />
    </>
  )
}

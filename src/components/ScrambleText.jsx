import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/'

export default function ScrambleText({
  text,
  as: Component = 'span',
  className = '',
  delay = 0,
  speed = 30,
  trigger = 'view',
}) {
  const [display, setDisplay] = useState(text)
  const elementRef = useRef(null)
  const hasPlayedRef = useRef(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // If reduced motion is preferred, keep default text and skip animation
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const playDecode = () => {
      if (hasPlayedRef.current) return
      hasPlayedRef.current = true

      let frame = 0
      intervalRef.current = setInterval(() => {
        const lockedCount = Math.floor(frame / 2)

        if (lockedCount >= text.length) {
          setDisplay(text)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          return
        }

        let output = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            output += ' '
          } else if (i < lockedCount) {
            output += text[i]
          } else {
            const randomIndex = Math.floor(Math.random() * GLYPHS.length)
            output += GLYPHS[randomIndex]
          }
        }

        setDisplay(output)
        frame++
      }, speed)
    }

    if (trigger === 'mount') {
      timeoutRef.current = setTimeout(playDecode, delay)
    } else {
      const el = elementRef.current
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0]
            if (entry && entry.isIntersecting && !hasPlayedRef.current) {
              observer.disconnect()
              timeoutRef.current = setTimeout(playDecode, delay)
            }
          },
          { threshold: 0.4 }
        )
        observer.observe(el)

        return () => {
          observer.disconnect()
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, delay, speed, trigger])

  return (
    <Component ref={elementRef} aria-label={text} className={className}>
      <span aria-hidden="true">{display}</span>
    </Component>
  )
}

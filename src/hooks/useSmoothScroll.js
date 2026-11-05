import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    // Synchronize ScrollTrigger with Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's animation ticker for a single unified loop
    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Smooth scroll in-page anchor links (#home, #about, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -60 })
      }
    }
    document.addEventListener('click', handleAnchorClick)

    // Recalculate ScrollTrigger on window load and after layout stabilizes
    const handleLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleLoad)
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 800)

    // Clean up all resources and event listeners on unmount
    return () => {
      clearTimeout(refreshTimer)
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}

export default useSmoothScroll

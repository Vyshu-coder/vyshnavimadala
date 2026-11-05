import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { personalInfo, heroContent } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  const containerRef = useRef(null)
  const dividerRef = useRef(null)

  const nameParts = (personalInfo.name || '').split(' ')
  const firstName = nameParts[0] || ''
  const restName = nameParts.slice(1).join(' ')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) return

      // Staggered entrance for hero elements
      gsap.from('[data-hero="fade"]', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.3,
      })

      // Divider draw animation
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            transformOrigin: 'left center',
            delay: 0.3,
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="hud-grid min-h-screen flex flex-col justify-between overflow-hidden px-5 md:px-10 pt-24 pb-10"
    >
      {/* Main Two-Column Grid */}
      <div className="max-w-[1440px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
        {/* Left Column: Headlines & Actions */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow */}
          <div data-hero="fade">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium">
              {heroContent.eyebrow}
            </span>
          </div>

          {/* Large Split Typography Name */}
          <h1
            data-hero="fade"
            className="text-[clamp(3.2rem,11vw,9.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] font-sans"
          >
            <div className="text-bone">
              <ScrambleText text={firstName} trigger="mount" delay={200} />
            </div>
            <div
              className="text-transparent"
              style={{ WebkitTextStroke: '1.5px #e8e6df' }}
            >
              <ScrambleText text={restName} trigger="mount" delay={500} />
            </div>
          </h1>

          {/* Expanding Divider Line */}
          <div
            ref={dividerRef}
            className="h-px max-w-xl bg-bone/25 origin-left w-full my-2"
          />

          {/* Role & Mission Statement */}
          <div data-hero="fade" className="flex flex-col gap-3 max-w-xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-dim font-medium">
              {personalInfo.role}
            </div>
            <p className="text-lg md:text-xl text-bone/85 leading-relaxed font-sans">
              {heroContent.intro}
            </p>
          </div>

          {/* CTAs */}
          <div data-hero="fade" className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={heroContent.ctaPrimary.href}
              className="group bg-signal text-ink hover:bg-bone font-mono text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3.5 transition-colors flex items-center gap-2"
            >
              <span>{heroContent.ctaPrimary.label}</span>
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
            <a
              href={heroContent.ctaSecondary.href}
              className="border border-bone/30 text-bone hover:border-signal hover:text-signal font-mono text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3.5 transition-colors"
            >
              {heroContent.ctaSecondary.label}
            </a>
          </div>
        </div>

        {/* Right Column: HUD Frame + 3D Core Viewport */}
        <div data-hero="fade" className="w-full">
          <div className="hud-frame border border-bone/10 bg-panel/40 h-[48vh] min-h-[320px] lg:h-[70vh] relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-3.5 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim pointer-events-none z-10">
              core.view — drag to rotate
            </div>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
            <div className="absolute bottom-3.5 right-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim pointer-events-none z-10">
              {personalInfo.city}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD Status Strip */}
      <div
        data-hero="fade"
        className="max-w-[1440px] w-full mx-auto mt-10 border-t border-bone/10 pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-dim flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          <span>{personalInfo.availability}</span>
        </div>
        <a
          href="#about"
          className="hidden sm:inline-block hover:text-bone transition-colors"
        >
          Scroll ↓
        </a>
      </div>
    </section>
  )
}

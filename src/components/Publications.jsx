import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { publications } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

export default function Publications() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) return

      // Fade-in entrance for each card, fires once
      cardRefs.current.forEach((el) => {
        if (!el) return
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!publications.length) return null

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="px-5 md:px-10 py-28 md:py-40 border-t border-bone/10 relative"
    >
      {/* Anchor alias for singular #publication */}
      <span id="publication" className="sr-only" aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">

        {/* Left column — sticky heading */}
        <div className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-3">
          <ScrambleText
            text="04 / Publications"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium block"
          />
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone font-sans">
            Research published &amp; peer-reviewed.
          </h2>
        </div>

        {/* Right column — publication cards */}
        <div className="flex flex-col gap-6">
          {publications.map((pub, index) => (
            <article
              key={pub.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              data-cursor="hot"
              className="relative border border-bone/10 bg-panel/60 hover:border-bone/25 p-6 md:p-8 flex flex-col gap-5 group transition-colors duration-300"
            >
              {/* HUD corner brackets */}
              <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t border-l border-signal opacity-60" aria-hidden="true" />
              <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t border-r border-signal opacity-60" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b border-l border-signal opacity-60" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b border-r border-signal opacity-60" aria-hidden="true" />

              {/* Journal + Date badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-signal font-medium">
                  {pub.journal}
                </span>
                <span className="font-mono text-xs text-dim tracking-[0.15em]">
                  — {pub.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold font-sans text-bone leading-snug group-hover:text-signal transition-colors duration-200">
                {pub.title}
              </h3>

              {/* Summary */}
              <p className="text-bone/70 font-sans text-sm md:text-base leading-relaxed">
                {pub.summary}
              </p>

              {/* Tags */}
              {pub.tags && pub.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] uppercase tracking-[0.15em] text-dim"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              {pub.url && (
                <div className="pt-2">
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-signal text-ink hover:bg-bone font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2.5 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Read Paper</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

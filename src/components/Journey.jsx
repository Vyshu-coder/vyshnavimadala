import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

export default function Journey() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const fillLineRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) return

      // Animate the vertical line fill as user scrolls past the list
      if (fillLineRef.current && listRef.current) {
        gsap.fromTo(
          fillLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        )
      }

      // Waypoint activation and entrance animation for each timeline item
      itemRefs.current.forEach((el) => {
        if (!el) return

        // Toggle 'is-on' class when the scroll reaches the item
        ScrollTrigger.create({
          trigger: el,
          start: 'top 65%',
          onEnter: () => el.classList.add('is-on'),
          onLeaveBack: () => el.classList.remove('is-on'),
        })

        // Fade in from right once
        gsap.from(el, {
          opacity: 0,
          x: 30,
          duration: 0.8,
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

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="px-5 md:px-10 py-28 md:py-40 border-t border-bone/10"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        {/* Left Column: Sticky Section Header */}
        <div className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-3">
          <ScrambleText
            text="03 / Journey"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium block"
          />
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone font-sans">
            Where I&apos;ve been learning and building.
          </h2>
        </div>

        {/* Right Column: Timeline List with Reactive Nodes */}
        <div className="relative">
          <ol
            ref={listRef}
            className="relative pl-8 md:pl-10 flex flex-col gap-12 md:gap-16"
          >
            {/* Base Vertical Timeline Line */}
            <div
              className="absolute left-0 top-3 bottom-3 w-px bg-bone/15 pointer-events-none"
              aria-hidden="true"
            />

            {/* Signal-Orange Scroll-Driven Fill Line */}
            <div
              ref={fillLineRef}
              className="absolute left-0 top-3 bottom-3 w-px bg-signal origin-top pointer-events-none"
              style={{ transform: 'scaleY(0)' }}
              aria-hidden="true"
            />

            {/* Experience Entries */}
            {experience.map((item, index) => (
              <li
                key={`${item.org}-${item.period}`}
                ref={(el) => (itemRefs.current[index] = el)}
                className="relative flex flex-col gap-2 [&.is-on_.node]:bg-signal [&.is-on_.node]:scale-100"
              >
                {/* Timeline Waypoint Node */}
                <div
                  className="node absolute -left-8 md:-left-10 top-1.5 w-[15px] h-[15px] -translate-x-1/2 border border-signal bg-ink scale-75 transition-all duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Period */}
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-dim font-medium">
                  {item.period}
                </div>

                {/* Role */}
                <h3 className="text-2xl md:text-3xl font-bold font-sans text-bone">
                  {item.role}
                </h3>

                {/* Organisation */}
                <div className="font-mono text-sm text-signal font-medium">
                  {item.org}
                </div>

                {/* Description */}
                <p className="text-bone/70 font-sans leading-relaxed text-sm md:text-base max-w-xl mt-1">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

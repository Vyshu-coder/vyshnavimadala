import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo, aboutContent, skillGroups } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

// Load portrait image dynamically with fallback
const portraitModules = import.meta.glob(
  '../assets/about/about-portrait.*',
  { eager: true, import: 'default' }
)
const portraitUrl = Object.values(portraitModules)[0] || null

export default function About() {
  const sectionRef = useRef(null)
  const statRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) return

      // Section reveal animation for elements marked data-about="reveal"
      gsap.from('[data-about="reveal"]', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      // Count-up animation for numeric stats
      statRefs.current.forEach((el, index) => {
        if (!el) return
        const stat = aboutContent.stats[index]
        if (!stat) return

        const targetValue = stat.value
        const isDecimal = targetValue % 1 !== 0
        const counter = { val: 0 }

        // Start text from 0
        el.textContent = isDecimal ? '0.0' : '0'

        gsap.to(counter, {
          val: targetValue,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = isDecimal
              ? counter.val.toFixed(1)
              : Math.round(counter.val).toString()
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-5 md:px-10 py-28 md:py-40 border-t border-bone/10"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section HUD Label */}
        <div data-about="reveal" className="mb-10">
          <ScrambleText
            text={aboutContent.label}
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium"
          />
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left Column: Portrait */}
          <div data-about="reveal" className="w-full flex justify-center lg:justify-start">
            <div className="hud-frame aspect-[4/5] max-w-[420px] w-full border border-bone/10 bg-panel overflow-hidden relative group">
              {portraitUrl ? (
                <img
                  src={portraitUrl}
                  alt="Vyshnavi Madala — Data Analyst, TAP Academy student"
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-xs uppercase tracking-widest text-dim border border-dashed border-bone/20 p-6 text-center">
                  [PORTRAIT_PLACEHOLDER]
                </div>
              )}

              {/* Signal Orange Tint Overlay */}
              <div
                className="absolute inset-0 bg-signal mix-blend-multiply opacity-25 pointer-events-none"
                aria-hidden="true"
              />

              {/* HUD Identification Badge */}
              <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.25em] text-dim bg-ink/80 px-2 py-0.5 border border-bone/10 pointer-events-none z-10">
                ID · {personalInfo.brandName}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Stats & Skills */}
          <div className="flex flex-col">
            {/* Heading */}
            <h2
              data-about="reveal"
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone font-sans"
            >
              {aboutContent.heading}
            </h2>

            {/* Paragraph */}
            <p
              data-about="reveal"
              className="text-lg md:text-xl leading-relaxed text-bone/75 max-w-2xl font-sans mt-6"
            >
              {aboutContent.paragraph}
            </p>

            {/* Numeric Stats */}
            <dl
              data-about="reveal"
              className="border-y border-bone/10 py-8 my-10 grid grid-cols-3 gap-4 md:gap-8"
            >
              {aboutContent.stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <dd className="text-4xl md:text-6xl font-bold font-sans text-bone flex items-baseline">
                    <span ref={(el) => (statRefs.current[i] = el)}>
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-signal ml-0.5">{stat.suffix}</span>
                    )}
                  </dd>
                  <dt className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-dim mt-2">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            {/* Skill Modules Grid */}
            <div
              data-about="reveal"
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-bone/10 border border-bone/10"
            >
              {skillGroups.map((group, idx) => (
                <div
                  key={group.title}
                  className="bg-ink p-6 hover:bg-panel transition-colors duration-200"
                >
                  {/* Module Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold">
                      {group.title}
                    </span>
                    <span className="font-mono text-[11px] text-dim tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="border border-bone/15 px-2.5 py-1 font-mono text-xs text-bone/90 hover:border-signal/50 hover:text-signal transition-colors duration-150"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

// Dynamically import all project assets with Vite glob
const projectImages = import.meta.glob(
  '../assets/projects/project-*.*',
  { eager: true, import: 'default' }
)

function getProjectImage(projectId) {
  for (const path in projectImages) {
    if (path.includes(`/${projectId}.`) || path.includes(`\\${projectId}.`)) {
      return projectImages[path]
    }
  }
  return null
}

function ProjectCard({ project }) {
  const imageUrl = getProjectImage(project.id)

  return (
    <article
      data-cursor="hot"
      className="border border-bone/10 bg-panel/60 w-full md:w-[min(560px,42vw)] shrink-0 group flex flex-col justify-between transition-colors duration-300 hover:border-bone/25"
    >
      {/* Top Cover Media Area */}
      <div className="aspect-[16/10] md:aspect-[16/8] border-b border-bone/10 bg-ink overflow-hidden relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="hud-grid w-full h-full flex items-center justify-center font-mono text-xs uppercase tracking-widest text-dim">
            {project.id}
          </div>
        )}

        {/* Top-Left Project Counter & Year Badge */}
        <div className="absolute top-3 left-3 bg-ink/80 px-2.5 py-1 border border-bone/10 font-mono text-[10px] uppercase tracking-[0.25em] text-signal z-10 pointer-events-none">
          {project.number} / {project.year}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 md:p-8 flex flex-col gap-6 flex-1 justify-between">
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-bone font-sans group-hover:text-signal transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-bone/70 font-sans leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-dim"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-signal text-ink hover:bg-bone font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2.5 transition-colors inline-flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-bone/30 text-bone hover:border-signal hover:text-signal font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2.5 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Live</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressBarRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      () => {
        const track = trackRef.current
        const section = sectionRef.current
        const progressBar = progressBarRef.current
        if (!track || !section) return

        const getScrollDistance = () => {
          return track.scrollWidth - window.innerWidth + 80
        }

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar) {
                progressBar.style.transform = `scaleX(${self.progress})`
              }
            },
          },
        })

        return () => {
          tween.kill()
        }
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full overflow-hidden py-24 md:py-0 md:h-screen md:flex md:flex-col md:justify-center md:pt-20 md:pb-6 border-t border-bone/10"
    >
      {/* Header Row */}
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <ScrambleText
            text="02 / Selected work"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium mb-3 block"
          />
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em] text-bone font-sans">
            Projects
          </h2>
        </div>

        <div className="hidden md:block font-mono text-xs text-dim uppercase tracking-[0.2em]">
          {projects.length} projects · scroll →
        </div>
      </div>

      {/* Projects Track (Vertical stack on mobile, horizontal row on desktop) */}
      <div
        ref={trackRef}
        className="flex flex-col gap-6 px-5 md:px-10 md:flex-row md:w-max md:gap-8"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Desktop Scroll Progress Indicator */}
      <div className="hidden md:block max-w-[1440px] w-full mx-auto px-5 md:px-10 mt-8">
        <div className="w-full h-0.5 bg-bone/10 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-signal origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  )
}

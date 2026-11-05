import { useState, useEffect } from 'react'
import { personalInfo, navLinks, heroContent } from '../data/portfolioData'

function getFormattedTime(timezone) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone || 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  } catch {
    return new Date().toLocaleTimeString('en-GB', { hour12: false })
  }
}

export default function Hud() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [time, setTime] = useState(() => getFormattedTime(personalInfo.timezone))

  const statusLines = heroContent.statusLines || []

  // Compute initials for the brand badge (e.g. "VM")
  const initials = personalInfo.brandName
    ? personalInfo.brandName
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    : 'VM'

  // Scroll listener to toggle background blur and bottom border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Rotate through status lines every 3.5 seconds
  useEffect(() => {
    if (statusLines.length <= 1) return
    const statusTimer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusLines.length)
    }, 3500)
    return () => clearInterval(statusTimer)
  }, [statusLines.length])

  // Update live clock every second
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setTime(getFormattedTime(personalInfo.timezone))
    }, 1000)
    return () => clearInterval(clockTimer)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-ink/80 backdrop-blur-md border-b border-bone/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">
        {/* Left: Brand badge and name */}
        <a
          href="#home"
          className="flex items-center gap-3 group"
          aria-label={`${personalInfo.brandName} - Back to top`}
        >
          <div className="w-8 h-8 flex items-center justify-center border border-signal font-mono text-xs font-semibold text-signal transition-transform duration-200 group-hover:scale-105">
            {initials}
          </div>
          <span className="hidden sm:inline-block font-mono text-xs uppercase tracking-[0.2em] text-bone font-medium">
            {personalInfo.brandName}
          </span>
        </a>

        {/* Centre: Rotating status HUD (Desktop lg+) */}
        <div
          className="hidden lg:flex items-center gap-2.5 px-3 py-1 border border-bone/10 bg-panel/50"
          aria-live="polite"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            {statusLines[statusIndex] || 'ONLINE'}
          </span>
        </div>

        {/* Right: Desktop Navigation + Live Clock (md+) */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.18em] text-bone/70 hover:text-signal transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div
            className="font-mono text-xs text-dim tabular-nums border-l border-bone/15 pl-6"
            title={personalInfo.timezone}
          >
            <span className="text-bone/40 mr-1.5">TIME</span>
            <span className="text-bone/90">{time}</span>
          </div>
        </div>

        {/* Mobile menu toggle (below md) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden font-mono text-xs uppercase tracking-[0.18em] text-bone px-3 py-1.5 border border-bone/20 hover:border-signal hover:text-signal transition-colors"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-16 inset-x-0 bg-ink/95 backdrop-blur-md border-b border-bone/10 px-6 py-6 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-bone hover:text-signal border-b border-bone/10 py-4 transition-colors font-sans"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-dim">
            <span>{personalInfo.city}</span>
            <span className="tabular-nums text-bone/80">{time}</span>
          </div>
        </div>
      )}
    </header>
  )
}

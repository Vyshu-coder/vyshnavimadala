import {
  personalInfo,
  socialLinks,
  navLinks,
  footerContent,
  academy,
} from '../data/portfolioData'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  // Filter out empty social entries
  const activeSocials = [
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
  ].filter((item) => Boolean(item.url && item.url.trim() !== ''))

  return (
    <footer className="w-full overflow-hidden border-t border-bone/10 px-5 md:px-10 pt-16 pb-8 bg-ink">
      <div className="max-w-[1440px] mx-auto">
        {/* Three Columns on Desktop / Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-14">
          {/* Col 1: Navigation */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold mb-4 block">
              Navigate
            </span>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-bone/75 hover:text-signal transition-colors font-mono text-xs uppercase tracking-wider block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Social Channels */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold mb-4 block">
              Elsewhere
            </span>
            <ul className="flex flex-col gap-2">
              {activeSocials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone/75 hover:text-signal transition-colors font-mono text-xs uppercase tracking-wider inline-flex items-center gap-1 py-0.5"
                  >
                    <span>{social.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Hello */}
          <div className="flex flex-col md:text-right md:items-end">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold mb-4 block">
              Say hello
            </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-bone/75 hover:text-signal transition-colors font-mono text-sm block mb-1"
            >
              {personalInfo.email}
            </a>
            <span className="font-mono text-xs text-dim block">
              {personalInfo.city}
            </span>
          </div>
        </div>

        {/* Faint Brand Watermark */}
        <div
          aria-hidden="true"
          className="w-full text-center uppercase whitespace-nowrap text-[13.5vw] font-bold leading-none tracking-[-0.05em] text-bone/[0.07] select-none my-6 pointer-events-none font-sans"
        >
          {personalInfo.brandName}
        </div>

        {/* Bottom Credits Row */}
        <div className="border-t border-bone/10 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-dim flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            © {CURRENT_YEAR} {personalInfo.name} · {footerContent.tagline}
          </div>

          <div>
            Trained at{' '}
            <a
              href={academy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-bone/80 hover:text-signal transition-colors"
            >
              {academy.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

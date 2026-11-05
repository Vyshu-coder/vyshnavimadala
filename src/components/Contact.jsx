import { useState, useRef } from 'react'
import {
  personalInfo,
  socialLinks,
  contactContent,
  emailjsConfig,
} from '../data/portfolioData'
import ScrambleText from './ScrambleText'

export default function Contact() {
  const formRef = useRef(null)
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null)

  const firstName = personalInfo.name
    ? personalInfo.name.split(' ')[0].toLowerCase()
    : 'vyshnavi'

  // Social links list excluding empty values
  const activeSocials = [
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
  ].filter((item) => Boolean(item.url && item.url.trim() !== ''))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return

    const { serviceId, templateId, publicKey } = emailjsConfig
    const isConfigured =
      serviceId &&
      templateId &&
      publicKey &&
      serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'

    if (!isConfigured) {
      // Fallback: Construct mailto link if EmailJS credentials are placeholder
      const formData = new FormData(formRef.current)
      const name = formData.get('user_name') || ''
      const email = formData.get('user_email') || ''
      const message = formData.get('message') || ''

      const subject = encodeURIComponent('Portfolio contact')
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )

      window.open(
        `mailto:${personalInfo.email}?subject=${subject}&body=${body}`,
        '_blank'
      )

      setStatus({ type: 'success', message: '✓ Message sent. Talk soon.' })
      formRef.current.reset()
      setTimeout(() => setStatus(null), 4000)
      return
    }

    // Dynamic EmailJS transmission
    setIsSending(true)
    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus({ type: 'success', message: '✓ Message sent. Talk soon.' })
      formRef.current.reset()
    } catch (err) {
      console.error('EmailJS transmission failed:', err)
      setStatus({
        type: 'error',
        message: '✕ Something went wrong. Please try again.',
      })
    } finally {
      setIsSending(false)
      setTimeout(() => setStatus(null), 4000)
    }
  }

  return (
    <section
      id="contact"
      className="hud-grid px-5 md:px-10 py-28 md:py-40 border-t border-bone/10"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        {/* Left Column: Direct Info & Social Connections */}
        <div className="flex flex-col">
          <ScrambleText
            text={contactContent.label}
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium mb-3 block"
          />

          <h2 className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-bone font-sans mb-6">
            {contactContent.heading}
          </h2>

          <p className="text-lg text-bone/70 max-w-md font-sans mb-8 leading-relaxed">
            {contactContent.note}
          </p>

          {/* Email link with thick signal underline */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="font-mono text-lg md:text-2xl underline decoration-signal decoration-2 underline-offset-8 text-bone hover:text-signal transition-colors mb-4 w-fit"
          >
            {personalInfo.email}
          </a>

          {/* Optional Phone */}
          {personalInfo.phone && (
            <div className="font-mono text-sm text-dim mb-8">
              {personalInfo.phone}
            </div>
          )}

          {/* Social Links */}
          {activeSocials.length > 0 && (
            <div className="flex flex-wrap gap-6 items-center pt-2">
              {activeSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-bone/80 hover:text-signal transition-colors inline-flex items-center gap-1"
                >
                  <span>{social.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Terminal-Style Form */}
        <div className="hud-frame border border-bone/10 bg-ink/70 backdrop-blur p-6 md:p-10 flex flex-col gap-6">
          {/* Terminal Command Header */}
          <div className="font-mono text-xs text-dim flex items-center gap-1.5 mb-2">
            <span className="text-signal font-semibold">$</span>
            <span>new message --to {firstName}</span>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name Input */}
            <label className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-medium">
              <span>&gt; name</span>
              <input
                type="text"
                name="user_name"
                required
                placeholder="Your full name"
                className="bg-transparent border-b border-bone/20 focus:border-signal font-mono text-sm text-bone py-2 outline-none rounded-none transition-colors placeholder:text-dim/50"
              />
            </label>

            {/* Email Input */}
            <label className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-medium">
              <span>&gt; email</span>
              <input
                type="email"
                name="user_email"
                required
                placeholder="you@example.com"
                className="bg-transparent border-b border-bone/20 focus:border-signal font-mono text-sm text-bone py-2 outline-none rounded-none transition-colors placeholder:text-dim/50"
              />
            </label>

            {/* Message Textarea */}
            <label className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-medium">
              <span>&gt; message</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about the role or project…"
                className="bg-transparent border-b border-bone/20 focus:border-signal font-mono text-sm text-bone py-2 outline-none rounded-none resize-none transition-colors placeholder:text-dim/50"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-signal text-ink hover:bg-bone font-mono text-xs font-semibold uppercase tracking-[0.25em] px-6 py-4 transition-colors flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{isSending ? 'Sending…' : 'Send message'}</span>
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            {/* Status Line */}
            <p
              role="status"
              aria-live="polite"
              className={`font-mono text-xs min-h-[1.5rem] transition-opacity duration-300 ${
                status ? 'opacity-100' : 'opacity-0'
              } ${
                status?.type === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {status?.message || ''}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

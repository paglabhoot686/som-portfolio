import { useState, useEffect } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#writing', label: 'Writing' },
  { href: '#adventures', label: 'Adventures' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-hero-bg/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-2xl text-hero-text hover:text-accent transition-colors duration-300 z-50"
          >
            Som.
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] text-hero-text/50 hover:text-hero-text transition-colors duration-300 tracking-[0.25em] uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Clock + Mobile toggle */}
          <div className="flex items-center gap-6">
            <span className="nav-clock text-[11px] text-hero-text/30 tracking-[0.15em] hidden md:block">
              BLR {time}
            </span>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-hero-text z-50 p-2 relative w-8 h-8 flex flex-col justify-center items-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[1px] w-6 bg-hero-text transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-[0.5px]' : '-translate-y-1'
                }`}
              />
              <span
                className={`block h-[1px] w-6 bg-hero-text transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-[0.5px]' : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}>
        <div className="flex flex-col gap-2 px-4">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}
              className="opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="absolute bottom-10 left-6 text-hero-text/30 text-xs tracking-[0.2em]">
          BLR {time}
        </div>
      </div>
    </>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)
  const headshotRef = useRef(null)
  const nameRef = useRef(null)
  const contentRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Headshot entrance
      if (headshotRef.current) {
        tl.from(headshotRef.current, {
          scale: 0.85,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
      }

      // Name chars entrance
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.hero-char')
        tl.from(chars, {
          yPercent: 120,
          rotateX: -40,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.04,
        }, '-=0.6')
      }

      // Content columns
      if (contentRef.current) {
        tl.from(contentRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.4')
      }

      // CTA buttons
      if (ctaRef.current) {
        tl.from(ctaRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.3')
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const splitChars = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="hero-char inline-block" style={{ perspective: '600px' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#F9FAFB] flex flex-col justify-center overflow-hidden">
      <div className="relative w-full px-6 md:px-10 pt-24 md:pt-20">
        
        {/* Hero main row: Photo left + Name right */}
        <div className="flex items-stretch gap-[clamp(0.75rem,2vw,2rem)]">
          {/* Square headshot — height matches 2 lines of hero name text */}
          {/* font-size: clamp(3rem,9vw,10rem), line-height: 0.88, 2 lines ≈ font-size × 1.76 */}
          <div ref={headshotRef} className="flex-shrink-0 self-start" style={{
            width: 'clamp(5.3rem, 15.84vw, 17.6rem)',
            height: 'clamp(5.3rem, 15.84vw, 17.6rem)',
          }}>
            <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <img
                src="/headshot.png"
                alt="Som Chakravarty"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
          </div>

          {/* Name — sized so CHAKRAVARTY fits on one line */}
          <div ref={nameRef} className="flex-1 min-w-0">
            <div className="overflow-hidden">
              <h1 className="hero-name text-gray-900" style={{ perspective: '600px' }}>
                {splitChars('SOM')}
              </h1>
            </div>
            <div className="overflow-hidden mt-[-0.02em]">
              <h1 className="hero-name text-gray-900" style={{ perspective: '600px' }}>
                {splitChars('CHAKRAVARTY')}
              </h1>
            </div>
          </div>
        </div>

        {/* Content columns below */}
        <div ref={contentRef} className="mt-10 md:mt-14 grid md:grid-cols-3 gap-6 md:gap-10">
          <div>
            <p className="text-gray-900 text-xs md:text-sm tracking-[0.35em] uppercase font-semibold mb-3">
              Product × UX × AI
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Director-level Product Leader with 18 years across UX design, product management, and AI.
            </p>
          </div>
          <div>
            <p className="text-gray-900 text-xs md:text-sm tracking-[0.35em] uppercase font-semibold mb-3">
              Background
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Carnegie Mellon HCI. 9 years UX + 9 years Product. Enterprise SaaS, AI solutions, design systems.
            </p>
          </div>
          <div>
            <p className="text-gray-900 text-xs md:text-sm tracking-[0.35em] uppercase font-semibold mb-3">
              Currently
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Building AI-powered infrastructure from Bangalore. Exploring what's next at the intersection of product and intelligence.
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors tracking-wide"
            data-cursor-hover
          >
            Get in Touch
          </a>
          <a
            href="https://www.linkedin.com/in/somchakravarty/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-gray-200 text-gray-500 text-sm font-medium rounded-full hover:border-gray-900 hover:text-gray-900 transition-colors tracking-wide"
            data-cursor-hover
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Credential badges */}
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-gray-400 text-[10px] tracking-[0.25em] uppercase">
          <span>Carnegie Mellon HCI '14</span>
          <span>·</span>
          <span>Ex-Director of Product</span>
          <span>·</span>
          <span>Enterprise SaaS</span>
          <span>·</span>
          <span>Bangalore, India</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-gray-400 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="scroll-indicator" />
      </div>
    </section>
  )
}

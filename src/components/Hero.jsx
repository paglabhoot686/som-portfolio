import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const contentRef = useRef(null)
  const headshotRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      if (line1Ref.current) {
        const chars1 = line1Ref.current.querySelectorAll('.hero-char')
        tl.from(chars1, {
          yPercent: 120,
          rotateX: -40,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.06,
        })
      }

      if (line2Ref.current) {
        const chars2 = line2Ref.current.querySelectorAll('.hero-char')
        tl.from(chars2, {
          yPercent: 120,
          rotateX: -40,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.04,
        }, '-=0.7')
      }

      if (contentRef.current) {
        tl.from(contentRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.4')
      }

      // Headshot fade-in with a slight scale
      if (headshotRef.current) {
        tl.from(headshotRef.current, {
          scale: 0.85,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.6')
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
      <div className="relative w-full px-6 md:px-10 pt-20">
        {/* Main typography */}
        <div className="overflow-hidden">
          <h1 ref={line1Ref} className="display-massive text-gray-900" style={{ perspective: '600px' }}>
            {splitChars('SOM')}
          </h1>
        </div>
        <div className="overflow-hidden mt-[-0.02em]">
          <h1 ref={line2Ref} className="display-massive text-gray-900" style={{ perspective: '600px' }}>
            {splitChars('CHAKRAVARTY')}
          </h1>
        </div>

        {/* Rich content below the name */}
        <div ref={contentRef} className="mt-10 md:mt-14 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          {/* Left: Bio */}
          <div className="md:col-span-5 space-y-5 order-2 md:order-1">
            <p className="text-gray-900 text-xs md:text-sm tracking-[0.35em] uppercase font-semibold">
              Product × UX × AI
            </p>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Director-level Product Leader with 18 years across UX design, product management, and AI. 
              Carnegie Mellon HCI. Currently building what's next from Bangalore.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors tracking-wide"
                data-cursor-hover
              >
                Get in Touch
              </a>
              <a
                href="https://www.linkedin.com/in/somchakravarty/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-500 text-sm font-medium rounded-full hover:border-gray-900 hover:text-gray-900 transition-colors tracking-wide"
                data-cursor-hover
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Center spacer */}
          <div className="hidden md:block md:col-span-2 order-3 md:order-2" />

          {/* Right: Headshot + Stats */}
          <div className="md:col-span-5 order-1 md:order-3 flex flex-col items-center md:items-start gap-8">
            {/* Headshot */}
            <div ref={headshotRef} className="relative">
              <div
                className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden border border-gray-200 shadow-lg"
              >
                <img
                  src="/headshot.png"
                  alt="Som Chakravarty"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-6 w-full">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <p className="font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight leading-none">18</p>
                <p className="text-gray-400 text-xs tracking-[0.15em] uppercase mt-2">Years Exp.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <p className="font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight leading-none">9+9</p>
                <p className="text-gray-400 text-xs tracking-[0.15em] uppercase mt-2">UX + Product</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <p className="font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight leading-none">AI</p>
                <p className="text-gray-400 text-xs tracking-[0.15em] uppercase mt-2">Building Now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Credential badges */}
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-gray-400 text-[10px] tracking-[0.25em] uppercase">
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

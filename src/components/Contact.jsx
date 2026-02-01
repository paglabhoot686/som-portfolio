import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const linksRef = useRef(null)
  const detailsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scale: 0.8, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      if (linksRef.current) {
        gsap.from(linksRef.current.children, {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: linksRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }

      if (detailsRef.current) {
        gsap.from(detailsRef.current.children, {
          y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: detailsRef.current, start: 'top 95%', toggleActions: 'play none none reverse' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-32 md:py-44 bg-hero-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        background: 'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(197,112,93,0.1) 0%, transparent 70%)',
      }} />

      <div className="relative w-full px-6 md:px-10 text-center">
        <p className="text-accent text-xs tracking-[0.35em] uppercase font-medium mb-6">Get in Touch</p>

        <h2 ref={titleRef} className="display-large text-hero-text mb-6">
          LET&apos;S TALK
        </h2>

        <p className="text-hero-text/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12">
          Whether it's product strategy, a new app idea, a UX challenge, or AI integration — 
          I'd love to hear about it. Open to fractional roles, consulting, and collaborations.
        </p>

        {/* Contact links */}
        <div ref={linksRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="mailto:somnath686@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-dark transition-colors tracking-wide"
            data-cursor-hover>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            somnath686@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/somchakravarty/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-hero-text/20 text-hero-text/60 text-sm font-medium rounded-full hover:border-accent hover:text-accent transition-colors tracking-wide"
            data-cursor-hover>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>

        {/* Details grid */}
        <div ref={detailsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div>
            <p className="text-hero-text/20 text-[10px] tracking-[0.2em] uppercase mb-1">Location</p>
            <p className="text-hero-text/50 text-sm">Bangalore, India</p>
          </div>
          <div>
            <p className="text-hero-text/20 text-[10px] tracking-[0.2em] uppercase mb-1">Availability</p>
            <p className="text-accent/80 text-sm">Open to work</p>
          </div>
          <div>
            <p className="text-hero-text/20 text-[10px] tracking-[0.2em] uppercase mb-1">Remote</p>
            <p className="text-hero-text/50 text-sm">Worldwide</p>
          </div>
          <div>
            <p className="text-hero-text/20 text-[10px] tracking-[0.2em] uppercase mb-1">Timezone</p>
            <p className="text-hero-text/50 text-sm">IST (UTC+5:30)</p>
          </div>
        </div>
      </div>
    </section>
  )
}

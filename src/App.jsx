import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import CaseStudy from './components/CaseStudy'
import Writing from './components/Writing'
import Adventures from './components/Adventures'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // ── Lenis Smooth Scroll ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // ── Custom Cursor ──
    const cursor = cursorRef.current
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
      const xTo = gsap.quickTo(cursor, 'left', { duration: 0.4, ease: 'power3' })
      const yTo = gsap.quickTo(cursor, 'top', { duration: 0.4, ease: 'power3' })

      const onMouseMove = (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }

      const onMouseEnter = () => cursor.classList.add('hovering')
      const onMouseLeave = () => cursor.classList.remove('hovering')

      window.addEventListener('mousemove', onMouseMove)

      const addHoverListeners = () => {
        document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
          el.addEventListener('mouseenter', onMouseEnter)
          el.addEventListener('mouseleave', onMouseLeave)
        })
      }

      addHoverListeners()
      const observer = new MutationObserver(addHoverListeners)
      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        observer.disconnect()
        lenis.destroy()
        gsap.ticker.remove(lenis.raf)
      }
    }

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div className="grain-overlay" />

      <div className="min-h-screen">
        <Nav />
        <Hero />
        <About />
        <Services />
        <CaseStudy />
        <Writing />
        <Adventures />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

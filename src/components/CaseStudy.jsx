import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: '✦', label: 'AI Agent', desc: 'Built-in AI that collaborates on tasks, creates content, and automates workflows' },
  { icon: '◫', label: 'Kanban Board', desc: 'Drag-and-drop task management with customizable boards and real-time updates' },
  { icon: '⟐', label: 'Real-Time Sync', desc: 'Cross-platform notifications via Telegram, push, and in-app channels' },
  { icon: '◎', label: 'Collaborative', desc: 'Multi-user workspace with role-based access, comments, and shared context' },
]

const techStack = ['React 19', 'Supabase', 'Tailwind CSS', 'Vite', 'AI / LLM', 'Edge Functions']

const otherProjects = [
  {
    title: 'Portfolio Site',
    desc: 'This very site — built with Vite, React, GSAP, and Tailwind. Awwwards-inspired editorial design.',
    tech: ['React', 'GSAP', 'Lenis', 'Tailwind'],
  },
  {
    title: 'AI Agent Infrastructure',
    desc: 'A personal AI assistant (Bhoot 👻) that manages email, calendar, tasks, notifications, and more via natural language.',
    tech: ['Node.js', 'Claude API', 'Telegram', 'Supabase'],
  },
  {
    title: 'Arduino/RPi Projects',
    desc: 'Hardware tinkering — sensor systems, home automation, 3D-printed enclosures on a Bambu Lab A1.',
    tech: ['Arduino', 'Raspberry Pi', '3D Printing', 'C++'],
  },
]

export default function CaseStudy() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const screenshotRef = useRef(null)
  const contentRef = useRef(null)
  const otherRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 80, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      if (screenshotRef.current) {
        gsap.to(screenshotRef.current, {
          y: -60, ease: 'none',
          scrollTrigger: { trigger: screenshotRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: contentRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      if (otherRef.current) {
        gsap.from(otherRef.current.querySelectorAll('.project-card'), {
          y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: otherRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="py-32 md:py-44 bg-hero-bg relative overflow-hidden">
      <div className="w-full px-6 md:px-10">
        <p className="text-accent text-xs tracking-[0.35em] uppercase font-medium mb-6">Featured Work</p>

        <h2 ref={titleRef} className="display-large text-hero-text mb-8 md:mb-12">
          MISSION<br />CONTROL
        </h2>
        
        <p className="text-hero-text/40 text-sm md:text-base max-w-xl mb-16 md:mb-24 leading-relaxed">
          A collaborative task management platform built from the ground up with AI at its core. 
          Mission Control isn't just another project board — it's where human intent meets AI capability.
        </p>

        {/* Main layout */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Screenshot */}
          <div className="md:col-span-7 lg:col-span-8">
            <div ref={screenshotRef} className="bg-[#111] rounded-xl overflow-hidden border border-white/5 aspect-[16/10] relative">
              <div className="absolute inset-0 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/60" />
                  </div>
                  <div className="flex-1 h-5 bg-white/5 rounded mx-8" />
                </div>
                <div className="grid grid-cols-4 gap-3 h-[calc(100%-2.5rem)]">
                  {['📥 Capture', '🔄 Processing', '💡 Developing', '📦 Archive'].map((col, i) => (
                    <div key={col} className="bg-white/[0.03] rounded-lg p-3">
                      <p className="text-white/30 text-[10px] font-medium mb-3 tracking-wide">{col}</p>
                      {Array.from({ length: Math.max(1, 3 - i) }, (_, j) => (
                        <div key={j} className="bg-white/[0.05] rounded-md p-2.5 mb-2 border border-white/[0.03]">
                          <div className="h-1.5 bg-white/10 rounded w-3/4 mb-2" />
                          <div className="h-1.5 bg-white/5 rounded w-1/2" />
                          {j === 0 && (
                            <div className="mt-2 flex gap-1">
                              <div className="h-1 w-6 rounded-full bg-accent/30" />
                              <div className="h-1 w-4 rounded-full bg-white/10" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description + Features */}
          <div ref={contentRef} className="md:col-span-5 lg:col-span-4 flex flex-col justify-center">
            {/* Features with descriptions */}
            <div className="space-y-6 mb-10">
              {features.map((f) => (
                <div key={f.label} className="flex gap-4">
                  <span className="text-accent text-lg mt-0.5 shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-hero-text text-sm font-medium">{f.label}</p>
                    <p className="text-hero-text/40 text-sm mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://mission-control-inky.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-hero-text text-sm tracking-[0.15em] uppercase group mb-8"
              data-cursor-hover
            >
              <span className="group-hover:text-accent transition-colors duration-300">View Live App</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="text-[10px] px-3 py-1.5 rounded-full border border-hero-text/10 text-hero-text/30 tracking-wider uppercase">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Other Projects */}
        <div ref={otherRef} className="mt-24 md:mt-32">
          <h3 className="text-hero-text/50 text-xs tracking-[0.35em] uppercase font-medium mb-10">Other Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div key={project.title} className="project-card border border-hero-text/5 rounded-xl p-6 hover:border-accent/20 transition-colors duration-300">
                <h4 className="font-display text-xl text-hero-text mb-3">{project.title}</h4>
                <p className="text-hero-text/40 text-sm leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] px-3 py-1 rounded-full border border-hero-text/8 text-hero-text/25 tracking-wider uppercase">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

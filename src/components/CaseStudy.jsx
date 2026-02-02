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
    <section id="work" ref={sectionRef} className="py-32 md:py-44 bg-white relative overflow-hidden">
      <div className="w-full px-6 md:px-10">
        <p className="text-gray-900 text-xs tracking-[0.35em] uppercase font-semibold mb-6">Featured Work</p>

        <h2 ref={titleRef} className="display-large text-gray-900 mb-8 md:mb-12">
          MISSION<br />CONTROL
        </h2>
        
        <p className="text-gray-500 text-sm md:text-base max-w-xl mb-16 md:mb-24 leading-relaxed">
          A collaborative task management platform built from the ground up with AI at its core. 
          Mission Control isn't just another project board — it's where human intent meets AI capability.
        </p>

        {/* Main layout */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Screenshot Collage */}
          <div className="md:col-span-7 lg:col-span-8">
            <div ref={screenshotRef} className="space-y-4">
              {/* Top: Kanban (full width, larger) */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img 
                  src="/mc-kanban.png" 
                  alt="Mission Control Tasks — Kanban board with Capture, Processing, Developing, and Archive columns" 
                  className="w-full h-auto block"
                />
              </div>
              {/* Bottom row: Documents + Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <img 
                    src="/mc-documents.png" 
                    alt="Mission Control Documents — document list with tags, search, and favorites" 
                    className="w-full h-auto block"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <img 
                    src="/mc-overview.png" 
                    alt="Mission Control Overview — dashboard with markets, calendar, tasks, email, and news widgets" 
                    className="w-full h-auto block"
                  />
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
                  <span className="text-gray-900 text-lg mt-0.5 shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-gray-900 text-sm font-medium">{f.label}</p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://mission-control-inky.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-gray-900 text-sm tracking-[0.15em] uppercase group mb-8"
              data-cursor-hover
            >
              <span className="group-hover:text-gray-500 transition-colors duration-300">View Live App</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="text-[10px] px-3 py-1.5 rounded-full border border-gray-200 text-gray-400 tracking-wider uppercase">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Other Projects */}
        <div ref={otherRef} className="mt-24 md:mt-32">
          <h3 className="text-gray-500 text-xs tracking-[0.35em] uppercase font-semibold mb-10">Other Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div key={project.title} className="project-card bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 transition-colors duration-300 shadow-sm">
                <h4 className="font-bold text-xl text-gray-900 mb-3 tracking-tight">{project.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] px-3 py-1 rounded-full border border-gray-200 text-gray-400 tracking-wider uppercase">{t}</span>
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

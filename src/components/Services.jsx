import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Fractional Product Leadership',
    description: 'Embedded product leadership for startups and scale-ups. Strategy, roadmapping, team building, and execution — without the full-time commitment. I bring director-level experience to your most critical product challenges.',
    details: [
      'Product strategy & vision definition',
      'Roadmap planning & prioritization',
      'Stakeholder alignment & communication',
      'Team building & mentorship',
      'OKR/KPI framework setup',
      'Go-to-market strategy',
    ],
    tags: ['Strategy', 'Roadmapping', 'Team Building', 'Stakeholder Alignment'],
  },
  {
    number: '02',
    title: 'App Development (Human + AI)',
    description: 'End-to-end product development that leverages AI at every stage — from intelligent features to AI-assisted building. Modern stacks, rapid iteration, production-quality output.',
    details: [
      'Full-stack web app development',
      'AI/LLM feature integration',
      'React + Supabase + Tailwind',
      'Rapid prototyping & MVP builds',
      'API design & architecture',
      'Deployment & CI/CD setup',
    ],
    tags: ['React', 'AI Integration', 'Full-Stack', 'Rapid Prototyping'],
  },
  {
    number: '03',
    title: 'UX Audits & Design Strategy',
    description: 'Deep-dive UX evaluations grounded in 9 years of design practice and a CMU HCI foundation. I identify friction, uncover opportunities, and deliver actionable recommendations that move metrics.',
    details: [
      'Heuristic evaluation & expert review',
      'User research & usability testing',
      'Information architecture review',
      'Design system audit & strategy',
      'Accessibility compliance (WCAG)',
      'Competitive UX analysis',
    ],
    tags: ['Heuristic Analysis', 'User Research', 'Design Systems', 'Accessibility'],
  },
  {
    number: '04',
    title: 'AI Strategy & Consulting',
    description: 'Help teams figure out where AI fits in their product — and where it doesn\'t. From opportunity identification to implementation strategy, grounded in real product experience, not hype.',
    details: [
      'AI opportunity assessment',
      'LLM integration strategy',
      'AI UX design patterns',
      'Build vs. buy analysis',
      'AI agent architecture',
      'Prompt engineering & evaluation',
    ],
    tags: ['AI Strategy', 'LLM', 'Agent Design', 'Implementation'],
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const itemsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0) // First one open by default

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.from(item, {
          x: -60, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' },
          delay: i * 0.1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleService = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-44 bg-surface-warm relative">
      <div className="w-full px-6 md:px-10">
        <div ref={titleRef} className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.35em] uppercase font-medium mb-4">What I Do</p>
          <h2 className="display-medium text-ink">How I can help.</h2>
          <p className="text-ink-light text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
            I work at the intersection of product thinking, design craft, and AI capability. 
            Whether you need strategic leadership or hands-on building — I do both.
          </p>
        </div>

        {/* Accordion list */}
        <div className="max-w-5xl mx-auto">
          {services.map((service, i) => (
            <div
              key={service.number}
              ref={(el) => (itemsRef.current[i] = el)}
              className={`service-item ${activeIndex === i ? 'active' : ''}`}
            >
              <button
                onClick={() => toggleService(i)}
                className="w-full flex items-center gap-6 md:gap-10 py-8 md:py-10 text-left group"
                data-cursor-hover
              >
                <span className="text-ink-muted/40 text-sm font-mono shrink-0 w-8">{service.number}</span>
                <h3 className="font-display text-2xl md:text-4xl lg:text-5xl text-ink group-hover:text-accent transition-colors duration-300 flex-1">
                  {service.title}
                </h3>
                <span className={`text-ink-muted text-2xl shrink-0 transition-transform duration-500 ${activeIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>

              <div className="service-content">
                <div className="pb-8 md:pb-10 pl-14 md:pl-[4.5rem] pr-8">
                  <p className="text-ink-light text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                    {service.description}
                  </p>
                  
                  {/* Detail list */}
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 mb-6 max-w-2xl">
                    {service.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2 text-sm text-ink-light">
                        <span className="text-accent text-[8px]">●</span>
                        {detail}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="text-xs px-4 py-1.5 rounded-full border border-ink/10 text-ink-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

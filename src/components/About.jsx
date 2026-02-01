import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: '18', unit: 'years', label: 'building products' },
  { value: '9', unit: 'yrs', label: 'UX Design' },
  { value: '9', unit: 'yrs', label: 'Product Management' },
  { value: 'CMU', unit: '', label: 'HCI · MS 2014' },
]

const timeline = [
  { year: '2007–2016', role: 'UX Designer → Lead', desc: 'Enterprise design systems, interaction design, information architecture. Built and led design teams across complex B2B products.' },
  { year: '2013–2014', role: 'Carnegie Mellon University', desc: 'MS in Human-Computer Interaction. Pittsburgh, PA.' },
  { year: '2016–2025', role: 'Product Manager → Director', desc: 'Strategic/Agile Portfolio Management, Work Management. Roadmaps, GTM, retention/growth, new market entry. Led AI-based product initiatives.' },
  { year: '2025–Now', role: 'Building with AI', desc: 'Career break. Building AI-powered infrastructure, exploring what\'s next. Shipping products at the intersection of Product + UX + AI.' },
]

const skills = [
  'Product Strategy', 'UX Research', 'Design Systems', 'Roadmapping',
  'AI/LLM Integration', 'React', 'Full-Stack Dev', 'Figma',
  'User Story Mapping', 'Agile/SAFe', 'Data Analysis', 'Prototyping',
  'Stakeholder Mgmt', 'Team Building', 'GTM Strategy', 'Accessibility',
]

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const linesRef = useRef([])
  const metricsRef = useRef(null)
  const timelineRef = useRef(null)
  const skillsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      linesRef.current.forEach((line, i) => {
        if (!line) return
        gsap.from(line, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: line, start: 'top 90%', toggleActions: 'play none none reverse' },
          delay: i * 0.08,
        })
      })

      if (metricsRef.current) {
        gsap.from(metricsRef.current.querySelectorAll('.metric-item'), {
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: metricsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      if (timelineRef.current) {
        gsap.from(timelineRef.current.querySelectorAll('.timeline-item'), {
          x: -40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: timelineRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      if (skillsRef.current) {
        gsap.from(skillsRef.current.querySelectorAll('.skill-tag'), {
          scale: 0.8, opacity: 0, duration: 0.4, ease: 'power3.out', stagger: 0.03,
          scrollTrigger: { trigger: skillsRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-44 bg-surface relative">
      <div className="w-full px-6 md:px-10">
        {/* Section label */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.35em] uppercase font-medium mb-4">About</p>
          <h2 className="display-medium text-ink">The arc.</h2>
        </div>

        {/* Main bio text — asymmetric */}
        <div className="md:ml-[15%] lg:ml-[20%] max-w-4xl space-y-8">
          <p ref={(el) => (linesRef.current[0] = el)}
            className="font-display text-2xl md:text-3xl lg:text-[2.2rem] text-ink leading-[1.4] tracking-tight">
            I've spent 18 years building and shaping digital products — first as a{' '}
            <span className="text-accent">UX designer</span> obsessing over every
            interaction, then as a <span className="text-accent">product leader</span>{' '}
            driving strategy at the director level, and now as an{' '}
            <span className="text-accent">AI builder</span> crafting the next wave of intelligent tools.
          </p>

          <p ref={(el) => (linesRef.current[1] = el)}
            className="text-ink-light text-lg md:text-xl leading-relaxed">
            This unusual career arc — from pixels to product-market fit to
            machine learning pipelines — gives me a rare perspective. I don't just
            understand what to build; I understand <em>how</em> it should feel,{' '}
            <em>why</em> it matters, and <em>how to ship it</em>.
          </p>

          <p ref={(el) => (linesRef.current[2] = el)}
            className="text-ink-light text-lg md:text-xl leading-relaxed">
            I hold an MS in Human-Computer Interaction from Carnegie Mellon
            University. Currently on a deliberate career break in Bangalore,
            building AI-powered infrastructure and exploring what's next.
          </p>
        </div>

        {/* Metrics row */}
        <div ref={metricsRef}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 md:ml-[15%] lg:ml-[20%] max-w-4xl">
          {metrics.map((m) => (
            <div key={m.label} className="metric-item">
              <p className="font-display text-5xl md:text-6xl lg:text-7xl text-ink tracking-tight leading-none">{m.value}</p>
              {m.unit && <p className="text-ink-muted text-xs tracking-[0.2em] uppercase mt-2">{m.unit}</p>}
              <p className="text-ink-light text-sm mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Career Timeline */}
        <div ref={timelineRef} className="mt-24 md:mt-32 md:ml-[15%] lg:ml-[20%] max-w-4xl">
          <h3 className="text-ink text-xs tracking-[0.35em] uppercase font-medium mb-10">Career Journey</h3>
          <div className="space-y-0">
            {timeline.map((item) => (
              <div key={item.year} className="timeline-item grid md:grid-cols-12 gap-4 py-6 border-b border-ink/5 first:border-t first:border-ink/5">
                <div className="md:col-span-3">
                  <p className="text-accent text-sm font-mono tracking-wide">{item.year}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-ink font-medium text-sm">{item.role}</p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-ink-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className="mt-20 md:mt-28 md:ml-[15%] lg:ml-[20%] max-w-4xl">
          <h3 className="text-ink text-xs tracking-[0.35em] uppercase font-medium mb-8">Skills & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag text-xs px-4 py-2 rounded-full border border-ink/10 text-ink-light hover:border-accent hover:text-accent transition-colors duration-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

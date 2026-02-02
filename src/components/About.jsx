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
    <section id="about" ref={sectionRef} className="py-32 md:py-44 bg-white relative">
      <div className="w-full px-6 md:px-10">
        {/* Section label */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <p className="text-gray-900 text-xs tracking-[0.35em] uppercase font-semibold mb-4">About</p>
          <h2 className="display-medium text-gray-900">The arc.</h2>
        </div>

        {/* Main bio text — asymmetric */}
        <div className="md:ml-[15%] lg:ml-[20%] max-w-4xl space-y-8">
          <p ref={(el) => (linesRef.current[0] = el)}
            className="font-bold text-2xl md:text-3xl lg:text-[2.2rem] text-gray-900 leading-[1.4] tracking-tight">
            I've spent 18 years building and shaping digital products — first as a{' '}
            <span className="underline decoration-gray-300 underline-offset-4">UX designer</span> obsessing over every
            interaction, then as a <span className="underline decoration-gray-300 underline-offset-4">product leader</span>{' '}
            driving strategy at the director level, and now as an{' '}
            <span className="underline decoration-gray-300 underline-offset-4">AI builder</span> crafting the next wave of intelligent tools.
          </p>

          <p ref={(el) => (linesRef.current[1] = el)}
            className="text-gray-500 text-lg md:text-xl leading-relaxed">
            This unusual career arc — from pixels to product-market fit to
            machine learning pipelines — gives me a rare perspective. I don't just
            understand what to build; I understand <em>how</em> it should feel,{' '}
            <em>why</em> it matters, and <em>how to ship it</em>.
          </p>

          <p ref={(el) => (linesRef.current[2] = el)}
            className="text-gray-500 text-lg md:text-xl leading-relaxed">
            I hold an MS in Human-Computer Interaction from Carnegie Mellon
            University. Currently on a deliberate career break in Bangalore,
            building AI-powered infrastructure and exploring what's next.
          </p>
        </div>

        {/* Metrics row */}
        <div ref={metricsRef}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 md:ml-[15%] lg:ml-[20%] max-w-4xl">
          {metrics.map((m) => (
            <div key={m.label} className="metric-item bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="font-extrabold text-5xl md:text-6xl lg:text-7xl text-gray-900 tracking-tight leading-none">{m.value}</p>
              {m.unit && <p className="text-gray-400 text-xs tracking-[0.2em] uppercase mt-2">{m.unit}</p>}
              <p className="text-gray-500 text-sm mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Career Timeline */}
        <div ref={timelineRef} className="mt-24 md:mt-32 md:ml-[15%] lg:ml-[20%] max-w-4xl">
          <h3 className="text-gray-900 text-xs tracking-[0.35em] uppercase font-semibold mb-10">Career Journey</h3>
          <div className="space-y-0">
            {timeline.map((item) => (
              <div key={item.year} className="timeline-item grid md:grid-cols-12 gap-4 py-6 border-b border-gray-200 first:border-t first:border-gray-200">
                <div className="md:col-span-3">
                  <p className="text-gray-900 text-sm font-mono tracking-wide font-semibold">{item.year}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-gray-900 font-medium text-sm">{item.role}</p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className="mt-20 md:mt-28 md:ml-[15%] lg:ml-[20%] max-w-4xl">
          <h3 className="text-gray-900 text-xs tracking-[0.35em] uppercase font-semibold mb-8">Skills & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag text-xs px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors duration-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

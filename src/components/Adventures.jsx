import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const adventures = [
  {
    title: 'Norway & Sweden',
    type: 'Motorcycle Expedition',
    desc: 'Cross-country motorcycle ride through Scandinavian fjords, Arctic Circle, and coastal highways. Solo expedition on a BMW GS.',
    url: 'https://youtu.be/ERWZ3BzMXT8?si=8iuALC5hyfl8jgec',
    icon: '🏔️',
  },
  {
    title: 'Ladakh',
    type: 'Motorcycle Expedition',
    desc: 'Multiple rides through the highest motorable passes in the world. Khardung La, Chang La, Pangong Lake. Ridden this route several times.',
    url: 'https://youtu.be/htic4FnpUSw?si=TFIjZm3ZT7L0oaWM',
    icon: '🏔️',
  },
  {
    title: 'Spiti & Zanskar',
    type: 'Motorcycle Expedition',
    desc: 'Remote valleys, broken roads, river crossings. The most raw and challenging motorcycle terrain in the Indian Himalayas.',
    icon: '🏔️',
  },
  {
    title: 'Kilimanjaro',
    type: 'Mountaineering',
    desc: 'Summit of Africa\'s highest peak. 5,895m. The Machame route — 7 days of trekking through rainforest, alpine desert, and glaciers.',
    icon: '⛰️',
  },
  {
    title: 'Mont Blanc',
    type: 'Mountaineering',
    desc: 'Western Europe\'s highest peak. 4,808m. Alpine mountaineering with crampons and ice axes on the Goûter Route.',
    icon: '⛰️',
  },
  {
    title: 'Everest Base Camp',
    type: 'Trek',
    desc: 'The classic EBC trek through Khumbu Valley. Namche Bazaar, Tengboche, Gorak Shep. Standing at the foot of the world\'s tallest mountain.',
    url: 'https://youtu.be/h_pbYScQkxE?si=rXC2XYYRc574ywh6',
    icon: '⛰️',
  },
]

const hobbies = [
  { label: 'Adventure Motorcycling', detail: 'BMW GS 1300 · Life goal: ride around the world' },
  { label: 'Mountaineering', detail: 'Kilimanjaro · Mont Blanc · EBC' },
  { label: 'Strength Training', detail: 'Home gym · Hate cardio · Working on consistency' },
  { label: 'Chess', detail: 'Regular player · Strategy thinking' },
  { label: '3D Printing', detail: 'Bambu Lab A1 · Hobby projects & prototypes' },
  { label: 'Woodworking & Pottery', detail: 'Learned from proper teachers · Not active lately' },
  { label: 'Electronics Tinkering', detail: 'Arduino · Raspberry Pi · Sensor projects' },
  { label: 'Philosophy', detail: 'Enjoys ruminating on ideas about identity, meaning, work' },
]

export default function Adventures() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
  const hobbiesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      if (cardsRef.current) {
        gsap.from(cardsRef.current.querySelectorAll('.adventure-card'), {
          y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      if (hobbiesRef.current) {
        gsap.from(hobbiesRef.current.querySelectorAll('.hobby-item'), {
          x: -30, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06,
          scrollTrigger: { trigger: hobbiesRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="adventures" ref={sectionRef} className="py-32 md:py-44 bg-surface relative">
      <div className="w-full px-6 md:px-10">
        <div ref={titleRef} className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.35em] uppercase font-medium mb-4">Beyond Work</p>
          <h2 className="display-medium text-ink">Life off-screen.</h2>
          <p className="text-ink-light text-base md:text-lg mt-4 max-w-xl leading-relaxed">
            When I'm not building products, I'm usually on a motorcycle heading somewhere remote,
            climbing something tall, or tinkering with hardware in the workshop.
          </p>
        </div>

        {/* Adventure cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-20 md:mb-28">
          {adventures.map((adv) => (
            <div key={adv.title} className="adventure-card group">
              {adv.url ? (
                <a href={adv.url} target="_blank" rel="noopener noreferrer"
                  className="block p-6 border border-ink/5 rounded-xl hover:border-accent/20 transition-all duration-300"
                  data-cursor-hover>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{adv.icon}</span>
                    <svg className="w-4 h-4 text-ink-muted/30 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                  <p className="text-accent text-[10px] tracking-[0.2em] uppercase mb-1">{adv.type}</p>
                  <h4 className="font-display text-xl text-ink mb-2 group-hover:text-accent transition-colors">{adv.title}</h4>
                  <p className="text-ink-light text-sm leading-relaxed">{adv.desc}</p>
                </a>
              ) : (
                <div className="p-6 border border-ink/5 rounded-xl">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl">{adv.icon}</span>
                  </div>
                  <p className="text-accent text-[10px] tracking-[0.2em] uppercase mb-1">{adv.type}</p>
                  <h4 className="font-display text-xl text-ink mb-2">{adv.title}</h4>
                  <p className="text-ink-light text-sm leading-relaxed">{adv.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hobbies & Interests */}
        <div ref={hobbiesRef} className="max-w-4xl mx-auto">
          <h3 className="text-ink text-xs tracking-[0.35em] uppercase font-medium mb-8">Hobbies & Interests</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
            {hobbies.map((hobby) => (
              <div key={hobby.label} className="hobby-item flex items-baseline gap-4 py-4 border-b border-ink/5">
                <span className="text-accent text-[8px]">●</span>
                <div>
                  <p className="text-ink font-medium text-sm">{hobby.label}</p>
                  <p className="text-ink-muted text-xs mt-0.5">{hobby.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

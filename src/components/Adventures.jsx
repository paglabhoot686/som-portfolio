import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Adventure data ── */
const adventures = [
  {
    id: 'norway',
    name: 'Norway & Sweden',
    type: 'motorcycle',
    icon: '🏍️',
    desc: 'Cross-country ride through Scandinavian fjords, the Arctic Circle, and coastal highways on a BMW GS.',
    youtubeId: 'ERWZ3BzMXT8',
    url: 'https://youtu.be/ERWZ3BzMXT8?si=8iuALC5hyfl8jgec',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    type: 'motorcycle',
    icon: '🏍️',
    desc: 'Multiple rides through the highest motorable passes — Khardung La, Chang La, Pangong Lake.',
    youtubeId: 'htic4FnpUSw',
    url: 'https://youtu.be/htic4FnpUSw?si=TFIjZm3ZT7L0oaWM',
  },
  {
    id: 'ebc',
    name: 'Everest Base Camp',
    type: 'mountaineering',
    icon: '⛰️',
    desc: 'The classic EBC trek through Khumbu Valley. Standing at the foot of the world\'s tallest mountain.',
    youtubeId: 'h_pbYScQkxE',
    url: 'https://youtu.be/h_pbYScQkxE?si=rXC2XYYRc574ywh6',
  },
  {
    id: 'spiti-zanskar',
    name: 'Spiti & Zanskar',
    type: 'motorcycle',
    icon: '🏍️',
    desc: 'Remote valleys, broken roads, river crossings through the most isolated regions of the Indian Himalayas. Raw, extreme off-road riding.',
    youtubeId: null,
    url: null,
    images: ['/spiti-1.jpg', '/spiti-2.jpg', '/spiti-3.jpg'],
  },
  {
    id: 'kilimanjaro',
    name: 'Kilimanjaro',
    type: 'mountaineering',
    icon: '⛰️',
    desc: 'Summit of Africa\'s highest peak. 5,895m via the Machame Route — 7 days through rainforest, alpine desert, and glaciers.',
    youtubeId: null,
    url: null,
    image: '/kilimanjaro.jpg',
  },
  {
    id: 'montblanc',
    name: 'Mont Blanc',
    type: 'mountaineering',
    icon: '⛰️',
    desc: 'Western Europe\'s highest peak. 4,808m. Alpine mountaineering with crampons and ice axes on the Goûter Route.',
    youtubeId: 'GOup-1qqo7k',
    url: 'https://youtu.be/GOup-1qqo7k',
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

/* ── Adventure Card Component ── */
function AdventureCard({ adventure, index }) {
  const cardRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    }
  }, [index])

  const typeLabel = {
    motorcycle: 'Motorcycle Expedition',
    mountaineering: 'Mountaineering',
  }

  // Check if we have multiple images (carousel)
  const hasCarousel = adventure.images && adventure.images.length > 1
  
  // YouTube thumbnail, custom image(s), or placeholder
  const thumbnailUrl = adventure.youtubeId
    ? `https://img.youtube.com/vi/${adventure.youtubeId}/hqdefault.jpg`
    : hasCarousel 
      ? adventure.images[currentImageIndex]
      : adventure.image || (adventure.images?.[0]) || null
  
  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasCarousel) {
      setCurrentImageIndex((prev) => (prev + 1) % adventure.images.length)
    }
  }
  
  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasCarousel) {
      setCurrentImageIndex((prev) => (prev - 1 + adventure.images.length) % adventure.images.length)
    }
  }

  const CardContent = (
    <>
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-4">
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={adventure.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play button overlay - only for YouTube videos */}
            {adventure.youtubeId && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-gray-900 ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
            {/* Carousel navigation */}
            {hasCarousel && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                  data-cursor-hover
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                  data-cursor-hover
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* Dots indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {adventure.images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-hero-text/30">
            <span className="text-4xl mb-2">{adventure.icon}</span>
            <span className="text-xs tracking-wider uppercase">Coming Soon</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{adventure.icon}</span>
          <span className="text-hero-text/40 text-[10px] tracking-[0.15em] uppercase">
            {typeLabel[adventure.type]}
          </span>
        </div>
        <h4 className="font-bold text-xl text-hero-text mb-2 tracking-tight group-hover:text-white transition-colors">
          {adventure.name}
        </h4>
        <p className="text-hero-text/50 text-sm leading-relaxed">{adventure.desc}</p>
        {adventure.url && (
          <span className="inline-flex items-center gap-1.5 text-hero-text/60 text-xs mt-3 group-hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />
            </svg>
            Watch on YouTube
          </span>
        )}
      </div>
    </>
  )

  if (adventure.url) {
    return (
      <a
        ref={cardRef}
        href={adventure.url}
        target="_blank"
        rel="noopener noreferrer"
        className="adventure-card group block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all duration-300"
        data-cursor-hover
      >
        {CardContent}
      </a>
    )
  }

  return (
    <div
      ref={cardRef}
      className="adventure-card group block bg-white/5 border border-white/10 rounded-2xl p-4"
    >
      {CardContent}
    </div>
  )
}

/* ── Main Component ── */
export default function Adventures() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const hobbiesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      // Hobbies animation
      if (hobbiesRef.current) {
        gsap.from(hobbiesRef.current.querySelectorAll('.hobby-item'), {
          x: -30,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: hobbiesRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="adventures" ref={sectionRef} className="py-32 md:py-44 relative overflow-hidden bg-hero-bg">
      <div className="w-full px-6 md:px-10 relative z-10">
        <div ref={titleRef} className="mb-16 md:mb-20">
          <p className="text-white text-xs tracking-[0.35em] uppercase font-semibold mb-4">Beyond Work</p>
          <h2 className="display-medium text-hero-text">Life off-screen.</h2>
          <p className="text-hero-text/40 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
            When I'm not building products, I'm on a motorcycle heading somewhere remote,
            climbing something tall, or tinkering with hardware in the workshop.
          </p>
        </div>

        {/* ── Adventure Cards Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 md:mb-28 max-w-6xl mx-auto">
          {adventures.map((adventure, index) => (
            <AdventureCard key={adventure.id} adventure={adventure} index={index} />
          ))}
        </div>

        {/* ── Hobbies & Interests ── */}
        <div ref={hobbiesRef} className="max-w-4xl mx-auto">
          <h3 className="text-hero-text/40 text-xs tracking-[0.35em] uppercase font-semibold mb-8">Hobbies & Interests</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
            {hobbies.map((hobby) => (
              <div key={hobby.label} className="hobby-item flex items-baseline gap-4 py-4 border-b border-white/10">
                <span className="text-white text-[8px]">●</span>
                <div>
                  <p className="text-hero-text/70 font-medium text-sm">{hobby.label}</p>
                  <p className="text-hero-text/25 text-xs mt-0.5">{hobby.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    title: 'Downshift to Discover',
    date: 'Jul 2025',
    excerpt: 'On the power of slowing down to find what matters. Why a deliberate career break might be the most productive thing you ever do. Motorcycles as a lens for life.',
    url: 'https://www.linkedin.com/pulse/downshift-discover-epiphany-wheels-som-chakravarty-zaouc',
    category: 'Life',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=200&fit=crop',
  },
  {
    title: 'The Art of Crafting the Right Friction',
    date: 'Dec 2024',
    excerpt: 'Not all friction is bad. How intentional resistance in product design leads to better outcomes and deeper engagement. Analysis of Shapr3D, Excalidraw, and more.',
    url: 'https://www.linkedin.com/pulse/art-crafting-right-friction-turning-free-users-paying-som-chakravarty-0qtbc',
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=200&fit=crop',
  },
  {
    title: 'How Our Identities Shape Our Lives',
    date: 'Nov 2024',
    excerpt: 'Exploring the invisible narratives we carry — the identity-action-habit loop. How our self-stories define the products we build, teams we lead, and decisions we make.',
    url: 'https://www.linkedin.com/pulse/how-our-identities-shape-lives-som-chakravarty-q7smc',
    category: 'Philosophy',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
  },
  {
    title: 'We Need to Change How We Look at Work and People',
    date: 'Nov 2023',
    excerpt: 'A critique of the "70 hours/week" mindset. Camp A vs Camp B workers. Why outcomes matter more than hours — always.',
    url: 'https://www.linkedin.com/pulse/we-need-change-how-look-work-people-som-chakravarty-giqac',
    category: 'Work',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop',
  },
  {
    title: 'Metrics that Matter',
    date: '2024',
    excerpt: 'How to move beyond vanity metrics and focus on what actually drives product success. A framework for meaningful measurement.',
    url: 'https://www.linkedin.com/pulse/metrics-matter-how-move-beyond-vanity-product-som-chakravarty-39zrc',
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
  },
  {
    title: 'The Technical Art of UX Design',
    date: '2024',
    excerpt: 'A product manager\'s journey through the technical foundations of UX. Why understanding implementation makes you a better designer.',
    url: 'https://www.linkedin.com/pulse/technical-art-ux-design-product-managers-journey-som-chakravarty-72l8c',
    category: 'UX',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
  },
  {
    title: 'User Story Mapping',
    date: '2024',
    excerpt: 'A practical guide to user story mapping — turning user needs into actionable product roadmaps. From discovery to delivery.',
    url: 'https://www.linkedin.com/pulse/user-story-mapping-som-chakravarty',
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=400&h=200&fit=crop',
  },
  {
    title: 'The Art of Process Consulting',
    date: '2024',
    excerpt: 'Why your digital transformation might be turning into a disaster. The hidden art of process consulting and organizational change.',
    url: 'https://www.linkedin.com/pulse/art-process-consulting-why-your-digital-might-turning-som-chakravarty-tflwc',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop',
  },
]

const categoryColors = {
  Life: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Product: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Philosophy: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Work: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  UX: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  Strategy: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
}

export default function Writing() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none reverse' },
          delay: i * 0.08,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="writing" ref={sectionRef} className="py-32 md:py-44 bg-surface-warm relative">
      <div className="w-full px-6 md:px-10">
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <p className="text-gray-900 text-xs tracking-[0.35em] uppercase font-semibold mb-4">Writing</p>
            <h2 className="display-medium text-ink">Thinking out loud.</h2>
            <p className="text-ink-light text-base md:text-lg mt-4 max-w-xl leading-relaxed">
              I write about product craft, UX philosophy, identity, and life. Conversational but substantive — 
              musing rather than lecturing, with analogies from motorcycles and symphonies.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/somchakravarty/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition-colors duration-300 tracking-[0.15em] uppercase mt-4 md:mt-0"
            data-cursor-hover
          >
            All on LinkedIn
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>

        {/* Article Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {articles.map((article, i) => (
            <a
              key={article.title}
              ref={(el) => (cardsRef.current[i] = el)}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 hover:-translate-y-1"
              data-cursor-hover
            >
              {/* Image preview */}
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* Category tag overlaid on image */}
                <span className={`absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm bg-white/90 ${categoryColors[article.category]}`}>
                  {article.category}
                </span>
              </div>
              
              <div className="p-5">
                {/* Title */}
                <h3 className="font-bold text-lg text-gray-900 leading-snug tracking-tight group-hover:text-gray-700 transition-colors mb-2">
                  {article.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-gray-400 text-xs tracking-wide">{article.date}</span>
                  <span className="text-gray-400 group-hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 md:hidden text-center">
          <a href="https://www.linkedin.com/in/somchakravarty/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-gray-900 font-medium">
            All articles on LinkedIn →
          </a>
        </div>
      </div>
    </section>
  )
}

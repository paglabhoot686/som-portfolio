import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    title: 'Downshift to Discover',
    date: 'Jul 2025',
    excerpt: 'On the power of slowing down to find what matters. Why a deliberate career break might be the most productive thing you ever do. Motorcycles as a lens for life.',
    featured: true,
    url: 'https://www.linkedin.com/pulse/downshift-discover-som-chakravarty/',
  },
  {
    title: 'The Art of Crafting the Right Friction',
    date: 'Dec 2024',
    excerpt: 'Not all friction is bad. How intentional resistance in product design leads to better outcomes and deeper engagement. Analysis of Shapr3D, Excalidraw, and more.',
    featured: true,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
  {
    title: 'How Our Identities Shape Our Lives',
    date: 'Nov 2024',
    excerpt: 'Exploring the invisible narratives we carry — the identity-action-habit loop. How our self-stories define the products we build, teams we lead, and decisions we make.',
    featured: true,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
  {
    title: 'We Need to Change How We Look at Work and People',
    date: 'Nov 2023',
    excerpt: 'A critique of the "70 hours/week" mindset. Camp A vs Camp B workers. Outcomes over hours — always.',
    featured: false,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
  {
    title: 'The Quiet Power of Saying No',
    date: 'Sep 2023',
    excerpt: 'Why the best product decisions are often the features you choose not to build.',
    featured: false,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
  {
    title: 'Design Systems Are Team Systems',
    date: 'Jun 2023',
    excerpt: 'A design system reflects your org structure. Fix the team dynamics first.',
    featured: false,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
  {
    title: 'From Wireframes to Roadmaps',
    date: 'Mar 2023',
    excerpt: 'Lessons from crossing the bridge between design and product management.',
    featured: false,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
  {
    title: 'The Second-Order Effects of AI in Product',
    date: 'Jan 2023',
    excerpt: 'AI won\'t just change features — it will reshape how product teams operate.',
    featured: false,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
  {
    title: 'Building for the Unscripted Moment',
    date: 'Oct 2022',
    excerpt: 'Why the best UX anticipates what users haven\'t asked for yet.',
    featured: false,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
  {
    title: 'Carnegie Mellon Changed How I Think',
    date: 'Jul 2022',
    excerpt: 'Reflections on how an HCI education reshapes your problem-solving lens permanently.',
    featured: false,
    url: 'https://www.linkedin.com/in/somchakravarty/',
  },
]

const themes = [
  { label: 'Product Craft', desc: 'Metrics, SaaS strategies, friction design, user story mapping' },
  { label: 'UX Roots', desc: 'Technical UX, prototyping, accessibility, design systems' },
  { label: 'Philosophy of Work', desc: 'Identity, meaning, outcomes vs hours' },
  { label: 'Life Metaphors', desc: 'Motorcycles as epiphany, speed vs exploration' },
]

export default function Writing() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.from(item, {
          y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 92%', toggleActions: 'play none none reverse' },
          delay: i * 0.05,
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

        {/* Content themes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {themes.map((theme) => (
            <div key={theme.label} className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <p className="text-gray-900 text-xs tracking-[0.2em] uppercase font-semibold mb-1">{theme.label}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{theme.desc}</p>
            </div>
          ))}
        </div>

        {/* Featured articles — large treatment with excerpts always visible */}
        <div className="max-w-5xl mx-auto mb-4">
          {articles
            .filter((a) => a.featured)
            .map((article, i) => (
              <a
                key={article.title}
                ref={(el) => (itemsRef.current[i] = el)}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-item block py-8 md:py-10 group"
                data-cursor-hover
              >
                <div className="flex items-start gap-4">
                  <div className="writing-accent bg-gray-900 rounded-full shrink-0 h-full min-h-[2rem] self-stretch" />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
                      <h3 className="writing-title font-bold text-2xl md:text-3xl lg:text-4xl text-ink leading-snug tracking-tight">
                        {article.title}
                      </h3>
                      <span className="text-gray-400 text-xs tracking-[0.15em] uppercase shrink-0">{article.date}</span>
                    </div>
                    <p className="text-ink-light text-sm md:text-base leading-relaxed mt-3 max-w-2xl">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </a>
            ))}
        </div>

        {/* All other articles — with excerpts */}
        <div className="max-w-5xl mx-auto">
          {articles
            .filter((a) => !a.featured)
            .map((article, i) => (
              <a
                key={article.title}
                ref={(el) => (itemsRef.current[i + 3] = el)}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-item block py-5 md:py-6 group"
                data-cursor-hover
              >
                <div className="flex items-start gap-4">
                  <div className="writing-accent bg-gray-900 rounded-full shrink-0 h-full min-h-[1.5rem] self-stretch" />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-8">
                      <h4 className="writing-title font-bold text-lg md:text-xl text-ink leading-snug tracking-tight">
                        {article.title}
                      </h4>
                      <span className="text-gray-400 text-[10px] tracking-[0.15em] uppercase shrink-0">{article.date}</span>
                    </div>
                    {article.excerpt && (
                      <p className="text-gray-500 text-sm leading-relaxed mt-1.5 max-w-xl">{article.excerpt}</p>
                    )}
                  </div>
                </div>
              </a>
            ))}
        </div>

        <div className="mt-10 md:hidden text-center">
          <a href="https://www.linkedin.com/in/somchakravarty/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-gray-900 font-medium">
            All articles on LinkedIn →
          </a>
        </div>
      </div>
    </section>
  )
}

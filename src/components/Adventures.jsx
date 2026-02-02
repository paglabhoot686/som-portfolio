import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Mercator projection helpers ── */
const MAP_W = 1000
const MAP_H = 500

function lngToX(lng) {
  return ((lng + 180) / 360) * MAP_W
}

function latToY(lat) {
  const latRad = (lat * Math.PI) / 180
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
  // Clamp to ±85° range
  const yNorm = (1 - mercN / Math.PI) / 2
  return yNorm * MAP_H
}

/* ── Adventure data ── */
const locations = [
  {
    id: 'bangalore',
    name: 'Bangalore',
    lat: 12.97,
    lng: 77.59,
    type: 'home',
    icon: '🏠',
    desc: 'Home base. Where it all begins and returns to.',
    isHome: true,
  },
  {
    id: 'pittsburgh',
    name: 'Pittsburgh',
    subtitle: 'Carnegie Mellon',
    lat: 40.44,
    lng: -79.94,
    type: 'education',
    icon: '🎓',
    desc: 'Masters in HCI at Carnegie Mellon University, 2014.',
  },
  {
    id: 'norway',
    name: 'Norway & Sweden',
    lat: 63.0,
    lng: 14.0,
    type: 'motorcycle',
    icon: '🏍️',
    desc: 'Cross-country ride through Scandinavian fjords, the Arctic Circle, and coastal highways on a BMW GS.',
    url: 'https://youtu.be/ERWZ3BzMXT8?si=8iuALC5hyfl8jgec',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    lat: 34.15,
    lng: 77.57,
    type: 'motorcycle',
    icon: '🏍️',
    desc: 'Multiple rides through the highest motorable passes — Khardung La, Chang La, Pangong Lake.',
    url: 'https://youtu.be/htic4FnpUSw?si=TFIjZm3ZT7L0oaWM',
  },
  {
    id: 'spiti',
    name: 'Spiti Valley',
    lat: 32.23,
    lng: 78.07,
    type: 'motorcycle',
    icon: '🏍️',
    desc: 'Remote valleys, broken roads, river crossings. Raw, challenging Himalayan terrain.',
  },
  {
    id: 'zanskar',
    name: 'Zanskar',
    lat: 33.5,
    lng: 76.85,
    type: 'motorcycle',
    icon: '🏍️',
    desc: 'One of the most isolated valleys in the Indian Himalayas. Extreme off-road riding.',
  },
  {
    id: 'kilimanjaro',
    name: 'Kilimanjaro',
    lat: -3.07,
    lng: 37.35,
    type: 'mountaineering',
    icon: '⛰️',
    desc: 'Summit of Africa\'s highest peak. 5,895m via the Machame Route — 7 days through rainforest, alpine desert, and glaciers.',
  },
  {
    id: 'montblanc',
    name: 'Mont Blanc',
    lat: 45.83,
    lng: 6.86,
    type: 'mountaineering',
    icon: '⛰️',
    desc: 'Western Europe\'s highest peak. 4,808m. Alpine mountaineering with crampons and ice axes on the Goûter Route.',
  },
  {
    id: 'ebc',
    name: 'Everest Base Camp',
    lat: 28.0,
    lng: 86.85,
    type: 'mountaineering',
    icon: '⛰️',
    desc: 'The classic EBC trek through Khumbu Valley. Standing at the foot of the world\'s tallest mountain.',
    url: 'https://youtu.be/h_pbYScQkxE?si=rXC2XYYRc574ywh6',
  },
]

const homeBase = locations.find((l) => l.isHome)
const adventureLocations = locations.filter((l) => !l.isHome)

/* ── Dream round-the-world route (approximate waypoints) ── */
const dreamRoute = [
  { lat: 12.97, lng: 77.59 },   // Bangalore
  { lat: 25.0, lng: 55.0 },     // Middle East
  { lat: 36.0, lng: 28.0 },     // Turkey
  { lat: 44.0, lng: 12.0 },     // Italy
  { lat: 48.0, lng: 2.0 },      // France
  { lat: 52.0, lng: -3.0 },     // UK
  { lat: 64.0, lng: -19.0 },    // Iceland
  { lat: 45.0, lng: -75.0 },    // East Canada
  { lat: 37.0, lng: -100.0 },   // US Central
  { lat: 34.0, lng: -118.0 },   // LA
  { lat: 19.0, lng: -99.0 },    // Mexico
  { lat: -13.0, lng: -72.0 },   // Peru
  { lat: -34.0, lng: -58.0 },   // Argentina
  { lat: -34.0, lng: 18.0 },    // Cape Town
  { lat: -1.0, lng: 37.0 },     // Kenya
  { lat: 12.97, lng: 77.59 },   // Back to Bangalore
]

/* ── Simplified continent outlines (very abstract) ── */
const continentPaths = [
  // Africa (simplified)
  'M480,200 L490,195 L505,200 L515,215 L520,240 L518,265 L510,290 L500,310 L485,320 L475,310 L470,290 L472,260 L478,230 L480,210 Z',
  // Europe (simplified)
  'M480,140 L500,130 L520,135 L530,145 L525,160 L515,170 L500,175 L485,175 L478,165 L475,155 Z',
  // Asia (simplified)
  'M530,130 L560,120 L600,115 L650,120 L690,130 L720,145 L740,160 L730,185 L710,200 L680,210 L650,215 L620,210 L590,200 L570,190 L550,180 L535,170 L525,160 Z',
  // India (simplified)
  'M610,200 L625,195 L640,200 L645,215 L640,235 L630,250 L620,255 L612,245 L608,225 L610,210 Z',
  // North America (simplified)
  'M140,120 L180,110 L220,115 L260,125 L280,140 L290,160 L285,180 L270,200 L250,215 L230,220 L210,215 L190,205 L170,195 L155,180 L145,160 L140,140 Z',
  // South America (simplified)
  'M250,240 L270,235 L285,245 L290,265 L285,290 L275,320 L265,345 L255,360 L245,355 L240,330 L238,300 L240,270 L245,250 Z',
  // Australia (simplified)
  'M720,300 L750,295 L775,300 L785,315 L780,330 L765,340 L745,338 L730,325 L722,312 Z',
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

/* ── Tooltip Component ── */
function Tooltip({ location, position, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0, y: 8, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' })
    }
  }, [])

  const typeLabel = {
    motorcycle: '🏍️ Motorcycle Expedition',
    mountaineering: '⛰️ Mountaineering',
    education: '🎓 Education',
    home: '🏠 Home Base',
  }

  return (
    <div
      ref={ref}
      className="absolute z-30 pointer-events-auto"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -120%)',
      }}
    >
      <div
        className="relative bg-white border border-gray-200 rounded-2xl p-4 min-w-[220px] max-w-[280px] shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-900 transition-colors text-xs leading-none"
          style={{ cursor: 'pointer' }}
          data-cursor-hover
        >
          ✕
        </button>
        <p className="text-gray-900 text-[9px] tracking-[0.2em] uppercase font-semibold mb-1">
          {typeLabel[location.type] || location.type}
        </p>
        <h4 className="font-bold text-lg text-gray-900 mb-1.5 leading-tight tracking-tight">
          {location.name}
          {location.subtitle && <span className="text-gray-400 text-sm font-normal ml-1">· {location.subtitle}</span>}
        </h4>
        <p className="text-gray-500 text-xs leading-relaxed mb-3">{location.desc}</p>
        {location.url && (
          <a
            href={location.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-900 text-[10px] tracking-[0.15em] uppercase font-semibold hover:text-gray-600 transition-colors"
            data-cursor-hover
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />
            </svg>
            Watch on YouTube
          </a>
        )}
        {/* Arrow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-white border-r border-b border-gray-200"
        />
      </div>
    </div>
  )
}

/* ── Main Component ── */
export default function Adventures() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const mapRef = useRef(null)
  const svgRef = useRef(null)
  const hobbiesRef = useRef(null)
  const [activeTooltip, setActiveTooltip] = useState(null)
  const animatedRef = useRef(false)

  const handleMarkerClick = useCallback((location) => {
    setActiveTooltip((prev) => (prev?.id === location.id ? null : location))
  }, [])

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

      // Map container animation
      ScrollTrigger.create({
        trigger: mapRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (animatedRef.current) return
          animatedRef.current = true
          animateMap()
        },
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

  function animateMap() {
    const svg = svgRef.current
    if (!svg) return

    // Fade in continents
    const continents = svg.querySelectorAll('.continent-path')
    gsap.fromTo(
      continents,
      { opacity: 0, strokeDashoffset: 2000 },
      {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.1,
      }
    )

    // Home base pulse appears first
    const homeMarker = svg.querySelector('.marker-home')
    if (homeMarker) {
      gsap.fromTo(homeMarker, { scale: 0, opacity: 0, transformOrigin: 'center' }, {
        scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', delay: 0.5,
      })
    }

    // Route lines draw on
    const routeLines = svg.querySelectorAll('.route-line')
    routeLines.forEach((line, i) => {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        delay: 0.8 + i * 0.12,
      })
    })

    // Adventure markers pop in after their lines
    const markers = svg.querySelectorAll('.marker-adventure')
    gsap.fromTo(
      markers,
      { scale: 0, opacity: 0, transformOrigin: 'center' },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2.5)',
        stagger: 0.1,
        delay: 1.5,
      }
    )

    // Dream route draws on slowly
    const dreamPath = svg.querySelector('.dream-route')
    if (dreamPath) {
      const dreamLen = dreamPath.getTotalLength()
      gsap.set(dreamPath, { strokeDasharray: dreamLen, strokeDashoffset: dreamLen })
      gsap.to(dreamPath, {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'none',
        delay: 2.5,
      })
      // Label fade in
      const dreamLabel = svg.querySelector('.dream-label')
      if (dreamLabel) {
        gsap.fromTo(dreamLabel, { opacity: 0 }, { opacity: 1, duration: 1, delay: 5 })
      }
    }
  }

  // Build SVG positions
  const homeX = lngToX(homeBase.lng)
  const homeY = latToY(homeBase.lat)

  // Dream route path
  const dreamPathD = dreamRoute
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${lngToX(p.lng).toFixed(1)},${latToY(p.lat).toFixed(1)}`)
    .join(' ')

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

        {/* ── The Constellation Map ── */}
        <div ref={mapRef} className="relative max-w-6xl mx-auto mb-20 md:mb-28">
          {/* Map legend */}
          <div className="flex flex-wrap gap-6 mb-6 text-[10px] tracking-[0.2em] uppercase text-hero-text/25">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-white" />
              Home Base
            </span>
            <span className="flex items-center gap-2">
              <span className="text-sm leading-none">🏍️</span>
              Motorcycle Expedition
            </span>
            <span className="flex items-center gap-2">
              <span className="text-sm leading-none">⛰️</span>
              Mountaineering
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-6 border-t border-dashed border-white/25" />
              Dream Route
            </span>
          </div>

          {/* SVG Map */}
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="absolute inset-0 w-full h-full"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Glow filter for markers */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Grid pattern */}
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Background grid */}
              <rect width={MAP_W} height={MAP_H} fill="url(#grid)" />

              {/* Continent outlines — very faint */}
              {continentPaths.map((d, i) => (
                <path
                  key={i}
                  className="continent-path"
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.8"
                  strokeDasharray="2000"
                  opacity="0"
                />
              ))}

              {/* Latitude lines — faint */}
              {[20, 40, 60, 80].map((pct) => (
                <line
                  key={pct}
                  x1="0"
                  y1={MAP_H * (pct / 100)}
                  x2={MAP_W}
                  y2={MAP_H * (pct / 100)}
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                />
              ))}

              {/* Dream route */}
              <path
                className="dream-route"
                d={dreamPathD}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
              <text
                className="dream-label"
                x={lngToX(-100)}
                y={latToY(28)}
                fill="rgba(255,255,255,0.15)"
                fontSize="7"
                fontFamily="Inter, system-ui, sans-serif"
                letterSpacing="0.15em"
                opacity="0"
              >
                DREAM: ROUND THE WORLD
              </text>

              {/* Route lines from Bangalore to each adventure */}
              {adventureLocations.map((loc) => {
                const x2 = lngToX(loc.lng)
                const y2 = latToY(loc.lat)
                // Curved path via control point
                const midX = (homeX + x2) / 2
                const midY = Math.min(homeY, y2) - Math.abs(x2 - homeX) * 0.08
                return (
                  <path
                    key={`route-${loc.id}`}
                    className="route-line"
                    d={`M${homeX.toFixed(1)},${homeY.toFixed(1)} Q${midX.toFixed(1)},${midY.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                  />
                )
              })}

              {/* Adventure markers */}
              {adventureLocations.map((loc) => {
                const cx = lngToX(loc.lng)
                const cy = latToY(loc.lat)
                return (
                  <g
                    key={loc.id}
                    className="marker-adventure"
                    style={{ cursor: 'pointer', transformOrigin: `${cx}px ${cy}px` }}
                    onClick={() => handleMarkerClick(loc)}
                    data-cursor-hover
                  >
                    {/* Outer ring on hover */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="10"
                      fill="transparent"
                      stroke="rgba(255,255,255,0)"
                      strokeWidth="0.5"
                      className="marker-ring"
                    >
                      <animate attributeName="stroke" values="rgba(255,255,255,0);rgba(255,255,255,0.3);rgba(255,255,255,0)" dur="3s" repeatCount="indefinite" />
                    </circle>
                    {/* Dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="3.5"
                      fill="#9CA3AF"
                      opacity="0.9"
                      filter="url(#glow)"
                    />
                    {/* Icon */}
                    <text
                      x={cx}
                      y={cy - 9}
                      textAnchor="middle"
                      fontSize="9"
                      style={{ pointerEvents: 'none' }}
                    >
                      {loc.icon}
                    </text>
                    {/* Label */}
                    <text
                      x={cx}
                      y={cy + 14}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.35)"
                      fontSize="6"
                      fontFamily="Inter, system-ui, sans-serif"
                      letterSpacing="0.08em"
                      style={{ pointerEvents: 'none' }}
                    >
                      {loc.name.toUpperCase()}
                    </text>
                  </g>
                )
              })}

              {/* Home base marker — special pulsing */}
              <g className="marker-home" style={{ transformOrigin: `${homeX}px ${homeY}px` }}>
                {/* Pulse rings */}
                <circle cx={homeX} cy={homeY} r="4" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0">
                  <animate attributeName="r" values="4;16;4" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={homeX} cy={homeY} r="4" fill="none" stroke="#ffffff" strokeWidth="0.3" opacity="0">
                  <animate attributeName="r" values="4;22;4" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                {/* Core dot */}
                <circle
                  cx={homeX}
                  cy={homeY}
                  r="5"
                  fill="#ffffff"
                  filter="url(#glow-strong)"
                />
                <circle
                  cx={homeX}
                  cy={homeY}
                  r="2"
                  fill="#111827"
                  opacity="0.8"
                />
                {/* Label */}
                <text
                  x={homeX}
                  y={homeY + 16}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="7"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  letterSpacing="0.15em"
                >
                  BANGALORE
                </text>
              </g>
            </svg>

            {/* Tooltip overlay (HTML, positioned over SVG) */}
            {activeTooltip && (
              <Tooltip
                location={activeTooltip}
                position={{
                  x: (lngToX(activeTooltip.lng) / MAP_W) * 100,
                  y: (latToY(activeTooltip.lat) / MAP_H) * 100,
                }}
                onClose={() => setActiveTooltip(null)}
              />
            )}
          </div>

          {/* Map caption */}
          <p className="text-hero-text/15 text-[10px] tracking-[0.2em] uppercase mt-4 text-right">
            Click markers to explore · Routes from Bangalore
          </p>
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

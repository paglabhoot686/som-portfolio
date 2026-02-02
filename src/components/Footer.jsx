export default function Footer() {
  return (
    <footer className="bg-hero-bg border-t border-white/10">
      <div className="px-6 md:px-10 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href="#" className="font-bold text-2xl text-hero-text hover:text-gray-400 transition-colors tracking-tight" data-cursor-hover>
              Som.
            </a>
            <p className="text-hero-text/20 text-xs mt-2 leading-relaxed max-w-xs">
              Product Leader × UX Designer × AI Builder. 18 years of building digital products that matter.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-hero-text/30 text-[10px] tracking-[0.25em] uppercase mb-3 font-medium">Navigate</p>
              {['About', 'Services', 'Work', 'Writing', 'Adventures', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  className="block text-hero-text/20 hover:text-white transition-colors text-xs py-1 tracking-wide"
                  data-cursor-hover>
                  {link}
                </a>
              ))}
            </div>
            <div>
              <p className="text-hero-text/30 text-[10px] tracking-[0.25em] uppercase mb-3 font-medium">Connect</p>
              <a href="https://www.linkedin.com/in/somchakravarty/" target="_blank" rel="noopener noreferrer"
                className="block text-hero-text/20 hover:text-white transition-colors text-xs py-1 tracking-wide" data-cursor-hover>
                LinkedIn
              </a>
              <a href="mailto:somnath686@gmail.com"
                className="block text-hero-text/20 hover:text-white transition-colors text-xs py-1 tracking-wide" data-cursor-hover>
                Email
              </a>
              <a href="https://youtu.be/ERWZ3BzMXT8" target="_blank" rel="noopener noreferrer"
                className="block text-hero-text/20 hover:text-white transition-colors text-xs py-1 tracking-wide" data-cursor-hover>
                YouTube
              </a>
            </div>
          </div>

          {/* Colophon */}
          <div>
            <p className="text-hero-text/30 text-[10px] tracking-[0.25em] uppercase mb-3 font-medium">Colophon</p>
            <p className="text-hero-text/20 text-xs leading-relaxed">
              Built with React, Tailwind CSS, GSAP & Lenis. Typeset in Inter. 
              Designed and developed with a little help from AI.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-hero-text/15 text-xs tracking-wide">
            © {new Date().getFullYear()} Som Chakravarty. All rights reserved.
          </p>
          <p className="text-hero-text/10 text-xs">
            Bangalore, India
          </p>
        </div>
      </div>
    </footer>
  )
}

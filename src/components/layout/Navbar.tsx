import { useEffect, useState } from 'react';
import { scrollToSection } from '../motion/MotionProvider';

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id, -92);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 ${
        scrolled || mobileMenuOpen
          ? 'bg-night/95 backdrop-blur-xl border-white/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="shell">
        <div className="relative h-[72px] md:h-[84px] flex items-center justify-between">
          <button
            onClick={() => go('home')}
            className="flex items-center gap-1.5 group focus:outline-none text-left cursor-pointer -ml-2.5"
            aria-label="Abdul Manan — return to top"
          >
            <img
              src="/logo.png"
              alt=""
              className="w-14 h-14 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-bone text-[16px] md:text-[18px] tracking-[-0.03em]">
                Abdul Manan
              </span>
              <span className="mt-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-lime whitespace-nowrap">
                Full Stack &amp; AI Engineer
              </span>
            </span>
          </button>

          <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="group relative py-1.5 text-[16px] font-sans font-medium text-bone/80 transition-colors duration-300 hover:text-bone focus:outline-none cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-lime transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </button>
            ))}
          </nav>

          <button
            onClick={() => go('contact')}
            className="hidden md:inline-flex items-center gap-3 h-[52px] px-6 rounded-full border border-bone/35 text-bone text-[15px] font-sans font-medium transition-colors duration-300 hover:bg-bone hover:text-ink hover:border-bone focus:outline-none cursor-pointer"
          >
            Let's Talk
            <span aria-hidden className="text-[13px]">↗</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-11 h-11 rounded-full text-bone hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mb-4 rounded-[24px] border border-white/10 bg-[#161614] px-6 py-4 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-[15px] font-sans text-bone/85 py-3 border-b border-white/10 text-left"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 h-12 rounded-full border border-bone/35 text-bone text-[14px] font-medium"
            >
              Let's Talk <span aria-hidden>↗</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

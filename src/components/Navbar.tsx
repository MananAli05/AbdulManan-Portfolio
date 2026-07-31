import { useState, useEffect } from 'react';

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
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Track scroll position for header style and active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on vertical position
      const scrollPosition = window.scrollY + 120;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Offset for floating navbar height & top margin
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 md:top-5 left-4 md:left-8 right-4 md:right-8 z-50 max-w-[1240px] mx-auto pointer-events-auto">
      {/* FLOATING CONTAINER NAVBAR */}
      <div
        className={`w-full h-[60px] md:h-[64px] px-5 md:px-7 rounded-full flex items-center justify-between transition-all duration-300 border ${
          isScrolled
            ? 'bg-[#070C08]/85 backdrop-blur-md border-[#8E9B4D]/30 shadow-xl shadow-black/50'
            : 'bg-[#070C08]/70 backdrop-blur-md border-[#8E9B4D]/20 shadow-lg shadow-black/30'
        }`}
      >
        {/* LEFT: Branding Block with /logo.png */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
          aria-label="Abdul Manan - Return to top"
        >
          {/* Logo Image */}
          <img
            src="/logo.png"
            alt="Abdul Manan Logo"
            className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Name & Title */}
          <div className="flex flex-col justify-center">
            <span className="text-[#F3F3EE] font-sans font-medium text-sm md:text-[15px] leading-tight tracking-tight group-hover:text-white transition-colors">
              Abdul Manan
            </span>
            <span className="text-[#8E9B4D] font-mono text-[9px] md:text-[10px] uppercase font-semibold tracking-[0.2em] leading-tight mt-0.5">
              AI ENGINEER
            </span>
          </div>
        </button>

        {/* CENTER NAVIGATION: Visually centred floating links */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative py-1 text-xs lg:text-[13px] font-sans font-medium tracking-wide transition-colors duration-300 focus:outline-none cursor-pointer bg-transparent bg-none border-none shadow-none ${
                  isActive
                    ? 'text-[#F3F3EE] font-semibold'
                    : 'text-[#A4A79F] hover:text-[#F3F3EE]'
                }`}
              >
                <span>{item.label}</span>

                {/* Animated Olive Underline: Animates from center outward on hover */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#8E9B4D] transition-all duration-300 ease-out ${
                    isActive
                      ? 'w-full shadow-[0_0_8px_#8E9B4D]'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Outlined Pill CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full border border-[#8E9B4D]/40 bg-transparent text-[#F3F3EE] text-xs lg:text-[13px] font-sans font-medium tracking-wide transition-all duration-300 hover:bg-[#8E9B4D]/10 hover:border-[#8E9B4D] hover:shadow-[0_0_16px_rgba(142,155,77,0.2)] focus:outline-none cursor-pointer"
          >
            <span>Let's Talk</span>
            <span className="text-[#8E9B4D] transition-transform duration-300 group-hover:translate-x-1 font-mono text-sm">
              →
            </span>
          </button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#F3F3EE] hover:text-[#8E9B4D] hover:bg-[#8E9B4D]/10 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION PANEL */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 rounded-2xl border border-[#8E9B4D]/25 bg-[#070C08]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between text-sm font-sans font-medium tracking-wide py-2 border-b border-[#46483a]/15 text-left transition-colors ${
                    isActive ? 'text-[#F3F3EE] font-semibold' : 'text-[#A4A79F] hover:text-[#F3F3EE]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#8E9B4D] shadow-[0_0_8px_#8E9B4D]" />}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => scrollToSection('contact')}
            className="group mt-1 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#8E9B4D]/40 bg-transparent text-[#F3F3EE] text-xs font-sans font-medium tracking-wide transition-all duration-300 active:bg-[#8E9B4D]/20 hover:border-[#8E9B4D]"
          >
            <span>Let's Talk</span>
            <span className="text-[#8E9B4D] transition-transform duration-300 group-hover:translate-x-1 font-mono">
              →
            </span>
          </button>
        </div>
      )}
    </header>
  );
}

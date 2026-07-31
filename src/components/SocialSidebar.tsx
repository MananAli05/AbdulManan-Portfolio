import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

export default function SocialSidebar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const educationEl = document.getElementById('education');
      if (educationEl) {
        const eduRect = educationEl.getBoundingClientRect();
        // Hide sidebar if the bottom of education section has scrolled above 200px from top of viewport
        if (eduRect.bottom <= 200) {
          setIsHidden(true);
          return;
        }
      }

      // Also hide if any post-education section is in view
      const collaborationEl = document.getElementById('collaboration');
      const contactEl = document.getElementById('contact');
      if (collaborationEl || contactEl) {
        const colTop = collaborationEl?.getBoundingClientRect().top ?? Infinity;
        const conTop = contactEl?.getBoundingClientRect().top ?? Infinity;
        if (colTop < window.innerHeight || conTop < window.innerHeight) {
          setIsHidden(true);
          return;
        }
      }

      setIsHidden(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside
      aria-label="Social Links"
      className={`hidden lg:flex fixed left-4 2xl:left-6 top-1/2 -translate-y-1/2 flex-col items-center z-40 transition-all duration-300 ${
        isHidden ? 'opacity-0 pointer-events-none -translate-x-4' : 'opacity-100 pointer-events-auto translate-x-0'
      }`}
    >
      {/* Top Thin Vertical Line */}
      <div className="w-[1px] h-16 bg-[#8E9B4D]/35 mb-5" />

      {/* Social Icons Container */}
      <div className="flex flex-col gap-5 items-center">
        {/* GitHub */}
        <a
          href="https://github.com/MananAli05"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          aria-label="GitHub Profile"
          className="group relative flex items-center text-[#E9E5DF]/60 hover:text-[#8E9B4D] transition-all duration-300 hover:scale-110 focus:outline-none"
        >
          <FaGithub className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute left-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-mono text-[11px] font-medium text-[#8E9B4D] bg-[#070C08] px-2 py-0.5 rounded border border-[#8E9B4D]/20 shadow-md pointer-events-none whitespace-nowrap">
            GitHub
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/abdul-manan05"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          aria-label="LinkedIn Profile"
          className="group relative flex items-center text-[#E9E5DF]/60 hover:text-[#8E9B4D] transition-all duration-300 hover:scale-110 focus:outline-none"
        >
          <FaLinkedinIn className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute left-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-mono text-[11px] font-medium text-[#8E9B4D] bg-[#070C08] px-2 py-0.5 rounded border border-[#8E9B4D]/20 shadow-md pointer-events-none whitespace-nowrap">
            LinkedIn
          </span>
        </a>

        {/* Email */}
        <a
          href="mailto:abdulmannan.developer@gmail.com"
          title="Email"
          aria-label="Send Email"
          className="group relative flex items-center text-[#E9E5DF]/60 hover:text-[#8E9B4D] transition-all duration-300 hover:scale-110 focus:outline-none"
        >
          <FiMail className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute left-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-mono text-[11px] font-medium text-[#8E9B4D] bg-[#070C08] px-2 py-0.5 rounded border border-[#8E9B4D]/20 shadow-md pointer-events-none whitespace-nowrap">
            Email
          </span>
        </a>
      </div>

      {/* Bottom Thin Vertical Line */}
      <div className="w-[1px] h-16 bg-[#8E9B4D]/35 mt-5" />
    </aside>
  );
}

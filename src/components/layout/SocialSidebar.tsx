import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../data/site';

const LINKS = [
  { label: 'GitHub', href: GITHUB_URL, Icon: FaGithub },
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: FaLinkedinIn },
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: FiMail },
];

export default function SocialSidebar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const collaboration = document.getElementById('contact');
      const contact = document.getElementById('footer');
      const colTop = collaboration?.getBoundingClientRect().top ?? Infinity;
      const conTop = contact?.getBoundingClientRect().top ?? Infinity;

      setIsHidden(colTop < window.innerHeight * 0.85 || conTop < window.innerHeight * 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      aria-label="Social links"
      className={`hidden min-[1860px]:flex fixed left-7 top-1/2 -translate-y-1/2 flex-col items-center z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHidden
          ? 'opacity-0 pointer-events-none -translate-x-4'
          : 'opacity-100 pointer-events-auto translate-x-0'
      }`}
    >
      <span className="w-[1.5px] h-16 rounded-full bg-line mb-6" />

      <div className="flex flex-col gap-2.5 items-center">
        {LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            className="group relative grid place-items-center w-11 h-11 rounded-full bg-white border border-line text-body shadow-[0_2px_8px_-2px_rgba(16,19,12,0.08)] transition-all duration-300 hover:bg-lime hover:border-lime hover:text-ink hover:-translate-y-0.5"
          >
            <Icon className="w-[17px] h-[17px]" />
            <span className="absolute left-14 whitespace-nowrap rounded-full bg-ink text-cream px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] opacity-0 -translate-x-1 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0">
              {label}
            </span>
          </a>
        ))}
      </div>

      <span className="w-[1.5px] h-16 rounded-full bg-line mt-6" />
    </aside>
  );
}

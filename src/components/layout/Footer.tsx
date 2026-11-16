import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import AssistantWidget from '../assistant/AssistantWidget';
import SplitHeading from '../motion/SplitHeading';
import Reveal from '../motion/Reveal';
import { scrollToSection } from '../motion/MotionProvider';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL, RESUME_FILE } from '../../data/site';

const EXPLORE = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const SOLUTIONS = ['Mobile Apps', 'Web Apps', 'AI Agents', 'Voice AI', 'Automation'];

const SOCIALS = [
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: FaLinkedinIn },
  { label: 'GitHub', href: GITHUB_URL, Icon: FaGithub },
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: FiMail },
];

const ARROW_OUT =
  'col-start-1 row-start-1 w-full text-center leading-none transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%]';
const ARROW_IN =
  'col-start-1 row-start-1 w-full text-center leading-none -translate-x-[140%] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0';

export default function Footer() {
  return (
    <>
      <footer
        id="footer"
        className="relative bg-ink text-cream rounded-t-[48px] overflow-hidden mt-8"
      >
        <div className="shell pt-24 md:pt-32 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
            <div className="lg:col-span-7">
              <SplitHeading className="title-lg mb-8 text-cream">
                <span className="block">Let&rsquo;s build something</span>
                <span className="block text-lime">intelligent.</span>
              </SplitHeading>

              <Reveal className="text-cream/60 text-[17px] md:text-[19px] leading-[1.6] max-w-[560px] mb-12">
                <p>
                  Have an idea, product, or workflow that could be smarter? Let&rsquo;s turn
                  it into something practical, scalable, and ready for the real world.
                </p>
              </Reveal>

              <Reveal className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mb-12">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-3 pl-2 pr-7 py-2 rounded-full bg-cream text-ink text-[15px] font-medium transition-colors duration-300 hover:bg-lime shrink-0 self-start"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-ink text-lime overflow-hidden">
                    <span className={ARROW_OUT}>&rarr;</span>
                    <span className={ARROW_IN}>&rarr;</span>
                  </span>
                  Start a project
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="link-underline text-cream text-[clamp(17px,2vw,30px)] font-display font-medium tracking-[-0.03em] self-start break-all sm:break-normal"
                >
                  {EMAIL}
                </a>
              </Reveal>

              <Reveal stagger className="flex items-center gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    aria-label={label}
                    className="grid place-items-center w-12 h-12 rounded-full border border-cream/20 text-cream/80 transition-colors duration-300 hover:bg-lime hover:border-lime hover:text-ink"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </Reveal>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-10">
              <Reveal stagger className="flex flex-col gap-4">
                {EXPLORE.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id, -110)}
                    className="text-left text-cream/70 text-[16px] hover:text-lime transition-colors duration-300 w-fit cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </Reveal>

              <Reveal stagger className="flex flex-col gap-4">
                {SOLUTIONS.map((label) => (
                  <button
                    key={label}
                    onClick={() => scrollToSection('services', -92)}
                    className="text-left text-cream/70 text-[16px] hover:text-lime transition-colors duration-300 w-fit cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
              </Reveal>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-cream/15 flex flex-col md:flex-row items-center justify-between gap-5">
            <img src="/logo.png" alt="Abdul Manan" className="h-7 w-auto object-contain" />

            <p className="font-mono text-[12px] text-cream/45 tracking-[0.08em] text-center">
              Mobile &middot; Web &middot; AI Agents &middot; Voice &middot; Automation
            </p>

            <div className="flex items-center gap-6">
              <a
                href={RESUME_URL}
                download={RESUME_FILE}
                className="font-mono text-[12px] text-cream/45 hover:text-lime transition-colors tracking-[0.08em]"
              >
                Resume
              </a>
              <p className="font-mono text-[12px] text-cream/45 tracking-[0.08em]">
                &copy; 2026 Abdul Manan
              </p>
            </div>
          </div>
        </div>

        <div aria-hidden className="select-none pointer-events-none px-[2vw] pb-2">
          <span className="block w-full text-center font-display font-extrabold leading-[0.8] tracking-[-0.05em] text-[clamp(60px,15.4vw,300px)] bg-gradient-to-b from-white/[0.16] to-white/[0.02] bg-clip-text text-transparent">
            Abdul Manan
          </span>
        </div>
      </footer>

      <AssistantWidget />
    </>
  );
}

import { useLayoutEffect, useRef, useState, type FormEvent } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import SplitHeading from '../motion/SplitHeading';
import Reveal from '../motion/Reveal';
import { gsap, prefersReducedMotion, EASE } from '../../lib/motion';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, withoutProtocol } from '../../data/site';

const ROUTES = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, Icon: FiMail },
  {
    label: 'LinkedIn',
    value: withoutProtocol(LINKEDIN_URL),
    href: LINKEDIN_URL,
    Icon: FaLinkedinIn,
  },
  { label: 'GitHub', value: withoutProtocol(GITHUB_URL), href: GITHUB_URL, Icon: FaGithub },
];

const NEEDS = ['Mobile App', 'Web App', 'AI Agent', 'Voice AI', 'Automation', 'Something else'];

const FIELD =
  'w-full rounded-[14px] bg-white/[0.05] border border-white/12 px-4 py-3.5 text-[15px] text-bone placeholder-bone/35 ' +
  'transition-colors duration-300 focus:outline-none focus:border-lime/70 focus:bg-white/[0.07]';

const LABEL = 'block mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50';

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [opened, setOpened] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-route]', {
        opacity: 0,
        x: -28,
        duration: 0.8,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-routes]', start: 'top 88%', once: true },
      });

      gsap.from('[data-form]', {
        opacity: 0,
        y: 80,
        scale: 0.97,
        duration: 1.2,
        ease: EASE,
        scrollTrigger: { trigger: '[data-form]', start: 'top 88%', once: true },
      });

      gsap.from('[data-need]', {
        opacity: 0,
        y: 12,
        scale: 0.9,
        duration: 0.5,
        ease: 'back.out(1.8)',
        stagger: 0.06,
        delay: 0.35,
        scrollTrigger: { trigger: '[data-form]', start: 'top 80%', once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const toggleNeed = (need: string) =>
    setNeeds((current) => (current.includes(need) ? current.filter((n) => n !== need) : [...current, need]));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nLooking for: ${needs.length ? needs.join(', ') : 'Not specified'}\n\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <section id="contact" ref={rootRef} className="relative w-full bg-cream pt-6 pb-20 md:pt-8 md:pb-24">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-[120px]">
            <SplitHeading className="title-lg mb-7">
              <span className="block text-ink">Have an idea?</span>
              <span className="block text-ink">
                <span className="hero-mark">Let's build it.</span>
              </span>
            </SplitHeading>

            <Reveal className="mb-10">
              <p className="text-body text-[16px] md:text-[17px] leading-[1.55] max-w-[460px]">
                Tell me what you want to build: an app, a web product or an AI agent. I'll
                reply with how I would approach it.
              </p>
              <p className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-body">
                <span className="inline-flex items-center gap-2.5 text-ink">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-deeplime opacity-60 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-deeplime" />
                  </span>
                  Available for projects
                </span>
                <span aria-hidden className="w-6 h-px bg-ink/25" />
                Rahim Yar Khan, Pakistan · Remote worldwide
              </p>
            </Reveal>

            <ul data-routes className="border-t border-ink/15">
              {ROUTES.map(({ label, value, href, Icon }) => (
                <li key={label} data-route>
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 py-4 border-b border-ink/15"
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-white border border-ink/10 text-ink shrink-0 transition-colors duration-300 group-hover:bg-lime group-hover:border-lime">
                      <Icon className="w-[17px] h-[17px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-body">
                        {label}
                      </span>
                      <span className="block mt-1 text-ink text-[16px] md:text-[18px] font-medium truncate">
                        {value}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-ink text-[18px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form
              data-form
              onSubmit={handleSubmit}
              className="relative rounded-[32px] bg-night text-bone p-7 sm:p-9 lg:p-10 flex flex-col gap-6 overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(50% 44% at 100% 0%, rgba(200, 240, 75, 0.13), rgba(200, 240, 75, 0) 72%)',
                }}
              />

              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className={LABEL}>
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={LABEL}>
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={FIELD}
                  />
                </div>
              </div>

              <fieldset className="relative">
                <legend className={LABEL}>What do you need?</legend>
                <div className="flex flex-wrap gap-2">
                  {NEEDS.map((need) => {
                    const on = needs.includes(need);
                    return (
                      <button
                        key={need}
                        type="button"
                        data-need
                        aria-pressed={on}
                        onClick={() => toggleNeed(need)}
                        className={`inline-flex items-center gap-2 h-10 px-4 rounded-full border text-[14px] font-medium transition-colors duration-300 cursor-pointer ${
                          on
                            ? 'bg-lime border-lime text-ink'
                            : 'border-white/15 text-bone/80 hover:border-white/40 hover:text-bone'
                        }`}
                      >
                        {on && <span aria-hidden>✓</span>}
                        {need}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="relative">
                <label htmlFor="contact-message" className={LABEL}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What are you building, and when do you need it?"
                  className={`${FIELD} resize-none`}
                />
              </div>

              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-3 h-[54px] px-7 rounded-[6px] bg-lime text-ink text-[13px] font-semibold uppercase tracking-[0.04em] transition-all duration-300 hover:brightness-95 cursor-pointer"
                >
                  {opened ? 'Opening your email app' : 'Send message'}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <p className="text-[13px] leading-[1.5] text-bone/45 max-w-[260px]">
                  This opens your email app with the message filled in.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

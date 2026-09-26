import SplitHeading from './motion/SplitHeading';
import Reveal from './motion/Reveal';

// REAL OFFICIAL TECHNOLOGY BRAND LOGOS (Crisp SVG Icons)
const PythonLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <path fill="#3776AB" d="M11.914 2c-4.49 0-4.21 1.947-4.21 1.947l.006 2.016h4.264s2.052-.008 2.052 1.986c0 1.996 0 3.12 0 3.12h-6.19s-2.032.062-2.032-2.055V4.67s.103-2.67 4.257-2.67h1.853zm.086 2.115a.73.73 0 1 0 0 1.46.73.73 0 0 0 0-1.46z" />
    <path fill="#FFD43B" d="M12.086 22c4.49 0 4.21-1.947 4.21-1.947l-.006-2.016H12.026s-2.052.008-2.052-1.986c0-1.996 0-3.12 0-3.12h6.19s2.032-.062 2.032 2.055v4.344s-.103 2.67-4.257 2.67h-1.853zm-.086-2.115a.73.73 0 1 0 0 1.46.73.73 0 0 0 0 1.46z" />
  </svg>
);

const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
    <path fill="#10A37F" d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.04 6.04 0 0 0-6.51-2.9 6.07 6.07 0 0 0-4.66-2.08 6.06 6.06 0 0 0-5.77 4.14 6.01 6.01 0 0 0-4.14 2.99 6.05 6.05 0 0 0 .74 7.11 5.98 5.98 0 0 0 .52 4.91 6.04 6.04 0 0 0 6.51 2.9 6.04 6.04 0 0 0 4.66 2.08 6.05 6.05 0 0 0 5.76-4.14 6.01 6.01 0 0 0 4.15-3 6.05 6.05 0 0 0-.74-7.1zm-8.73 12.1a4.28 4.28 0 0 1-2.45-.76l.14-.08 4.07-2.35a.88.88 0 0 0 .44-.76v-5.74l1.72 1a.08.08 0 0 1 .04.06v4.75a4.3 4.3 0 0 1-3.96 4.88zM4.6 17.95a4.28 4.28 0 0 1-.57-2.5 4.3 4.3 0 0 1 .84-2.52l.14.09 4.07 2.35a.87.87 0 0 0 .88 0l4.97-2.87v2l-4.11 2.37a4.3 4.3 0 0 1-6.22-1.42zm-1.1-9.52a4.3 4.3 0 0 1 1.88-1.74l.14.08 4.07 2.35a.88.88 0 0 0 .88 0l4.97-2.87v-2L11.36 1.92a4.3 4.3 0 0 1-2.26 3.97 4.27 4.27 0 0 1-5.6 2.54zm15.11 3.52l-4.97 2.87v-2l4.11-2.37a4.3 4.3 0 0 1 6.22 1.42 4.28 4.28 0 0 1 .57 2.5 4.3 4.3 0 0 1-.84 2.52l-.14-.09-4.07-2.35a.87.87 0 0 0-.88 0zm1.75-5.91l-.14-.08-4.07-2.35a.88.88 0 0 0-.88 0L10.3 10.4v-2l4.11-2.37a4.3 4.3 0 0 1 6.22 1.42 4.28 4.28 0 0 1 .57 2.5 4.3 4.3 0 0 1-.84 2.52z" />
  </svg>
);

const FastAPILogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <circle cx="12" cy="12" r="11" fill="#009688" />
    <path fill="#FFFFFF" d="M12.8 4L6 13h5v7l6.8-9h-5V4z" />
  </svg>
);

const LangChainLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <rect width="24" height="24" rx="5" fill="#1C3C3C" />
    <path fill="#38BDF8" d="M7 8h10v2H7V8zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
  </svg>
);

const HuggingFaceLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <path fill="#FFD21E" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-6 6.5c1.5 1.5 4.5 1.5 6 0" />
  </svg>
);

const TwilioLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <circle cx="12" cy="12" r="11" fill="#F22F46" />
    <circle cx="8" cy="8" r="2.2" fill="#FFFFFF" />
    <circle cx="16" cy="8" r="2.2" fill="#FFFFFF" />
    <circle cx="8" cy="16" r="2.2" fill="#FFFFFF" />
    <circle cx="16" cy="16" r="2.2" fill="#FFFFFF" />
  </svg>
);

const ElevenLabsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <rect width="24" height="24" rx="5" fill="#000000" />
    <rect x="7" y="5" width="3.5" height="14" rx="1.5" fill="#FFFFFF" />
    <rect x="13.5" y="5" width="3.5" height="14" rx="1.5" fill="#FFFFFF" />
  </svg>
);

const GroqLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <rect width="24" height="24" rx="6" fill="#F05023" />
    <path fill="#FFFFFF" d="M7 8h10v2H7V8zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
  </svg>
);

const PostgreSQLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-4h2v4zm0-6h-2V8h2v2.5z" />
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <path fill="#3ECF8E" d="M13.35 2.1a1 1 0 0 0-1.7 0L2.3 16.5a1 1 0 0 0 .8 1.5h8.4v3.9a1 1 0 0 0 1.7 0l9.35-14.4a1 1 0 0 0-.8-1.5h-8.4V2.1z" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <path fill="#2496ED" d="M13 8.5h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm3-3h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zM4 11.5h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2z" />
    <path fill="#2496ED" d="M1.5 13.5c.5 3.5 3.5 6 7.5 6 5.5 0 9.5-3.5 10.5-8-.8 0-1.7.3-2.5.8-1.2-1.5-3.2-2.3-5-2-1.5.2-2.8 1-3.5 2.2H1.5z" />
  </svg>
);

const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6 sm:w-7 sm:h-7">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <path fill="#25D366" d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.477 1.332 4.989L2 22l5.138-1.348A9.957 9.957 0 0 0 12.012 22c5.508 0 9.991-4.478 9.991-9.986 0-5.506-4.483-9.984-9.991-9.984zm5.82 14.125c-.244.688-1.22 1.258-2.007 1.428-.54.116-1.246.208-3.618-.775-3.037-1.256-4.992-4.34-5.143-4.542-.149-.2-1.233-1.64-1.233-3.13 0-1.488.777-2.222 1.054-2.525.277-.303.606-.379.807-.379.202 0 .404.002.58.01.189.009.442-.072.693.53.253.606.858 2.096.934 2.247.076.152.126.328.025.53-.101.202-.152.328-.303.505-.152.177-.32.394-.456.53-.152.152-.31.317-.133.621.177.303.787 1.298 1.688 2.1 1.157 1.031 2.133 1.35 2.436 1.502.303.152.48.126.657-.076.177-.202.758-.883.96-1.187.202-.303.404-.253.682-.152.278.101 1.768.833 2.071.985.303.152.505.227.58.353.076.126.076.732-.168 1.42z" />
  </svg>
);

const N8nLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
    <rect width="24" height="24" rx="6" fill="#EA4B71" />
    <path fill="#FFFFFF" d="M6 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zm7 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zm-3.5 3.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
);


interface SolutionCard {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Column span on the 6-column bento grid at lg and above. */
  span: string;
  logos: { component: React.JSX.Element; bg: string; name: string }[];
}

const SOLUTIONS: SolutionCard[] = [
  {
    id: 'ai-web-apps',
    number: '01',
    title: 'AI-powered web applications',
    description:
      'Production-ready AI web apps with intelligent features, dashboards, user systems and scalable backend infrastructure.',
    span: 'lg:col-span-4',
    logos: [
      { component: <ReactLogo />, bg: 'bg-[#0E1726]', name: 'React' },
      { component: <PythonLogo />, bg: 'bg-[#F0F4F8]', name: 'Python' },
      { component: <FastAPILogo />, bg: 'bg-[#E6F4F1]', name: 'FastAPI' },
      { component: <SupabaseLogo />, bg: 'bg-[#1C2C26]', name: 'Supabase' },
    ],
  },
  {
    id: 'llm-rag',
    number: '02',
    title: 'LLM & RAG solutions',
    description:
      'Knowledge assistants, document Q&A systems and context-aware AI applications that answer using private/business data.',
    span: 'lg:col-span-2',
    logos: [
      { component: <OpenAILogo />, bg: 'bg-[#E6F7F2]', name: 'OpenAI' },
      { component: <LangChainLogo />, bg: 'bg-[#E6F0F2]', name: 'LangChain' },
      { component: <HuggingFaceLogo />, bg: 'bg-[#FFF9E6]', name: 'Hugging Face' },
      { component: <PythonLogo />, bg: 'bg-[#F0F4F8]', name: 'Python' },
    ],
  },
  {
    id: 'voice-ai',
    number: '03',
    title: 'Voice AI agents',
    description:
      'Real-time voice agents for customer support, lead qualification, appointment booking and automated conversations.',
    span: 'lg:col-span-2',
    logos: [
      { component: <ElevenLabsLogo />, bg: 'bg-[#000000]', name: 'ElevenLabs' },
      { component: <TwilioLogo />, bg: 'bg-[#FDE8EA]', name: 'Twilio' },
      { component: <GroqLogo />, bg: 'bg-[#FDECE8]', name: 'Groq' },
      { component: <PythonLogo />, bg: 'bg-[#F0F4F8]', name: 'Python' },
    ],
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'AI automation & agents',
    description:
      'AI agents and automated workflows that connect tools, process data, perform tasks and reduce repetitive business work.',
    span: 'lg:col-span-4',
    logos: [
      { component: <N8nLogo />, bg: 'bg-[#FDECEF]', name: 'n8n' },
      { component: <OpenAILogo />, bg: 'bg-[#E6F7F2]', name: 'OpenAI' },
      { component: <SupabaseLogo />, bg: 'bg-[#1C2C26]', name: 'Supabase' },
      { component: <PythonLogo />, bg: 'bg-[#F0F4F8]', name: 'Python' },
    ],
  },
  {
    id: 'ai-chatbots',
    number: '05',
    title: 'AI chatbots',
    description:
      'Intelligent chatbots for websites and messaging platforms that answer questions, capture leads and automate customer interactions.',
    span: 'lg:col-span-3',
    logos: [
      { component: <WhatsAppLogo />, bg: 'bg-[#E8F8EE]', name: 'WhatsApp' },
      { component: <OpenAILogo />, bg: 'bg-[#E6F7F2]', name: 'OpenAI' },
      { component: <ReactLogo />, bg: 'bg-[#0E1726]', name: 'React' },
      { component: <PythonLogo />, bg: 'bg-[#F0F4F8]', name: 'Python' },
    ],
  },
  {
    id: 'backend-apis',
    number: '06',
    title: 'Backend & AI APIs',
    description:
      'Production backend systems, REST APIs, databases, authentication and infrastructure for AI-powered applications.',
    span: 'lg:col-span-3',
    logos: [
      { component: <FastAPILogo />, bg: 'bg-[#E6F4F1]', name: 'FastAPI' },
      { component: <PostgreSQLLogo />, bg: 'bg-[#EBF3F9]', name: 'PostgreSQL' },
      { component: <DockerLogo />, bg: 'bg-[#E6F4FF]', name: 'Docker' },
      { component: <PythonLogo />, bg: 'bg-[#F0F4F8]', name: 'Python' },
    ],
  },
];

export default function Expertise() {
  return (
    <section id="solutions" className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        {/* Section head */}
        <div className="max-w-[900px] mb-16 md:mb-20">
          <Reveal className="eyebrow mb-7">Solutions</Reveal>
          <SplitHeading className="title-xl mb-8">
            <span className="block text-ink">Solutions</span>
            <span className="block text-faint">I build.</span>
          </SplitHeading>
          <Reveal className="text-body text-[17px] md:text-[19px] leading-[1.6] max-w-[620px]">
            <p>
              End-to-end AI systems — from intelligent web applications and retrieval
              pipelines to voice agents and the backends that run them.
            </p>
          </Reveal>
        </div>

        {/* Bento grid */}
        <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6">
          {SOLUTIONS.map((item) => (
            <article
              key={item.id}
              className={`group card-surface lift relative flex flex-col p-8 md:p-10 min-h-[290px] ${item.span}`}
            >
              {/* Corner number */}
              <span
                aria-hidden
                className="absolute top-7 right-8 font-display font-bold text-[52px] leading-none tracking-[-0.05em] text-ink/[0.07] transition-colors duration-500 group-hover:text-lime/50"
              >
                {item.number}
              </span>

              {/* Icon stack */}
              <div className="flex items-center mb-8">
                {item.logos.map((logoItem, lIdx) => (
                  <div
                    key={`${item.id}-${logoItem.name}`}
                    title={logoItem.name}
                    style={{
                      marginLeft: lIdx > 0 ? '-12px' : '0',
                      zIndex: item.logos.length - lIdx,
                      // Each icon slides a little further than the last, so the
                      // stack fans open on hover.
                      ['--shift' as string]: `${lIdx * 6}px`,
                    } as React.CSSProperties}
                    className={`relative w-[52px] h-[52px] rounded-full ${logoItem.bg} border-[3px] border-white shadow-[0_2px_8px_rgba(16,19,12,0.10)] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[var(--shift)]`}
                  >
                    {logoItem.component}
                  </div>
                ))}
              </div>

              <h3 className="font-display font-bold text-ink text-[clamp(22px,1.6vw,30px)] tracking-[-0.04em] leading-[1.1] mb-4 pr-16">
                {item.title}
              </h3>

              <p className="text-body text-[15px] md:text-[16px] leading-[1.6] max-w-[52ch]">
                {item.description}
              </p>

              {/* Hover rule */}
              <span className="mt-auto pt-7 flex items-center gap-2 text-deeplime text-[13px] font-medium opacity-0 -translate-x-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0">
                <span className="h-[1.5px] w-7 bg-lime" />
                Available
              </span>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import SplitHeading from './motion/SplitHeading';
import Reveal from './motion/Reveal';
import CountUp from './motion/CountUp';
import WordLight from './motion/WordLight';

const STATS = [
  { value: 1, pad: 2, suffix: '+', label: 'Years experience' },
  { value: 15, pad: 0, suffix: '+', label: 'AI projects' },
  { value: 10, pad: 0, suffix: '+', label: 'Technologies' },
  { value: 24, pad: 0, suffix: '/7', label: 'AI systems' },
];

export default function About() {
  return (
    <section id="about" className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: copy */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal className="eyebrow mb-7">About</Reveal>

            <SplitHeading className="title-lg mb-9">
              <span className="block text-ink">The engineer</span>
              <span className="block text-faint">behind the AI.</span>
            </SplitHeading>

            {/* Words brighten from faint to ink as this passage scrolls through */}
            <WordLight
              className="text-[19px] md:text-[22px] leading-[1.55] font-display font-medium tracking-[-0.02em] max-w-[680px] mb-6"
              text="I'm Abdul Manan, an AI Engineer focused on designing and building intelligent systems that solve real-world problems. My work combines artificial intelligence, RAG systems, voice AI agents, modern web technologies, and automation to create practical, production-focused digital products."
            />

            <Reveal className="text-body text-[16px] md:text-[17px] leading-[1.65] max-w-[640px] mb-12">
              <p>
                I have experience working as a Python Developer at BuiltinSoft and am
                currently working at CodAgentic, where I focus on developing AI-powered
                products, automation systems, and intelligent solutions for real-world
                business needs.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal
              stagger
              className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 pt-10 border-t border-line max-w-[720px]"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-ink text-[clamp(34px,3.2vw,52px)] tracking-[-0.05em] leading-none">
                    <CountUp value={stat.value} pad={stat.pad} />
                    <span className="text-lime">{stat.suffix}</span>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          {/* RIGHT: portrait */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <Reveal className="w-full max-w-[420px]">
              <div className="group relative card-surface p-3 lift overflow-hidden">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] bg-cream">
                  <img
                    src="/manan.png"
                    alt="Abdul Manan, AI Engineer"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>

                {/* Name tag */}
                <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between gap-3 rounded-full bg-white/85 backdrop-blur-md border border-white px-5 py-3 shadow-[0_8px_24px_-8px_rgba(16,19,12,0.2)]">
                  <span className="font-display font-bold text-ink text-[15px] tracking-[-0.03em]">
                    Abdul Manan
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-deeplime">
                    AI Engineer
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

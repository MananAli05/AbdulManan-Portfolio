const TECH = [
  'Flutter',
  'Next.js',
  'React',
  'Node.js',
  'Supabase',
  'Python',
  'LLMs',
  'RAG',
  'Voice AI',
  'n8n',
];

export default function TechMarquee() {
  return (
    <div className="relative z-10 w-full border-t border-white/10 overflow-hidden py-5">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-28 sm:w-56 z-10 bg-gradient-to-r from-night via-night/90 to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-28 sm:w-56 z-10 bg-gradient-to-l from-night via-night/90 to-transparent pointer-events-none"
      />

      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center shrink-0"
          >
            {[...TECH, ...TECH].map((name, i) => (
              <li
                key={`${copy}-${i}`}
                className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6"
              >
                <span className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-bone/50 whitespace-nowrap">
                  {name}
                </span>
                <span aria-hidden className="w-1 h-1 rounded-full bg-lime/70 shrink-0" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

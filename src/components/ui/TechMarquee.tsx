const TECH = [
  'React',
  'FastAPI',
  'Python',
  'Groq',
  'Supabase',
  'Twilio',
  'ElevenLabs',
  'LangChain',
  'PostgreSQL',
  'Docker',
  'n8n',
  'TensorFlow',
];

/**
 * Seamless scrolling strip of the stack. The list is rendered twice and
 * the track travels exactly half its width, so the loop has no seam.
 * Animation is disabled under prefers-reduced-motion (see index.css).
 */
export default function TechMarquee() {
  return (
    <div className="relative w-full border-y border-line bg-white overflow-hidden py-5">
      {/* Fade the strip into the page at both ends */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-28 sm:w-56 z-10 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-28 sm:w-56 z-10 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none"
      />

      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center shrink-0"
          >
            {TECH.map((name) => (
              <li
                key={`${copy}-${name}`}
                className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6"
              >
                <span className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-faint whitespace-nowrap">
                  {name}
                </span>
                <span aria-hidden className="w-1 h-1 rounded-full bg-lime shrink-0" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

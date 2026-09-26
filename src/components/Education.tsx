import SplitHeading from './motion/SplitHeading';
import Reveal from './motion/Reveal';
import TimelineRail from './ui/TimelineRail';

interface EducationEntry {
  id: string;
  year: string;
  degree: string;
  institution: string;
  location: string;
  logo: string;
  cgpa?: string;
}

const EDUCATION: EducationEntry[] = [
  {
    id: 'kfueit',
    year: '2022 — 2026',
    degree: 'Bachelor in Data Science',
    institution: 'Khwaja Fareed University of Engineering & Information Technology',
    location: 'Rahim Yar Khan, Pakistan',
    logo: '/kfueit.png',
    cgpa: '3.56 / 4.00',
  },
  {
    id: 'aspire',
    year: '2020 — 2022',
    degree: 'Intermediate — FSc Pre-Engineering',
    institution: 'Aspire College',
    location: 'Rahim Yar Khan, Pakistan',
    logo: '/aspire.png',
  },
];

export default function Education() {
  return (
    <section id="education" className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="max-w-[900px] mb-16 md:mb-20">
          <Reveal className="eyebrow mb-7">Education</Reveal>
          <SplitHeading className="title-xl">
            <span className="block text-ink">Foundation &amp;</span>
            <span className="block text-faint">academic background.</span>
          </SplitHeading>
        </div>

        <div id="education-rail" className="relative pl-9 sm:pl-16">
          <TimelineRail containerId="education-rail" />

          <div className="flex flex-col gap-5 lg:gap-6">
            {EDUCATION.map((entry) => (
              <Reveal key={entry.id}>
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-9 sm:-left-16 top-10 w-4 h-4 rounded-full bg-cream border-[3px] border-lime translate-x-[-1px] sm:translate-x-[3px]"
                  />

                  <article className="card-surface lift p-8 md:p-10">
                    <div className="flex items-center justify-between gap-5 mb-7 pb-7 border-b border-line">
                      <img
                        src={entry.logo}
                        alt={entry.institution}
                        className="h-11 sm:h-12 w-auto object-contain"
                        loading="lazy"
                      />
                      <span className="font-mono text-[12px] tracking-[0.06em] text-deeplime whitespace-nowrap">
                        {entry.year}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-ink text-[clamp(22px,1.9vw,32px)] tracking-[-0.04em] leading-[1.1] mb-3">
                      {entry.degree}
                    </h3>

                    <p className="text-body text-[15px] md:text-[16px] leading-[1.6] max-w-[60ch]">
                      {entry.institution}
                    </p>
                    <p className="text-faint text-[14px] mt-2">{entry.location}</p>

                    {entry.cgpa && (
                      <div className="mt-7 pt-6 border-t border-line flex items-center gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                          CGPA
                        </span>
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-lime text-ink font-mono text-[13px] font-medium">
                          {entry.cgpa}
                        </span>
                      </div>
                    )}
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

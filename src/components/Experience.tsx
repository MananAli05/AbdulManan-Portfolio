import SplitHeading from './motion/SplitHeading';
import Reveal from './motion/Reveal';
import TimelineRail from './ui/TimelineRail';

interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'codagentic',
    role: 'Junior AI Engineer',
    company: 'Codagentic',
    location: 'Remote',
    date: 'April 2026 — Present',
    bullets: [
      'Contributed to 2+ AI-powered web applications, collaborating with developers to deliver backend services and client features.',
      'Developed RESTful APIs using FastAPI and integrated Supabase for scalable backend services.',
      'Built frontend features using React and TypeScript, contributing to full-stack application development.',
      'Participated in code reviews, debugging, testing, and deployment to ensure production-ready releases.',
      'Performed API and UI testing, resolving bugs before production deployment.',
    ],
  },
  {
    id: 'builtinsoft',
    role: 'Python Developer',
    company: 'BuiltinSoft',
    location: 'Rahim Yar Khan, Pakistan',
    date: 'July 2025 — January 2026',
    bullets: [
      'Developed and maintained RESTful APIs using Django REST Framework for client applications.',
      'Integrated machine learning models into backend APIs for real-time prediction services.',
      'Designed and optimized PostgreSQL databases, improving query performance and response time.',
      'Collaborated with developers on debugging, testing, and backend optimization for production deployments.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="max-w-[900px] mb-16 md:mb-20">
          <Reveal className="eyebrow mb-7">Experience</Reveal>
          <SplitHeading className="title-xl">
            <span className="block text-ink">Where I've</span>
            <span className="block text-faint">built &amp; grown.</span>
          </SplitHeading>
        </div>

        <div id="experience-rail" className="relative pl-9 sm:pl-16">
          <TimelineRail containerId="experience-rail" />

          <div className="flex flex-col gap-5 lg:gap-6">
            {EXPERIENCE.map((exp) => (
              <Reveal key={exp.id}>
                <div className="relative">
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute -left-9 sm:-left-16 top-10 w-4 h-4 rounded-full bg-cream border-[3px] border-lime translate-x-[-1px] sm:translate-x-[3px]"
                  />

                  <article className="card-surface lift p-8 md:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                      <div>
                        <h3 className="font-display font-bold text-ink text-[clamp(22px,1.9vw,32px)] tracking-[-0.04em] leading-[1.1]">
                          {exp.role}
                        </h3>
                        <p className="text-body text-[15px] mt-2">
                          {exp.company} · {exp.location}
                        </p>
                      </div>
                      <span className="font-mono text-[12px] tracking-[0.06em] text-deeplime whitespace-nowrap shrink-0 sm:pt-2">
                        {exp.date}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-3 pt-6 border-t border-line">
                      {exp.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3.5 text-body text-[15px] md:text-[16px] leading-[1.6]"
                        >
                          <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
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

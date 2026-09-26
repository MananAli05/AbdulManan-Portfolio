import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiLangchain,
  SiHuggingface,
  SiFastapi,
  SiDjango,
  SiPostgresql,
  SiSupabase,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiGit,
  SiGithub,
  SiDocker,
} from 'react-icons/si';
import { Database, Sparkles, Webhook, Cloud, Bot } from 'lucide-react';
import SplitHeading from './motion/SplitHeading';
import Reveal from './motion/Reveal';

interface TechCategory {
  title: string;
  items: { name: string; icon: React.JSX.Element }[];
}

const ICON = 'w-[22px] h-[22px]';

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'AI / ML',
    items: [
      { name: 'Python', icon: <SiPython color="#3776AB" className={ICON} /> },
      { name: 'TensorFlow', icon: <SiTensorflow color="#FF6F00" className={ICON} /> },
      { name: 'PyTorch', icon: <SiPytorch color="#EE4C2C" className={ICON} /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn color="#F7931E" className={ICON} /> },
      { name: 'OpenCV', icon: <SiOpencv color="#5C3EE8" className={ICON} /> },
    ],
  },
  {
    title: 'LLM / AI',
    items: [
      { name: 'OpenAI', icon: <Bot className={`${ICON} text-[#10A37F]`} /> },
      { name: 'LangChain', icon: <SiLangchain color="#1C7A6E" className={ICON} /> },
      { name: 'Hugging Face', icon: <SiHuggingface color="#E9A100" className={ICON} /> },
      { name: 'RAG', icon: <Database className={`${ICON} text-deeplime`} /> },
      { name: 'LLMs', icon: <Sparkles className={`${ICON} text-deeplime`} /> },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'FastAPI', icon: <SiFastapi color="#009688" className={ICON} /> },
      { name: 'Django', icon: <SiDjango color="#0C4B33" className={ICON} /> },
      { name: 'REST API', icon: <Webhook className={`${ICON} text-deeplime`} /> },
    ],
  },
  {
    title: 'Data',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1" className={ICON} /> },
      { name: 'Supabase', icon: <SiSupabase color="#1F9E6E" className={ICON} /> },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: <SiReact color="#0E93B0" className={ICON} /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" className={ICON} /> },
      { name: 'JavaScript', icon: <SiJavascript color="#C5A200" className={ICON} /> },
    ],
  },
  {
    title: 'Dev tools',
    items: [
      { name: 'Git', icon: <SiGit color="#F05032" className={ICON} /> },
      { name: 'GitHub', icon: <SiGithub color="#10130C" className={ICON} /> },
      { name: 'Docker', icon: <SiDocker color="#2496ED" className={ICON} /> },
      { name: 'Cloud', icon: <Cloud className={`${ICON} text-deeplime`} /> },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="max-w-[900px] mb-16 md:mb-20">
          <Reveal className="eyebrow mb-7">Stack</Reveal>
          <SplitHeading className="title-xl mb-8">
            <span className="block text-ink">Tools I use</span>
            <span className="block text-faint">to build the best.</span>
          </SplitHeading>
          <Reveal className="text-body text-[17px] md:text-[19px] leading-[1.6] max-w-[620px]">
            <p>
              The technologies behind the models, the APIs, the interfaces and everything
              that ships them to production.
            </p>
          </Reveal>
        </div>

        <Reveal
          stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {TECH_CATEGORIES.map((cat) => (
            <div key={cat.title} className="card-surface lift p-8 md:p-9 flex flex-col">
              <div className="flex items-center justify-between mb-7 pb-5 border-b border-line">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-deeplime">
                  {cat.title}
                </span>
                <span className="font-mono text-[11px] text-faint">
                  {String(cat.items.length).padStart(2, '0')}
                </span>
              </div>

              <ul className="flex flex-col gap-1.5">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-center gap-4 py-2.5 px-3 -mx-3 rounded-2xl transition-colors duration-300 hover:bg-cream"
                  >
                    <span className="w-[22px] h-[22px] flex items-center justify-center shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-ink text-[15px] font-medium tracking-[-0.01em]">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

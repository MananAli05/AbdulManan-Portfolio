import type { ReactElement } from 'react';
import {
  SiCloudflare,
  SiDart,
  SiElevenlabs,
  SiFastapi,
  SiFirebase,
  SiFlutter,
  SiGoogle,
  SiGooglemaps,
  SiHono,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

const SIZE = 'w-[15px] h-[15px] shrink-0';

const Twilio = () => (
  <svg viewBox="0 0 24 24" className={SIZE} aria-hidden>
    <circle cx="12" cy="12" r="11" fill="#F22F46" />
    <circle cx="8.4" cy="8.4" r="2.1" fill="#fff" />
    <circle cx="15.6" cy="8.4" r="2.1" fill="#fff" />
    <circle cx="8.4" cy="15.6" r="2.1" fill="#fff" />
    <circle cx="15.6" cy="15.6" r="2.1" fill="#fff" />
  </svg>
);

const Groq = () => (
  <svg viewBox="0 0 24 24" className={SIZE} aria-hidden>
    <rect width="24" height="24" rx="6" fill="#F55036" />
    <path fill="#fff" d="M7 8h10v2H7V8zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
  </svg>
);

const Network = () => (
  <svg viewBox="0 0 24 24" className={SIZE} fill="none" aria-hidden>
    <path stroke="#5E7D12" strokeWidth="1.3" d="M8 6h8M8 18h8M7.5 7.5l3 3M7.5 16.5l3-3M13.5 10.5l3-3M13.5 13.5l3 3" />
    <g fill="#5E7D12">
      <circle cx="6" cy="6" r="2.1" />
      <circle cx="6" cy="18" r="2.1" />
      <circle cx="12" cy="12" r="2.1" />
      <circle cx="18" cy="6" r="2.1" />
      <circle cx="18" cy="18" r="2.1" />
    </g>
  </svg>
);

const Scan = () => (
  <svg viewBox="0 0 24 24" className={SIZE} fill="none" aria-hidden>
    <path
      stroke="#5E7D12"
      strokeWidth="1.7"
      strokeLinecap="round"
      d="M4 8V5h3M17 5h3v3M4 16v3h3M20 16v3h-3M7 10h10M7 14h7"
    />
  </svg>
);

const ICONS: Record<string, ReactElement> = {
  React: <SiReact className={SIZE} color="#149ECA" />,
  Vite: <SiVite className={SIZE} color="#646CFF" />,
  Firebase: <SiFirebase className={SIZE} color="#F5820D" />,
  Twilio: <Twilio />,
  Groq: <Groq />,
  ElevenLabs: <SiElevenlabs className={SIZE} color="#10130C" />,
  Flutter: <SiFlutter className={SIZE} color="#02569B" />,
  Dart: <SiDart className={SIZE} color="#0175C2" />,
  Python: <SiPython className={SIZE} color="#3776AB" />,
  FastAPI: <SiFastapi className={SIZE} color="#009688" />,
  'Node.js': <SiNodedotjs className={SIZE} color="#3C873A" />,
  Hono: <SiHono className={SIZE} color="#E36002" />,
  Supabase: <SiSupabase className={SIZE} color="#2EA36B" />,
  'Google Maps': <SiGooglemaps className={SIZE} color="#4285F4" />,
  'Google ML Kit': <SiGoogle className={SIZE} color="#4285F4" />,
  n8n: <SiN8N className={SIZE} color="#EA4B71" />,
  'Next.js': <SiNextdotjs className={SIZE} color="#10130C" />,
  TypeScript: <SiTypescript className={SIZE} color="#3178C6" />,
  Cloudflare: <SiCloudflare className={SIZE} color="#F38020" />,
  CNN: <Network />,
  OCR: <Scan />,
};

export default function TechIcon({ name }: { name: string }) {
  return (
    ICONS[name] ?? <span aria-hidden className="w-1.5 h-1.5 mx-1 rounded-full bg-ink/40 shrink-0" />
  );
}

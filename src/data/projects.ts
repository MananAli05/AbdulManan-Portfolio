import { GITHUB_URL } from './site';

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  status?: { label: string; live: boolean };
  caseStudyUrl?: string;
  githubUrl: string;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'sage-salt',
    category: 'AI restaurant ordering system',
    title: 'Sage & Salt',
    description:
      'A restaurant management and ordering system that takes orders by voice call, WhatsApp and QR menu, then runs them through one dashboard with live tracking and analytics.',
    tech: ['React', 'Vite', 'Firebase', 'Twilio', 'Groq', 'ElevenLabs'],
    image: '/sage-salt-mockup.webp',
    githubUrl: `${GITHUB_URL}/Sage-and-Salt`,
    liveUrl: 'https://sage-and-salt.vercel.app/',
  },
  {
    id: 'truck-bhai',
    category: 'Truck booking app · Bangladesh',
    title: 'Truck Bhai',
    description:
      'Shippers post a load, nearby verified drivers send a price, and the trip is tracked from pickup to delivery. Built for low-literacy users, in full English and Bangla.',
    tech: ['Flutter', 'Node.js', 'Hono', 'Supabase', 'Firebase', 'Google Maps'],
    image: '/TruckBhai-mockup-card.webp',
    caseStudyUrl: '/projects/truck-bhai',
    githubUrl: GITHUB_URL,
  },
  {
    id: 'etihad-garden',
    category: 'AI sales assistant & CRM',
    title: 'Etihad Garden',
    description:
      'An AI sales system for a housing society. Sara, a bilingual chat and voice assistant, answers buyers on the website and turns every conversation into a lead in a custom CRM.',
    tech: ['React', 'FastAPI', 'Groq', 'ElevenLabs', 'Supabase', 'n8n'],
    image: '/Etihad-mockup-card.webp',
    status: { label: 'Live', live: true },
    caseStudyUrl: '/projects/etihad-garden',
    githubUrl: `${GITHUB_URL}/Etihad-Agent`,
    liveUrl: 'https://etihad-agent.vercel.app/',
  },
  {
    id: 'premium-store',
    category: 'Chat-based subscription store',
    title: 'Premium Store',
    description:
      'A store that sells digital subscriptions through a chatbot. Customers pay with local wallets and upload proof; the owner approves from a web panel or a Flutter app. 2,300+ customers.',
    tech: ['Next.js', 'Flutter', 'Supabase', 'TypeScript', 'Firebase', 'Cloudflare'],
    image: '/premium-store-mockup.webp',
    status: { label: 'Live', live: true },
    caseStudyUrl: '/projects/premium-store',
    githubUrl: GITHUB_URL,
    liveUrl: 'https://premiumstore.online/',
  },
  {
    id: 'multilingual-healthcare',
    category: 'AI medical assistant',
    title: 'Multilingual AI Healthcare',
    description:
      'A mobile health assistant in English and Urdu: a voice symptom checker, X-ray analysis for pneumonia, lab report reading with OCR, and emergency calling in one app.',
    tech: ['Flutter', 'Dart', 'Python', 'Firebase', 'Groq', 'Google ML Kit', 'CNN', 'OCR'],
    image: '/medical.webp',
    caseStudyUrl: '/projects/medicare',
    githubUrl: `${GITHUB_URL}/Multilingual-AI-Healthcare`,
  },
];

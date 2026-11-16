export interface JourneyEntry {
  id: string;
  kind: 'Work' | 'Education';
  year: string;
  period: string;
  title: string;
  place: string;
  location: string;
  points: string[];
  badge?: { label: string; value: string };
}

export const JOURNEY: JourneyEntry[] = [
  {
    id: 'codagentic',
    kind: 'Work',
    year: '2026',
    period: 'April 2026 — Present',
    title: 'Full Stack & AI Engineer',
    place: 'CodAgentic',
    location: 'Remote',
    points: [
      'Built features across 2+ AI-powered web applications, backend and frontend.',
      'REST APIs in FastAPI on Supabase, with interfaces in React and TypeScript.',
      'Code reviews, API and UI testing, and production releases.',
    ],
  },
  {
    id: 'builtinsoft',
    kind: 'Work',
    year: '2025',
    period: 'July 2025 — January 2026',
    title: 'Python Developer',
    place: 'BuiltinSoft',
    location: 'Rahim Yar Khan, Pakistan',
    points: [
      'Built and maintained REST APIs with Django REST Framework for client applications.',
      'Integrated machine learning models into backend APIs for real-time predictions.',
      'Designed and tuned PostgreSQL databases for faster queries.',
    ],
  },
  {
    id: 'kfueit',
    kind: 'Education',
    year: '2022',
    period: '2022 — 2026',
    title: 'Bachelor in Data Science',
    place: 'Khwaja Fareed University of Engineering & Information Technology',
    location: 'Rahim Yar Khan, Pakistan',
    points: [],
    badge: { label: 'CGPA', value: '3.56 / 4.00' },
  },
];

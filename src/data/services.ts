export interface Service {
  id: string;
  title: string;
  kind: string;
  description: string;
  points: string[];
  tech: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'mobile',
    title: 'Mobile Apps',
    kind: 'Flutter',
    description:
      'Apps people use every day, built in Flutter from the first screen to the store listing. One codebase, a native feel.',
    points: [
      'Phone login, maps, camera and push notifications',
      'Admin apps for owners and staff',
      'Interfaces in English, Urdu and Bangla',
    ],
    tech: ['Flutter', 'Dart', 'Firebase', 'Supabase'],
  },
  {
    id: 'web',
    title: 'Web Apps',
    kind: 'Next.js · React',
    description:
      'Dashboards, admin panels and customer-facing sites your team can run the business from.',
    points: [
      'Admin panels and CRMs built around your process',
      'Live data that updates without a refresh',
      'Fast on old phones and slow internet',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase'],
  },
  {
    id: 'agents',
    title: 'AI Agents',
    kind: 'Chatbots',
    description:
      'Chat assistants that answer from your own approved information and turn conversations into orders and leads.',
    points: [
      'Answers only from your knowledge base',
      'On your website, in WhatsApp or inside your app',
      'Every lead and order saved to your CRM',
    ],
    tech: ['Groq', 'Python', 'FastAPI', 'Supabase'],
  },
  {
    id: 'voice',
    title: 'Voice AI',
    kind: 'Phone agents',
    description:
      'Voice agents that take and make calls, in the browser or on the phone, so an enquiry is never left waiting.',
    points: [
      'Real-time conversations, not a phone menu',
      'Outbound follow-up calls to your leads',
      'Speaks Urdu and English',
    ],
    tech: ['ElevenLabs', 'Twilio', 'n8n'],
  },
  {
    id: 'automation',
    title: 'Automation',
    kind: 'n8n workflows',
    description:
      'Workflows that connect the tools you already use and take the repetitive work off your team.',
    points: [
      'Forms, CRM, email and calls kept in sync',
      'Scheduled jobs and instant alerts',
      'Workflows you can open and edit yourself',
    ],
    tech: ['n8n', 'Node.js', 'Python'],
  },
];

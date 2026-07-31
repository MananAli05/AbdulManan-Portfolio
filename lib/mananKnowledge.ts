export const mananKnowledge = {
  profile: {
    name: 'Abdul Manan',
    role: 'AI Engineer',
    focus:
      'AI-powered applications, LLM systems, RAG systems, voice AI agents, computer vision, backend development and intelligent automation.',
  },
  experience: [
    {
      company: 'CodAgentic',
      role: 'Junior AI Engineer',
      location: 'Remote',
      period: 'April 2026 – Present',
      work: [
        'Contributes to AI-powered web applications.',
        'Develops backend services and REST APIs using FastAPI.',
        'Works with Supabase for backend and database services.',
        'Builds frontend functionality using React and TypeScript.',
        'Works on debugging, testing and production-ready AI applications.',
      ],
    },
    {
      company: 'BuiltinSoft',
      role: 'Python Developer',
      location: 'Rahim Yar Khan, Pakistan',
      period: 'July 2025 – January 2026',
      work: [
        'Developed REST APIs using Django REST Framework.',
        'Integrated machine learning models into backend APIs.',
        'Worked with PostgreSQL databases.',
        'Worked on debugging, testing and backend optimisation.',
      ],
    },
  ],
  featuredProjects: [
    {
      title: 'Sage & Salt',
      type: 'AI-powered restaurant management and ordering system.',
      capabilities: [
        'Voice AI phone ordering',
        'WhatsApp automation',
        'QR-based digital ordering',
        'Admin dashboard',
        'Order management',
        'Real-time analytics',
      ],
      technologies: [
        'React',
        'FastAPI',
        'Python',
        'Supabase',
        'Twilio',
        'ElevenLabs/Voice AI integrations',
      ],
    },
    {
      title: 'Multilingual AI Healthcare',
      type: 'AI-powered multilingual healthcare assistant.',
      capabilities: [
        'AI symptom checker with voice input',
        'X-ray analysis',
        'Pneumonia detection',
        'Lab report analysis',
        'OCR',
        'English and Urdu support',
        'Emergency assistance',
        'Activity/history tracking',
      ],
      technologies: [
        'Flutter',
        'Dart',
        'Python',
        'TensorFlow Lite',
        'CNN',
        'Google ML Kit OCR',
        'Groq',
        'Firebase',
        'REST APIs',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor in Data Science',
      institution:
        'Khwaja Fareed University of Engineering and Information Technology',
      location: 'Rahim Yar Khan, Pakistan',
      period: '2022 – 2026',
      cgpa: '3.56 / 4.00',
    },
    {
      degree: 'Intermediate – FSc Pre-Engineering',
      institution: 'Aspire College',
      location: 'Rahim Yar Khan, Pakistan',
      period: '2020 – 2022',
    },
  ],
  technicalSkills: {
    aiMl: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'OpenCV'],
    llmAi: ['Groq', 'LangChain', 'Hugging Face', 'RAG', 'LLM applications'],
    backend: ['FastAPI', 'Django', 'Django REST Framework', 'REST APIs'],
    data: ['PostgreSQL', 'Supabase'],
    frontend: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    tools: ['Git', 'GitHub', 'Docker'],
  },
  contact: {
    email: 'abdulmannan.developer@gmail.com',
    gitHub: 'https://github.com/MananAli05',
    linkedIn: 'https://www.linkedin.com/in/abdul-manan05',
    resume: '/public/AbdulMananResume.pdf',
  },
} as const;

export type MananKnowledge = typeof mananKnowledge;

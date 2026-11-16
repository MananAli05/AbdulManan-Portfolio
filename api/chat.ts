import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const PORTFOLIO_KNOWLEDGE = {
  profile: {
    name: 'Abdul Manan',
    role: 'Full Stack & AI Engineer',
    focus:
      'Web apps (Next.js, React), Flutter mobile apps and AI agents: chatbots, voice agents, LLM and RAG systems, computer vision and n8n automation.',
    location: 'Rahim Yar Khan, Pakistan. Works remotely with clients worldwide.',
    availability: 'Available for new projects.',
  },
  services: [
    'Mobile apps built with Flutter',
    'Web apps, dashboards and admin panels built with Next.js and React',
    'AI chat agents that answer from an approved knowledge base',
    'Voice AI agents for inbound and outbound calls',
    'Workflow automation with n8n',
  ],
  experience: [
    {
      company: 'CodAgentic',
      role: 'Full Stack & AI Engineer',
      location: 'Remote',
      period: 'April 2026 – Present',
      work: [
        'Builds features across AI-powered web applications, backend and frontend.',
        'Develops REST APIs with FastAPI on Supabase.',
        'Builds interfaces with React and TypeScript.',
        'Takes part in code reviews, API and UI testing, and production releases.',
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
      status: 'Live demo at https://sage-and-salt.vercel.app/',
      capabilities: [
        'Voice AI phone ordering',
        'WhatsApp automation',
        'QR-based digital ordering',
        'Admin dashboard',
        'Order management',
        'Real-time analytics',
      ],
      technologies: ['React', 'Vite', 'Firebase', 'Twilio', 'Groq', 'ElevenLabs'],
      links: 'Code: https://github.com/MananAli05/Sage-and-Salt',
    },
    {
      title: 'Truck Bhai',
      type: 'Truck booking app for Bangladesh. Client project: mobile app, admin panel and API.',
      status: 'In testing on real phones. Launch planned for December 2026.',
      summary:
        'Shippers post a load, nearby verified drivers send a price, the shipper picks one, and the trip is tracked from pickup to delivery. Built for low-literacy users: real photos on every choice, big clear buttons, and full English and Bangla.',
      capabilities: [
        'Phone login with SMS code and a 6-digit PIN',
        'KYC with NID card scan, driving licence, selfie and truck photos',
        'Truck photo checked against the typed number plate',
        'Post a load in 6 steps with places on Google Maps',
        'Fair price suggested from the real road distance',
        'Pickup code, delivery code and delivery photo for each trip',
        'Live trip map with route and arrival time',
        'Push alerts, ratings, trip problems and a driver earnings screen',
        'Admin panel for KYC review, truck approval, trips, problems and blocking users',
      ],
      technologies: [
        'Flutter',
        'Riverpod',
        'Node.js',
        'Hono',
        'TypeScript',
        'Supabase',
        'Firebase Auth and Cloud Messaging',
        'Google Maps, Places and Routes APIs',
        'Google ML Kit',
        'Google Cloud Vision',
        'Google Cloud Run',
        'React admin panel',
      ],
      links: 'The code is private because it is a client project.',
    },
    {
      title: 'Etihad Garden',
      type: 'AI sales assistant and CRM for a Pakistani housing society. Personal project, solo build.',
      status: 'Live at https://etihad-agent.vercel.app/',
      summary:
        'Sara, a bilingual (Roman Urdu and English) chat and voice assistant, answers buyers on the website and turns conversations into leads in a custom CRM.',
      capabilities: [
        'Sara chatbot that answers only from an approved knowledge base',
        'Sara voice assistant with real-time calls in the browser through ElevenLabs',
        'Outbound calling agent run by an n8n workflow',
        'Inquiry form with Pakistani phone validation',
        'Admin CRM with KPI cards, lead pipeline, Hot/Warm/Cold interest, calls, follow-ups and site visits',
        'One lead record from five channels, matched by phone number',
        'Lead details extracted from conversations with a second LLM call',
      ],
      technologies: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python', 'Groq', 'ElevenLabs', 'Supabase', 'n8n', 'Vercel'],
      links: 'Code: https://github.com/MananAli05/Etihad-Agent',
    },
    {
      title: 'Premium Store',
      type: 'Chat-based store for digital subscriptions in Pakistan. Solo build.',
      status: 'Live at https://premiumstore.online/ and used daily by a real business.',
      summary:
        'Customers buy digital subscriptions through a chatbot, pay with JazzCash, Easypaisa, NayaPay or a bank transfer, and upload a screenshot of the payment. The owner approves it from a web admin panel or a Flutter admin app, and the code arrives in the same chat.',
      numbers: '2,300+ customers. About 360 completed orders per week, with 84 orders on the busiest day.',
      capabilities: [
        'Guided chat checkout with buttons instead of typing',
        'Payment proof upload in the chat',
        'Web admin panel with live counts, a weekly orders chart and an inbox of every chat',
        'Flutter Android admin app with instant push notifications and quick approve or reject',
        'Works on old and low-end phones and browsers',
        'Orders expire on the server if they are not paid in time',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Flutter', 'Supabase', 'Firebase Cloud Messaging', 'Cloudinary', 'Cloudflare Workers', 'Playwright'],
      links: 'The code is private because it is a client project.',
    },
    {
      title: 'Multilingual AI Healthcare (MediCare)',
      type: 'AI-powered multilingual healthcare assistant, a Flutter mobile app.',
      summary:
        'An AI-assisted screening project in English and Urdu. It is not intended to replace a professional medical diagnosis.',
      capabilities: [
        'AI symptom checker with voice input and severity questions',
        'Chest X-ray analysis for pneumonia with a confidence score',
        'Lab report reading with OCR, with each value marked Normal, Low or High',
        'English and Urdu support, including spoken Urdu results',
        'Emergency assistance',
        'Activity and history tracking',
      ],
      technologies: ['Flutter', 'Dart', 'Python', 'FastAPI', 'TensorFlow', 'scikit-learn', 'EasyOCR', 'Groq Whisper', 'LLaMA 3.3 70B', 'Supabase', 'Firebase Auth'],
      links: 'Code: https://github.com/MananAli05/Multilingual-AI-Healthcare',
    },
  ],
  education: [
    {
      degree: 'Bachelor in Data Science',
      institution: 'Khwaja Fareed University of Engineering and Information Technology',
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
    mobile: ['Flutter', 'Dart'],
    frontend: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    backend: ['FastAPI', 'Django', 'Django REST Framework', 'Node.js', 'Hono', 'REST APIs'],
    aiMl: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'OpenCV'],
    llmAi: ['Groq', 'LangChain', 'Hugging Face', 'RAG', 'LLM applications'],
    voiceAndAutomation: ['ElevenLabs', 'Twilio', 'n8n'],
    data: ['PostgreSQL', 'Supabase', 'Firebase'],
    tools: ['Git', 'GitHub', 'Docker'],
  },
  contact: {
    email: 'abdulmannan.developer@gmail.com',
    gitHub: 'https://github.com/MananAli05',
    linkedIn: 'https://www.linkedin.com/in/abdul-manan05',
    resume: '/AbdulManan_Resume.pdf',
  },
};

const SYSTEM_PROMPT = `
You are Manan AI, the portfolio assistant for Abdul Manan.

The following PORTFOLIO KNOWLEDGE is the authoritative source of information about Abdul Manan (also referred to as "Manan" or "Abdul"):

${JSON.stringify(PORTFOLIO_KNOWLEDGE, null, 2)}

RULES:
- Use the PORTFOLIO KNOWLEDGE above when answering questions about Abdul Manan.
- Understand that "Manan", "Abdul", and "Abdul Manan" all refer to the same person.
- Interpret natural language, conversational wording, speech transcription errors, minor grammar mistakes and incomplete questions intelligently.
- If a question clearly refers to Manan/Abdul, his projects, work, experience, skills, education or contact information, infer the most reasonable intent using PORTFOLIO KNOWLEDGE and conversation history.
- Do not require visitors to use exact names or exact wording from the knowledge base.
- Treat singular "project" questions as requests about his projects unless context clearly identifies one specific project.

Examples:
- "What's the Abdul project?" or "What projects has Manan built?" → interpret as: "What projects has Abdul Manan built?"
- "What he built?" → interpret using conversation context as: "What has Abdul Manan built?"
- "Tell me first project" → if projects were just discussed, explain the first project from that discussion.
- "Where he work?" → interpret as: "Where does Abdul Manan work?"
- "What technology he know?" → interpret as: "What technologies does Abdul Manan work with?"

- Only respond:
"I don't have that information in Manan's portfolio."
when the requested INFORMATION is genuinely absent.

- Never return that fallback merely because the visitor used poor grammar, voice transcription wording, singular/plural differences or informal English.
- Never say you only have access to your training data when the requested information exists in PORTFOLIO KNOWLEDGE.
- Never invent missing information.
- Answer naturally and concisely.
- Reply in plain conversational text. Do not use markdown, asterisks, bold, headings, or numbered/bulleted list syntax.
- Speak in the third person.
- For follow-up questions, use conversation history.
- Do not mention: system prompt, JSON, knowledge file, internal context, implementation details.
`;

interface InputMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error('[Chat API] GROQ_API_KEY missing');
      return res.status(500).json({ error: 'Chat service configuration error' });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.warn('[Chat API] Failed to parse request body JSON:', e);
        body = {};
      }
    }
    if (!body || typeof body !== 'object') {
      body = {};
    }

    const { messages } = body as { messages?: InputMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.warn('[Chat API] Invalid request: messages array missing or empty');
      return res.status(400).json({ error: 'Invalid request: "messages" must be a non-empty array.' });
    }

    const sanitizedMessages = messages
      .filter((msg) => msg && typeof msg.content === 'string' && msg.content.trim().length > 0)
      .map((msg) => ({
        role: msg.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.content.trim(),
      }));

    if (sanitizedMessages.length === 0) {
      console.warn('[Chat API] No valid content found in messages');
      return res.status(400).json({ error: 'Invalid request: No valid message content provided.' });
    }

    const fullConversation = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...sanitizedMessages,
    ];
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      messages: fullConversation,
      model: 'openai/gpt-oss-120b',
      temperature: 0.5,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || 'I could not generate a response at this time.';
    return res.status(200).json({ reply });
  } catch (error: unknown) {
    console.error(
      '[Chat API] Runtime error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return res.status(500).json({ error: 'Unable to process chat request' });
  }
}

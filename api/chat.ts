import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const PORTFOLIO_KNOWLEDGE = {
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
  console.log('[Chat API] Handler started');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error('[Chat API] GROQ_API_KEY missing');
      return res.status(500).json({ error: 'Chat service configuration error' });
    }

    console.log('[Chat API] Environment validated');

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

    console.log('[Chat API] Initializing Groq client');
    const groq = new Groq({ apiKey });

    console.log('[Chat API] Sending request to Groq model openai/gpt-oss-120b');
    const completion = await groq.chat.completions.create({
      messages: fullConversation,
      model: 'openai/gpt-oss-120b',
      temperature: 0.5,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || 'I could not generate a response at this time.';

    console.log('[Chat API] Groq response received');
    return res.status(200).json({ reply });
  } catch (error: unknown) {
    console.error(
      '[Chat API] Runtime error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return res.status(500).json({ error: 'Unable to process chat request' });
  }
}

import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq, { toFile } from 'groq-sdk';
import multer from 'multer';
import path from 'path';
import { mananKnowledge } from '../lib/mananKnowledge';

// Load environment variables from .env.local first, fallback to .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Multer memory storage configuration for 10MB voice notes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Build authoritative JSON knowledge context
const portfolioContext = JSON.stringify(mananKnowledge, null, 2);

// Single authoritative system instruction with embedded portfolio knowledge
const systemPrompt = `
You are Manan AI, the portfolio assistant for Abdul Manan.

The following PORTFOLIO KNOWLEDGE is the authoritative source of information about Abdul:

${portfolioContext}

RULES:

- Use the PORTFOLIO KNOWLEDGE above when answering questions about Abdul.

- Interpret natural language, conversational wording, speech transcription errors, minor grammar mistakes and incomplete questions intelligently.

- If a question clearly refers to Abdul, his projects, work, experience, skills, education or contact information, infer the most reasonable intent using PORTFOLIO KNOWLEDGE and conversation history.

- Do not require visitors to use exact names or exact wording from the knowledge base.

- Treat singular "project" questions as requests about Abdul's projects unless context clearly identifies one specific project.

Examples:
- "What's the Abdul project?" → interpret as: "What projects has Abdul built?"
- "What he built?" → interpret using conversation context as: "What has Abdul built?"
- "Tell me first project" → if projects were just discussed, explain the first project from that discussion.
- "Where he work?" → interpret as: "Where does Abdul work?"
- "What technology he know?" → interpret as: "What technologies does Abdul work with?"

- Only respond:
"I don't have that information in Abdul's portfolio."
when the requested INFORMATION is genuinely absent.

- Never return that fallback merely because the visitor used poor grammar, voice transcription wording, singular/plural differences or informal English.

- Never say you only have access to your training data when the requested information exists in PORTFOLIO KNOWLEDGE.

- Never invent missing information.

- Answer naturally and concisely.

- When discussing Abdul, speak about him in third person.

- For follow-up questions, use conversation history.

- Do not mention:
system prompt
JSON
knowledge file
internal context
implementation details
`;

interface InputMessage {
  role: 'user' | 'assistant';
  content: string;
}

app.use(cors());
app.use(express.json());

// GET / health check route for browser confirmation
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    message: 'MANAN AI Local API Development Server is running.',
    endpoint: 'POST /api/chat & POST /api/transcribe',
    featuredProjectsCount: mananKnowledge.featuredProjects?.length || 0,
  });
});

// GET /api/chat info route
app.get('/api/chat', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    message: 'Send a POST request with { messages: [...] } to chat with MANAN AI.',
  });
});

// POST /api/transcribe local endpoint
app.post('/api/transcribe', upload.single('file'), async (req: Request, res: Response) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === 'PASTE_YOUR_GROQ_API_KEY_HERE') {
    console.error('[Dev Server Error] GROQ_API_KEY is missing or unconfigured in .env.local.');
    return res.status(500).json({ error: 'Server configuration error. Please add your Groq API key to .env.local.' });
  }

  const file = req.file;
  if (!file || !file.buffer || file.buffer.length === 0) {
    return res.status(400).json({ error: 'No valid audio file provided.' });
  }

  try {
    const groq = new Groq({ apiKey });

    const mimeType = file.mimetype || 'audio/webm';
    let ext = 'webm';
    if (mimeType.includes('mp4') || mimeType.includes('m4a')) ext = 'm4a';
    else if (mimeType.includes('wav')) ext = 'wav';
    else if (mimeType.includes('ogg')) ext = 'ogg';
    else if (mimeType.includes('mpeg') || mimeType.includes('mp3')) ext = 'mp3';

    const filename = `voice_note.${ext}`;
    const groqFile = await toFile(file.buffer, filename, { type: mimeType });

    const transcription = await groq.audio.transcriptions.create({
      file: groqFile,
      model: 'whisper-large-v3-turbo',
      temperature: 0.0,
    });

    const transcript = (transcription.text || '').trim();
    if (!transcript) {
      return res.status(400).json({ error: 'Could not detect speech in audio.' });
    }

    return res.status(200).json({ transcript });
  } catch (error: unknown) {
    console.error('[Dev Server Error] Groq audio transcription failed:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Failed to transcribe audio note. Please try again.' });
  }
});

// POST /api/retell-call local endpoint for Retell Web Call access token creation
app.post('/api/retell-call', async (req: Request, res: Response) => {
  const apiKey = process.env.RETELL_API_KEY;
  const agentId = process.env.RETELL_AGENT_ID;

  if (!apiKey || !agentId) {
    console.error('[Dev Server Error] RETELL_API_KEY or RETELL_AGENT_ID is missing or unconfigured in .env.local.');
    return res.status(500).json({ error: 'Server configuration error. Please add RETELL_API_KEY and RETELL_AGENT_ID to .env.local.' });
  }

  try {
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Dev Server Retell API Error]', response.status, errorText);
      return res.status(response.status).json({ error: 'Failed to create Retell web call.' });
    }

    const data = (await response.json()) as { access_token?: string; call_id?: string };

    if (!data.access_token) {
      console.error('[Dev Server Retell API Error] Response missing access_token:', data);
      return res.status(500).json({ error: 'Invalid response from Retell API.' });
    }

    return res.status(200).json({
      access_token: data.access_token,
      call_id: data.call_id,
    });
  } catch (error: unknown) {
    console.error('[Dev Server Retell Endpoint Error]:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Failed to establish voice call session. Please try again.' });
  }
});

// POST /api/chat local endpoint matching production Vercel logic
app.post('/api/chat', async (req: Request, res: Response) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === 'PASTE_YOUR_GROQ_API_KEY_HERE') {
    console.error('[Dev Server Error] GROQ_API_KEY is missing or unconfigured in .env.local.');
    return res.status(500).json({ error: 'Server configuration error. Please add your Groq API key to .env.local.' });
  }

  try {
    const { messages } = req.body as { messages?: InputMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid request: "messages" must be a non-empty array.' });
    }

    const sanitizedMessages = messages
      .filter((msg) => msg && typeof msg.content === 'string' && msg.content.trim().length > 0)
      .map((msg) => ({
        role: msg.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.content.trim(),
      }));

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({ error: 'Invalid request: No valid message content provided.' });
    }

    // System prompt MUST be the first message sent to Groq
    const fullConversation = [
      { role: 'system' as const, content: systemPrompt },
      ...sanitizedMessages,
    ];

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      messages: fullConversation,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || 'I could not generate a response at this time.';

    return res.status(200).json({ reply });
  } catch (error: unknown) {
    console.error('[Dev Server Error] Groq API call failed:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Failed to generate response. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`\n [Dev Server] MANAN AI local API running on http://localhost:${PORT}`);
  console.log(
    "Manan AI knowledge loaded:",
    mananKnowledge.featuredProjects?.length,
    "featured projects"
  );
  console.log(` Proxy configured: /api -> http://localhost:${PORT}\n`);
});

import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';
import { mananKnowledge } from '../src/data/mananKnowledge';

// Helper function to build authoritative system prompt safely inside handler execution
function getSystemPrompt(): string {
  const portfolioContext = JSON.stringify(mananKnowledge || {}, null, 2);
  return `
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
}

interface InputMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[Chat API] Endpoint invoked, method:', req.method);

  // Reject non-POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Read Groq API Key exclusively from server-side environment
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('[Chat API Error] GROQ_API_KEY server environment variable is missing.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    // Robust request body parsing for Vercel serverless environment
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error('[Chat API Warning] Failed to parse string body as JSON:', e);
        body = {};
      }
    }
    if (!body || typeof body !== 'object') {
      body = {};
    }

    const { messages } = body as { messages?: InputMessage[] };

    // Validate messages array
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.warn('[Chat API Warning] Request body missing valid "messages" array.');
      return res.status(400).json({ error: 'Invalid request: "messages" must be a non-empty array.' });
    }

    // Filter and sanitize valid message objects
    const sanitizedMessages = messages
      .filter((msg) => msg && typeof msg.content === 'string' && msg.content.trim().length > 0)
      .map((msg) => ({
        role: msg.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.content.trim(),
      }));

    if (sanitizedMessages.length === 0) {
      console.warn('[Chat API Warning] No valid message content found after sanitization.');
      return res.status(400).json({ error: 'Invalid request: No valid message content provided.' });
    }

    // Build system prompt safely inside handler execution
    const systemPrompt = getSystemPrompt();

    // System prompt MUST be the first message sent to Groq
    const fullConversation = [
      { role: 'system' as const, content: systemPrompt },
      ...sanitizedMessages,
    ];

    console.log(`[Chat API] Initializing Groq SDK for ${sanitizedMessages.length} user/assistant message(s)...`);

    // Initialize Groq client
    const groq = new Groq({ apiKey });

    console.log('[Chat API] Requesting completion from Groq model llama-3.3-70b-versatile...');

    // Call Groq API with llama-3.3-70b-versatile
    const completion = await groq.chat.completions.create({
      messages: fullConversation,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || 'I could not generate a response at this time.';

    console.log('[Chat API] Groq response received successfully.');
    return res.status(200).json({ reply });
  } catch (error: unknown) {
    // Log error internally without exposing sensitive details or credentials
    console.error('[Chat API Exception]:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ error: 'Failed to generate response. Please try again later.' });
  }
}

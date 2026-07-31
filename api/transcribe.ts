import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq, { toFile } from 'groq-sdk';
import multer from 'multer';

// Disable default body parser so multer can parse incoming multipart stream
export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for short voice notes
});

function runMiddleware(req: VercelRequest, res: VercelResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY server environment variable is not configured.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    // Process multipart/form-data audio upload
    await runMiddleware(req, res, upload.single('file'));

    const file = (req as any).file;
    if (!file || !file.buffer || file.buffer.length === 0) {
      return res.status(400).json({ error: 'No valid audio file provided.' });
    }

    const mimeType = file.mimetype || 'audio/webm';
    let ext = 'webm';
    if (mimeType.includes('mp4') || mimeType.includes('m4a')) ext = 'm4a';
    else if (mimeType.includes('wav')) ext = 'wav';
    else if (mimeType.includes('ogg')) ext = 'ogg';
    else if (mimeType.includes('mpeg') || mimeType.includes('mp3')) ext = 'mp3';

    const filename = `voice_note.${ext}`;
    const groqFile = await toFile(file.buffer, filename, { type: mimeType });

    const groq = new Groq({ apiKey });

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
    console.error('Transcription API Error:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Failed to transcribe audio note. Please try again.' });
  }
}

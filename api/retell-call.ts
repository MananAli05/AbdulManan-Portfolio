import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.RETELL_API_KEY;
  const agentId = process.env.RETELL_AGENT_ID;

  if (!apiKey || !agentId) {
    console.error('[Retell Call Error] RETELL_API_KEY or RETELL_AGENT_ID is unconfigured.');
    return res.status(500).json({ error: 'Server configuration error. Missing Retell variables.' });
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
      console.error('[Retell API Error]', response.status, errorText);
      return res.status(response.status).json({ error: 'Failed to create Retell web call.' });
    }

    const data = (await response.json()) as { access_token?: string; call_id?: string };

    if (!data.access_token) {
      console.error('[Retell API Error] Response missing access_token:', data);
      return res.status(500).json({ error: 'Invalid response from Retell API.' });
    }

    return res.status(200).json({
      access_token: data.access_token,
      call_id: data.call_id,
    });
  } catch (error: unknown) {
    console.error('[Retell Endpoint Error]:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Failed to establish voice call session. Please try again.' });
  }
}

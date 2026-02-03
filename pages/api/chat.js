import { getAssistantInstructions } from '@/lib/assistantContext';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const MODEL = 'gpt-4o-mini';

/**
 * Extrait le texte de la réponse depuis l'output de l'API Responses.
 */
function getOutputText(output) {
  if (!Array.isArray(output)) return '';
  for (let i = output.length - 1; i >= 0; i--) {
    const item = output[i];
    if (item?.type === 'message' && item?.role === 'assistant' && Array.isArray(item.content)) {
      const parts = item.content
        .filter((c) => c?.type === 'output_text' && c?.text)
        .map((c) => c.text);
      if (parts.length) return parts.join('');
    }
  }
  return '';
}

/**
 * POST /api/chat
 * Body: { messages: [{ role: 'user'|'assistant', text: string }], language?: 'fr'|'en'|'it'|'pt'|'ao' }
 * Répond avec { text: string } ou { error: string }.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPEN_AI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPEN_AI_KEY is not configured' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required and must not be empty' });
  }

  const language = ['fr', 'en', 'it', 'pt', 'ao'].includes(body?.language) ? body.language : 'fr';
  const instructions = getAssistantInstructions(language);

  // Format attendu par l'API Responses : input = tableau de { role, content }
  const input = messages.map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: typeof m.text === 'string' ? m.text : String(m.text ?? ''),
  }));

  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        instructions,
        input,
        temperature: 0.7,
        max_output_tokens: 1024,
        truncation: 'auto',
        tools: [{ type: 'web_search' }],
        tool_choice: 'auto',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || data?.message || `OpenAI error ${response.status}`;
      return res.status(response.status >= 500 ? 502 : 400).json({ error: message });
    }

    const text = getOutputText(data.output);
    if (!text) {
      return res.status(502).json({ error: 'No text in OpenAI response' });
    }

    return res.status(200).json({ text });
  } catch (err) {
    console.error('[api/chat]', err);
    return res.status(500).json({
      error: err.message || 'Failed to call OpenAI',
    });
  }
}

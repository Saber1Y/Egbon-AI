import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1';
const API_KEY = process.env.OPENAI_API_KEY || '';
const MODEL = process.env.MODEL_NAME || 'meta-llama/llama-3.3-70b-instruct:free';

let cachedSystemPrompt: string | null = null;

function loadCharacterSystemPrompt(): string {
  if (cachedSystemPrompt) return cachedSystemPrompt;

  try {
    const charPath = path.resolve(process.cwd(), '..', 'characters', 'egbon.character.json');
    const raw = fs.readFileSync(charPath, 'utf-8');
    const char = JSON.parse(raw);

    const parts: string[] = [];

    if (char.system) parts.push(char.system);
    if (char.bio?.length) parts.push('', '## Who You Be', ...char.bio.map((b: string) => `- ${b}`));
    if (char.style?.all?.length) parts.push('', '## Style Rules', ...char.style.all.map((s: string) => `- ${s}`));
    if (char.style?.chat?.length) parts.push('', '## Chat Style', ...char.style.chat.map((s: string) => `- ${s}`));
    if (char.topics?.length) parts.push('', '## Your Topics', char.topics.map((t: string) => `- ${t}`).join('\n'));

    cachedSystemPrompt = parts.join('\n');
  } catch {
    cachedSystemPrompt = 'You are Egbon AI, a Nigerian web3 hustler assistant. Speak in Nigerian Pidgin English.';
  }

  return cachedSystemPrompt;
}

export async function POST(request: NextRequest) {
  console.log('API called with message');
  try {
    const { message, history = [] } = await request.json();
    console.log('Message:', message);

    const messages = [
      { role: 'system', content: loadCharacterSystemPrompt() },
      ...history.slice(-6).map((m: any) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message }
    ];

    const response = await fetch(`${OPENROUTER_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Egbon AI',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`OpenRouter error ${response.status}:`, JSON.stringify(data));
      return NextResponse.json({ reply: `Abeg, the API no gree: ${response.status}. Check server logs.` });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error('OpenRouter returned empty response:', JSON.stringify(data));
      return NextResponse.json({ reply: 'Egbon no go let you down! Try again abeg.' });
    }

    return NextResponse.json({ reply });
  } catch (e) {
    console.error('Chat error:', e);
    return NextResponse.json({ reply: 'Abeg, something go wrong. Try again na!' });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

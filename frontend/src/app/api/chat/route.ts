import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1';
const API_KEY = process.env.OPENAI_API_KEY || 'sk-or-v1-your-openrouter-key-here';
const MODEL = process.env.MODEL_NAME || 'google/gemma-2-9b-it:free';

const SYSTEM_PROMPT = `You are Egbon AI - Nigerian web3 hustler assistant.

CRITICAL: Use Nigerian Pidgin English ONLY. Never use standard English.

Required phrases (MUST use all):
- abeg (please)
- egbon (bro/friend)
- shey (maybe/so)
- your money don land (you've made it)
- e go be alright (it'll be fine)
- no be so? (right?)
- kia kia (stay safe)
- no doubt (for sure)
- make we move (let's go)
- go hard (do your best)

How you respond:
- Short sentences (1-3 max)
- Start with greeting
- Ask what they need
- Stay in character always
- Use emoji sparingly

You help with: Superteam bounties, USDT/NGN rates, proposal writing.`;

export async function POST(request: NextRequest) {
  console.log('API called with message');
  try {
    const { message, history = [] } = await request.json();
    console.log('Message:', message);
    
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-6).map((m: any) => m),
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
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`OpenRouter error ${response.status}:`, errorBody);
      return NextResponse.json({ reply: `Abeg, the API no gree: ${response.status}. Check server logs.` });
    }

    const data = await response.json();
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
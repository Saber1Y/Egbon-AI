# Egbon AI

Your Nigerian web3 hustler copilot. Finds Superteam bounties, tracks USDT/NGN rates, generates proposals, and speaks Pidgin English.

## Stack

- **Frontend:** Next.js 14, Tailwind CSS, TypeScript
- **LLM:** OpenRouter (free tier) — Gemma 4 / Qwen / Mistral models
- **Deploy:** Any Node.js host (Vercel, Railway, etc.)

## Quick Start

```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local with your OpenRouter API key
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenRouter API key from https://openrouter.ai/keys |
| `MODEL_NAME` | No | Model ID (default: `google/gemma-4-26b-a4b-it:free`) |

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── (app)/chat/        # Chat interface
│   │   │   ├── (app)/bounties/    # Bounty listings
│   │   │   ├── (app)/rates/       # Rate tracker
│   │   │   └── api/chat/          # LLM proxy route
│   │   ├── components/
│   │   ├── lib/eliza.ts           # Chat hook
│   │   └── constants/
│   ├── package.json
│   └── next.config.js
├── assets/
└── README.md
```

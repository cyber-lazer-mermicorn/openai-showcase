# OpenAI Integration Showcase — Agent Doctrine

## What this repo is
Production-grade OpenAI integration showcase: Assistants API, function calling, structured outputs, vision, and fine-tuning patterns.
By Cherry Shanaley (Chan), AI Solutions Engineer.

## Tech stack
- **Framework:** Next.js 15 (App Router)
- **AI:** OpenAI SDK (latest)
- **Deployment:** Vercel
- **Language:** TypeScript (strict)

## Coding rules
- TypeScript strict — no `any`
- All OpenAI calls go through `lib/openai.ts` client — never instantiate `new OpenAI()` in components
- Structured outputs use `zodResponseFormat` — never parse JSON manually from completions
- Function/tool definitions are typed with Zod schemas in `lib/tools/`
- Streaming uses `openai.chat.completions.stream()` with proper `finalChatCompletion()` handling
- Token budgets must be set explicitly — never leave `max_tokens` unset in production
- Retry logic for rate limits using exponential backoff from `lib/retry.ts`

## Project structure
```
lib/openai.ts     # Singleton OpenAI client
lib/tools/        # Typed tool/function definitions
lib/retry.ts      # Exponential backoff for rate limits
__tests__/        # Test suite
```

## Commands
```bash
npm install && npm run dev
npm run test
npm run lint
```

## Do not
- Instantiate OpenAI client outside `lib/openai.ts`
- Parse completion JSON with `JSON.parse` — use structured outputs
- Leave `max_tokens` unset
- Log full completion objects (may contain PII)

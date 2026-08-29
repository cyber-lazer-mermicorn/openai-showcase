# GitHub Copilot Instructions — OpenAI Integration Showcase

You are working on an OpenAI integration showcase by Cherry Shanaley.

## Always
- Import the OpenAI client from `lib/openai.ts`
- Use `zodResponseFormat` for structured JSON outputs
- Set `max_tokens` explicitly on every completion call
- Type tool definitions with Zod in `lib/tools/`
- Handle rate limit errors (429) with exponential backoff from `lib/retry.ts`

## Never
- Instantiate `new OpenAI()` outside `lib/openai.ts`
- Use `JSON.parse(completion.choices[0].message.content)` — use structured outputs
- Log raw completion objects
- Leave error handlers empty

## Pattern: structured output
```typescript
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
const Result = z.object({ answer: z.string(), confidence: z.number() });
const completion = await openai.beta.chat.completions.parse({
  model: 'gpt-4o',
  messages,
  response_format: zodResponseFormat(Result, 'result'),
});
const { answer, confidence } = completion.choices[0].message.parsed;
```

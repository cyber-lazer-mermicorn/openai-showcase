# Architecture

## Overview
OpenAI Integration Showcase demonstrates production patterns for the OpenAI API: Assistants, function calling, structured outputs, vision, and streaming.

## Layers

| Layer | Path | Responsibility |
|---|---|---|
| OpenAI Client | `lib/openai.ts` | Singleton client, shared config |
| Tool Definitions | `lib/tools/` | Typed Zod-schema tool/function definitions |
| Retry Logic | `lib/retry.ts` | Exponential backoff for 429/5xx |
| API Routes | `app/api/` | Next.js route handlers — thin, delegate to lib/ |
| Tests | `__tests__/` | Unit tests with mocked OpenAI client |

## Key patterns

### Structured outputs
All JSON extraction uses `zodResponseFormat` from `openai/helpers/zod`. No manual `JSON.parse` on completion content.

### Assistants API
Assistant IDs are stored in environment variables. Threads are created per-session. Always call `run.finalMessages()` or poll until terminal state before reading output.

### Streaming
Chat streams use `openai.chat.completions.stream()`. Always call `.finalChatCompletion()` to ensure the full response is captured before closing.

### Token management
`max_tokens` is set on every call. Usage is logged (token count only, no content) for observability.

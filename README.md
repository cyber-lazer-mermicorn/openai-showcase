# OpenAI API Showcase

**What this proves:** End-to-end OpenAI API integration patterns — structured
outputs with Zod schemas, function calling, safety guardrails, prompt versioning,
and evaluation paths. Typed, runnable, evidence-backed.

**Portfolio:** [cyber-lazer-mermicorn](https://github.com/cyber-lazer-mermicorn) · Cherry Shanaley

---

## Key patterns

| Pattern | What it proves |
|---|---|
| Structured outputs | `zodResponseFormat` — typed JSON from LLM, no fragile parsing |
| Function calling | Tool definitions with explicit schemas, safe boundaries |
| Safety guardrails | Moderation API integration, refusal handling |
| Prompt versioning | Prompts in files, not inline strings |
| Evaluation | Deterministic test vectors with expected output assertions |

## Run locally

```bash
npm install
cp .env.example .env   # add OPENAI_API_KEY
npm run demo
npm test
```

## Evidence

- Each pattern has a runnable `demo.ts` with typed inputs and logged outputs
- Test suite asserts schema conformance, not just 200 OK
- Refusal paths are explicitly tested — not just happy path

## Honest scope

Showcase-grade: patterns are correct and typed. No production auth, rate limiting,
or multi-tenant isolation is included.

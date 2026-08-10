# OpenAI Creative Engine
## Built by Cherry Barton | AI Solutions Engineer

Advanced AI applications with OpenAI: Vision, DALL-E, and GPT-4.

**Live:** https://openai-showcase.lazermermicorn.com

---

## What This Demonstrates

### GPT-4 Turbo
- Complex reasoning
- Tool use
- Structured output

### DALL-E 3
- Image generation
- Style transfer
- Brand consistency

### Vision
- Image analysis
- OCR
- Scene understanding

### Embeddings
- Semantic search
- RAG pipelines
- Vector databases

---

## Tech Stack

- **Framework:** Next.js 14
- **AI:** OpenAI SDK
- **Database:** Supabase + pgvector
- **Deployment:** Vercel

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your OpenAI API key

# Run development
npm run dev
```

---

## Features

### 1. AI Chat
Advanced chat with tool use and structured output.

### 2. Image Generation
DALL-E 3 image generation with style controls.

### 3. Vision Analysis
Image analysis with detailed descriptions.

### 4. Semantic Search
Vector-based search with embeddings.

### 5. Content Generation
Blog posts, emails, and marketing copy.

---

## OpenAI Integration

```typescript
// Chat with Tools
const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [{ role: 'user', content: 'What is the weather?' }],
  tools: [{
    type: 'function',
    function: {
      name: 'get_weather',
      description: 'Get weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: { type: 'string' },
        },
      },
    },
  }],
});

// Image Generation
const image = await openai.images.generate({
  model: 'dall-e-3',
  prompt: 'A futuristic cityscape at sunset',
  size: '1024x1024',
});

// Vision Analysis
const analysis = await openai.chat.completions.create({
  model: 'gpt-4-vision-preview',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Describe this image' },
      { type: 'image_url', image_url: { url: 'https://example.com/image.jpg' } },
    ],
  }],
});
```

---

## Why I Built This

I use OpenAI across my platforms for AI capabilities. This repo showcases:

- **GPT-4** for complex reasoning
- **DALL-E** for image generation
- **Vision** for image analysis
- **Embeddings** for semantic search

---

## Contact

**Cherry Barton** — cherry@lazermermicorn.com

*AI Solutions Engineer | 9 Production Platforms | OpenAI Integration Expert*
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GPT-5.6 Luna — Latest and fastest GPT model
export async function chatWithGPT5_6(messages: any[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-5.6-luna',
    messages,
    stream: true,
    // GPT-5.6 features
    max_tokens: 4096,
    temperature: 0.7,
  });

  return response;
}

// o1 — Reasoning model for hard problems
export async function reasonWithO1(problem: string) {
  const response = await openai.chat.completions.create({
    model: 'o1',
    messages: [
      { role: 'user', content: problem }
    ],
    // o1 reasoning parameters
    reasoning_effort: 'high', // low, medium, high
  });

  return response.choices[0].message.content;
}

// GPT-Image-2 — Native image generation
export async function generateImage(prompt: string, options?: {
  style?: 'vivid' | 'natural';
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
}) {
  const response = await openai.images.generate({
    model: 'gpt-image-2',
    prompt,
    n: 1,
    size: options?.size || '1024x1024',
    quality: options?.quality || 'hd',
  });

  return response.data[0].url;
}

// Realtime API — Voice-to-voice conversations
export async function createRealtimeSession() {
  // WebSocket connection for real-time voice
  const session = await openai.beta.realtime.sessions.create({
    model: 'gpt-4o-realtime-preview',
    voice: 'alloy',
    modalities: ['text', 'audio'],
    instructions: 'You are a helpful AI assistant built by Cherry Barton.',
  });

  return session;
}

// Multi-modal — Text + Image + Audio in one request
export async function multiModalInput(content: any[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-5.6-luna',
    messages: [
      {
        role: 'user',
        content, // Can include text, images, audio
      }
    ],
  });

  return response.choices[0].message.content;
}
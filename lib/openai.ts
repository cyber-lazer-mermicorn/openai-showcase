import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function chatWithGPT5_6(messages: any[]) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-5.6-luna',
      messages,
      stream: true,
      max_tokens: 4096,
      temperature: 0.7,
    });
    return response;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API error: ${error.status} - ${error.message}`);
    }
    throw error;
  }
}

export async function reasonWithO1(problem: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'o1',
      messages: [{ role: 'user', content: problem }],
      reasoning_effort: 'high',
    });
    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API error: ${error.status} - ${error.message}`);
    }
    throw error;
  }
}

export async function generateImage(prompt: string, options?: {
  style?: 'vivid' | 'natural';
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
}) {
  try {
    const response = await openai.images.generate({
      model: 'gpt-image-2',
      prompt,
      n: 1,
      size: options?.size || '1024x1024',
      quality: options?.quality || 'hd',
    });
    return response.data[0].url;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API error: ${error.status} - ${error.message}`);
    }
    throw error;
  }
}

export async function createRealtimeSession() {
  try {
    const session = await openai.beta.realtime.sessions.create({
      model: 'gpt-4o-realtime-preview',
      voice: 'alloy',
      modalities: ['text', 'audio'],
      instructions: 'You are a helpful AI assistant built by Cherry Shanaley.',
    });
    return session;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API error: ${error.status} - ${error.message}`);
    }
    throw error;
  }
}

export async function multiModalInput(content: any[]) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-5.6-luna',
      messages: [{ role: 'user', content }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API error: ${error.status} - ${error.message}`);
    }
    throw error;
  }
}
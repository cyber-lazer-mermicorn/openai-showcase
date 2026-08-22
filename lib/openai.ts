import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Basic chat
export async function chatWithGPT(messages: any[], options?: {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}) {
  try {
    const response = await openai.chat.completions.create({
      model: options?.model || 'gpt-4-turbo-preview',
      messages,
      max_tokens: options?.maxTokens || 1024,
      temperature: options?.temperature || 0.7,
    });
    return response.choices[0].message.content;
  } catch (error: any) {
    throw new Error(`GPT chat error: ${error?.status || 500} - ${error?.message || 'Unknown error'}`);
  }
}

// Streaming
export async function streamChat(messages: any[]) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      stream: true,
    });
    return stream;
  } catch (error: any) {
    throw new Error(`Stream error: ${error?.status || 500} - ${error?.message || 'Unknown error'}`);
  }
}

// Image generation
export async function generateImage(prompt: string, size?: '1024x1024' | '512x512') {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: size || '1024x1024',
    });
    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error('Image generation returned no image URL.');
    }
    return imageUrl;
  } catch (error: any) {
    throw new Error(`Image generation error: ${error?.status || 500} - ${error?.message || 'Unknown error'}`);
  }
}

// Embeddings
export async function getEmbeddings(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  } catch (error: any) {
    throw new Error(`Embeddings error: ${error?.status || 500} - ${error?.message || 'Unknown error'}`);
  }
}

// Function calling
export async function useTools(prompt: string, tools: any[]) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      tools,
    });
    return response.choices[0].message;
  } catch (error: any) {
    throw new Error(`Tool use error: ${error?.status || 500} - ${error?.message || 'Unknown error'}`);
  }
}

// Structured output
export async function structuredOutput<T>(prompt: string, schema: any): Promise<T> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: `Return JSON matching this schema: ${JSON.stringify(schema)}` },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error: any) {
    throw new Error(`Structured output error: ${error?.status || 500} - ${error?.message || 'Unknown error'}`);
  }
}

// Batch processing
export async function batchProcess(prompts: string[], concurrency = 5) {
  try {
    const results: any[] = [];
    const chunks: string[][] = [];

    for (let i = 0; i < prompts.length; i += concurrency) {
      chunks.push(prompts.slice(i, i + concurrency));
    }

    for (const chunk of chunks) {
      const chunkResults = await Promise.all(
        chunk.map(async (prompt) => {
          const result = await chatWithGPT([{ role: 'user', content: prompt }]);
          return { prompt, result };
        })
      );
      results.push(...chunkResults);
    }

    return results;
  } catch (error: any) {
    throw new Error(`Batch processing error: ${error?.message || 'Unknown error'}`);
  }
}

// Cost calculator
export function calculateCost(inputTokens: number, outputTokens: number, model = 'gpt-4-turbo-preview') {
  const pricing: Record<string, { input: number; output: number }> = {
    'gpt-4-turbo-preview': { input: 10.0, output: 30.0 },
    'gpt-4': { input: 30.0, output: 60.0 },
    'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  };

  const rates = pricing[model] || pricing['gpt-4-turbo-preview'];
  const inputCost = (inputTokens / 1_000_000) * rates.input;
  const outputCost = (outputTokens / 1_000_000) * rates.output;

  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    model,
  };
}

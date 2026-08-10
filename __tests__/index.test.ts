import { chatWithGPT } from '../lib/openai';

describe('chatWithGPT', () => {
  it('should be defined', () => {
    expect(chatWithGPT).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof chatWithGPT).toBe('function');
  });
});

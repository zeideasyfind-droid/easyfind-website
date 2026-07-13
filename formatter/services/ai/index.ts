/**
 * formatter/services/ai/index.ts
 *
 * PURPOSE: AI Service factory and orchestration
 */

import { AIProvider } from "./types";
import { GeminiProvider } from "./providers/gemini";

export * from "./types";

let currentProvider: AIProvider | null = null;

/**
 * Initialize the AI provider
 */
export function getAIProvider(): AIProvider {
  if (currentProvider) return currentProvider;

  // Default to Gemini for production as per requirements
  currentProvider = new GeminiProvider();
  return currentProvider;
}

/**
 * Helper to format with the active AI provider
 */
export async function formatWithAIProvider(
  systemPrompt: string,
  userPrompt: string,
  temperature: number = 0,
): Promise<string> {
  const provider = getAIProvider();
  return provider.format({
    systemPrompt,
    userPrompt,
    temperature,
  });
}

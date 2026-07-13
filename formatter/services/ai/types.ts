/**
 * formatter/services/ai/types.ts
 *
 * PURPOSE: AI Provider interface and types
 */

export interface AIProvider {
  /**
   * Name of the provider (e.g., 'gemini', 'openai')
   */
  readonly name: string;

  /**
   * Format content using the AI provider
   */
  format(params: AIFormatParams): Promise<string>;
}

export interface AIFormatParams {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
}

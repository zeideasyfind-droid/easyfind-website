/**
 * formatter/types/openai.ts
 *
 * PURPOSE: TypeScript type definitions for OpenAI API
 */

/**
 * OpenAI chat message
 */
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * OpenAI API request
 */
export interface OpenAIRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

/**
 * OpenAI API response
 */
export interface OpenAIResponse {
  choices: Array<{
    message: ChatMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

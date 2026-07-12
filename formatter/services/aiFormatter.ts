/**
 * formatter/services/aiFormatter.ts
 *
 * PURPOSE: OpenAI GPT integration for formatting
 *
 * RESPONSIBILITY:
 * - Call OpenAI API with system prompt
 * - Apply formatting rules using AI
 * - Load system prompt from file
 */

import { OpenAI } from "openai";
import * as fs from "fs/promises";
import * as path from "path";

let openaiClient: OpenAI | null = null;

/**
 * Initialize OpenAI API client
 */
export function initializeOpenAIClient(): void {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set in environment variables");
  }
  openaiClient = new OpenAI({ apiKey });
}

/**
 * Format property using OpenAI GPT
 */
export async function formatWithAI(
  propertyDetails: Record<string, unknown>,
  systemPrompt: string,
): Promise<string> {
  if (!openaiClient) {
    initializeOpenAIClient();
  }

  const response = await openaiClient!.chat.completions.create({
    model: "gpt-4o", // Using gpt-4o as it's production-ready and reliable
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Please format this property according to EasyFind SOP:\n\n${JSON.stringify(propertyDetails, null, 2)}`,
      },
    ],
    temperature: 0, // Deterministic output
  });

  const formatted = response.choices[0]?.message?.content;
  if (!formatted) {
    throw new Error("AI Formatter returned empty response");
  }

  return formatted.trim();
}

/**
 * Get system prompt from file
 */
export async function getSystemPrompt(): Promise<string> {
  try {
    const promptPath = path.join(process.cwd(), "formatter", "prompts", "system-prompt.md");
    const content = await fs.readFile(promptPath, "utf-8");
    return content;
  } catch (error) {
    console.warn("Could not load system prompt from file, using default.");
    return `You are the EasyFind Property Formatter. 
Format the property details into a clean, standardized listing.
Follow the field order: Title, Rent, Maintenance, Deposit, Sqft, Floor, Available from, Preferred tenant, Pets, Community, Location, Society Name or Landmark, Google Maps Link.
Each field on its own line.
Never invent information.
Return only the formatted listing.`;
  }
}

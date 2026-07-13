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

import { formatWithAIProvider } from "./ai";

/**
 * Format property using the active AI provider
 */
export async function formatWithAI(
  propertyDetails: Record<string, unknown>,
  systemPrompt: string,
): Promise<string> {
  const userPrompt = `Please format this property according to EasyFind SOP:\n\n${JSON.stringify(propertyDetails, null, 2)}`;
  
  return formatWithAIProvider(systemPrompt, userPrompt, 0);
}

/**
 * Get system prompt from file
 */
export async function getSystemPrompt(): Promise<string> {
  // If we are in the browser, we cannot use fs/path
  if (typeof window !== "undefined") {
    return getDefaultSystemPrompt();
  }

  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const promptPath = path.join(process.cwd(), "formatter", "prompts", "system-prompt.md");
    const content = await fs.readFile(promptPath, "utf-8");
    return content;
  } catch (error) {
    console.warn("Could not load system prompt from file, using default.");
    return getDefaultSystemPrompt();
  }
}

function getDefaultSystemPrompt(): string {
  return `You are the EasyFind Property Formatter. 
Format the property details into a clean, standardized listing.
Follow the field order: Title, Rent, Maintenance, Deposit, Sqft, Floor, Available from, Preferred tenant, Pets, Community, Location, Society Name or Landmark, Google Maps Link.
Each field on its own line.
Never invent information.
Return only the formatted listing.`;
}

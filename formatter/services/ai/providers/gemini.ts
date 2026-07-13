/**
 * formatter/services/ai/providers/gemini.ts
 *
 * PURPOSE: Google Gemini AI Provider implementation
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider, AIFormatParams } from "../types";

export class GeminiProvider implements AIProvider {
  readonly name = "gemini";
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Neither GOOGLE_GEMINI_API_KEY nor GEMINI_API_KEY is set in environment variables",
      );
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async format(params: AIFormatParams): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: params.temperature ?? 0,
      },
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${params.systemPrompt}\n\n${params.userPrompt}` }],
        },
      ],
    });

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Gemini returned empty response");
    }

    return text.trim();
  }
}

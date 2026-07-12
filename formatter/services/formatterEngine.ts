/**
 * formatter/services/formatterEngine.ts
 *
 * Core orchestration for the EasyFind formatter.
 */

import { validateInput } from "./validator";
import { sanitizeInput } from "./sanitizer";
import { resolveGoogleMapsLocation } from "./googlePlaces";
import { detectCommunityType } from "./communityDetector";
import { formatWithAI, getSystemPrompt } from "./aiFormatter";

export type FormatterInput = {
  propertyDetails: string;
  googleMapsUrl?: string;
};

export type FormatterResult = {
  success: boolean;
  formattedText?: string;
  errors?: string[];
  resolvedPlace?: unknown;
};

/**
 * Orchestrates the complete property formatting pipeline
 */
export async function formatProperty(input: FormatterInput): Promise<FormatterResult> {
  try {
    // 1. Validate Input
    const validation = validateInput(input.propertyDetails, input.googleMapsUrl);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    // 2. Sanitize Input
    const sanitizedDetails = sanitizeInput(input.propertyDetails);

    // 3. Resolve Google Maps (if provided)
    let resolvedPlace = null;
    let community = "Semi-gated";
    if (input.googleMapsUrl) {
      resolvedPlace = await resolveGoogleMapsLocation(input.googleMapsUrl);

      // 4. Detect Community
      community = detectCommunityType(resolvedPlace.placeName, resolvedPlace.placeType);
    }

    // 5. GPT Formatting
    const systemPrompt = await getSystemPrompt();
    const propertyData = {
      rawDetails: sanitizedDetails,
      googleMapsUrl: input.googleMapsUrl,
      resolvedPlace,
      communityType: community,
    };

    const formattedText = await formatWithAI(propertyData, systemPrompt);

    return {
      success: true,
      formattedText,
      resolvedPlace: {
        ...resolvedPlace,
        community,
        googleMapsUrl: input.googleMapsUrl,
      },
    };
  } catch (error: unknown) {
    console.error("Formatter Engine Error:", error);
    return {
      success: false,
      errors: [
        error instanceof Error ? error.message : "An unexpected error occurred during formatting",
      ],
    };
  }
}

/**
 * Validates if the output is a non-empty string
 */
export function validateFormattedOutput(output: string): boolean {
  return typeof output === "string" && output.trim().length > 0;
}

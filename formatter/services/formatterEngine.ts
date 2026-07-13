/**
 * formatter/services/formatterEngine.ts
 *
 * Core orchestration for the EasyFind formatter.
 * Version 1: Deterministic pipeline — no AI.
 *
 * Pipeline:
 *   Input → Validate → Sanitize → Parse → Google Places → Community → Template → Output
 */

import { validateInput } from "./validator";
import { sanitizeInput } from "./sanitizer";
import { resolveGoogleMapsLocation } from "./googlePlaces";
import { detectCommunityType } from "./communityDetector";
import { parsePropertyDetails } from "./propertyParser";
import { renderTemplate } from "./templateFormatter";

export type FormatterInput = {
  propertyDetails: string;
  googleMapsUrl?: string;
};

export type ResolvedPlaceInfo = {
  placeName?: string;
  locality?: string;
  placeType?: string;
  community?: string;
  googleMapsUrl?: string;
};

export type FormatterResult = {
  success: boolean;
  formattedText?: string;
  errors?: string[];
  resolvedPlace?: ResolvedPlaceInfo | null;
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

    // 3. Parse property fields deterministically
    const parsed = parsePropertyDetails(sanitizedDetails);

    // 4. Resolve Google Maps (if provided)
    let resolvedPlace = null;
    let community = "Semi-gated";
    if (input.googleMapsUrl) {
      resolvedPlace = await resolveGoogleMapsLocation(input.googleMapsUrl);

      // 5. Detect Community
      community = detectCommunityType(resolvedPlace.placeName, resolvedPlace.placeType);
    }

    // 6. Render deterministic template
    const formattedText = renderTemplate({
      parsed,
      resolvedPlace,
      communityType: community,
      googleMapsUrl: input.googleMapsUrl,
    });

    return {
      success: true,
      formattedText,
      resolvedPlace: resolvedPlace
        ? {
            ...resolvedPlace,
            community,
            googleMapsUrl: input.googleMapsUrl,
          }
        : null,
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

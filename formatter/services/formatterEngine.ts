/**
 * formatter/services/formatterEngine.ts
 *
 * Core orchestration for the EasyFind formatter.
 * Version 1 keeps this as the single place that coordinates parsing,
 * Google Places resolution, standardization, and GPT formatting.
 */

export type FormatterInput = {
  propertyDetails: string;
  googleMapsUrl?: string;
};

export type FormatterResult = {
  formattedText: string;
  resolvedPlace?: unknown;
};

export async function formatProperty(input: FormatterInput): Promise<FormatterResult> {
  const normalizedDetails = input.propertyDetails.trim();

  return {
    formattedText: normalizedDetails,
    resolvedPlace: input.googleMapsUrl ? { googleMapsUrl: input.googleMapsUrl } : undefined,
  };
}

export function validateFormattedOutput(output: string): boolean {
  return typeof output === 'string' && output.trim().length > 0;
}

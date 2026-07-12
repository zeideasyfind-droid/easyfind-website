/**
 * formatter/services/communityDetector.ts
 *
 * PURPOSE: Community classification for the EasyFind Formatter
 *
 * RESPONSIBILITY:
 * - Determine if a property is in a Gated or Semi-gated community
 * - Use Google Places data as the primary source
 * - Apply business rules from EasyFind SOP
 */

/**
 * Detects community type based on Google Places data
 *
 * Rules:
 * - Apartment, Residential Society, Housing Complex -> Community: Gated
 * - Otherwise -> Community: Semi-gated
 */
export function detectCommunityType(placeName: string, placeType: string): "Gated" | "Semi-gated" {
  const gatedIndicators = [
    "apartment",
    "society",
    "complex",
    "residency",
    "heights",
    "gardens",
    "villas",
    "enclave",
    "estates",
  ];

  const name = placeName.toLowerCase();
  const type = placeType.toLowerCase();

  const isGated =
    gatedIndicators.some((indicator) => name.includes(indicator)) ||
    type.includes("premise") ||
    type.includes("neighborhood");

  return isGated ? "Gated" : "Semi-gated";
}

/**
 * Checks if a name likely refers to a residential society
 */
export function isSocietyName(placeName: string): boolean {
  if (!placeName || placeName === "Landmark") return false;

  const societyIndicators = [
    "Apartment",
    "Society",
    "Complex",
    "Residency",
    "Heights",
    "Gardens",
    "Villas",
  ];
  return societyIndicators.some((indicator) =>
    placeName.toLowerCase().includes(indicator.toLowerCase()),
  );
}

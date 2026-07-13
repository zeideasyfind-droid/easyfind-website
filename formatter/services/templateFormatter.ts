/**
 * formatter/services/templateFormatter.ts
 *
 * PURPOSE: Deterministic template renderer for EasyFind SOP output format
 *
 * OUTPUT FORMAT (from system-prompt.md):
 *   Semi-furnished 2 BHK with 2 bathrooms & 1 balcony
 *   Rent: ₹40k
 *   Maintenance: ₹4k
 *   Deposit: ₹2L
 *   Sqft: 1200
 *   Floor: 4/4
 *   Available from: Ready to Occupy
 *   Preferred tenant: Anyone
 *   Pets: Allowed
 *   Community: Gated
 *   Location: Sarjapur Road
 *   Society Name or Landmark: Prestige Lakeside Habitat
 *   Google Maps Link: https://maps.app.goo.gl/example
 *   ---
 *
 * RULES:
 * - Never invent missing information
 * - Unknown values remain blank / omitted
 */

import { ParsedFields } from "./propertyParser";
import {
  standardizeFurnishing,
  standardizeAvailableFrom,
  capitalizeTenantPreference,
} from "./standardizer";
import type { GooglePlacesResult } from "./googlePlaces";

export interface TemplateInput {
  parsed: ParsedFields;
  resolvedPlace?: GooglePlacesResult | null;
  communityType?: string;
  googleMapsUrl?: string;
}

/**
 * Format a rupee amount from a numeric value
 */
function rupeeFormat(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${Number.isInteger(cr) ? cr : parseFloat(cr.toFixed(2))}Cr`;
  }
  if (amount >= 100000) {
    const l = amount / 100000;
    return `₹${Number.isInteger(l) ? l : parseFloat(l.toFixed(2))}L`;
  }
  if (amount >= 1000) {
    const k = amount / 1000;
    return `₹${Number.isInteger(k) ? k : parseFloat(k.toFixed(1))}k`;
  }
  return `₹${amount}`;
}

/**
 * Build the property title line
 * Format: "[Furnishing] [BHK] BHK with [X] bathroom[s] [& Y balcon[y|ies]]"
 */
function buildTitle(parsed: ParsedFields): string {
  const parts: string[] = [];

  // Furnishing
  const furnish = parsed.furnishing ? standardizeFurnishing(parsed.furnishing) : null;
  if (furnish) parts.push(furnish);

  // BHK
  if (parsed.bhk) parts.push(`${parsed.bhk} BHK`);

  // Bathrooms + balcony
  const bathroomParts: string[] = [];
  if (parsed.bathrooms) {
    const n = parseInt(parsed.bathrooms, 10);
    bathroomParts.push(`${n} bathroom${n !== 1 ? "s" : ""}`);
  }
  if (parsed.balcony && parsed.balcony !== "0") {
    const n = parseInt(parsed.balcony, 10);
    bathroomParts.push(`${n} balcon${n !== 1 ? "ies" : "y"}`);
  }

  if (bathroomParts.length > 0) {
    parts.push(`with ${bathroomParts.join(" & ")}`);
  }

  return parts.join(" ") || "";
}

/**
 * Render the full EasyFind SOP formatted output string
 */
export function renderTemplate(input: TemplateInput): string {
  const { parsed, resolvedPlace, communityType, googleMapsUrl } = input;
  const lines: string[] = [];

  // Title
  const title = buildTitle(parsed);
  if (title) lines.push(title);

  // Rent
  if (parsed.rent !== undefined) {
    lines.push(`Rent: ${rupeeFormat(parsed.rent)}`);
  }

  // Maintenance
  if (parsed.maintenance !== undefined) {
    lines.push(
      `Maintenance: ${parsed.maintenance === 0 ? "Included" : rupeeFormat(parsed.maintenance)}`,
    );
  }

  // Deposit
  if (parsed.deposit !== undefined) {
    lines.push(`Deposit: ${rupeeFormat(parsed.deposit)}`);
  }

  // Sqft
  if (parsed.sqft) {
    lines.push(`Sqft: ${parsed.sqft}`);
  }

  // Floor
  if (parsed.floorCurrent) {
    const floorStr = parsed.floorTotal
      ? `${parsed.floorCurrent}/${parsed.floorTotal}`
      : parsed.floorCurrent;
    lines.push(`Floor: ${floorStr}`);
  }

  // Available from
  if (parsed.availableFrom) {
    const normalized = standardizeAvailableFrom(parsed.availableFrom);
    lines.push(`Available from: ${normalized}`);
  }

  // Preferred tenant
  if (parsed.preferredTenant) {
    const normalized = capitalizeTenantPreference(parsed.preferredTenant);
    lines.push(`Preferred tenant: ${normalized}`);
  }

  // Pets
  if (parsed.pets) {
    lines.push(`Pets: ${parsed.pets}`);
  }

  // Community (from Google Places pipeline)
  if (communityType) {
    lines.push(`Community: ${communityType}`);
  }

  // Location (from Google Places)
  const locality = resolvedPlace?.locality;
  if (locality && locality !== "Unknown") {
    lines.push(`Location: ${locality}`);
  }

  // Society Name or Landmark (from Google Places)
  const placeName = resolvedPlace?.placeName;
  if (placeName && placeName !== "Landmark") {
    lines.push(`Society Name or Landmark: ${placeName}`);
  }

  // Google Maps Link
  if (googleMapsUrl) {
    lines.push(`Google Maps Link: ${googleMapsUrl}`);
  }

  // Finish line
  lines.push("---");

  return lines.join("\n");
}

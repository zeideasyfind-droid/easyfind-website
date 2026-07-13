/**
 * formatter/services/propertyParser.ts
 *
 * PURPOSE: Deterministic property detail parser
 *
 * RESPONSIBILITY:
 * - Extract structured fields from raw property text
 * - Handle WhatsApp messages, Housing listings, MagicBricks listings
 * - Never invent missing data — unknown fields left undefined
 */

export interface ParsedFields {
  bhk?: string;
  furnishing?: string;
  bathrooms?: string;
  balcony?: string;
  rent?: number;
  maintenance?: number;
  deposit?: number;
  sqft?: string;
  floorCurrent?: string;
  floorTotal?: string;
  availableFrom?: string;
  preferredTenant?: string;
  pets?: string;
  sqftNum?: number;
}

/**
 * Parse a monetary string like "40k", "1.2L", "40000", "₹40k" into a rupee number
 */
export function parseMonetary(raw: string): number | undefined {
  if (!raw) return undefined;
  const cleaned = raw.replace(/[₹,\s]/g, "");
  const match = cleaned.match(/^(\d+(?:\.\d+)?)\s*([kKlLcC][rR]?)?$/);
  if (!match) return undefined;
  const num = parseFloat(match[1]);
  const suffix = (match[2] || "").toLowerCase();
  if (suffix === "k") return Math.round(num * 1000);
  if (suffix === "l") return Math.round(num * 100000);
  if (suffix === "cr") return Math.round(num * 10000000);
  return Math.round(num);
}

/**
 * Main parser — extracts all known fields from raw property text
 */
export function parsePropertyDetails(text: string): ParsedFields {
  const result: ParsedFields = {};

  // ── BHK ──────────────────────────────────────────────────────────────────
  const bhkMatch = text.match(/(\d+(?:\.\d+)?)\s*BHK/i);
  if (bhkMatch) result.bhk = bhkMatch[1];

  // ── Furnishing ───────────────────────────────────────────────────────────
  const furnishMatch = text.match(
    /\b(fully\s*furnished|semi[\s-]?furnished|unfurnished|un-furnished|semi\s*furnished)\b/i,
  );
  if (furnishMatch) result.furnishing = furnishMatch[1];

  // ── Bathrooms ────────────────────────────────────────────────────────────
  const bathMatch = text.match(/(\d+)\s*(?:bath(?:room)?s?|baths?)\b/i);
  if (bathMatch) result.bathrooms = bathMatch[1];

  // ── Balcony ──────────────────────────────────────────────────────────────
  const balconyMatch = text.match(/(\d+)\s*balcon(?:y|ies)\b/i);
  if (balconyMatch) {
    result.balcony = balconyMatch[1];
  } else if (/\bwith\s+balcony\b/i.test(text) || /\bbalcony\s*[:-]?\s*yes\b/i.test(text)) {
    result.balcony = "1";
  } else if (/\bno\s+balcony\b/i.test(text) || /\bbalcony\s*[:-]?\s*no\b/i.test(text)) {
    result.balcony = "0";
  }

  // ── Rent ─────────────────────────────────────────────────────────────────
  // Try labelled rent first
  const rentLabelMatch = text.match(/\brent\s*[:-]?\s*₹?\s*(\d+(?:[.,]\d+)?)\s*([kKlLcC][rR]?)?/i);
  if (rentLabelMatch) {
    const raw = rentLabelMatch[1].replace(",", "") + (rentLabelMatch[2] || "");
    result.rent = parseMonetary(raw);
  } else {
    // Try standalone ₹Xk / ₹X per month patterns
    const rentStandaloneMatch = text.match(
      /₹\s*(\d+(?:[.,]\d+)?)\s*([kKlLcC][rR]?)?\s*(?:\/?\s*(?:month|mo|pm|p\.m\.))/i,
    );
    if (rentStandaloneMatch) {
      const raw = rentStandaloneMatch[1].replace(",", "") + (rentStandaloneMatch[2] || "");
      result.rent = parseMonetary(raw);
    }
  }

  // ── Maintenance ──────────────────────────────────────────────────────────
  const maintMatch = text.match(
    /\bmaint(?:enance)?\s*[:-]?\s*₹?\s*(\d+(?:[.,]\d+)?)\s*([kKlLcC][rR]?)?/i,
  );
  if (maintMatch) {
    const raw = maintMatch[1].replace(",", "") + (maintMatch[2] || "");
    result.maintenance = parseMonetary(raw);
  } else if (/\bmaintenance\s*[:-]?\s*inclu?d?e?d?\b/i.test(text)) {
    result.maintenance = 0; // 0 signals "included"
  }

  // ── Deposit ──────────────────────────────────────────────────────────────
  const depositMatch = text.match(
    /\b(?:deposit|security\s*deposit)\s*[:-]?\s*₹?\s*(\d+(?:[.,]\d+)?)\s*([kKlLcC][rR]?)?/i,
  );
  if (depositMatch) {
    const raw = depositMatch[1].replace(",", "") + (depositMatch[2] || "");
    result.deposit = parseMonetary(raw);
  }

  // ── Sqft ─────────────────────────────────────────────────────────────────
  const sqftMatch = text.match(/(\d[\d,]*)\s*(?:sq\.?\s*ft\.?|sqft|square\s*fe?e?t?)\b/i);
  if (sqftMatch) {
    result.sqft = sqftMatch[1].replace(",", "");
    result.sqftNum = parseInt(result.sqft, 10);
  }

  // ── Floor ─────────────────────────────────────────────────────────────────
  // "4/6 floor", "floor: 4/6", "4th floor out of 6", "4 out of 6"
  const floorLabelMatch = text.match(/\bfloor\s*[:-]\s*(\d+)\s*(?:\/\s*(\d+))?/i);
  // "Xth floor out of Y"
  const floorOrdinalOutOf = text.match(/\b(\d+)(?:st|nd|rd|th)?\s*floor\s+out\s+of\s+(\d+)/i);
  // plain fraction "4/6" near floor keyword
  const floorFractMatch = text.match(/\b(\d+)\s*\/\s*(\d+)\s*(?:floor)?/i);
  // single ordinal "3rd floor"
  const floorSingleMatch = text.match(/\b(\d+)(?:st|nd|rd|th)\s*floor\b/i);

  if (floorLabelMatch) {
    result.floorCurrent = floorLabelMatch[1];
    if (floorLabelMatch[2]) result.floorTotal = floorLabelMatch[2];
  } else if (floorOrdinalOutOf) {
    result.floorCurrent = floorOrdinalOutOf[1];
    result.floorTotal = floorOrdinalOutOf[2];
  } else if (floorFractMatch) {
    result.floorCurrent = floorFractMatch[1];
    result.floorTotal = floorFractMatch[2];
  } else if (floorSingleMatch) {
    result.floorCurrent = floorSingleMatch[1];
  }

  // ── Available from ───────────────────────────────────────────────────────
  // Require "available from" (both words) or explicit labels — avoid matching
  // standalone "available" that appears mid-sentence
  const availMatch = text.match(
    /\b(?:available\s+from|vacant\s*from|possession)\s*[:-]?\s*([^\n,;]+)/i,
  );
  if (availMatch) {
    result.availableFrom = availMatch[1].trim();
  } else if (/\bimmediate(?:ly)?\b|\bready\s*to\s*(?:move|occupy)\b/i.test(text)) {
    result.availableFrom = "Ready to Occupy";
  }

  // ── Preferred Tenant ─────────────────────────────────────────────────────
  const tenantMatch = text.match(
    /\b(?:preferred\s*tenant|suitable\s*for|tenant\s*(?:type|preference))\s*[:-]?\s*([^\n,;]+)/i,
  );
  if (tenantMatch) {
    result.preferredTenant = tenantMatch[1].trim();
  } else if (/\bfamilies?\b/i.test(text)) {
    result.preferredTenant = "Family";
  } else if (/\bbachelor(s|ette)?\b/i.test(text)) {
    result.preferredTenant = "Bachelors";
  }

  // ── Pets ─────────────────────────────────────────────────────────────────
  if (/\bpets?\s*(?:allowed|welcome|ok|yes)\b/i.test(text)) {
    result.pets = "Allowed";
  } else if (/\bno\s*pets?\b|\bpets?\s*(?:not\s*allowed|no)\b/i.test(text)) {
    result.pets = "Not allowed";
  }

  return result;
}

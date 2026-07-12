/**
 * formatter/types/property.ts
 *
 * PURPOSE: TypeScript type definitions for property listings
 */

/**
 * Raw property details as input by user
 */
export interface RawProperty {
  propertyDetails: string;
  googleMapsUrl?: string;
}

/**
 * Parsed and validated property details
 */
export interface ParsedProperty {
  bhk?: string;
  rent?: string;
  maintenance?: string;
  furnishing?: string;
  bathrooms?: string;
  balcony?: string;
  floor?: string;
  societyName?: string;
  locality?: string;
  googleMapsUrl?: string;
  communityType?: "Gated" | "Semi-gated";
}

/**
 * Final formatted property listing ready for output
 */
export interface FormattedProperty {
  title: string;
  rent: string;
  maintenance: string;
  deposit: string;
  sqft: string;
  floor: string;
  availableFrom: string;
  preferredTenant: string;
  pets: string;
  community: "Gated" | "Semi-gated";
  location: string;
  societyName?: string;
  googleMapsUrl?: string;
}

/**
 * Complete formatter output
 */
export interface FormatterOutput {
  success: boolean;
  formatted?: string;
  data?: FormattedProperty;
  errors?: string[];
  timestamp: string;
}

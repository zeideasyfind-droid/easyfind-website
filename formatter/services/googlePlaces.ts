/**
 * formatter/services/googlePlaces.ts
 *
 * PURPOSE: Google Places API integration
 *
 * RESPONSIBILITY:
 * - Resolve location from Google Maps URL
 * - Detect society name and type
 * - Extract locality information
 */

import axios from "axios";

export interface GooglePlacesResult {
  placeName: string;
  locality: string;
  placeType: string;
}

/**
 * Resolve location from Google Maps URL
 */
export async function resolveGoogleMapsLocation(
  googleMapsUrl: string,
): Promise<GooglePlacesResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY is not set in environment variables");
  }

  try {
    // 1. Resolve short URL if necessary (basic follow redirect)
    let targetUrl = googleMapsUrl;
    if (googleMapsUrl.includes("goo.gl") || googleMapsUrl.includes("maps.app.goo.gl")) {
      const response = await axios.head(googleMapsUrl, { maxRedirects: 5 });
      targetUrl = response.request.res.responseUrl || googleMapsUrl;
    }

    // 2. Extract Place ID or Search Query from URL
    // This is a simplified implementation for Phase 2.
    // In production, we would use a more robust URL parser or the Maps JS SDK.
    const placeIdMatch =
      targetUrl.match(/place_id:([^/&]+)/) || targetUrl.match(/place\/([^/&?]+)/);
    const queryMatch = targetUrl.match(/q=([^/&?]+)/) || targetUrl.match(/search\/([^/&?]+)/);

    let placeName = "Landmark";
    let locality = "Unknown";
    let placeType = "unknown";

    if (placeIdMatch) {
      const placeId = placeIdMatch[1];
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,address_components,types&key=${apiKey}`;
      const { data } = await axios.get(detailsUrl);

      if (data.status === "OK" && data.result) {
        placeName = data.result.name;
        placeType = data.result.types?.[0] || "unknown";
        locality = getLocalityFromComponents(data.result.address_components);
      }
    } else if (queryMatch) {
      const query = decodeURIComponent(queryMatch[1]);
      const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=name,place_id,types&key=${apiKey}`;
      const { data } = await axios.get(searchUrl);

      if (data.status === "OK" && data.candidates?.[0]) {
        const candidate = data.candidates[0];
        placeName = candidate.name;
        placeType = candidate.types?.[0] || "unknown";

        // Get details for locality
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${candidate.place_id}&fields=address_components&key=${apiKey}`;
        const detailsRes = await axios.get(detailsUrl);
        if (detailsRes.data.status === "OK") {
          locality = getLocalityFromComponents(detailsRes.data.result.address_components);
        }
      }
    }

    return { placeName, locality, placeType };
  } catch (error: unknown) {
    console.error("Google Places Error:", error instanceof Error ? error.message : String(error));
    return { placeName: "Landmark", locality: "Unknown", placeType: "unknown" };
  }
}

/**
 * Detect if location is a residential society
 */
export async function detectSociety(
  placeName: string,
  placeType: string,
): Promise<{ isSociety: boolean; societyName?: string }> {
  const societyIndicators = [
    "Apartment",
    "Society",
    "Complex",
    "Residency",
    "Heights",
    "Gardens",
    "Villas",
  ];
  const societyTypes = ["sublocality_level_1", "neighborhood", "premise"];

  const isSociety =
    societyIndicators.some((indicator) =>
      placeName.toLowerCase().includes(indicator.toLowerCase()),
    ) || societyTypes.includes(placeType);

  return {
    isSociety,
    societyName: isSociety ? placeName : undefined,
  };
}

/**
 * Get locality name from place components
 */
function getLocalityFromComponents(
  components: Array<{ types: string[]; long_name: string }>,
): string {
  if (!components) return "Unknown";

  const localityComponent = components.find(
    (c) => c.types.includes("sublocality_level_1") || c.types.includes("locality"),
  );
  return localityComponent ? localityComponent.long_name : "Unknown";
}

/**
 * Legacy stub for backward compatibility if needed
 */
export function getLocality(placeName: string, placeType: string): string {
  return "Unknown"; // Should use the async flow instead
}

/**
 * Legacy stub for backward compatibility if needed
 */
export function initializeGooglePlacesClient(): void {
  // No-op for axios-based implementation
}

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
      const response = await axios.get(googleMapsUrl, { 
        maxRedirects: 5,
        validateStatus: (status) => status >= 200 && status < 400
      });
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
      // Try Places API (New) first
      const newPlacesUrl = `https://places.googleapis.com/v1/places/${placeId}`;
      try {
        const { data } = await axios.get(newPlacesUrl, {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "displayName,addressComponents,types",
          },
        });

        if (data) {
          placeName = data.displayName?.text || "Landmark";
          placeType = data.types?.[0] || "unknown";
          locality = getLocalityFromNewComponents(data.addressComponents);
        }
      } catch (e) {
        // Fallback to Places API (Legacy)
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,address_components,types&key=${apiKey}`;
        const { data } = await axios.get(detailsUrl);
        if (data.status === "OK" && data.result) {
          placeName = data.result.name;
          placeType = data.result.types?.[0] || "unknown";
          locality = getLocalityFromComponents(data.result.address_components);
        }
      }
    } else if (queryMatch) {
      const query = decodeURIComponent(queryMatch[1]);
      // Try Places API (New) first for text search
      try {
        const { data } = await axios.post(
          "https://places.googleapis.com/v1/places:searchText",
          {
            textQuery: query,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "places.displayName,places.addressComponents,places.types",
            },
          }
        );

        if (data.places && data.places.length > 0) {
          const place = data.places[0];
          placeName = place.displayName?.text || "Landmark";
          placeType = place.types?.[0] || "unknown";
          locality = getLocalityFromNewComponents(place.addressComponents);
        } else {
          throw new Error("No places found");
        }
      } catch (e) {
        // Try Geocoding API as fallback for text search
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`;
        const { data } = await axios.get(geocodeUrl);

        if (data.status === "OK" && data.results?.[0]) {
          const result = data.results[0];
          placeName = result.formatted_address.split(",")[0];
          placeType = result.types?.[0] || "unknown";
          locality = getLocalityFromComponents(result.address_components);
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
 * Get locality name from Places API (New) address components
 */
function getLocalityFromNewComponents(
  components: Array<{ types: string[]; longText: string }>,
): string {
  if (!components) return "Unknown";

  const localityComponent = components.find(
    (c) => c.types.includes("sublocality_level_1") || c.types.includes("locality"),
  );
  return localityComponent ? localityComponent.longText : "Unknown";
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

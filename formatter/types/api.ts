/**
 * formatter/types/api.ts
 *
 * PURPOSE: TypeScript type definitions for API requests and responses
 */

/**
 * Formatter API request body
 */
export interface FormatterRequest {
  propertyDetails: string;
  googleMapsUrl?: string;
  additionalContext?: string;
}

/**
 * Formatter API success response
 */
export interface FormatterSuccessResponse {
  success: true;
  data: {
    formatted: string;
    parsed?: Record<string, unknown>;
  };
  timestamp: string;
}

/**
 * Formatter API error response
 */
export interface FormatterErrorResponse {
  success: false;
  error: {
    message: string;
    code: number;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

/**
 * Combined API response type
 */
export type FormatterResponse = FormatterSuccessResponse | FormatterErrorResponse;

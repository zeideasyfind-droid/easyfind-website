/**
 * src/routes/api.formatter.ts
 *
 * PURPOSE: TanStack Start API Route for the formatter
 */

import { createServerFn } from "@tanstack/react-start";
import { formatProperty } from "../../formatter/services/formatterEngine";

export const formatPropertyFn = createServerFn({ method: "POST" })
  .validator((data: { propertyDetails: string; googleMapsUrl?: string }) => data)
  .handler(async ({ data }) => {
    const result = await formatProperty(data);
    return result;
  });

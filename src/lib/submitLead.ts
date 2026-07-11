// Fire-and-forget submission to the shared Google Form endpoint.
// Each caller passes its own field values + a source tag so submissions
// are traceable per form. Uses `no-cors` because Google Forms doesn't
// return CORS headers — the request always resolves opaque, but the
// entry is recorded on Google's side.

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeyRnYIMCl3ouDgMfGkZBK57ccIeIk6e6nlYmoZubRaoLdOsA/formResponse";

export type LeadPayload = {
  name: string;
  phone: string;
  requirement: string;
  location?: string;
  budget?: string;
  details?: string;
  source: string;
};

export async function submitLead(payload: LeadPayload): Promise<void> {
  const body = new URLSearchParams();
  body.append("entry.647419092", payload.name);
  body.append("entry.1504466253", payload.phone);
  body.append("entry.1645082311", payload.requirement);
  body.append("entry.616237414", payload.location ?? "");
  body.append("entry.1733021043", payload.budget ?? "");
  body.append("entry.1656301094", payload.details ?? "");
  body.append("entry.128907828", payload.source);

  // Bound the request so the UI can never hang on a stalled network.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    await fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: controller.signal,
    });
  } catch (err) {
    // no-cors requests resolve opaque; an AbortError here means the
    // request timed out — we still consider the submission best-effort.
    if ((err as Error)?.name !== "AbortError") throw err;
  } finally {
    clearTimeout(timeout);
  }
}

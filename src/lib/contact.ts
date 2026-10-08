/**
 * Public contact details and booking configuration.
 *
 * Safe to import from client components — nothing here is secret. Every phone
 * number shown on the site comes from this file so a change is made once.
 */

export type PhoneLine = {
  /** Human-readable, as printed on the site. */
  display: string;
  /** E.164 form for `tel:` links. */
  tel: string;
};

export const phoneLines: PhoneLine[] = [
  { display: "0806 865 5735", tel: "+2348068655735" },
  { display: "0803 075 0493", tel: "+2348030750493" }
];

export const primaryPhone = phoneLines[0];

/**
 * Online booking page — a Calendly event link or a Google Calendar
 * appointment-schedule link. Both embed in an iframe.
 *
 *   Calendly:        https://calendly.com/<account>/<event>
 *   Google Calendar: https://calendar.google.com/calendar/appointments/schedules/<id>
 *                    (use the URL from the schedule's "Website embed" option —
 *                    the calendar.app.google short link does not embed)
 *
 * `NEXT_PUBLIC_BOOKING_URL` overrides the default below; `NEXT_PUBLIC_*` values
 * are inlined at build time, so set it before `npm run build`. The default is
 * committed on purpose — a booking link is public, and keeping it here means a
 * deploy without the env var still gets the calendar.
 */
const DEFAULT_BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2zUcnNSQXP3ozrqpqRtiWpVcG0NI-WNEBwc9oWJLkfN8YX6UCHltdk6qJ3CW5Path__UXEbNqW";

export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || DEFAULT_BOOKING_URL;

/** The booking URL as a full page for a new tab (drops the embed-only `gv` flag). */
export function bookingPageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("gv");
    return parsed.toString();
  } catch {
    return url;
  }
}

export type BookingProvider = "calendly" | "google" | "other";

export function bookingProvider(url: string): BookingProvider {
  try {
    const host = new URL(url).hostname;
    if (host === "calendly.com" || host.endsWith(".calendly.com")) return "calendly";
    if (host === "calendar.google.com" || host === "calendar.app.google") return "google";
  } catch {
    // Malformed URL — treat as a generic page.
  }
  return "other";
}

/** Adds each provider's embed parameters to the configured booking URL. */
export function bookingEmbedUrl(url: string, embedDomain?: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  const provider = bookingProvider(url);
  if (provider === "calendly") {
    parsed.searchParams.set("hide_gdpr_banner", "1");
    parsed.searchParams.set("primary_color", "0a2a6b");
    if (embedDomain) {
      parsed.searchParams.set("embed_domain", embedDomain);
      parsed.searchParams.set("embed_type", "Inline");
    }
  } else if (provider === "google") {
    parsed.searchParams.set("gv", "true");
  }

  return parsed.toString();
}

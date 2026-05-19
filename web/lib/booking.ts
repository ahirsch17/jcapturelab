import { sessionTypesForBooking } from "@/lib/services";

export const CUSTOM_SESSION_TYPE = "Custom session";
export const EVENT_SESSION_TYPE = "Event";

export const SOLO_SESSION_TYPES = new Set([
  "Grad mini",
  "Grad standard",
  "Prom solo",
  "Headshots or branding",
]);

export const heardFromOptions = [
  "Instagram",
  "Friend or word of mouth",
  "School or group chat",
  "Google or search",
  "Saw the website",
  "Other",
] as const;

export type HeardFromOption = (typeof heardFromOptions)[number];

export function sessionNeedsHeadcount(sessionType: string): boolean {
  return sessionType.length > 0 && !SOLO_SESSION_TYPES.has(sessionType);
}

export function isCustomSession(sessionType: string): boolean {
  return sessionType === CUSTOM_SESSION_TYPE;
}

export function isEventSession(sessionType: string): boolean {
  return sessionType === EVENT_SESSION_TYPE;
}

export function hasContactMethod(name: string, phone: string): boolean {
  return name.trim().length > 0 || phone.trim().length > 0;
}

export function displayName(name: string): string {
  return name.trim();
}

/** First name for emails; empty when the client did not provide a name. */
export function customerFirstName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0] ?? "";
}

export function customerEmailTitle(firstName: string): string {
  return firstName ? `Thanks, ${firstName}` : "Thanks for reaching out";
}

export function customerEmailSalutation(firstName: string): string {
  return firstName ? `Hi ${firstName},` : "Hi,";
}

export function displayContactSummary(name: string, phone: string, instagram: string): string {
  const parts: string[] = [];
  if (name.trim()) parts.push(name.trim());
  if (phone.trim()) parts.push(phone.trim());
  if (instagram.trim()) parts.push(`IG: ${instagram.trim().replace(/^@/, "")}`);
  return parts.join(" · ") || "Not provided";
}

export const allowedSessionTypes = new Set<string>(sessionTypesForBooking);

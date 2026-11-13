/**
 * Thin GA4 event helper. Safe to call anywhere: it no-ops on the server,
 * when GA4 isn't configured (no NEXT_PUBLIC_GA_MEASUREMENT_ID), or before
 * gtag.js has loaded. See components/Analytics.tsx for the loader.
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") gtag("event", name, params ?? {});
}

"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Google Analytics 4 - the ONLY tracker on this site.
 *
 * The measurement ID comes from the NEXT_PUBLIC_GA_MEASUREMENT_ID
 * environment variable (set it in the Amplify console as a build-time
 * env var: {{TODO: GA4 measurement ID, e.g. G-XXXXXXXXXX}}). Until it is
 * set to a real G- id, this component renders nothing and no analytics
 * script ships to visitors.
 *
 * Tracked events (plus GA4's automatic page_view):
 * - quote_form_submit / application_form_submit (fired from the forms)
 * - phone_click   - any tel: link
 * - email_click   - any mailto: link
 * - quote_cta_click - "Get a Quote"-style CTAs leading to /contact/
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const enabled = GA_ID.startsWith("G-") && !GA_ID.includes("{{");

export default function Analytics() {
  useEffect(() => {
    if (!enabled) return;

    // One delegated listener instead of wiring every link individually.
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const text = anchor.textContent?.trim() ?? "";

      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_url: href });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_url: href });
      } else if (href.includes("/contact") && /quote|estimate/i.test(text)) {
        trackEvent("quote_cta_click", { link_text: text });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}

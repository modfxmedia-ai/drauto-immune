export interface WebinarSession {
  /** ISO date (YYYY-MM-DD) — used for sorting and for past/upcoming comparison against "today". */
  date: string;
  title: string;
  /** Null while a session is still pending confirmation — renders as "Coming Soon" with no live registration link. */
  registrationHref: string | null;
}

/**
 * Live webinar schedule shown on `/live-webinar-schedule/`. Kept as a plain
 * data array (rather than hardcoded JSX) so future sessions can be added by
 * appending an entry here.
 */
export const WEBINAR_SCHEDULE: WebinarSession[] = [
  {
    date: "2026-07-31",
    title: "Autoimmune Thyroid Disease – Going Beyond TSH",
    registrationHref: "https://us02web.zoom.us/webinar/register/WN_w-tcgzkyRlmPQ-JdnEyMlA",
  },
  {
    date: "2026-08-11",
    title: "POTS – When Meds and Salt Don't Cut It",
    registrationHref: "https://us02web.zoom.us/webinar/register/WN_4cBadhApR4SENvcq145KJQ",
  },
  {
    date: "2026-08-25",
    title: "Leaky Gut – What Your Doctor Isn't Telling You Is Hurting You",
    registrationHref: "https://us02web.zoom.us/webinar/register/WN_Ss9LSJghQ9eGS0SmEuBYGw",
  },
  {
    date: "2026-09-08",
    title: "Rehabbing the Immune System – The Window Isn't Fixed by Removing the Hammer",
    registrationHref: "https://us02web.zoom.us/webinar/register/WN_2_E2WIq0TFWvjKqEjeBE6A",
  },
  {
    // Pending revision — do not publish a live registration link until confirmed.
    date: "2026-09-22",
    title: "CRP and Hidden Inflammation – Why You Can't Heal",
    registrationHref: null,
  },
];

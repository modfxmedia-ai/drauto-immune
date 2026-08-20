export interface WebinarSession {
  /** ISO date, used for sorting/machine-readability. */
  date: string;
  /** Human-friendly date label, e.g. "Tue, Sep 1". */
  displayDate: string;
  month: string;
  day: string;
  time: string;
  title: string;
  description: string;
  registrationHref: string;
}

/**
 * Placeholder September 2026 session list — TODO: replace `date`/
 * `displayDate`/`title`/`description`/`registrationHref` for each entry
 * once the real recurring webinar calendar (Zoom/GHL) is provided. Kept
 * as a plain data array (rather than hardcoded JSX) so swapping in real
 * dates/links later is a single-file edit.
 */
export const WEBINAR_SCHEDULE: WebinarSession[] = [
  {
    date: "2026-09-01",
    displayDate: "Tue, Sep 1",
    month: "SEP",
    day: "01",
    time: "5:00 PM Mountain Time",
    title: "Healing Hashimoto's Naturally: Beyond the TSH Number",
    description:
      "Why a 'normal' TSH doesn't always mean a healthy thyroid, and the functional medicine testing that fills in the gaps.",
    registrationHref: "#register-sep-1",
  },
  {
    date: "2026-09-08",
    displayDate: "Tue, Sep 8",
    month: "SEP",
    day: "08",
    time: "5:00 PM Mountain Time",
    title: "The Gut-Autoimmune Connection",
    description:
      "What your microbiome is trying to tell you, and how gut dysfunction can quietly drive autoimmune flares.",
    registrationHref: "#register-sep-8",
  },
  {
    date: "2026-09-15",
    displayDate: "Tue, Sep 15",
    month: "SEP",
    day: "15",
    time: "5:00 PM Mountain Time",
    title: "Root Causes of Chronic Fatigue",
    description:
      "A closer look at the hormonal, nutritional, and inflammatory drivers behind fatigue that sleep alone can't fix.",
    registrationHref: "#register-sep-15",
  },
  {
    date: "2026-09-22",
    displayDate: "Tue, Sep 22",
    month: "SEP",
    day: "22",
    time: "5:00 PM Mountain Time",
    title: "Live Q&A: Ask Dr. Ian Anything About Autoimmune Health",
    description:
      "An open, live Q&A session — bring your questions about symptoms, labs, or your own care plan.",
    registrationHref: "#register-sep-22",
  },
];

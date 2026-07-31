/**
 * Splits a migrated post's body markdown into top-level sections at each
 * `## ` heading boundary, so the template can wrap each section in its own
 * scroll-triggered `Reveal` fade-up instead of animating the whole body as
 * one block. Falls back to a single "section" when no `##` headings exist.
 */
export function splitMarkdownSections(markdown: string): string[] {
  const lines = markdown.split("\n");
  const sections: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (/^##\s+/.test(line) && current.length > 0) {
      sections.push(current.join("\n").trim());
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) sections.push(current.join("\n").trim());

  return sections.filter(Boolean);
}

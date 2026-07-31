import type { IconName } from "@/components/ui/Icon";

/**
 * Presentation-only icon lookup keyed by the exact (unmodified) feature
 * titles from `content/home-content.ts`. Kept separate from the content
 * data so the migrated copy itself is never touched — this file only adds
 * a visual icon alongside existing text.
 */
export const FEATURE_ICON: Record<string, IconName> = {
  "Holistic Approach": "leaf",
  "Customized Wellness Plans": "clipboard",
  "Empowering Independence": "compass",
  "Expert Care for Complex Conditions": "shield",
  "Personalized, Root-Cause Approach": "target",
  "Comprehensive Support": "heart-pulse",
  "Convenient Remote Consultations": "globe",
  "Root-Cause Approach": "target",
  "Personalized Functional Medicine Care": "clipboard",
  "Comprehensive, Ongoing Support": "users",
  "100 Percent Remote Consultations": "globe",
  "Proven Patient Results": "trending-up",
};

export function getFeatureIcon(title: string): IconName {
  return FEATURE_ICON[title] ?? "sparkles";
}

import type { ReactNode } from "react";
import Image from "next/image";

interface CardProps {
  href?: string;
  image?: { src: string; alt: string };
  imageAspect?: string;
  /** Small pill label overlaid on the top-left of the image (e.g. a
   * category or tagline) — optional, keeps the image slot itself simple. */
  imageBadge?: string;
  children: ReactNode;
  className?: string;
}

/**
 * The ONE reusable card family for the entire Home2 variant — same
 * border-radius, padding, border, and shadow everywhere. Every card-like
 * block on this page (the 3 pillars, the 2 service highlights, testimonial
 * slides, and blog previews) renders through this single component so they
 * all visually belong to the same family, per the design brief.
 */
export default function Card({
  href,
  image,
  imageAspect = "aspect-[4/3]",
  imageBadge,
  children,
  className = "",
}: CardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-gray bg-white",
        "shadow-[0_1px_2px_rgba(26,26,26,0.04),0_10px_24px_-8px_rgba(26,26,26,0.08)]",
        "transition-all duration-300 ease-out",
        href
          ? "hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_24px_44px_-16px_rgba(63,128,106,0.28)]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {image && (
        <div className={`relative w-full overflow-hidden bg-sage ${imageAspect}`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {imageBadge && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
              {imageBadge}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">{children}</div>
    </Wrapper>
  );
}

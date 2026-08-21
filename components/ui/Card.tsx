import type { ReactNode } from "react";
import Image from "next/image";
import Badge from "./Badge";

interface CardProps {
  href?: string;
  image?: { src: string; alt: string };
  badge?: string;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Rounded image card — generous internal whitespace, image on top with an
 * optional badge overlay, content below. Inspired by renoregen.com's card
 * layout rhythm, rebuilt entirely in the brand green/sage/neutral palette.
 */
export default function Card({
  href,
  image,
  badge,
  title,
  description,
  footer,
  className = "",
}: CardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={[
        "group flex flex-col overflow-hidden rounded-card bg-white",
        "border border-gray shadow-card transition-all duration-200",
        href ? "hover:-translate-y-1 hover:shadow-card-hover" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sage">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {badge && (
            <div className="absolute left-4 top-4">
              <Badge tone="neutral" className="bg-white/90 backdrop-blur-sm">
                {badge}
              </Badge>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        {badge && !image && <Badge>{badge}</Badge>}
        <h3 className="text-lg font-extrabold leading-snug text-ink">{title}</h3>
        {description && (
          <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
        )}
        {footer && <div className="mt-auto pt-2">{footer}</div>}
      </div>
    </Wrapper>
  );
}

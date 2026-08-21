import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_4px_14px_rgba(63,128,106,0.25)] hover:bg-primary-hover hover:shadow-button-hover hover:-translate-y-0.5 active:bg-primary-active active:translate-y-0",
  secondary:
    "bg-white text-primary border border-primary/30 shadow-card hover:bg-sage hover:border-primary-hover hover:-translate-y-0.5 active:bg-sage-hover active:translate-y-0",
  ghost: "bg-transparent text-ink hover:bg-gray active:bg-gray-hover",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-[0.95rem] gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-pill font-medium whitespace-nowrap " +
  "transition-all duration-300 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

function classes({
  variant = "primary",
  size = "md",
  className = "",
}: Pick<SharedProps, "variant" | "size" | "className">) {
  return [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className]
    .filter(Boolean)
    .join(" ");
}

interface ButtonProps
  extends SharedProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface LinkButtonProps extends SharedProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

/**
 * Pill-shaped CTA button. Pass `href` to render an internal/external link
 * styled identically to the button; omit it to render a real `<button>`.
 */
export default function Button(props: ButtonProps | LinkButtonProps) {
  const { variant, size, className, children } = props;
  const cls = classes({ variant, size, className });

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} aria-label={props["aria-label"]} className={cls}>
        {children}
      </Link>
    );
  }

  const rest = props as ButtonProps;
  return (
    <button {...rest} className={cls}>
      {children}
    </button>
  );
}

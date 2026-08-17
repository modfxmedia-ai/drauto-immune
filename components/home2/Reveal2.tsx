"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Reveal2Props {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms — use for sequential items in a list/grid. */
  delay?: number;
}

/**
 * Home2's scroll-reveal primitive: a subtle fade + slide-up, triggered
 * once via a plain `IntersectionObserver` (no animation library, per the
 * Home2 no-framer-motion convention). Renders fully visible immediately
 * under `prefers-reduced-motion`.
 */
export default function Reveal2({ children, className = "", delay = 0 }: Reveal2Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

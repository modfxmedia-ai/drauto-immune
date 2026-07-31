import type { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["mx-auto w-full max-w-[var(--container-max)] px-6 md:px-10", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

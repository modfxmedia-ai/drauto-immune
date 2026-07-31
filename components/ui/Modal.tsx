"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Icon from "./Icon";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Generic centered modal dialog — dimmed/blurred backdrop, a spring-like
 * scale+fade panel, ESC-to-close, click-outside-to-close, and a body
 * scroll lock while open. Respects `prefers-reduced-motion` (fades in
 * place instead of scaling).
 */
export default function Modal({ open, onClose, title, children, className = "" }: ModalProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.35)] ${className}`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-soft shadow-card backdrop-blur-sm transition-colors hover:bg-sage hover:text-primary"
            >
              <Icon name="plus" className="h-4 w-4 rotate-45" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

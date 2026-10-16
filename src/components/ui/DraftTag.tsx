import type { ReactNode } from "react";

/**
 * Development-only label for content that is still waiting for approval, so a screenshot of a draft
 * is never mistaken for approved copy. Callers only render drafts in development; production never shows them.
 */
export function DraftTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      lang="en"
      className={`inline-block rounded-md border-2 border-dashed border-amber-500 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-950 ${className}`}
    >
      DRAFT · {children}
    </p>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/config/types";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  locale: Locale;
  links: { href: string; label: string }[];
  labels: { menu: string; close: string; language: string };
  phone: { e164: string; display: string } | null;
}

/**
 * Menu for phones and tablets: one large button that opens a panel under the header.
 * Closes with the same button, Escape, a tap outside, or after choosing a link.
 */
export function MobileMenu({ locale, links, labels, phone }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // A new page closes the menu.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-12 items-center gap-2 rounded-xl px-3 text-base font-semibold text-brand-deep ring-2 ring-line hover:bg-accent-soft"
      >
        <Icon name={open ? "close" : "menu"} className="size-6" />
        {open ? labels.close : labels.menu}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-surface shadow-lg"
      >
        <div className="mx-auto max-w-6xl px-5 pb-6 pt-2 sm:px-8">
          <ul className="divide-y divide-line">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between gap-3 text-lg font-semibold text-brand-deep hover:text-accent-strong"
                >
                  {link.label}
                  <Icon name="arrowRight" className="size-5 shrink-0 text-accent" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <LanguageSwitcher locale={locale} label={labels.language} tone="light" />
            {phone && (
              <a href={`tel:${phone.e164}`} className="inline-flex min-h-11 items-center gap-2 text-lg font-bold text-accent-strong">
                <Icon name="phone" className="size-5" />
                {phone.display}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

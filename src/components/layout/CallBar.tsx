"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Phones only: a slim call button fixed to the bottom of the screen.
 * It stays out of the way while a page's main call button ([data-primary-call]) is on screen,
 * so the same action never shows twice. The layout reserves its height, so it covers nothing.
 */
export function CallBar({ phone, label }: { phone: { e164: string; display: string }; label: string }) {
  const pathname = usePathname();
  // Which page the observation belongs to, so a new page starts with the bar visible.
  const [hiddenOn, setHiddenOn] = useState<string | null>(null);
  const visible = hiddenOn !== pathname;

  // Re-run on every page: each one may have its own main call button.
  useEffect(() => {
    const targets = document.querySelectorAll("[data-primary-call]");
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setHiddenOn(onScreen.size > 0 ? pathname : null);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      data-call-bar
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgb(20_36_79/0.08)] transition-transform duration-200 motion-reduce:transition-none sm:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={`tel:${phone.e164}`}
        tabIndex={visible ? undefined : -1}
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-lg font-semibold text-white transition-[background-color,scale] duration-200 hover:bg-accent-strong active:bg-accent-strong motion-safe:active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
      >
        <Icon name="phone" className="size-5" />
        {label}: <span className="whitespace-nowrap">{phone.display}</span>
      </a>
    </div>
  );
}

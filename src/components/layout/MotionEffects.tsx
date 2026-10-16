"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

// The last page shown, kept outside React so a remounted layout (e.g. after a language switch) still knows it.
let lastPath: string | null = null;

/** Longest stagger in a group, so a long list never makes the last item wait. */
const MAX_STAGGER_STEPS = 5;
const STAGGER_MS = 90;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Site-wide motion, progressive by design (styles in globals.css):
 * - Scroll reveals: elements marked `data-reveal` (or the children of `data-reveal-group`) that start
 *   below the screen are hidden, then fade in once they reach it. Content is only ever hidden here, by
 *   JavaScript, so it stays visible without JavaScript, without IntersectionObserver or with reduced motion.
 * - Page change: a short fade of <main> after a client-side navigation (never on the first load).
 */
export function MotionEffects() {
  const pathname = usePathname();

  // Layout effect: the new page is still unpainted, so the fade starts from its first frame without a flash.
  useLayoutEffect(() => {
    const previous = lastPath;
    lastPath = pathname;
    if (previous === null || previous === pathname || prefersReducedMotion()) return;
    const main = document.getElementById("main");
    main?.animate?.([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], {
      duration: 280,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  }, [pathname]);

  // Re-run on every page: each one brings its own elements.
  useEffect(() => {
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) return;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]");
    const items = (target: HTMLElement) =>
      target.hasAttribute("data-reveal-group") ? Array.from(target.children as HTMLCollectionOf<HTMLElement>) : [target];
    const pending = new Set<HTMLElement>();

    const reveal = (target: HTMLElement, animate: boolean) => {
      pending.delete(target);
      items(target).forEach((item, index) => {
        if (!animate) {
          delete item.dataset.revealState;
          return;
        }
        item.style.setProperty("--reveal-delay", `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
        item.dataset.revealState = "in";
        // Clean up once played, so nothing lingers on the element.
        item.addEventListener(
          "animationend",
          () => {
            delete item.dataset.revealState;
            item.style.removeProperty("--reveal-delay");
          },
          { once: true },
        );
      });
    };

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const first = !seen.has(target);
          seen.add(target);

          if (entry.isIntersecting) {
            // Already on screen when the page loaded: leave it as it is. Otherwise play its entrance.
            if (!first) reveal(target, true);
            observer.unobserve(target);
          } else if (first && entry.boundingClientRect.top >= window.innerHeight) {
            // Still below the screen: hide it until the visitor gets there. Content jumped over (an anchor
            // link, a fast fling) stays hidden only while off screen and enters as soon as it is scrolled back to.
            items(target).forEach((item) => (item.dataset.revealState = "pending"));
            pending.add(target);
          } else if (first) {
            // Above the screen, or on it but outside the trigger area: never hide it.
            observer.unobserve(target);
          }
        }
      },
      // Trigger a little before the bottom edge, so the entrance is seen rather than half missed.
      { rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      // Anything still hidden becomes visible again, e.g. the footer when the page changes.
      pending.forEach((target) => reveal(target, false));
    };
  }, [pathname]);

  return null;
}

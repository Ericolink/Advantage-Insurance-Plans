"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { translatePath } from "@/config/pages";
import type { Locale } from "@/config/types";

const names: Record<Locale, string> = { en: "English", es: "Español" };

const tones = {
  // On the dark top bar and footer.
  dark: { current: "text-white", link: "text-white/90 hover:bg-white/10 hover:text-white focus-visible:outline-white", divider: "text-white/50" },
  // Inside the mobile menu (white panel).
  light: { current: "text-brand-deep", link: "text-brand hover:bg-accent-soft hover:text-accent-strong", divider: "text-line" },
};

/** "English | Español" with the current language marked, keeping the current page (slugs are translated). */
export function LanguageSwitcher({ locale, label, tone = "dark" }: { locale: Locale; label: string; tone?: keyof typeof tones }) {
  const pathname = usePathname();
  const colors = tones[tone];

  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1 text-base">
        {(Object.keys(names) as Locale[]).map((code, index) => (
          <li key={code} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden="true" className={colors.divider}>
                |
              </span>
            )}
            {code === locale ? (
              <span aria-current="true" className={`inline-flex min-h-11 items-center rounded-md px-3 font-bold underline underline-offset-4 ${colors.current}`}>
                {names[code]}
              </span>
            ) : (
              <Link
                href={translatePath(pathname, code)}
                hrefLang={code}
                lang={code}
                className={`inline-flex min-h-11 items-center rounded-md px-3 font-semibold transition-colors duration-200 focus-visible:outline-2 ${colors.link}`}
              >
                {names[code]}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

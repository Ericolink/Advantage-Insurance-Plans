"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/config/types";

const names: Record<Locale, string> = { en: "English", es: "Español" };

/** "English | Español" with the current language marked, keeping the current page. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1 text-base">
        {(Object.keys(names) as Locale[]).map((code, index) => (
          <li key={code} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden="true" className="text-white/50">
                |
              </span>
            )}
            {code === locale ? (
              <span aria-current="true" className="rounded-md px-2 py-1 font-bold text-white underline underline-offset-4">
                {names[code]}
              </span>
            ) : (
              <Link
                href={pathname.replace(/^\/(en|es)(?=\/|$)/, `/${code}`) || `/${code}`}
                hrefLang={code}
                lang={code}
                className="rounded-md px-2 py-1 font-semibold text-white/90 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
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

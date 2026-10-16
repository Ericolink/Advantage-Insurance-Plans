import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

/** Home › Current page. Helps visitors who arrive from a search know where they are. */
export function Breadcrumbs({ home, current, dict }: { home: string; current: string; dict: Dictionary }) {
  return (
    <nav aria-label={dict.nav.breadcrumb} className="text-base sm:text-lg">
      <ol className="flex flex-wrap items-center gap-2 text-ink-soft">
        <li>
          <Link href={home} className="inline-flex min-h-11 items-center font-semibold text-accent-strong underline underline-offset-4 transition-colors hover:text-brand-deep">
            {dict.nav.home}
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page" className="font-semibold text-ink">
          {current}
        </li>
      </ol>
    </nav>
  );
}

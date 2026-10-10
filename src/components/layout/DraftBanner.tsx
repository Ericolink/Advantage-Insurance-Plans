import { getPendingItems } from "@/config/readiness";
import { site } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";

/** Development-only reminder of what is still missing. Never rendered in production builds. */
export function DraftBanner({ dict }: { dict: Dictionary }) {
  if (process.env.NODE_ENV !== "development") return null;
  const items = getPendingItems(site);
  if (items.length === 0) return null;

  return (
    <details className="border-b border-amber-300 bg-amber-50 text-amber-950" lang="en">
      <summary className="mx-auto max-w-6xl cursor-pointer px-4 py-2 text-sm font-semibold sm:px-6">
        {dict.draft.title} ({items.filter((item) => item.blocking).length} blocking / {items.length} total)
      </summary>
      <div className="mx-auto max-w-6xl px-4 pb-3 text-sm sm:px-6">
        <ul className="list-disc space-y-1 pl-5">
          {items.map((item) => (
            <li key={item.key} className={item.blocking ? "font-medium" : "opacity-75"}>
              {item.message}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs opacity-75">{dict.draft.hint}</p>
      </div>
    </details>
  );
}

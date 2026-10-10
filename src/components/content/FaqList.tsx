import type { FaqItem } from "@/content/pages/types";
import { fill } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { Icon } from "@/components/ui/Icon";

/**
 * Questions as native <details>/<summary>: keyboard and screen-reader friendly with no JavaScript,
 * and the answers stay in the page for search engines and in-page search.
 */
export function FaqList({ items, headingLevel = 3 }: { items: FaqItem[]; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group scroll-mt-32 rounded-2xl bg-surface ring-1 ring-line open:ring-2 open:ring-brand">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-xl font-semibold text-brand-deep hover:bg-brand-soft [&::-webkit-details-marker]:hidden">
            <Heading className="text-xl font-semibold">{item.question}</Heading>
            <Icon name="chevronDown" className="size-6 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
          </summary>
          <div className="space-y-3 px-5 pb-5 text-lg leading-relaxed text-ink">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{fill(paragraph, siteVars)}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

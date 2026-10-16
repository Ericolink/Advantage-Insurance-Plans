import type { FaqItem } from "@/content/pages/types";
import { fill } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { Icon } from "@/components/ui/Icon";

/**
 * Questions as native <details>/<summary>: keyboard and screen-reader friendly with no JavaScript,
 * and the answers stay in the page for search engines and in-page search.
 * Separated by thin lines instead of boxes, so a long list stays calm to scan.
 */
export function FaqList({ items, headingLevel = 3 }: { items: FaqItem[]; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group scroll-mt-24">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-brand-deep hover:text-accent-strong [&::-webkit-details-marker]:hidden">
            <Heading className="text-lg font-semibold leading-snug sm:text-xl">{item.question}</Heading>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong group-open:bg-accent group-open:text-white">
              <Icon name="chevronDown" className="size-5 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
            </span>
          </summary>
          <div className="max-w-2xl space-y-3 pb-6 text-base leading-relaxed text-ink sm:text-lg">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{fill(paragraph, siteVars)}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

import type { PageId } from "@/config/pages";
import type { Locale } from "@/config/types";
import { enPages } from "./en";
import { esPages } from "./es";
import type { Block, FaqItem, PageContent, PagesContent } from "./types";

const pages: Record<Locale, PagesContent> = { en: enPages, es: esPages };

export function getPage(id: PageId, locale: Locale): PageContent {
  return pages[locale][id];
}

/** Questions by id, so the home page can reuse a few of them without copying text. */
export function getFaqItems(locale: Locale, ids: string[]): FaqItem[] {
  const all = pages[locale].faq.sections.flatMap((section) => section.blocks.flatMap(faqItems));
  return ids.map((id) => all.find((item) => item.id === id)).filter((item): item is FaqItem => Boolean(item));
}

function faqItems(block: Block): FaqItem[] {
  return block.type === "faq" ? block.items : [];
}

// Both languages must have the same sections, blocks and questions. Checked when the
// module loads, so a mismatch fails `next build` instead of reaching visitors.
function shape(content: PagesContent): string {
  return JSON.stringify(
    Object.entries(content).map(([id, page]) => [
      id,
      page.related,
      page.sections.map((section) => [
        section.id,
        section.blocks.map((block) => {
          if (block.type === "faq") return block.items.map((item) => [item.id, item.answer.length]);
          if (block.type === "list" || block.type === "steps" || block.type === "links") return [block.type, block.items.length];
          if (block.type === "table") return [block.type, block.rows.length];
          if (block.type === "scope") return [block.type, block.items];
          return block.type;
        }),
      ]),
    ]),
  );
}

if (shape(enPages) !== shape(esPages)) {
  throw new Error("src/content/pages: en.ts and es.ts are out of sync (pages, sections, blocks or question ids differ).");
}

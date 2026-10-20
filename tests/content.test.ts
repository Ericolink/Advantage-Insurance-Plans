// English and Spanish must stay in step: same pages, sections and questions (so hreflang pairs and anchors match),
// and the same {placeholders} in every translated string (a missing or misspelled one would show up raw).
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pageFromSlug, pageIds, pagePath, pageSlugs, translatePath } from "../src/config/pages.ts";
import type { Locale } from "../src/config/types.ts";
import { en } from "../src/content/dictionaries/en.ts";
import { es } from "../src/content/dictionaries/es.ts";
import { isMessagePublishable, silviaMessage } from "../src/content/message.ts";
import { enPages } from "../src/content/pages/en.ts";
import { esPages } from "../src/content/pages/es.ts";
import type { PagesContent } from "../src/content/pages/types.ts";

const locales: Locale[] = ["en", "es"];

/** Every string in a value, keyed by its path, e.g. "nav.call" or "faq.sections.0.blocks.1.items.2.question". */
function strings(value: unknown, path = ""): Map<string, string> {
  const found = new Map<string, string>();
  if (typeof value === "string") found.set(path, value);
  else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      for (const [childPath, text] of strings(child, path ? `${path}.${key}` : key)) found.set(childPath, text);
    }
  }
  return found;
}

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

/**
 * Strings whose two versions are known to differ while they wait for review. Not a fix: remove the entry once
 * Silvia approves matching EN and ES texts.
 * Both were rewritten in Spanish on 2026-10-16 and the English versions were not ("En familia" and "Videos y
 * eventos" in docs/launch/content-review.md).
 */
const pendingReview = new Set(["family.body", "media.intro"]);

function assertSamePlaceholders(english: unknown, spanish: unknown) {
  const esStrings = strings(spanish);
  for (const [path, text] of strings(english)) {
    // Links point to each language's own official site; only the text around them has to match.
    if (path.endsWith(".href") || pendingReview.has(path)) continue;
    const translated = esStrings.get(path);
    assert.notEqual(translated, undefined, `${path}: missing in Spanish`);
    assert.deepEqual(placeholders(translated!), placeholders(text), `${path}: placeholders differ`);
  }
}

describe("dictionaries", () => {
  it("use the same placeholders in English and Spanish", () => assertSamePlaceholders(en, es));

  it("have no empty strings", () => {
    for (const [name, dictionary] of Object.entries({ en, es })) {
      for (const [path, text] of strings(dictionary)) assert.ok(text.trim().length > 0, `${name}.${path} is empty`);
    }
  });
});

describe("inner pages", () => {
  /** What must match across languages: section ids, block types and FAQ ids, plus the related pages. */
  const outline = (pages: PagesContent) =>
    Object.fromEntries(
      Object.entries(pages).map(([id, page]) => [
        id,
        {
          related: page.related,
          sections: page.sections.map((section) => ({
            id: section.id,
            blocks: section.blocks.map((block) => (block.type === "faq" ? `faq:${block.items.map((item) => item.id).join(",")}` : block.type)),
          })),
        },
      ]),
    );

  it("have the same pages, sections and questions in both languages", () => {
    assert.deepEqual(outline(esPages), outline(enPages));
  });

  it("use the same placeholders in both languages", () => assertSamePlaceholders(enPages, esPages));

  it("exist for every page id", () => {
    for (const id of pageIds) {
      assert.ok(enPages[id] && esPages[id], `${id}: missing content`);
    }
  });

  it("link only to secure official sites", () => {
    for (const pages of [enPages, esPages]) {
      for (const [path, href] of strings(pages)) {
        if (path.endsWith(".href")) assert.match(href, /^https:\/\//, `${path}: ${href}`);
      }
    }
  });
});

describe("page slugs", () => {
  it("are unique within each language", () => {
    for (const locale of locales) {
      const slugs = pageIds.map((id) => pageSlugs[id][locale]);
      assert.equal(new Set(slugs).size, slugs.length, `${locale}: duplicate slug`);
    }
  });

  it("resolve back to their page", () => {
    for (const locale of locales) {
      for (const id of pageIds) assert.equal(pageFromSlug(pageSlugs[id][locale], locale), id);
    }
    assert.equal(pageFromSlug("not-a-page", "en"), null);
  });

  it("switch language on the same page", () => {
    for (const id of pageIds) {
      assert.equal(translatePath(pagePath(id, "en"), "es"), pagePath(id, "es"));
      assert.equal(translatePath(pagePath(id, "es"), "en"), pagePath(id, "en"));
    }
    assert.equal(translatePath("/en/privacy", "es"), "/es/privacy");
    assert.equal(translatePath("/es", "en"), "/en");
    assert.equal(translatePath("/", "es"), "/es");
  });
});

describe("Silvia's message", () => {
  it("is published only with both the approval flag and its date", () => {
    assert.equal(isMessagePublishable({ ...silviaMessage, approved: true, approvedOn: null }), false);
    assert.equal(isMessagePublishable({ ...silviaMessage, approved: false, approvedOn: "2026-10-15" }), false);
    assert.equal(isMessagePublishable({ ...silviaMessage, approved: true, approvedOn: "2026-10-15" }), true);
  });

  it("is never published with one language missing", () => {
    const paragraphs = { en: silviaMessage.paragraphs.en, es: [] };
    assert.equal(isMessagePublishable({ ...silviaMessage, approved: true, approvedOn: "2026-10-15", paragraphs }), false);
  });
});

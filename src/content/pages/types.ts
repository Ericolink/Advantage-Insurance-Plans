import type { PageId } from "@/config/pages";
import type { ScopeId } from "@/config/types";

/**
 * Building blocks for the inner pages. Each page is plain data, so English and Spanish
 * stay in the same shape and one renderer (InfoPage) handles layout and accessibility.
 * Strings may use {brand}, {agent}, {agentFirst} and {city}.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  /** Numbered steps. */
  | { type: "steps"; items: { title: string; text: string }[] }
  /** Neutral comparison table: first column is the row label. */
  | { type: "table"; caption: string; headers: [string, string, string]; rows: [string, string, string][] }
  /** Highlighted note, e.g. "do not send your Medicare number online". */
  | { type: "note"; text: string }
  /** Official sources. Opened in a new tab and labelled as external. */
  | { type: "links"; items: { label: string; href: string; text: string }[] }
  | { type: "faq"; items: FaqItem[] }
  /** What the office itself does: only confirmed items (site.scope) are listed, otherwise a neutral line. */
  | { type: "scope"; items: ScopeId[] }
  /** The shared glossary from the dictionary. */
  | { type: "glossary" };

export interface FaqItem {
  /** Stable id, also used as the anchor (#id) and to reuse questions on the home page. */
  id: string;
  question: string;
  answer: string[];
}

export interface PageSection {
  /** Anchor id, unique within the page. */
  id: string;
  heading: string;
  blocks: Block[];
}

export interface PageContent {
  /** <title> (the site name is appended by the layout template). */
  metaTitle: string;
  metaDescription: string;
  /** Short name for menus and breadcrumbs. */
  label: string;
  title: string;
  intro: string;
  sections: PageSection[];
  related: PageId[];
}

export type PagesContent = Record<PageId, PageContent>;

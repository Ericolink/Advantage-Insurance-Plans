import type { Locale, Localized } from "@/config/types";
import type { LegalDocument } from "@/content/legal";
import { site } from "@/config/site";
import { fill, type Dictionary } from "@/lib/i18n";
import { formatDate } from "@/lib/format";
import { DraftTag } from "@/components/ui/DraftTag";
import { h1Class } from "@/components/ui/styles";

interface LegalPageProps {
  locale: Locale;
  dict: Dictionary;
  title: string;
  document: Localized<LegalDocument> | null;
  ready: boolean;
  /** Unapproved working draft, passed only in development so it can be reviewed in context. */
  draft?: Localized<LegalDocument> | null;
}

export function LegalPage({ locale, dict, title, document, ready, draft = null }: LegalPageProps) {
  const content = ready && document ? document[locale] : (draft?.[locale] ?? null);

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className={h1Class}>{title}</h1>
      {content ? (
        <>
          {!ready && <DraftTag className="mt-4">not legally reviewed · [PENDING] items unresolved · hidden in production</DraftTag>}
          <p className="mt-2 text-sm text-ink-soft">
            {fill(dict.legal.lastUpdated, { date: formatDate(content.updated, locale) })}
          </p>
          <div className="mt-10 space-y-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-semibold text-ink">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl bg-surface p-6 ring-1 ring-line">
          <p className="font-semibold text-ink">{dict.legal.pendingTitle}</p>
          <p className="mt-2 text-ink-soft">{dict.legal.pendingBody}</p>
          {(site.contact.phone || site.contact.email) && (
            <p className="mt-3 space-x-4 font-semibold text-accent-strong">
              {site.contact.phone && <a href={`tel:${site.contact.phone.e164}`}>{site.contact.phone.display}</a>}
              {site.contact.email && <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

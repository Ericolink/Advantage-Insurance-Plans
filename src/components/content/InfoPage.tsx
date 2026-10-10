import Link from "next/link";
import { pagePath, type PageId } from "@/config/pages";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { getPage } from "@/content/pages";
import type { Block, PageContent } from "@/content/pages/types";
import { fill, type Dictionary } from "@/lib/i18n";
import { formatHoursSummary } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";
import { Glossary } from "@/components/sections/Terms";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "./Breadcrumbs";
import { CallCta } from "./CallCta";
import { FaqList } from "./FaqList";

const text = (value: string) => fill(value, siteVars);

/** Layout for every inner page: title, short intro, table of contents, sections, related pages and a call box. */
export function InfoPage({ locale, dict, page }: { locale: Locale; dict: Dictionary; page: PageContent }) {
  return (
    <>
      <div className="bg-brand-soft">
        <div className="mx-auto max-w-6xl space-y-5 px-4 py-10 sm:px-6 md:py-14">
          <Breadcrumbs home={`/${locale}`} current={page.label} dict={dict} />
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-brand-deep text-balance sm:text-5xl">{page.title}</h1>
          <p className="max-w-3xl text-xl leading-relaxed text-ink text-pretty">{text(page.intro)}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CallButton dict={dict} variant="primary" />
            {site.hours && site.hours.length > 0 && (
              <p className="flex items-center gap-2 text-lg text-ink">
                <Icon name="clock" className="size-5 shrink-0 text-brand" />
                {fill(dict.pages.hours, { hours: formatHoursSummary(site.hours, locale) })}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="max-w-3xl">
          {page.sections.length > 2 && (
            <nav aria-labelledby="toc-title" className="rounded-2xl bg-surface p-6 ring-1 ring-line">
              <h2 id="toc-title" className="text-xl font-bold text-brand-deep">
                {dict.pages.onThisPage}
              </h2>
              <ul className="mt-3 space-y-1">
                {page.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="inline-flex min-h-11 items-center text-lg font-semibold text-brand underline underline-offset-4 hover:text-brand-deep">
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {page.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="mt-12 scroll-mt-32">
              <h2 id={`${section.id}-title`} className="font-display text-3xl font-bold text-brand-deep">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-5">
                {section.blocks.map((block, index) => (
                  <BlockView key={index} block={block} dict={dict} />
                ))}
              </div>
            </section>
          ))}

        </div>

        <section aria-labelledby="related-title" className="mt-14">
          <h2 id="related-title" className="font-display text-3xl font-bold text-brand-deep">
            {dict.pages.related}
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {page.related.map((id) => (
              <li key={id}>
                <RelatedLink id={id} locale={locale} />
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14">
          <CallCta locale={locale} dict={dict} />
        </div>
      </div>
    </>
  );
}

function RelatedLink({ id, locale }: { id: PageId; locale: Locale }) {
  const page = getPage(id, locale);
  return (
    <Link
      href={pagePath(id, locale)}
      className="flex h-full min-h-14 items-center justify-between gap-3 rounded-2xl bg-surface px-5 py-4 text-xl font-semibold text-brand-deep ring-2 ring-line hover:bg-brand-soft hover:ring-brand"
    >
      {page.label}
      <Icon name="arrowRight" className="size-5 shrink-0" />
    </Link>
  );
}

function BlockView({ block, dict }: { block: Block; dict: Dictionary }) {
  switch (block.type) {
    case "p":
      return <p className="text-lg leading-relaxed text-ink">{text(block.text)}</p>;

    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-relaxed text-ink">
              <Icon name="check" className="mt-1 size-6 shrink-0 text-brand" />
              <span>{text(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="space-y-4">
          {block.items.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line">
              <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-xl font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold text-brand-deep">
                  <span className="sr-only">{index + 1}. </span>
                  {text(step.title)}
                </h3>
                <p className="mt-1 text-lg leading-relaxed text-ink">{text(step.text)}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <>
          {/* Wide screens: a real table with row and column headers. */}
          <table className="hidden w-full border-collapse overflow-hidden rounded-2xl text-left text-lg ring-1 ring-line md:table">
            <caption className="mb-3 text-left text-lg font-semibold text-ink-soft">{block.caption}</caption>
            <thead className="bg-brand-deep text-white">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} scope="col" className="px-4 py-3 font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([label, first, second]) => (
                <tr key={label} className="border-t border-line bg-surface even:bg-canvas">
                  <th scope="row" className="px-4 py-4 align-top font-bold text-brand-deep">
                    {label}
                  </th>
                  <td className="px-4 py-4 align-top leading-relaxed text-ink">{first}</td>
                  <td className="px-4 py-4 align-top leading-relaxed text-ink">{second}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Phones: the same rows as cards, so nothing scrolls sideways. */}
          <div className="space-y-4 md:hidden">
            <p className="text-lg font-semibold text-ink-soft">{block.caption}</p>
            {block.rows.map(([label, first, second]) => (
              <div key={label} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                <h3 className="text-xl font-bold text-brand-deep">{label}</h3>
                <dl className="mt-3 space-y-3 text-lg leading-relaxed">
                  <div>
                    <dt className="font-semibold text-ink">{block.headers[1]}</dt>
                    <dd className="text-ink">{first}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">{block.headers[2]}</dt>
                    <dd className="text-ink">{second}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </>
      );

    case "note":
      return (
        <div className="flex gap-3 rounded-2xl border-l-8 border-brand bg-brand-soft p-5 text-lg leading-relaxed text-ink">
          <Icon name="info" className="mt-1 size-6 shrink-0 text-brand" />
          <p>{text(block.text)}</p>
        </div>
      );

    case "links":
      return (
        <>
          <ul className="space-y-3">
            {block.items.map((link) => (
              <li key={link.href + link.label} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xl font-semibold text-brand underline underline-offset-4 hover:text-brand-deep"
                >
                  {link.label}
                  <Icon name="externalLink" className="size-5 shrink-0" />
                  <span className="sr-only">{dict.pages.newTab}</span>
                </a>
                <p className="mt-1 text-lg text-ink">{link.text}</p>
              </li>
            ))}
          </ul>
          <p className="text-base text-ink-soft">{dict.pages.officialNote}</p>
        </>
      );

    case "faq":
      return <FaqList items={block.items} />;

    case "scope": {
      // Only services Silvia has confirmed are described as offered by the office.
      const confirmed = block.items.filter((id) => site.scope[id] === true);
      if (confirmed.length === 0) return <p className="text-lg leading-relaxed text-ink">{dict.pages.scopePending}</p>;
      return (
        <div className="rounded-2xl bg-surface p-5 ring-1 ring-line">
          <h3 className="text-xl font-bold text-brand-deep">{dict.pages.scopeTitle}</h3>
          <ul className="mt-3 space-y-2">
            {confirmed.map((id) => (
              <li key={id} className="flex gap-3 text-lg text-ink">
                <Icon name="check" className="mt-1 size-6 shrink-0 text-brand" />
                {dict.pages.scope[id]}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "glossary":
      return <Glossary dict={dict} />;
  }
}

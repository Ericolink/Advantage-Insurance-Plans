import Link from "next/link";
import { pagePath, type PageId } from "@/config/pages";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { getPage } from "@/content/pages";
import { pageImages } from "@/content/pages/images";
import type { Block, PageContent } from "@/content/pages/types";
import { fill, type Dictionary } from "@/lib/i18n";
import { formatHoursSummary } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";
import { Glossary } from "@/components/sections/Terms";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";
import { bodyClass, container, h1Class, h2Class } from "@/components/ui/styles";
import { Breadcrumbs } from "./Breadcrumbs";
import { CallCta } from "./CallCta";
import { FaqList } from "./FaqList";

const text = (value: string) => fill(value, siteVars);

/** Layout for every inner page: title, short intro, table of contents, sections, related pages and a call box. */
export function InfoPage({ locale, dict, page }: { locale: Locale; dict: Dictionary; page: PageContent }) {
  return (
    <>
      <div className="bg-accent-soft">
        <div className={`${container} pb-10 pt-6 sm:pb-14 sm:pt-10`}>
          <Breadcrumbs home={`/${locale}`} current={page.label} dict={dict} />
          {/* Same short entrance as the home page hero (globals.css). */}
          <h1 data-hero className={`mt-5 max-w-4xl ${h1Class}`}>{page.title}</h1>
          <p data-hero="2" className="mt-5 max-w-3xl text-lg leading-relaxed text-ink text-pretty sm:text-xl">{text(page.intro)}</p>
          <div data-hero="3" className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <CallButton dict={dict} variant="primary" className="w-full sm:w-auto sm:shrink-0" primary />
            {site.hours && site.hours.length > 0 && (
              <p className="flex items-start gap-2 text-base text-ink sm:text-lg">
                <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-brand" />
                {fill(dict.pages.hours, { hours: formatHoursSummary(site.hours, locale) })}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={`${container} py-12 sm:py-16`}>
        <div className="max-w-3xl">
          {page.sections.length > 2 && (
            <nav aria-labelledby="toc-title" className="border-l-4 border-accent pl-5">
              <h2 id="toc-title" className="text-lg font-bold text-brand-deep sm:text-xl">
                {dict.pages.onThisPage}
              </h2>
              <ul className="mt-2">
                {page.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="inline-flex min-h-11 items-center py-1 text-base font-semibold text-accent-strong underline underline-offset-4 transition-colors hover:text-brand-deep sm:text-lg"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {page.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="mt-14 scroll-mt-24 sm:mt-16">
              <h2 id={`${section.id}-title`} data-reveal className={h2Class}>
                {section.heading}
              </h2>
              <div className="mt-6 space-y-6">
                {section.blocks.map((block, index) => (
                  <BlockView key={index} block={block} dict={dict} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="related-title" className="mt-16 sm:mt-20">
          <h2 id="related-title" data-reveal className={h2Class}>
            {dict.pages.related}
          </h2>
          <ul data-reveal-group className="mt-6 divide-y divide-line border-y border-line md:grid md:grid-cols-3 md:gap-4 md:divide-y-0 md:border-0">
            {page.related.map((id) => (
              <li key={id}>
                <RelatedLink id={id} locale={locale} />
              </li>
            ))}
          </ul>
        </section>

        <div data-reveal className="mt-16 sm:mt-20">
          <CallCta locale={locale} dict={dict} />
        </div>
      </div>
    </>
  );
}

// From md the related pages are cards: they lift on hover. Below that they are plain list rows.
const relatedHover =
  "transition-[color,box-shadow,translate] duration-300 ease-out md:hover:shadow-[0_20px_40px_-24px_rgb(20_36_79/0.35)] motion-safe:md:hover:-translate-y-1 motion-reduce:transition-none";

function RelatedLink({ id, locale }: { id: PageId; locale: Locale }) {
  const page = getPage(id, locale);
  return (
    <Link
      href={pagePath(id, locale)}
      className={`group flex h-full min-h-14 items-center justify-between gap-3 py-3 text-lg font-semibold text-brand-deep hover:text-accent-strong md:rounded-2xl md:bg-surface md:px-5 md:py-4 md:text-xl md:ring-1 md:ring-line md:hover:ring-accent ${relatedHover}`}
    >
      {page.label}
      <Icon name="arrowRight" className="size-5 shrink-0 text-accent transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
    </Link>
  );
}

function BlockView({ block, dict }: { block: Block; dict: Dictionary }) {
  switch (block.type) {
    case "p":
      return <p className={bodyClass}>{text(block.text)}</p>;

    case "list":
      return (
        <ul className="space-y-4">
          {block.items.map((item) => (
            <li key={item} className={`flex gap-3 ${bodyClass}`}>
              <Icon name="check" className="mt-1 size-5 shrink-0 text-accent sm:size-6" />
              <span>{text(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="space-y-6">
          {block.items.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-xl font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold leading-snug text-brand-deep sm:text-xl">
                  <span className="sr-only">{index + 1}. </span>
                  {text(step.title)}
                </h3>
                <p className={`mt-1 ${bodyClass}`}>{text(step.text)}</p>
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
          {/* Phones: one topic at a time, the two options side by side in reading order. Nothing scrolls sideways. */}
          <div className="md:hidden">
            <p className="text-base font-semibold text-ink-soft">{block.caption}</p>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {block.rows.map(([label, first, second]) => (
                <div key={label} className="py-5">
                  <h3 className="text-lg font-bold text-brand-deep">{label}</h3>
                  <dl className="mt-3 space-y-3 text-base leading-relaxed">
                    <div className="border-l-4 border-brand pl-4">
                      <dt className="font-semibold text-brand-deep">{block.headers[1]}</dt>
                      <dd className="text-ink">{first}</dd>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <dt className="font-semibold text-brand-deep">{block.headers[2]}</dt>
                      <dd className="text-ink">{second}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </>
      );

    case "note":
      return (
        <div className={`flex gap-3 rounded-2xl bg-sun-soft p-5 ${bodyClass}`}>
          <Icon name="info" className="mt-1 size-6 shrink-0 text-brand" />
          <p>{text(block.text)}</p>
        </div>
      );

    case "links":
      return (
        <>
          <ul className="divide-y divide-line border-y border-line">
            {block.items.map((link) => (
              <li key={link.href + link.label} className="py-4">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-accent-strong underline underline-offset-4 transition-colors hover:text-brand-deep"
                >
                  {link.label}
                  <Icon name="externalLink" className="size-5 shrink-0" />
                  <span className="sr-only">{dict.pages.newTab}</span>
                </a>
                <p className="text-base leading-relaxed text-ink sm:text-lg">{link.text}</p>
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
      if (confirmed.length === 0) return <p className={bodyClass}>{dict.pages.scopePending}</p>;
      return (
        <div>
          <h3 className="text-lg font-bold text-brand-deep sm:text-xl">{dict.pages.scopeTitle}</h3>
          <ul className="mt-3 space-y-3">
            {confirmed.map((id) => (
              <li key={id} className={`flex gap-3 ${bodyClass}`}>
                <Icon name="check" className="mt-1 size-5 shrink-0 text-accent sm:size-6" />
                {dict.pages.scope[id]}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "image": {
      // The whole illustration on a white panel (its own corners are white), never stretched or cropped.
      const image = pageImages[block.image];
      return (
        <figure data-reveal className="flex flex-col gap-5 rounded-2xl bg-surface p-5 ring-1 ring-line sm:flex-row sm:items-center sm:gap-8 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open */}
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={block.alt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full max-w-sm self-center object-contain sm:w-64 sm:shrink-0 lg:w-80"
          />
          <figcaption className="border-l-4 border-accent pl-4 text-base leading-relaxed text-ink-soft sm:text-lg">{text(block.caption)}</figcaption>
        </figure>
      );
    }

    case "glossary":
      return <Glossary dict={dict} />;
  }
}

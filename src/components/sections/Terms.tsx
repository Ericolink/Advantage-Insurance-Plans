import type { Dictionary } from "@/lib/i18n";

/** Short glossary of the terms visitors hear most, in plain words. */
export function Terms({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="terms-title" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <h2 id="terms-title" className="font-display text-3xl font-bold text-brand-deep sm:text-4xl">
            {dict.terms.title}
          </h2>
          <p className="mt-3 text-xl text-ink">{dict.terms.intro}</p>
        </div>
        <Glossary dict={dict} className="mt-8 md:grid-cols-2" />
      </div>
    </section>
  );
}

/** The glossary terms alone, also used on the resources page. */
export function Glossary({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  return (
    <dl className={`grid gap-4 ${className}`}>
      {dict.terms.items.map((item) => (
        <div key={item.term} className="rounded-2xl bg-surface p-6 ring-1 ring-line">
          <dt className="text-xl font-bold text-brand-deep">{item.term}</dt>
          <dd className="mt-2 text-lg leading-relaxed text-ink">{item.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}

import type { Dictionary } from "@/lib/i18n";
import { container, h2Class, leadClass, sectionSpace } from "@/components/ui/styles";

/** Short glossary of the terms visitors hear most, in plain words. */
export function Terms({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="terms-title" className={`bg-canvas ${sectionSpace}`}>
      <div className={container}>
        <div data-reveal>
          <h2 id="terms-title" className={h2Class}>
            {dict.terms.title}
          </h2>
          <p className={`mt-4 ${leadClass}`}>{dict.terms.intro}</p>
        </div>
        <Glossary dict={dict} className="mt-8 md:grid-cols-2 md:gap-x-12" />
      </div>
    </section>
  );
}

/** The glossary terms alone, also used on the resources page. A plain list with dividers, not a wall of cards. */
export function Glossary({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  return (
    <dl data-reveal-group="fade" className={`grid ${className}`}>
      {dict.terms.items.map((item) => (
        <div key={item.term} className="border-t border-line py-5">
          <dt className="text-lg font-bold text-brand-deep sm:text-xl">{item.term}</dt>
          <dd className="mt-1 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">{item.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}

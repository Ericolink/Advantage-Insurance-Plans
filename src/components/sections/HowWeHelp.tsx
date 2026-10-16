import Link from "next/link";
import { pagePath } from "@/config/pages";
import type { Locale } from "@/config/types";
import type { Dictionary } from "@/lib/i18n";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";
import { container, h2Class, leadClass, sectionSpace, textLinkClass } from "@/components/ui/styles";

export function HowWeHelp({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="how-we-help" aria-labelledby="how-title" className={`scroll-mt-24 bg-canvas ${sectionSpace}`}>
      <div className={container}>
        <div data-reveal>
          <h2 id="how-title" className={h2Class}>
            {dict.steps.title}
          </h2>
          <p className={`mt-4 ${leadClass}`}>{dict.steps.intro}</p>
        </div>

        {/* A numbered path rather than three boxes: easier to follow on a small screen. */}
        <ol data-reveal-group className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {dict.steps.items.map((step, index) => (
            <li key={step.title} className="flex gap-4 md:flex-col">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-xl font-bold text-white" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold leading-snug text-brand-deep">
                  <span className="sr-only">{index + 1}. </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink sm:text-lg">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal="fade">
          <p className="mt-12 text-lg font-semibold text-brand-deep sm:text-xl">{dict.steps.note}</p>
          <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            {/* Phones already have the call bar at the bottom, so the button shows from tablets up. */}
            <div className="hidden sm:block">
              <CallButton dict={dict} variant="brand" />
            </div>
            <Link href={pagePath("firstVisit", locale)} className={textLinkClass}>
              {dict.steps.cta}
              <Icon name="arrowRight" className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { pagePath } from "@/config/pages";
import type { Locale } from "@/config/types";
import type { Dictionary } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";

const stepIcons = ["message", "list", "handshake"] as const;

export function HowWeHelp({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="how-we-help" aria-labelledby="how-title" className="scroll-mt-32 bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <h2 id="how-title" className="font-display text-3xl font-bold text-brand-deep sm:text-4xl">
            {dict.steps.title}
          </h2>
          <p className="mt-3 text-xl text-ink">{dict.steps.intro}</p>
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {dict.steps.items.map((step, index) => (
            <li key={step.title} className="rounded-2xl border-2 border-line p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-2xl font-bold text-white" aria-hidden="true">
                  {index + 1}
                </span>
                <Icon name={stepIcons[index] ?? "check"} className="size-8 text-brand" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-brand-deep">
                <span className="sr-only">{index + 1}. </span>
                {step.title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xl font-semibold text-brand-deep">{dict.steps.note}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CallButton dict={dict} variant="brand" />
          <Link href={pagePath("firstVisit", locale)} className={buttonClass("secondary")}>
            {dict.steps.cta}
            <Icon name="arrowRight" className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

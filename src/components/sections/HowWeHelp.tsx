import type { Dictionary } from "@/lib/i18n";
import { HelpButton } from "@/components/ui/HelpButton";
import { Icon } from "@/components/ui/Icon";

const stepIcons = ["message", "list", "handshake"] as const;

export function HowWeHelp({ dict }: { dict: Dictionary }) {
  return (
    <section id="how-we-help" aria-labelledby="how-title" className="scroll-mt-32 bg-surface">
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

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-semibold text-brand-deep">{dict.steps.note}</p>
          <HelpButton>{dict.steps.cta}</HelpButton>
        </div>
      </div>
    </section>
  );
}

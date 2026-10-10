import { site } from "@/config/site";
import type { ServiceId } from "@/config/types";
import type { Dictionary } from "@/lib/i18n";
import { HelpButton } from "@/components/ui/HelpButton";
import { Icon } from "@/components/ui/Icon";

const icons = { medicare: "heartPulse", medicaid: "users", aca: "document" } as const satisfies Record<ServiceId, string>;

export function Services({ dict }: { dict: Dictionary }) {
  if (site.services.length === 0) return null;

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-32 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <h2 id="services-title" className="font-display text-3xl font-bold text-brand-deep sm:text-4xl">
            {dict.services.title}
          </h2>
          <p className="mt-3 text-xl text-ink">{dict.services.intro}</p>
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {site.services.map((id) => {
            const item = dict.services.items[id];
            return (
              <li key={id} className="flex flex-col rounded-2xl border-2 border-line bg-canvas p-6 sm:p-8">
                <span className="grid size-16 place-items-center rounded-2xl bg-brand text-white">
                  <Icon name={icons[id]} className="size-9" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-brand-deep">{item.title}</h3>
                <p className="mt-3 flex-1 text-lg leading-relaxed text-ink">{item.body}</p>
                <p className="mt-4 rounded-xl bg-brand-soft px-4 py-3 text-base text-ink">
                  <span className="font-semibold">{dict.services.forWhom}</span> {item.forWhom}
                </p>
                <HelpButton help={id} className="mt-6 w-full">
                  {item.cta}
                </HelpButton>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex gap-3 rounded-2xl bg-brand-soft p-5 text-lg text-ink">
          <Icon name="info" className="mt-1 size-6 shrink-0 text-brand" />
          <div className="space-y-2">
            <p className="font-semibold">{dict.services.different}</p>
            <p className="text-base text-ink-soft">{dict.services.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

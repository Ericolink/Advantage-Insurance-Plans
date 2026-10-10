import Link from "next/link";
import { pagePath, type PageId } from "@/config/pages";
import { site } from "@/config/site";
import type { Locale, ServiceId } from "@/config/types";
import type { Dictionary } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { container, h2Class, leadClass, sectionSpace } from "@/components/ui/styles";

const icons = { medicare: "heartPulse", medicaid: "users", dual: "handshake", aca: "document" } as const satisfies Record<ServiceId, string>;

// Each program card leads to its own page with the full explanation.
const pages: Record<ServiceId, PageId> = { medicare: "medicare", medicaid: "medicaid", dual: "dual", aca: "aca" };

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  if (site.services.length === 0) return null;

  return (
    <section id="services" aria-labelledby="services-title" className={`scroll-mt-24 bg-surface ${sectionSpace}`}>
      <div className={container}>
        <h2 id="services-title" className={h2Class}>
          {dict.services.title}
        </h2>
        <p className={`mt-4 ${leadClass}`}>{dict.services.intro}</p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          {site.services.map((id) => {
            const item = dict.services.items[id];
            return (
              // The whole card is one large tap target: the link stretches over it (see after:inset-0).
              <li
                key={id}
                className="relative flex min-w-0 flex-col rounded-2xl border border-line bg-canvas p-6 transition-colors focus-within:ring-3 focus-within:ring-brand-deep hover:border-brand motion-reduce:transition-none sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
                    <Icon name={icons[id]} className="size-7" />
                  </span>
                  <h3 className="min-w-0 font-display text-xl font-bold leading-tight text-brand-deep sm:text-2xl">{item.title}</h3>
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-ink sm:text-lg">{item.body}</p>
                <p className="mt-4 text-base leading-relaxed text-ink">
                  <span className="font-semibold">{dict.services.forWhom}</span> {item.forWhom}
                </p>
                <Link
                  href={pagePath(pages[id], locale)}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-lg font-semibold text-brand underline decoration-2 underline-offset-4 outline-none after:absolute after:inset-0 after:rounded-2xl hover:text-brand-deep"
                >
                  {item.cta}
                  <Icon name="arrowRight" className="size-5" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex max-w-3xl gap-3 border-t border-line pt-6">
          <Icon name="info" className="mt-1 size-6 shrink-0 text-brand" />
          <div className="space-y-2">
            <p className="text-base font-semibold leading-relaxed text-ink sm:text-lg">{dict.services.different}</p>
            <p className="text-base leading-relaxed text-ink-soft">{dict.services.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

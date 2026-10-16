import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { fill, type Dictionary } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { EditorialGallery } from "@/components/media/EditorialGallery";
import { container, h2Class } from "@/components/ui/styles";

/**
 * Photos of Silvia and her sons from the Thrive After 60 magazine session. Continues the "Meet Silvia"
 * block (same background) and leads into the media section. Renders nothing if there are no photos.
 */
export function FamilyPhotos({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const photos = site.familyPhotos;
  if (photos.length === 0) return null;

  return (
    <section id="family" aria-labelledby="family-title" className="scroll-mt-24 bg-sun-soft pb-16 sm:pb-20 lg:pb-24">
      <div className={`${container} grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
        {/* From lg the text stays in view while the photos scroll past. */}
        <header data-reveal className="max-w-xl lg:sticky lg:top-28 lg:pt-10">
          <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-accent-strong sm:text-base">
            <span aria-hidden="true" data-reveal-line className="h-0.5 w-10 bg-accent" />
            {dict.family.eyebrow}
          </p>
          <h2 id="family-title" className={`mt-4 ${h2Class}`}>
            {fill(dict.family.title, siteVars)}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink text-pretty sm:text-xl">{fill(dict.family.body, siteVars)}</p>
          <p className="mt-4 text-base text-ink-soft">{dict.family.hint}</p>
        </header>

        <EditorialGallery locale={locale} photos={photos} labels={{ ...dict.media.photos, dialog: dict.family.dialog }} />
      </div>
    </section>
  );
}

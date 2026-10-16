"use client";

import type { GalleryPhoto, Locale } from "@/config/types";
import { fill, t } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { PhotoLightbox, usePhotoLightbox, type LightboxLabels } from "./PhotoLightbox";

/**
 * Whole, uncropped photos in two staggered columns (the right one sits lower), for a magazine-like
 * layout rather than a uniform grid. One column on narrow phones. Each opens the shared lightbox.
 */
export function EditorialGallery({ locale, photos, labels }: { locale: Locale; photos: GalleryPhoto[]; labels: LightboxLabels }) {
  const lightbox = usePhotoLightbox(photos.length);
  const total = photos.length;

  return (
    <>
      {/* The offset is a translate, so it never changes the grid; the bottom padding leaves room for it. */}
      <ul data-reveal-group className="grid gap-5 min-[30rem]:grid-cols-2 sm:gap-6 sm:pb-16 lg:gap-8">
        {photos.map((photo, i) => (
          <li key={photo.src} className="sm:even:translate-y-16">
            <button
              type="button"
              onClick={() => lightbox.open(i)}
              aria-label={fill(labels.open, { n: i + 1, total })}
              className="group relative block w-full overflow-hidden rounded-2xl bg-line shadow-[0_18px_36px_-24px_rgb(60_15_0/0.55)] focus-visible:outline-offset-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open */}
              <img
                src={photo.webp ?? photo.src}
                width={photo.width}
                height={photo.height}
                alt={t(photo.alt, locale)}
                loading="lazy"
                decoding="async"
                // A very slight zoom inside the frame on hover; the photo itself is never cropped at rest.
                className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-black/60 text-white opacity-90 transition-[opacity,background-color] group-hover:bg-black/75 group-hover:opacity-100"
              >
                <Icon name="expand" className="size-4.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <PhotoLightbox lightbox={lightbox} photos={photos} locale={locale} labels={labels} />
    </>
  );
}

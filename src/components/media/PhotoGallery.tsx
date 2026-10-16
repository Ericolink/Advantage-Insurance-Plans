"use client";

import type { GalleryPhoto, Locale } from "@/config/types";
import { fill, t } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { PhotoLightbox, usePhotoLightbox, type LightboxLabels } from "./PhotoLightbox";

interface PhotoGalleryProps {
  locale: Locale;
  photos: GalleryPhoto[];
  labels: LightboxLabels;
}

/**
 * Justified rows of whole, uncropped photos: each one grows in proportion to its aspect ratio,
 * so the photos in a row share one height. Four in a row on wide screens, two by two below.
 * Each opens the full photo in the shared lightbox (PhotoLightbox).
 */
export function PhotoGallery({ locale, photos, labels }: PhotoGalleryProps) {
  const lightbox = usePhotoLightbox(photos.length);
  const total = photos.length;

  return (
    <>
      {/* --row-h is the target row height; it decides how many photos fit per row before they grow to fill it. */}
      {/* The photos fade in one after another as the row reaches the screen (MotionEffects). */}
      <ul data-reveal-group="fade" className="flex flex-wrap gap-4 [--row-h:130px] sm:gap-6 sm:[--row-h:260px] lg:[--row-h:230px]">
        {photos.map((photo, i) => (
          <li key={photo.src} style={{ flexGrow: photo.width / photo.height, flexBasis: `calc(${photo.width / photo.height} * var(--row-h))` }}>
            {/* A white ring (not padding) frames each photo like a print without changing its proportions. */}
            <button
              type="button"
              onClick={() => lightbox.open(i)}
              aria-label={fill(labels.open, { n: i + 1, total })}
              className="group relative block w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_36px_-22px_rgb(60_15_0/0.8)] ring-4 ring-white transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_44px_-22px_rgb(60_15_0/0.9)] focus-visible:outline-offset-[7px] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open */}
              <img
                src={photo.webp ?? photo.src}
                width={photo.width}
                height={photo.height}
                alt={t(photo.alt, locale)}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="absolute right-2 bottom-2 grid size-9 place-items-center rounded-full bg-black/60 text-white opacity-90 transition-[opacity,background-color] group-hover:bg-black/75 group-hover:opacity-100"
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

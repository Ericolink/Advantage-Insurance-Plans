"use client";

import { useRef, useState } from "react";
import type { GalleryPhoto, Locale } from "@/config/types";
import { fill, t } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";

interface PhotoGalleryProps {
  locale: Locale;
  photos: GalleryPhoto[];
  labels: { open: string; dialog: string; counter: string; close: string; previous: string; next: string };
}

const roundButton =
  "grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 focus-visible:outline-sun";

/**
 * Justified rows of whole, uncropped photos: each one grows in proportion to its aspect ratio,
 * so the photos in a row share one height. Four in a row on wide screens, two by two below.
 * Each opens the full photo in a modal dialog.
 * The native <dialog> traps focus, closes with Escape and returns focus to the thumbnail.
 */
export function PhotoGallery({ locale, photos, labels }: PhotoGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const total = photos.length;
  const current = photos[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <>
      {/* --row-h is the target row height; it decides how many photos fit per row before they grow to fill it. */}
      <ul className="flex flex-wrap gap-4 [--row-h:130px] sm:gap-6 sm:[--row-h:260px] lg:[--row-h:230px]">
        {photos.map((photo, i) => (
          <li key={photo.src} style={{ flexGrow: photo.width / photo.height, flexBasis: `calc(${photo.width / photo.height} * var(--row-h))` }}>
            {/* A white ring (not padding) frames each photo like a print without changing its proportions. */}
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={fill(labels.open, { n: i + 1, total })}
              className="group relative block w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_36px_-22px_rgb(60_15_0/0.8)] ring-4 ring-white transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-offset-[7px] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
                className="absolute right-2 bottom-2 grid size-9 place-items-center rounded-full bg-black/60 text-white opacity-90 transition-opacity group-hover:opacity-100"
              >
                <Icon name="expand" className="size-4.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        data-lightbox
        aria-label={labels.dialog}
        onClick={(event) => {
          // A click on the dark area around the photo (the dialog itself) closes it.
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
        className="m-0 size-full max-h-none max-w-none bg-transparent p-0 opacity-0 transition-[opacity,display,overlay] transition-discrete duration-200 backdrop:bg-brand-deep/90 open:opacity-100 starting:open:opacity-0 motion-reduce:transition-none"
      >
        {/* Only the photo and buttons catch clicks; anything around them reaches the dialog and closes it. */}
        <div className="pointer-events-none flex size-full flex-col items-center justify-center gap-3 p-4 sm:p-8">
          <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 text-white">
            <p className="text-base font-semibold" aria-live="polite">
              {fill(labels.counter, { n: index + 1, total })}
            </p>
            <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-12 items-center gap-2 rounded-full bg-white/10 px-4 text-white ring-1 ring-white/30 hover:bg-white/20 focus-visible:outline-sun"
              autoFocus>
              <Icon name="close" className="size-6" />
              <span className="text-base font-semibold">{labels.close}</span>
            </button>
          </div>

          <figure className="flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open */}
            <img
              key={current.src}
              src={current.src}
              width={current.width}
              height={current.height}
              alt={t(current.alt, locale)}
              className="pointer-events-auto max-h-full w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
          </figure>

          {total > 1 && (
            <div className="pointer-events-auto flex items-center gap-4">
              <button type="button" onClick={() => step(-1)} aria-label={labels.previous} className={roundButton}>
                <Icon name="chevronLeft" className="size-6" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={labels.next} className={roundButton}>
                <Icon name="chevronRight" className="size-6" />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

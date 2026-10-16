"use client";

import { useRef, useState } from "react";
import type { GalleryPhoto, Locale } from "@/config/types";
import { fill, t } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";

export interface LightboxLabels {
  open: string;
  dialog: string;
  counter: string;
  close: string;
  previous: string;
  next: string;
}

const roundButton =
  "grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/30 transition-colors hover:bg-white/20 active:bg-white/25 focus-visible:outline-sun";

/** State for a gallery's lightbox: which photo is shown, and how to open it or move to the next one. */
export function usePhotoLightbox(total: number) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return { dialogRef, index, open, step };
}

/**
 * The full photo in a modal dialog, shared by every gallery on the site.
 * The native <dialog> traps focus, closes with Escape and returns focus to the thumbnail;
 * the arrow keys move between photos and the page behind does not scroll (globals.css).
 */
export function PhotoLightbox({
  lightbox,
  photos,
  locale,
  labels,
}: {
  lightbox: ReturnType<typeof usePhotoLightbox>;
  photos: GalleryPhoto[];
  locale: Locale;
  labels: LightboxLabels;
}) {
  const { dialogRef, index, step } = lightbox;
  const total = photos.length;
  const current = photos[index];

  return (
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
      // The dialog and its backdrop fade in and out together; the photo settles in (see globals.css).
      className="m-0 size-full max-h-none max-w-none bg-transparent p-0 opacity-0 transition-[opacity,display,overlay] transition-discrete duration-200 backdrop:bg-brand-deep/90 backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-200 open:opacity-100 open:backdrop:opacity-100 starting:open:opacity-0 starting:open:backdrop:opacity-0 motion-reduce:transition-none motion-reduce:backdrop:transition-none"
    >
      {/* Only the photo and buttons catch clicks; anything around them reaches the dialog and closes it. */}
      <div className="pointer-events-none flex size-full flex-col items-center justify-center gap-3 p-4 sm:p-8">
        <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 text-white">
          <p className="text-base font-semibold" aria-live="polite">
            {fill(labels.counter, { n: index + 1, total })}
          </p>
          <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-12 items-center gap-2 rounded-full bg-white/10 px-4 text-white ring-1 ring-white/30 transition-colors hover:bg-white/20 active:bg-white/25 focus-visible:outline-sun"
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
            // The closed dialog is hidden, so the full photo is only downloaded once the dialog opens.
            loading="lazy"
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
  );
}

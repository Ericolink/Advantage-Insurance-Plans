"use client";

import { useRef, useState } from "react";
import type { Locale, Video } from "@/config/types";
import { localeNames } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";

interface VideoPlayerProps {
  video: Video;
  /** Accessible name of the big play button, e.g. "Play video: Our TV commercial". */
  playLabel: string;
  /** Shown over the player when the video can't load or play, with a button to try again. */
  errorLabel: string;
  retryLabel: string;
  durationLabel: string;
  /** Caption track turned on from the start (e.g. English on the English page), or none. */
  defaultCaptions: Locale | null;
}

/**
 * Shows the poster with one large play button, and only downloads the video once it is pressed.
 * After that the browser's own controls take over: pause, volume, captions and full screen.
 * Every player uses the same 16:9 frame; a video with a slightly different shape is letterboxed, never cropped.
 * If the file can't load or play, a short message with a retry button covers the player instead.
 */
export function VideoPlayer({ video, playLabel, errorLabel, retryLabel, durationLabel, defaultCaptions }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  /** Logs what the browser reported (MediaError code, network/ready state), for debugging; no visitor data. */
  const fail = (reason: string) => {
    const el = ref.current;
    console.error(`[VideoPlayer] ${video.src}: ${reason}`, {
      mediaError: el?.error ? { code: el.error.code, message: el.error.message } : null,
      networkState: el?.networkState,
      readyState: el?.readyState,
    });
    setFailed(true);
  };

  const play = () => {
    const el = ref.current;
    if (!el) return;
    // Called from the click itself, so browsers allow playback with sound.
    el.play().catch((error: unknown) => {
      const name = error instanceof DOMException ? error.name : "";
      // A pause or a new source interrupted the request: nothing went wrong.
      if (name === "AbortError") return;
      // The browser refused to start (e.g. a power-saving mode): show the play button again.
      if (name === "NotAllowedError") return setStarted(false);
      // Load failures also fire the element's `error` event; this covers browsers that only reject.
      fail(`play() rejected: ${name || String(error)}`);
    });
  };

  const start = () => {
    setStarted(true);
    play();
    // The button disappears: keep keyboard focus on the player, whose controls show next frame.
    requestAnimationFrame(() => ref.current?.focus());
  };

  const retry = () => {
    setFailed(false);
    setStarted(true);
    // Discard the failed attempt and fetch the file again, then play from this click.
    ref.current?.load();
    play();
  };

  return (
    // The frame draws the play button's focus outline, which would be clipped inside it.
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black has-[button:focus-visible]:outline-3 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-white">
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        preload="none"
        playsInline
        controls={started && !failed}
        onPlay={(event) => {
          setStarted(true);
          // One video at a time: starting this one pauses any other on the page.
          document.querySelectorAll("video").forEach((other) => other !== event.currentTarget && other.pause());
        }}
        onError={() => fail("media error")}
        lang={video.language}
        className="size-full object-contain"
      >
        {video.captions.map((track) => (
          <track
            key={track.language}
            kind="captions"
            src={track.src}
            srcLang={track.language}
            // Each language is named in its own language, as caption menus usually do.
            label={localeNames[track.language]}
            default={track.language === defaultCaptions}
          />
        ))}
      </video>

      {failed && (
        // Covers the browser's own broken-video state with a clear message in the page's language.
        <div role="alert" className="absolute inset-0 grid place-items-center bg-black/80 p-4 text-center text-white">
          <div className="flex max-w-xs flex-col items-center gap-3">
            <Icon name="alert" className="size-8" />
            <p className="text-sm font-semibold leading-snug sm:text-base">{errorLabel}</p>
            <button
              type="button"
              onClick={retry}
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-accent shadow-lg transition-colors hover:text-accent-strong focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
            >
              {retryLabel}
            </button>
          </div>
        </div>
      )}

      {!started && !failed && (
        <button
          type="button"
          onClick={start}
          aria-label={playLabel}
          className="group absolute inset-0 grid place-items-center bg-black/10 focus-visible:outline-none"
        >
          <span className="grid size-18 place-items-center rounded-full bg-white text-accent shadow-lg ring-8 ring-white/30 transition-transform duration-200 group-hover:scale-105 group-hover:text-accent-strong motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:size-22">
            <Icon name="play" className="ml-1 size-8 fill-current sm:size-10" />
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white tabular-nums">
            {durationLabel}
          </span>
        </button>
      )}
    </div>
  );
}

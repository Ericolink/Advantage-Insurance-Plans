"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Locale, Video } from "@/config/types";
import { fill, localeNames } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";

interface VideoPlayerProps {
  video: Video;
  /** Accessible name of the big play button, e.g. "Play video: Our TV commercial". */
  playLabel: string;
  /** Shown over the player when the video can't load or play, with a button to try again. */
  errorLabels: { network: string; playback: string; code: string; retry: string };
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
export function VideoPlayer({ video, playLabel, errorLabels, durationLabel, defaultCaptions }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failure, setFailure] = useState<{ network: boolean; code: string } | null>(null);
  // Caption <track>s are added only once the video's metadata has loaded. Safari (iPhone, iPad, Mac) hands
  // every <track> present when loading starts to AVFoundation as an out-of-band alternate track of the
  // asset; with them, iPhone refused these MP4s before reading any metadata (code 4-0) even though the same
  // files play when opened directly. Added later, WebKit renders the captions itself, like other browsers.
  const [tracksOn, setTracksOn] = useState(false);
  const failed = failure !== null;
  // How far loading got before an error, so a failure can be told apart: 0 nothing yet,
  // 1 metadata read (the file was fetched and parsed), 2 a frame can play, 3 playback started.
  const stage = useRef(0);
  const buffered = useRef(0);
  const reach = (n: number) => (stage.current = Math.max(stage.current, n));

  /** Logs what the browser reported, for debugging (no visitor data), and shows the error message. */
  const fail = (reason: string) => {
    const el = ref.current;
    const code = el?.error?.code;
    // One JSON line, readable in any inspector (e.g. Safari's, with the iPhone connected to a Mac).
    console.error(
      `[VideoPlayer] ${reason} ` +
        JSON.stringify({
          src: el?.currentSrc || video.src,
          // 1 aborted, 2 network, 3 decode, 4 not supported. Before metadata (stage 0) browsers report any
          // failure, even a 404 or a dropped connection, as 4; Safari often leaves `message` empty.
          code: code ?? null,
          message: el?.error?.message || null,
          stage: stage.current,
          bufferedSeconds: buffered.current,
          networkState: el?.networkState,
          readyState: el?.readyState,
        }),
    );
    // Short reference the visitor can pass on: MediaError code (P when only play() failed) and stage.
    setFailure({ network: code === MediaError.MEDIA_ERR_NETWORK, code: `${code ?? "P"}-${stage.current}` });
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
      // A load failure fires the element's `error` event first, which already reported it.
      if (ref.current?.error) return;
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
    // Take the caption tracks out before reloading, so the new attempt also starts without them.
    flushSync(() => {
      setFailure(null);
      setTracksOn(false);
    });
    setStarted(true);
    stage.current = 0;
    buffered.current = 0;
    // Discard the failed attempt and fetch the file again, then play from this click. Only on request: never automatic.
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
        onLoadedMetadata={() => {
          reach(1);
          setTracksOn(true);
        }}
        onCanPlay={() => reach(2)}
        onPlaying={() => reach(3)}
        onProgress={(event) => {
          const ranges = event.currentTarget.buffered;
          buffered.current = ranges.length ? Math.round(ranges.end(ranges.length - 1)) : 0;
        }}
        onError={() => fail("media error")}
        lang={video.language}
        className="size-full object-contain"
      >
        {tracksOn && video.captions.map((track) => (
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

      {failure && (
        // Covers the browser's own broken-video state with a clear message in the page's language.
        // Only a network error suggests checking the connection; the code helps whoever handles a report.
        <div role="alert" className="absolute inset-0 grid place-items-center bg-black/80 p-3 text-center text-white sm:p-4">
          <div className="flex max-w-xs flex-col items-center gap-2 sm:gap-3">
            <Icon name="alert" className="size-6 sm:size-8" />
            <p className="text-sm font-semibold leading-snug sm:text-base">{failure.network ? errorLabels.network : errorLabels.playback}</p>
            <button
              type="button"
              onClick={retry}
              className="rounded-full bg-white px-5 py-1.5 text-sm font-bold text-accent shadow-lg transition-colors hover:text-accent-strong focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white sm:py-2 sm:text-base"
            >
              {errorLabels.retry}
            </button>
            <p className="text-xs text-white/75 tabular-nums">{fill(errorLabels.code, { code: failure.code })}</p>
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

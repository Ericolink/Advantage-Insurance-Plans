"use client";

import { useRef, useState } from "react";
import type { Locale, Video } from "@/config/types";
import { localeNames } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";

interface VideoPlayerProps {
  video: Video;
  /** Accessible name of the big play button, e.g. "Play video: Our TV commercial". */
  playLabel: string;
  durationLabel: string;
  /** Caption track turned on from the start (e.g. English on the English page), or none. */
  defaultCaptions: Locale | null;
}

/**
 * Shows the poster with one large play button, and only downloads the video once it is pressed.
 * After that the browser's own controls take over: pause, volume, captions and full screen.
 * Every player uses the same 16:9 frame; a video with a slightly different shape is letterboxed, never cropped.
 */
export function VideoPlayer({ video, playLabel, durationLabel, defaultCaptions }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // Called from the click itself, so browsers allow playback with sound.
    void ref.current?.play().catch(() => {});
    // The button disappears: keep keyboard focus on the player, whose controls show next frame.
    requestAnimationFrame(() => ref.current?.focus());
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
        controls={started}
        onPlay={(event) => {
          setStarted(true);
          // One video at a time: starting this one pauses any other on the page.
          document.querySelectorAll("video").forEach((other) => other !== event.currentTarget && other.pause());
        }}
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

      {!started && (
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

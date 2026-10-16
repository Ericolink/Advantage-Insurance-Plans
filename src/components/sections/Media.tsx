import { site } from "@/config/site";
import type { Locale, Video } from "@/config/types";
import { fill, type Dictionary } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { PhotoGallery } from "@/components/media/PhotoGallery";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Icon } from "@/components/ui/Icon";
import { container } from "@/components/ui/styles";

// Colors: the section sits on `accent` (#c84b06), the brand orange that carries white text (4.7:1).
// The brighter `orange` is only used for shapes with no text on them; `accent-strong` adds depth.

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** Large two-digit number that ties each block to the index in the header. */
function Index({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="font-display text-4xl font-bold leading-none tabular-nums sm:text-5xl">
      {String(n).padStart(2, "0")}
    </span>
  );
}

function VideoFigure({ id, n, video, title, body, locale, dict }: { id: string; n: number; video: Video; title: string; body: string; locale: Locale; dict: Dictionary }) {
  const notes: { icon: "clock" | "globe" | "captions"; text: string }[] = [
    { icon: "clock", text: fill(dict.media.duration, { time: formatDuration(video.duration) }) },
  ];
  // Visitors reading the English page should know the audio is in Spanish.
  if (video.language !== locale && video.language === "es") notes.push({ icon: "globe", text: dict.media.inSpanish });
  if (video.captions.length > 0) {
    const languages = video.captions.map((track) => dict.media.languageNames[track.language]).join(", ");
    notes.push({ icon: "captions", text: fill(dict.media.captions, { languages }) });
  }
  // Audio in another language: start with captions in the page's language, if there are any.
  const defaultCaptions = video.language !== locale && video.captions.some((track) => track.language === locale) ? locale : null;

  // From lg up each figure spans the four shared rows of the grid (subgrid), so the players, titles,
  // descriptions and notes of both videos line up even when one text is longer.
  return (
    <figure id={id} className="scroll-mt-28 lg:row-span-4 lg:grid lg:grid-rows-subgrid">
      {/* A darker orange bezel lifts the player off the background. */}
      <div className="rounded-[1.4rem] bg-accent-strong p-1.5 shadow-[0_24px_48px_-28px_rgb(60_15_0/0.75)] ring-1 ring-white/25 sm:p-2">
        <VideoPlayer
          video={video}
          playLabel={fill(dict.media.play, { title })}
          durationLabel={formatDuration(video.duration)}
          defaultCaptions={defaultCaptions}
        />
      </div>
      <figcaption className="mt-7 lg:row-span-3 lg:grid lg:grid-rows-subgrid">
        {/* self-start: when only one title wraps, both still start on the same line. */}
        <div className="flex items-center gap-4 self-start">
          <Index n={n} />
          <span aria-hidden="true" className="h-10 w-px shrink-0 bg-white/50" />
          <h3 className="text-xl font-bold leading-snug text-balance sm:text-2xl">{title}</h3>
        </div>
        <p className="mt-3 max-w-xl text-base leading-relaxed sm:text-lg">{body}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold sm:text-base">
          {notes.map((note) => (
            <li key={note.icon} className="inline-flex items-center gap-1.5">
              <Icon name={note.icon} className="size-5 shrink-0" />
              {note.text}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

/** The agency's TV commercial, the award interview and event photos. Renders nothing if none are set. */
export function Media({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { commercial, interview, eventPhotos } = site.media;
  if (!commercial && !interview && eventPhotos.length === 0) return null;

  // What the section holds, in order: numbered in the header index and next to each block.
  const blocks = [
    commercial ? { id: "media-commercial", label: dict.media.commercial.label } : null,
    interview ? { id: "media-interview", label: dict.media.interview.label } : null,
    eventPhotos.length > 0 ? { id: "media-photos", label: dict.media.photos.label } : null,
  ].filter((block) => block !== null);
  const number = (id: string) => blocks.findIndex((block) => block.id === id) + 1;

  return (
    <section
      id="media"
      aria-labelledby="media-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-accent pb-20 text-white sm:pb-24 lg:pb-28 [&_:focus-visible]:outline-white"
    >
      {/* The hero's wave, here opening the section from the light background of the section above. */}
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-10 w-full sm:h-16">
        <path d="M0 38 C 360 86, 720 6, 1080 54 S 1440 30 1440 30 V0 H0 Z" fill="var(--color-sun-soft)" />
        <path d="M0 38 C 360 86, 720 6, 1080 54 S 1440 30 1440 30" fill="none" stroke="var(--color-orange)" strokeWidth="6" />
      </svg>
      {/* Depth: large shapes darker than the background, so white text over them stays readable. */}
      <div aria-hidden="true" className="absolute -top-24 -right-64 -z-10 size-[44rem] rounded-full bg-accent-strong/55" />
      <div aria-hidden="true" className="absolute -bottom-72 -left-72 -z-10 size-[40rem] rounded-full bg-accent-strong/45" />

      <div className={`${container} pt-12 sm:pt-16`}>
        <header className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] sm:text-base">
              <span aria-hidden="true" className="h-0.5 w-10 bg-white" />
              {dict.media.eyebrow}
            </p>
            <h2 id="media-title" className="mt-4 font-display text-[2rem] font-bold leading-[1.12] text-balance sm:text-5xl">
              {dict.media.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">{fill(dict.media.intro, siteVars)}</p>
          </div>

          <nav aria-label={dict.media.contents}>
            <p className="text-sm font-bold uppercase tracking-[0.16em]">{dict.media.contents}</p>
            <ol className="mt-3 border-t border-white/40">
              {blocks.map((block, i) => (
                <li key={block.id} className="border-b border-white/40">
                  <a
                    href={`#${block.id}`}
                    className="flex min-h-13 items-center gap-4 py-2 text-lg font-semibold decoration-2 underline-offset-4 hover:underline"
                  >
                    <span className="font-display text-base tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {block.label}
                    <Icon name="arrowRight" className="ml-auto size-5 shrink-0 rotate-90" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        {(commercial || interview) && (
          // Two equal columns from lg (laptops and landscape tablets); stacked, at full width, below that.
          <div className="mt-14 grid gap-16 sm:mt-16 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr_auto] lg:gap-x-12 lg:gap-y-0">
            {commercial && (
              <VideoFigure
                id="media-commercial"
                n={number("media-commercial")}
                video={commercial}
                title={dict.media.commercial.title}
                body={fill(dict.media.commercial.body, siteVars)}
                locale={locale}
                dict={dict}
              />
            )}
            {interview && (
              <VideoFigure
                id="media-interview"
                n={number("media-interview")}
                video={interview}
                title={dict.media.interview.title}
                body={fill(dict.media.interview.body, siteVars)}
                locale={locale}
                dict={dict}
              />
            )}
          </div>
        )}

        {eventPhotos.length > 0 && (
          <div id="media-photos" className="mt-20 scroll-mt-28 sm:mt-24">
            <div className="grid gap-5 border-t border-white/40 pt-10 lg:grid-cols-2 lg:items-end lg:gap-16">
              <div className="flex items-center gap-4">
                <Index n={number("media-photos")} />
                <span aria-hidden="true" className="h-10 w-px shrink-0 bg-white/50" />
                <h3 className="font-display text-2xl font-bold leading-tight text-balance sm:text-4xl">{fill(dict.media.photos.title, siteVars)}</h3>
              </div>
              <p className="text-base leading-relaxed sm:text-lg">{fill(dict.media.photos.body, siteVars)}</p>
            </div>
            <div className="mt-10">
              <PhotoGallery locale={locale} photos={eventPhotos} labels={dict.media.photos} />
            </div>
            <p className="mt-8 flex items-start gap-2 text-sm sm:text-base">
              <Icon name="info" className="mt-0.5 size-5 shrink-0" />
              {dict.media.photos.note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

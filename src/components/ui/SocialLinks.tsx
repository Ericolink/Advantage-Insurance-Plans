import { site } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";
import { Icon } from "./Icon";

const profiles = [
  { id: "facebook", href: site.socials.facebook },
  { id: "instagram", href: site.socials.instagram },
] as const;

/** True when at least one profile is configured, so callers can skip the heading that goes with the icons. */
export const hasSocialLinks = profiles.some((profile) => profile.href);

const tones = {
  // Dark footer: orange discs with deep-blue marks (5.3:1); white on hover. The focus ring turns yellow to stay visible.
  dark: "bg-orange text-brand-deep hover:bg-white hover:text-accent-strong focus-visible:outline-sun",
  // Orange contact section: white discs with dark-orange marks (6.6:1); deep blue on hover.
  light: "bg-white text-accent-strong hover:bg-brand-deep hover:text-white",
};

/** Round icon links to the office's social profiles. Each opens in a new tab and is named for screen readers. */
export function SocialLinks({ dict, tone, labelledBy }: { dict: Dictionary; tone: keyof typeof tones; labelledBy?: string }) {
  if (!hasSocialLinks) return null;
  return (
    <ul aria-labelledby={labelledBy} className="flex flex-wrap items-center gap-4">
      {profiles.map(
        (profile) =>
          profile.href && (
            <li key={profile.id}>
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.social[profile.id]}
                title={dict.social[profile.id]}
                className={`grid size-12 place-items-center rounded-full transition-[background-color,color,translate] duration-200 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none ${tones[tone]}`}
              >
                <Icon name={profile.id} className="size-6" />
              </a>
            </li>
          ),
      )}
    </ul>
  );
}

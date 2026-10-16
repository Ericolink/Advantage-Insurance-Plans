// Shared layout and type styles, so every section uses the same margins, rhythm and hierarchy.
// Mobile first: phone sizes come first, larger screens scale up from `sm:`.

/** Page width and side margins (20px on phones). */
export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

/** Vertical rhythm between sections. */
export const sectionSpace = "py-16 sm:py-20 lg:py-24";

export const h1Class = "font-display text-[1.8rem] font-bold leading-[1.15] text-brand-deep text-balance sm:text-5xl sm:leading-tight";

export const h2Class = "font-display text-[1.6rem] font-bold leading-tight text-brand-deep text-balance sm:text-4xl";

/** Intro paragraph under a heading. */
export const leadClass = "max-w-2xl text-lg leading-relaxed text-ink sm:text-xl";

/** Regular reading text: 18px on phones, 20px from tablets. */
export const bodyClass = "text-base leading-relaxed text-ink sm:text-lg";

/** Secondary action shown as a link instead of another big button. */
export const textLinkClass =
  "inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-accent-strong underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-brand-deep hover:decoration-accent [&>svg]:transition-transform [&>svg]:duration-200 motion-safe:hover:[&>svg]:translate-x-1";

/** Hover feedback for a card with a stretched link: a small lift and a soft shadow. Touch screens skip it. */
export const cardHoverClass =
  "transition-[border-color,box-shadow,translate] duration-300 ease-out hover:shadow-[0_20px_40px_-24px_rgb(20_36_79/0.35)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none";

import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "brand" | "ghost";

// Large, high-contrast targets (min 52px tall) for older visitors and touch screens.
// Hover lifts by 2px at most and a press settles back; the size never changes, so the target stays put.
const base =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-xl px-6 py-3 text-lg font-semibold transition-[color,background-color,box-shadow,translate,scale] duration-200 ease-out motion-safe:not-disabled:hover:-translate-y-0.5 motion-safe:not-disabled:active:translate-y-0 motion-safe:not-disabled:active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-deep disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong hover:shadow-[0_10px_22px_-10px_rgb(165_59_11/0.7)]",
  brand: "bg-brand text-white hover:bg-brand-deep hover:shadow-[0_10px_22px_-10px_rgb(20_36_79/0.7)]",
  secondary: "bg-surface text-brand-deep ring-2 ring-accent hover:bg-accent-soft hover:shadow-[0_10px_22px_-12px_rgb(165_59_11/0.5)]",
  ghost: "text-accent-strong underline-offset-4 hover:underline",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function ButtonLink({ variant, className, ...props }: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}

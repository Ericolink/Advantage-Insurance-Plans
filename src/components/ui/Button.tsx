import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "brand" | "ghost";

// Large, high-contrast targets (min 52px tall) for older visitors and touch screens.
const base =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-xl px-6 py-3 text-lg font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-deep disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  brand: "bg-brand text-white hover:bg-brand-deep",
  secondary: "bg-surface text-brand-deep ring-2 ring-accent hover:bg-accent-soft",
  ghost: "text-accent-strong underline-offset-4 hover:underline",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function ButtonLink({ variant, className, ...props }: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}

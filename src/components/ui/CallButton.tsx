import { site } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";
import { buttonClass } from "./Button";
import { Icon } from "./Icon";

interface CallButtonProps {
  dict: Dictionary;
  label?: string;
  /** Show the number on the button (true) or only the label. */
  showNumber?: boolean;
  variant?: "primary" | "secondary" | "brand";
  className?: string;
  /** The page's main call button: while it is on screen, the phone call bar stays hidden. */
  primary?: boolean;
}

/**
 * "Call our office" button. While the phone number is not configured it renders a
 * clearly marked placeholder instead of a fake number (launch is blocked until then).
 */
export function CallButton({ dict, label = dict.nav.call, showNumber = true, variant = "secondary", className = "", primary = false }: CallButtonProps) {
  const phone = site.contact.phone;
  if (!phone) {
    return (
      <span
        className={`inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-amber-500 bg-amber-50 px-5 py-3 text-base font-semibold text-amber-900 ${className}`}
        title={dict.nav.phonePending}
      >
        <Icon name="phone" className="size-5" />
        {dict.nav.phonePending}
      </span>
    );
  }
  return (
    <a href={`tel:${phone.e164}`} className={buttonClass(variant, className)} {...(primary && { "data-primary-call": "" })}>
      <Icon name="phone" className="size-5" />
      {/* On very narrow screens the number drops to a second line instead of widening the page. */}
      <span className="flex flex-wrap justify-center gap-x-1.5 sm:flex-nowrap">
        <span>
          {label}
          {showNumber && ":"}
        </span>
        {showNumber && <span className="whitespace-nowrap">{phone.display}</span>}
      </span>
    </a>
  );
}

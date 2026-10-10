"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/config/types";
import type { Dictionary } from "@/lib/i18n";
import { initialLeadFormState, type HelpType, type LeadField } from "@/lib/lead-form";
import { submitLead } from "@/lib/submit-lead";
import { buttonClass } from "@/components/ui/Button";
import { HELP_EVENT } from "@/components/ui/HelpButton";
import { Icon } from "@/components/ui/Icon";

export interface LeadFormProps {
  locale: Locale;
  text: Dictionary["form"];
  /** Consent wording with the business name already filled in. */
  consentText: string;
  smsConsentText: string;
  successTemplate: string;
  helpOptions: { id: HelpType; label: string }[];
  languages: { code: Locale; label: string }[];
  acceptsTexts: boolean;
  privacyHref: string | null;
  fallback: { phone: { e164: string; display: string } | null; email: string | null };
}

const fieldClass =
  "mt-2 block w-full rounded-xl border-2 border-ink-soft/50 bg-surface px-4 py-3 text-lg text-ink focus:border-brand focus:outline-3 focus:outline-brand/30 aria-[invalid=true]:border-red-700";
const labelClass = "text-lg font-semibold text-ink";

export function LeadForm(props: LeadFormProps) {
  const { locale, text, helpOptions, languages, acceptsTexts, privacyHref, fallback } = props;
  const [state, formAction, pending] = useActionState(submitLead, initialLeadFormState);
  const values = state.status === "error" ? state.values : null;
  const [helpType, setHelpType] = useState<string>(values?.helpType ?? "");
  const nameRef = useRef<HTMLInputElement>(null);
  const id = useId();

  // Service buttons elsewhere on the page preselect the kind of help.
  useEffect(() => {
    const onHelp = (event: Event) => {
      setHelpType(String((event as CustomEvent<string>).detail));
      // Wait for the jump to #contact, then put the cursor in the first field.
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 50);
    };
    window.addEventListener(HELP_EVENT, onHelp);
    return () => window.removeEventListener(HELP_EVENT, onHelp);
  }, []);

  if (state.status === "success") {
    const message = props.successTemplate.replace(/,?\s*\{name\}/, state.name ? `, ${state.name}` : "");
    return (
      <div role="status" className="self-start rounded-2xl bg-surface p-6 ring-2 ring-brand sm:p-8">
        <p className="flex items-start gap-3 text-xl font-semibold text-ink">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
            <Icon name="check" className="size-6" />
          </span>
          {message}
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const errorId = (field: LeadField) => `${id}-${field}-error`;
  const fieldError = (field: LeadField) => {
    const key = errors[field];
    return key ? (
      <p id={errorId(field)} className="mt-2 flex items-center gap-2 text-lg font-semibold text-red-700">
        <Icon name="alert" className="size-5 shrink-0" />
        {text.errors[key]}
      </p>
    ) : null;
  };
  const invalid = (field: LeadField) =>
    errors[field] ? { "aria-invalid": true as const, "aria-describedby": errorId(field) } : {};
  const methods = [
    { value: "phone", label: text.methodPhone },
    ...(acceptsTexts ? [{ value: "text", label: text.methodText }] : []),
    { value: "email", label: text.methodEmail },
  ];

  return (
    // `key` remounts the fields after each failed attempt so they show the echoed values.
    <form
      key={JSON.stringify(values)}
      action={formAction}
      noValidate
      aria-labelledby={`${id}-title`}
      className="relative space-y-6 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-line sm:p-8"
    >
      <div>
        <h3 id={`${id}-title`} className="font-display text-2xl font-bold text-brand-deep">
          {text.title}
        </h3>
        <p className="mt-1 text-lg text-ink-soft">{text.intro}</p>
      </div>
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot for bots: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {errors.form && (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-lg font-semibold text-red-800">
          <p>{text.errors[errors.form]}</p>
          {fallback.phone && (
            <a href={`tel:${fallback.phone.e164}`} className="mt-2 inline-flex items-center gap-2 text-xl font-bold underline">
              <Icon name="phone" className="size-5" />
              {fallback.phone.display}
            </a>
          )}
        </div>
      )}

      <div>
        <label htmlFor={`${id}-name`} className={labelClass}>
          {text.name}
        </label>
        <input
          ref={nameRef}
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          required
          defaultValue={values?.name}
          className={fieldClass}
          {...invalid("name")}
        />
        {fieldError("name")}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={labelClass}>
          {text.phone}
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          defaultValue={values?.phone}
          className={fieldClass}
          {...invalid("phone")}
        />
        {fieldError("phone")}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={labelClass}>
          {text.email} <span className="font-normal text-ink-soft">({text.optional})</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values?.email}
          className={fieldClass}
          {...invalid("email")}
        />
        {fieldError("email")}
      </div>

      <div>
        <label htmlFor={`${id}-help`} className={labelClass}>
          {text.help}
        </label>
        <select
          id={`${id}-help`}
          name="helpType"
          value={helpType}
          onChange={(event) => setHelpType(event.target.value)}
          className={fieldClass}
        >
          <option value="">{text.helpPlaceholder}</option>
          {helpOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>{text.contactMethod}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {methods.map((option) => (
            <label
              key={option.value}
              className="flex min-h-13 cursor-pointer items-center gap-3 rounded-xl border-2 border-line px-4 py-2 text-lg text-ink has-[:checked]:border-brand has-[:checked]:bg-brand-soft"
            >
              <input
                type="radio"
                name="contactMethod"
                value={option.value}
                defaultChecked={(values?.contactMethod ?? "phone") === option.value}
                className="size-6 accent-brand"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {languages.length > 1 && (
        <fieldset>
          <legend className={labelClass}>{text.language}</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {languages.map((language) => (
              <label
                key={language.code}
                lang={language.code}
                className="flex min-h-13 cursor-pointer items-center gap-3 rounded-xl border-2 border-line px-4 py-2 text-lg text-ink has-[:checked]:border-brand has-[:checked]:bg-brand-soft"
              >
                <input
                  type="radio"
                  name="language"
                  value={language.code}
                  defaultChecked={(values?.language ?? locale) === language.code}
                  className="size-6 accent-brand"
                />
                {language.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <p className="flex gap-2 rounded-xl bg-brand-soft px-4 py-3 text-base text-ink">
        <Icon name="info" className="mt-0.5 size-5 shrink-0 text-brand" />
        {text.sensitiveHint}
      </p>

      <div className="space-y-4">
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-lg text-ink">
            <input
              type="checkbox"
              name="consent"
              required
              defaultChecked={values?.consent}
              className="mt-1 size-6 shrink-0 accent-brand"
              {...invalid("consent")}
            />
            <span>{props.consentText}</span>
          </label>
          {fieldError("consent")}
        </div>
        {acceptsTexts && (
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-base text-ink">
              <input
                type="checkbox"
                name="smsConsent"
                defaultChecked={values?.smsConsent}
                className="mt-1 size-6 shrink-0 accent-brand"
                {...invalid("smsConsent")}
              />
              <span>{props.smsConsentText}</span>
            </label>
            {fieldError("smsConsent")}
          </div>
        )}
        {privacyHref && (
          <p className="text-base">
            <a href={privacyHref} className="font-semibold text-brand underline">
              {text.privacyLink}
            </a>
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className={buttonClass("primary", "w-full min-h-15 text-xl")}>
        {pending ? text.sending : text.submit}
      </button>
    </form>
  );
}

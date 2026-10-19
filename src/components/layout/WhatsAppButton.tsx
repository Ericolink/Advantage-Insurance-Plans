/**
 * Floating WhatsApp button, bottom right on every page. A plain link to wa.me (works without JavaScript):
 * it opens the WhatsApp app on phones and WhatsApp Web on computers, in a chat with the office's number,
 * with `message` already typed in so the visitor only has to send it (or edit it first).
 * On phones it sits above the call bar. From tablets up, a speech bubble with the label shows on hover
 * or keyboard focus, and briefly after the page loads (globals.css, skipped with reduced motion).
 */
export function WhatsAppButton({ phone, label, message }: { phone: { e164: string }; label: string; message: string }) {
  const number = phone.e164.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-whatsapp
      className="group fixed right-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-40 flex items-center gap-3 rounded-full focus-visible:outline-offset-4 sm:right-6 sm:bottom-6"
    >
      {/* Speech bubble: tablets and up. Decorative copy of the accessible name. */}
      <span
        aria-hidden="true"
        data-whatsapp-bubble
        className="pointer-events-none relative hidden rounded-2xl bg-surface px-4 py-2.5 text-base font-semibold whitespace-nowrap text-brand-deep opacity-0 shadow-lg ring-1 ring-line transition-[opacity,translate] duration-200 ease-out after:absolute after:top-1/2 after:-right-1.5 after:size-3 after:-translate-y-1/2 after:rotate-45 after:rounded-[2px] after:bg-surface group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:translate-x-1 motion-safe:group-hover:translate-x-0 motion-safe:group-focus-visible:translate-x-0 sm:block"
      >
        {label}
      </span>
      {/* WhatsApp green darkened to #168a45 so the white logo keeps 4.4:1 contrast. */}
      <span className="grid size-15 shrink-0 place-items-center rounded-full bg-[#168a45] text-white shadow-[0_12px_28px_-10px_rgb(15_70_35/0.7)] ring-4 ring-white transition-[background-color,box-shadow,translate,scale] duration-200 ease-out group-hover:bg-[#0f7b4a] group-hover:shadow-[0_16px_32px_-10px_rgb(15_70_35/0.8)] motion-safe:group-hover:-translate-y-0.5 motion-safe:group-active:scale-95 sm:size-16">
        {/* WhatsApp logo (Simple Icons, CC0). */}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 fill-current sm:size-9">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </span>
    </a>
  );
}

import { getDictionary } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";

// not-found.tsx receives no params, so it uses the default locale's copy with a link to each home page.
export default function NotFound() {
  const en = getDictionary("en");
  const es = getDictionary("es");

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl font-bold text-brand-deep">{en.notFound.title}</h1>
      <p className="mt-3 text-ink-soft">{en.notFound.body}</p>
      <p className="mt-1 text-ink-soft" lang="es">
        {es.notFound.body}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/en">{en.notFound.home}</ButtonLink>
        <ButtonLink href="/es" variant="secondary" lang="es">
          {es.notFound.home}
        </ButtonLink>
      </div>
    </div>
  );
}

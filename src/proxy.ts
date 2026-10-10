import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "es"] as const;
const defaultLocale = "en";
const COOKIE = "NEXT_LOCALE";

/** Picks "es" or "en" from the Accept-Language header, honoring q-values. */
function fromAcceptLanguage(header: string | null): string | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...rest] = part.trim().split(";");
      const q = rest.find((param) => param.trim().startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((item) => (locales as readonly string[]).includes(item.lang))?.lang ?? null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const current = locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (current) {
    // Remember the language the visitor is reading so "/" sends them back to it.
    const response = NextResponse.next();
    if (request.cookies.get(COOKIE)?.value !== current) {
      response.cookies.set(COOKIE, current, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return response;
  }

  const saved = request.cookies.get(COOKIE)?.value;
  const locale =
    (saved && (locales as readonly string[]).includes(saved) ? saved : null) ??
    fromAcceptLanguage(request.headers.get("accept-language")) ??
    defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension (images, icons…).
  matcher: ["/((?!_next/|api/|robots\\.txt|sitemap\\.xml|.*\\.[\\w]+$).*)"],
};

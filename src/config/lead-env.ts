// Kept free of path aliases so next.config.ts and scripts/launch-check.ts can import it.

type Env = Record<string, string | undefined>;

const read = (env: Env, name: string) => env[name]?.trim() || null;

export function leadWebhookConfig(env: Env = process.env) {
  const url = read(env, "LEAD_WEBHOOK_URL");
  return url ? { url, secret: read(env, "LEAD_WEBHOOK_SECRET") } : null;
}

export function leadEmailConfig(env: Env = process.env) {
  const apiKey = read(env, "RESEND_API_KEY");
  const to = read(env, "LEAD_EMAIL_TO");
  const from = read(env, "LEAD_EMAIL_FROM");
  return apiKey && to && from ? { apiKey, to, from } : null;
}

/** True when at least one lead destination (webhook or email) is configured. */
export function hasLeadDestination(env: Env = process.env): boolean {
  return leadWebhookConfig(env) !== null || leadEmailConfig(env) !== null;
}

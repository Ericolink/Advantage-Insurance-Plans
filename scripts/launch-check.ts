// Run with `npm run check:launch`. Lists what is still pending before launch.
// Exits with code 1 when blocking items remain, so it can gate CI or deploys.
import { site } from "../src/config/site.ts";
import { getPendingItems } from "../src/config/readiness.ts";

// Read the same local settings `next dev` / `next build` would use.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // File not present: rely on the real environment.
  }
}

const items = getPendingItems(site);
const blocking = items.filter((item) => item.blocking);
const optional = items.filter((item) => !item.blocking);

if (items.length === 0) {
  console.log("✔ Everything is in place. Ready to launch.");
  process.exit(0);
}

if (blocking.length > 0) {
  console.log(`✖ ${blocking.length} blocking item(s):`);
  for (const item of blocking) console.log(`  - ${item.message}`);
}
if (optional.length > 0) {
  console.log(`\n• ${optional.length} recommended item(s):`);
  for (const item of optional) console.log(`  - ${item.message}`);
}

process.exit(blocking.length > 0 ? 1 : 0);

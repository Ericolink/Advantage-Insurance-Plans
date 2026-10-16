// Run with `npm run check:launch`. Lists what is still pending before launch.
// Exits with code 1 when blocking items remain, so it can gate CI or deploys.
// Add `--brief` for one line per item.
import { site } from "../src/config/site.ts";
import { getPendingItems, type PendingItem } from "../src/config/readiness.ts";

// Read the same local settings `next dev` / `next build` would use.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // File not present: rely on the real environment.
  }
}

const brief = process.argv.includes("--brief");
const items = getPendingItems(site);
const blocking = items.filter((item) => item.blocking);
const optional = items.filter((item) => !item.blocking);

function print(item: PendingItem) {
  console.log(`  - ${item.message}`);
  if (brief) return;
  console.log(`      Why:     ${item.why}`);
  console.log(`      Where:   ${item.where}`);
  console.log(`      Who:     ${item.owner}`);
  console.log(`      Resolve: ${item.resolve}`);
}

if (items.length === 0) {
  console.log("✔ Everything is in place. Ready to launch.");
  process.exit(0);
}

if (blocking.length > 0) {
  console.log(`✖ ${blocking.length} blocking item(s):`);
  blocking.forEach(print);
}
if (optional.length > 0) {
  console.log(`\n• ${optional.length} recommended item(s):`);
  optional.forEach(print);
}

const bySilvia = items.filter((item) => item.owner !== "Web team").length;
console.log(`\n${bySilvia} of ${items.length} item(s) need data or approval from Silvia (see docs/launch/silvia-confirmations.md).`);
console.log("An item is resolved only when the real data or approval is in place — never by editing the check.");

process.exit(blocking.length > 0 ? 1 : 0);

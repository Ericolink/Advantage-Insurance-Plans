import type { NextConfig } from "next";
import { getPendingItems } from "./src/config/readiness.ts";
import { site } from "./src/config/site.ts";

// Production deploys (or REQUIRE_LAUNCH_READY=1) refuse to build while essential data is pending.
const mustBeReady = process.env.REQUIRE_LAUNCH_READY === "1" || process.env.VERCEL_ENV === "production";
const isBuild = process.argv.includes("build");
if (mustBeReady && isBuild) {
  const blocking = getPendingItems(site).filter((item) => item.blocking);
  if (blocking.length > 0) {
    throw new Error(
      `Launch check failed. Resolve these before deploying to production:\n${blocking.map((item) => `  - ${item.message}`).join("\n")}`,
    );
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

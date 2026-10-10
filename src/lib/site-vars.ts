import { site } from "@/config/site";

/** Placeholders available to every dictionary string. */
export const siteVars = {
  business: site.businessName,
  /** Full commercial name: use it wherever the office must be identified. */
  brand: site.brandName,
  agent: site.agentName,
  agentFirst: site.agentName.split(" ")[0],
  city: site.location.city ?? "",
};

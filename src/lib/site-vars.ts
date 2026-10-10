import { site } from "@/config/site";

/** Placeholders available to every dictionary string. */
export const siteVars = {
  business: site.businessName,
  agent: site.agentName,
  agentFirst: site.agentName.split(" ")[0],
};

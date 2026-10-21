// The launch check guards what may be published (licenses, approvals, compliance). These tests pin its rules so
// a refactor can't quietly relax them. They change a copy of the config, never site.ts itself.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getPendingItems, isIndexable, isLaunchReady } from "../src/config/readiness.ts";
import { site } from "../src/config/site.ts";
import type { Office, SiteConfig } from "../src/config/types.ts";

/** A copy of the real config with only `changes` replaced. */
const config = (changes: Partial<SiteConfig>): SiteConfig => ({ ...site, ...changes });
const blockingKeys = (value: SiteConfig) => getPendingItems(value).filter((item) => item.blocking).map((item) => item.key);
const allKeys = (value: SiteConfig) => getPendingItems(value).map((item) => item.key);

const office = (stateCode: string): Office => ({
  label: null,
  streetAddress: "1 Main St",
  city: "Somewhere",
  stateCode,
  postalCode: "00000",
  phone: null,
  mapEmbedUrl: null,
});

describe("launch check: domain", () => {
  it("stays blocked and not indexable without a production domain", () => {
    const value = config({ url: null });
    assert.ok(blockingKeys(value).includes("url"));
    assert.equal(isLaunchReady(value), false);
    assert.equal(isIndexable(value), false);
  });

  it("is indexable with a valid domain even while other launch items are pending", () => {
    assert.equal(isIndexable(config({ url: "https://www.agency-domain.com", licenses: [] })), true);
    assert.equal(isIndexable(config({ url: "https://agency.netlify.app" })), false);
  });

  for (const url of ["http://www.agency-domain.com", "https://agency.netlify.app", "https://www.example.com", "https://www.agency-domain.com/", "https://www.agency-domain.com/es", "not a url"]) {
    it(`rejects ${JSON.stringify(url)}`, () => {
      assert.ok(blockingKeys(config({ url })).includes("url-invalid"));
    });
  }

  it("accepts a bare https origin", () => {
    const keys = allKeys(config({ url: "https://www.agency-domain.com" }));
    assert.ok(!keys.includes("url") && !keys.includes("url-invalid"));
  });
});

describe("launch check: licensing", () => {
  it("blocks the launch while no state license is listed", () => {
    assert.ok(blockingKeys(config({ licenses: [] })).includes("licenses"));
  });

  it("rejects a license number that is really a phone number", () => {
    const value = config({ licenses: [{ state: "TX", number: "(915) 256-9708", holder: "agent" }] });
    assert.ok(blockingKeys(value).includes("license-0"));
  });

  it("rejects a license number that repeats the NPN", () => {
    const value = config({ npn: "1234567", licenses: [{ state: "TX", number: "1234567", holder: "agent" }] });
    assert.ok(blockingKeys(value).includes("license-0"));
  });

  it("rejects a state that is not a two-letter code", () => {
    const value = config({ licenses: [{ state: "Texas", number: "2345678", holder: "agent" }] });
    assert.ok(blockingKeys(value).includes("license-0"));
  });

  it("points out an office in a state with no listed license", () => {
    const value = config({
      licenses: [{ state: "TX", number: "2345678", holder: "agent" }],
      otherOffices: [office("NM")],
    });
    assert.ok(allKeys(value).includes("license-states"));
  });

  it("rejects an NPN that is not digits only", () => {
    assert.ok(blockingKeys(config({ npn: "NPN-123" })).includes("npn-invalid"));
  });
});

describe("launch check: approvals and compliance", () => {
  it("blocks the launch while the copy is not approved", () => {
    assert.ok(blockingKeys(config({ copyApproved: false })).includes("copy"));
  });

  it("requires compliance review for testimonials on a Medicare site", () => {
    const value = config({ testimonials: [{ quote: { en: "Quote", es: "Cita" }, name: "A. B." }] });
    assert.ok(blockingKeys(value).includes("testimonials"));
  });

  it("requires the CMS disclaimer counts when Medicare is marketed", () => {
    const value = config({ regulated: { ...site.regulated, medicare: true, medicareOrganizations: null } });
    assert.ok(blockingKeys(value).includes("medicare-disclaimer"));
  });

  it("does not accept a Google search link as the business profile", () => {
    const value = config({ socials: { ...site.socials, google: "https://www.google.com/search?q=advantage" } });
    assert.ok(blockingKeys(value).includes("google-invalid"));
  });

  it("does not accept an example address as the official email", () => {
    const value = config({ contact: { ...site.contact, email: "silvia@example.com" } });
    assert.ok(blockingKeys(value).includes("email-invalid"));
  });

  it("requires a privacy policy before the form can collect data", () => {
    const value = config({ leadForm: true, legal: { ...site.legal, privacyPolicyReady: false } });
    assert.ok(blockingKeys(value).includes("privacy"));
  });
});

describe("launch check: report", () => {
  it("tells whoever maintains the site why, where, who and how for every pending item", () => {
    for (const item of getPendingItems(site)) {
      for (const field of ["message", "why", "where", "owner", "resolve"] as const) {
        assert.ok(item[field].trim().length > 0, `${item.key}: empty ${field}`);
      }
    }
  });

  it("gives every pending item a unique key", () => {
    const keys = allKeys(site);
    assert.equal(new Set(keys).size, keys.length);
  });
});

import { getEntry } from "astro:content";
import { productSite } from "@roey/landing-page/app";
import type { ProductSlug } from "../index";

export const productSlug: ProductSlug = productSite.slug;

async function getRequiredProductEntry(
  collection: "productOverview" | "productHelp" | "productPrivacy",
  id: "index" | "help" | "privacy"
) {
  const entry = await getEntry(collection, id);

  if (!entry) {
    throw new Error(`Missing ${collection} content for ${productSlug}`);
  }

  return entry;
}

export function getProductOverviewEntry() {
  return getRequiredProductEntry("productOverview", "index");
}

export function getProductHelpEntry() {
  return getRequiredProductEntry("productHelp", "help");
}

export function getProductPrivacyEntry() {
  return getRequiredProductEntry("productPrivacy", "privacy");
}

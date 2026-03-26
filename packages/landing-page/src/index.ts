export const productSlugs = ["finbar", "syphon"] as const;

export type ProductSlug = (typeof productSlugs)[number];

export function productIdFromEntry(entry: string) {
  return entry.split("/")[0] as ProductSlug;
}

export function createProductOverviewSchema(
  z: typeof import("astro:content").z,
  image: () => unknown
) {
  const productReviewSchema = z.object({
    text: z.string(),
    reviewer: z.string(),
    url: z.string().url(),
    platform: z.string(),
    rating: z.number().optional(),
  });

  return z.object({
    name: z.string(),
    tagline: z.string(),
    releaseDate: z.date(),
    icon: image(),
    coverImage: image(),
    purchasePolicy: z.string(),
    gumroadId: z.string(),
    metaDescription: z.string(),
    siteUrl: z.string().url(),
    downloadName: z.string(),
    xHandle: z.string(),
    reviews: z.array(productReviewSchema).optional(),
  });
}

export function createProductHelpSchema(z: typeof import("astro:content").z) {
  return z.object({
    feedbackUrl: z.string().url(),
    issueTrackerUrl: z.string().url().optional(),
  });
}

export function isProductSlug(value: string): value is ProductSlug {
  return productSlugs.includes(value as ProductSlug);
}

export function sortProductEntriesBySlug<T extends { id: string }>(entries: T[]) {
  return [...entries].sort((left, right) => left.id.localeCompare(right.id));
}

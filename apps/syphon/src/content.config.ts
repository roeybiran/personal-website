import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const overview = defineCollection({
  loader: glob({
    pattern: "src/content/index.md",
    generateId: () => "index",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      releaseDate: z.date(),
      icon: image(),
      coverImage: image(),
      purchasePolicy: z.string(),
      gumroadID: z.string(),
      metaDescription: z.string(),
      reviews: z
        .array(
          z.object({
            text: z.string(),
            reviewer: z.string(),
            url: z.string(),
            platform: z.string(),
            rating: z.number().optional(),
          })
        )
        .optional(),
    }),
});

const privacy = defineCollection({
  loader: glob({
    pattern: "src/content/privacy.md",
    generateId: () => "privacy",
  }),
});

export const collections = {
  overview,
  privacy,
};

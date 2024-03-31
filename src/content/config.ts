import { defineCollection, reference, z } from "astro:content";

const apps = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      icon: image(),
      release: z.discriminatedUnion("type", [
        z.object({
          type: z.literal("indie"),
          cover: image(),
          releaseDate: z.date(),
          gumroadID: z.string(),
          sparkleAppcastURL: z.string().url(),
          purchasePolicy: z.string().optional(),
          platform: z.literal("macOS"),
          productHuntEmbed: z.string().optional(),
          cask: z.string().optional(),
        }),
        z.object({
          type: z.literal("github"),
          repoURL: z.string().url(),
        }),
      ]),
      reviews: z.array(
        z.object({
          text: z.string(),
          reviewer: z.string(),
          rating: z.number().min(0).max(5).optional(),
          link: z.string().url(),
          platform: z.string(),
        })
      ).optional()
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      image: image(),
      date: z.date(),
      responsibilities: z.array(z.enum(["Code", "Design", "Art"])),
      stack: z.array(
        z.enum([
          "Airtable",
          "AppKit",
          "C#",
          "Next.js",
          "p5.js",
          "react–three–fiber",
          "SpriteKit",
          "Swift",
          "TypeScript",
          "Unity",
        ])
      ),
      type: z.enum(["Website", "macOS App", "Unity Game"]),
      links: z.array(
        z.object({
          label: z.enum(["GitHub", "Home Page"]),
          url: z.string().url(),
        })
      ),
      press: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().url(),
          })
        )
        .optional(),
    }),
});

const help = defineCollection({
  type: "content",
  schema: z.object({
    app: reference("apps"),
  }),
});

export const collections = {
  apps,
  projects,
  help,
};

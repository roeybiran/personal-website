import { z, defineCollection, reference } from "astro:content";

const apps = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      sparkleAppcastURL: z.string().url().optional(),
      cover: image().optional(),
      dateReleased: z.date(),
      downloadURL: z.string(),
      help: reference("help").optional(),
      releaseNotes: reference("release-notes").optional(),
      icon: image(),
      iconAlt: z.string(),
      openGraphImage: z.string().optional(),
      platform: z.literal("macOS"),
      price: z.number().optional(),
      productHuntEmbed: z.string().optional(),
      purchasePolicy: z.string().optional(),
      purchaseURL: z.string().url().optional(),
      sourceCode: z.string().url().optional(),
      subtitle: z.string(),
      systemRequirements: z.union([
        z.literal("Big Sur"),
        z.literal("Monterey"),
      ]),
      title: z.string(),
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

const releaseNotes = defineCollection({
  type: "content",
  schema: z.object({
    app: reference("apps"),
  }),
});

export const collections = {
  apps,
  projects,
  help,
  'release-notes': releaseNotes,
};
import { defineCollection, reference, z } from "astro:content";

const apps = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      icon: image(),
      iconAlt: z.string(),
      dateReleased: z.date(),
      price: z.number().optional(),
      isMisc: z.boolean(),
      //
      downloadURL: z.string(),
      purchaseURL: z.string().url().optional(),
      sparkleAppcastURL: z.string().url().optional(),
      releaseNotesURL: z.string().url().optional(),
      cask: z.string().optional(),
      //
      cover: image().optional(),
      help: reference("help").optional(),
      openGraphImage: z.string().optional(),
      platform: z.literal("macOS"),
      productHuntEmbed: z.string().optional(),
      purchasePolicy: z.string().optional(),
      sourceCode: z.string().url().optional(),
      systemRequirements: z.literal("Big Sur").or(z.literal("Monterey")),
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

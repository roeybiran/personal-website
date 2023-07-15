import { z, defineCollection } from "astro:content";

const apps = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      tagline: z.string().optional(),
      icon: image(),
      iconAlt: z.string(),
      cover: image().optional(),
      dateReleased: z.date(),
      systemRequirements: z.union([
        z.literal("Big Sur"),
        z.literal("Monterey"),
      ]),
      platform: z.literal("macOS"),
      downloadURL: z.string(),
      price: z.number().optional(),
      purchaseURL: z.string().url().optional(),
      purchasePolicy: z.string().optional(),
      sourceCode: z.string().url().optional(),
      openGraphImage: z.string().optional(),
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

const help = defineCollection({ type: "content" });

export const collections = {
  apps,
  projects,
  help,
};

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { extractSlug } from "./utils/extractSlug";

const stack = z.array(
  z.enum([
    "Airtable",
    "AppKit",
    "C#",
    "Core Animation",
    "Core Graphics",
    "CSS",
    "Figma",
    "GSAP",
    "HTML",
    "JavaScript",
    "Next.js",
    "p5.js",
    "Photoshop",
    "PHP",
    "react-three-fiber",
    "Sketch",
    "SpriteKit",
    "Swift",
    "SwiftUI",
    "TypeScript",
    "Unity",
    "WordPress",
  ])
);
const responsibilities = z.array(z.enum(["Art", "Code", "Design"]));
const itemKind = z.enum(["app", "utility", "project", "interaction", "icon"]);
const itemStatus = z.enum(["active", "discontinued", "archived"]);
const linkKind = z.enum(["site", "github", "download", "article"]);

const items = defineCollection({
  loader: glob({
    pattern: "src/content/items/*.md",
    generateId: ({ entry }) => extractSlug(entry),
  }),
  schema: ({ image }) =>
    z.object({
      kind: itemKind,
      title: z.string(),
      tagline: z.string().optional(),
      date: z.date().optional(),
      status: itemStatus.default("active"),
      media: z.discriminatedUnion("type", [
        z.object({
          type: z.literal("image"),
          image: image(),
        }),
        z.object({
          type: z.literal("video"),
          poster: image(),
          video: z.string(),
        }),
      ]),
      stack: stack.default([]),
      responsibilities: responsibilities.optional(),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().url(),
            kind: linkKind.optional(),
          })
        )
        .default([]),
      press: z
        .array(
          z.object({
            name: z.string(),
            url: z.string().url(),
          })
        )
        .optional(),
    }),
});

export const collections = {
  items,
};

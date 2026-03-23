import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { extractSlug } from "./utils/extractSlug";
import { extractDirName } from "./utils/extractDirName";

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
const type = z.enum(["Web", "macOS App", "Unity Game", "App Icon"]);

const utilities = defineCollection({
  loader: glob({
    pattern: "src/content/utilities/*/index.md",
    generateId: ({ entry }) => extractDirName(entry),
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      releaseDate: z.date(),
      icon: image(),
      github: z.string(),
      discontinued: z.boolean().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "src/content/projects/*.md",
    generateId: ({ entry }) => extractSlug(entry),
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tagline: z.string(),
    type,
    stack,
    url: z.string().url().optional(),
    github: z.string().optional(),
    responsibilities,
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

const interactions = defineCollection({
  loader: file("src/content/interactions.yaml"),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    responsibilities,
    stack,
  }),
});

const icons = defineCollection({
  loader: file("src/content/icons/icons.yaml"),
  schema: ({ image }) =>
    z.object({
      date: z.date(),
      title: z.string(),
      type,
      image: image(),
      stack,
    }),
});

export const collections = {
  utilities,
  projects,
  interactions,
  icons,
};

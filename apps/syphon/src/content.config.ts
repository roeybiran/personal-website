import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import {
  createProductHelpSchema,
  createProductOverviewSchema,
} from "@roey/landing-page";

const productOverview = defineCollection({
  loader: glob({
    base: "src/content",
    pattern: "index.md",
    generateId: () => "index",
  }),
  schema: ({ image }) => createProductOverviewSchema(z, image),
});

const productHelp = defineCollection({
  loader: glob({
    base: "src/content",
    pattern: "help.md",
    generateId: () => "help",
  }),
  schema: createProductHelpSchema(z),
});

const productPrivacy = defineCollection({
  loader: glob({
    base: "src/content",
    pattern: "privacy.md",
    generateId: () => "privacy",
  }),
});

export const collections = {
  productOverview,
  productHelp,
  productPrivacy,
};

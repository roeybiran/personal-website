import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkFlexibleContainers from "remark-flexible-containers";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://roeybiran.com",
  output: "hybrid",
  markdown: {
    remarkPlugins: [remarkToc, remarkUnwrapImages, remarkFlexibleContainers],
  },
  vite: {
    server: {
      watch: {
        ignored: ["**/.DS_Store"],
      },
    },
  },
  adapter: vercel(),
});

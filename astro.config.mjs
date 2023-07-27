import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkUnwrapImages from "remark-unwrap-images";

export default defineConfig({
  site: "https://roeybiran.com",
  markdown: {
    remarkPlugins: [remarkToc, remarkUnwrapImages],
  },
  experimental: {
    assets: true,
  },
  vite: {
    server: {
      watch: {
        ignored: ["**/.DS_Store"],
      },
    },
  },
});

import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkUnwrapImages from "remark-unwrap-images";
import vercel from "@astrojs/vercel/serverless";
import sectionize from "remark-sectionize";
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list";
import remarkFlexibleContainers from "remark-flexible-containers";

// https://astro.build/config
export default defineConfig({
  site: "https://roeybiran.com",
  output: "hybrid",
  markdown: {
    // order of plugins matter!
    remarkPlugins: [
      remarkToc,
      sectionize,
      remarkDefinitionList,
      remarkFlexibleContainers,
      remarkUnwrapImages,
    ],
    remarkRehype: { handlers: defListHastHandlers },
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

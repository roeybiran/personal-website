import { defineConfig } from "astro/config";
import remarkUnwrapImages from "remark-unwrap-images";
import { remarkDefinitionList } from "remark-definition-list";

//https://github.com/Nevenall/remark-containers

export default defineConfig({
  site: "https://roeybiran.com",
  markdown: {
    remarkPlugins: [remarkUnwrapImages],
  },
  experimental: {
    assets: true,
  },
});

import { defineConfig } from "astro/config";
import remarkUnwrapImages from "remark-unwrap-images";

//https://github.com/Nevenall/remark-containers

export default defineConfig({
  site: "https://roeybiran.com",
  markdown: {
    remarkPlugins: [remarkUnwrapImages],
  },
  experimental: {
    assets: true,
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/.DS_Store']
      }
    }
  }
});

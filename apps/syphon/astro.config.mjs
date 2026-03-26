// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { fileURLToPath } from "node:url";

export default defineConfig({
  output: "server",
  vite: {
    resolve: {
      alias: {
        "@roey/landing-page/app": fileURLToPath(
          new URL("./product.ts", import.meta.url)
        ),
      },
    },
    css: {
      transformer: "lightningcss",
    },
  },
  adapter: vercel(),
});

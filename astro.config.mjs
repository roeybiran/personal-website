// @ts-check
import { defineConfig, envField } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      transformer: "lightningcss",
    },
  },
  env: {
    schema: {
      S3_BUCKET_NAME: envField.string({ context: "server", access: "secret" }),
      S3_ACCESS_KEY_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      S3_SECRET_ACCESS_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      S3_ENDPOINT: envField.string({ context: "server", access: "secret" }),
      S3_REGION: envField.string({ context: "server", access: "secret" }),
    },
  },
  redirects: {
    "/apps/[slug]/buy": "/apps/[slug]/",
  },
  adapter: vercel(),
});

import css from "@eslint/css";
import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

const astroConfigs = astro.configs["flat/recommended"].map((config, index) =>
  index === 4 ? { ...config, files: ["*.astro", "**/*.astro"] } : config
);

export default defineConfig([
  {
    ignores: [
      "**/.astro/**",
      "**/.vercel/**",
      "**/dist/**",
      "**/node_modules/**",
    ],
  },
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs}"],
  },
  ...tseslint.configs.recommended,
  ...astroConfigs,
  {
    files: ["**/*.{astro,js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.css"],
    language: "css/css",
    plugins: { css },
    extends: ["css/recommended"],
  },
]);

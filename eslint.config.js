import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import css from "@eslint/css";
import astro from "eslint-plugin-astro";

const [
  tseslintBaseConfig,
  tseslintEslintRecommendedConfig,
  tseslintRecommendedConfig,
] = tseslint.configs.recommended;

export default defineConfig([
  {
    ignores: [".astro/", ".vercel/", "dist/", "node_modules/"],
  },
  ...astro.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: js.configs.recommended.rules,
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      ...tseslintBaseConfig.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: tseslintBaseConfig.plugins,
    rules: {
      ...js.configs.recommended.rules,
      ...tseslintEslintRecommendedConfig.rules,
      ...tseslintRecommendedConfig.rules,
    },
  },
  {
    files: ["**/*.css"],
    language: "css/css",
    plugins: { css },
    languageOptions: {
      tolerant: true,
    },
    extends: ["css/recommended"],
    rules: {
      "css/no-invalid-properties": "off",
      "css/use-baseline": "off",
    },
  },
]);

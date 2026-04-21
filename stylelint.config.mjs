export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [
    "**/.astro/**",
    "**/.vercel/**",
    "**/dist/**",
    "**/node_modules/**",
  ],
  plugins: ["stylelint-plugin-use-baseline"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["starting-style"],
      },
    ],
    "at-rule-empty-line-before": null,
    "color-hex-length": null,
    "comment-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "custom-property-pattern": null,
    "declaration-empty-line-before": null,
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["anchor", "anchor-size", "light-dark", "sibling-index"],
      },
    ],
    "function-url-quotes": null,
    "no-descending-specificity": null,
    "no-duplicate-selectors": null,
    "selector-class-pattern": null,
    "selector-not-notation": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["popover-open"],
      },
    ],
    "plugin/use-baseline": [
      true,
      {
        severity: "warning",
      },
    ],
  },
};

import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import tseslint from "typescript-eslint"
import globals from "globals"

export default tseslint.config(
  {
    ignores: ["dist/", "junit-results/", "**/*.xml", "**/*.html"]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node, ...globals.mocha }
    },
    rules: {
      // formatting is owned by Prettier; max-len catches long lines Prettier will not wrap;
      // strings/URLs exempt - same options as the UI sibling repo
      "max-len": ["error", { code: 120, ignoreStrings: true, ignoreUrls: true }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "off"
    }
  }
)

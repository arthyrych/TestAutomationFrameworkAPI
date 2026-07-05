import js from "@eslint/js"
import tseslint from "typescript-eslint"
import globals from "globals"

export default tseslint.config(
  {
    ignores: ["dist/", "junit-results/", "**/*.xml", "**/*.html"]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {...globals.node, ...globals.mocha}
    },
    rules: {
      semi: "off",
      quotes: ["error", "double", {allowTemplateLiterals: true}],
      "max-len": ["error", 120],
      indent: ["warn", 2, {SwitchCase: 1}],
      "object-curly-spacing": ["warn", "never"],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "off"
    }
  }
)

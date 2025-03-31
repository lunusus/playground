import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["examples/*", "node_modules/*"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [
      js.configs.recommended,
      prettier, // Disables ESLint rules that conflict with Prettier
    ],
    rules: {
      "prettier/prettier": "error", // Treat Prettier issues as errors
    },
  },
]);

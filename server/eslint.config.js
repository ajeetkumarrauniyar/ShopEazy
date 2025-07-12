import js from "@eslint/js";
import globals from "globals";
import * as tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";

const commonIgnores = [
  "node_modules",
  "dist",
  "coverage",
  "package-lock.json",
  "package.json",
  "*.log",
  "*.zip",
  ".vscode/",
  ".env",
  "*.env",
  ".env*",
];

export default defineConfig([
  // JavaScript files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier,
    },
    extends: [js.configs.recommended],
    rules: {
      "prettier/prettier": "error",
    },
    ignores: commonIgnores,
  },
  // TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      prettier,
      typescript: tseslint.plugin,
    },
    extends: [...tseslint.configs.recommended],
    rules: {
      "prettier/prettier": "error",
    },
    ignores: commonIgnores,
  },
  // Common settings for all files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: commonIgnores,
  },
]);

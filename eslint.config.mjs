import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals",
       "next/typescript",
       "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
       "plugin:import/errors",
       "plugin:import/warnings",
       "prettier"],
    plugins: ["jsx-a11y", "react-hooks", "import"],
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": "warn",
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "eol-last": ["error", "always"],
      "comma-dangle": ["error", "only-multiline"],
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "react-hooks/rules-of-hooks": "error", 
      "react-hooks/exhaustive-deps": "warn",
      "import/order": [
    "error",
    {
      "groups": ["builtin", "external", "internal", ["parent", "sibling", "index"]],
      "pathGroups": [
        {
          "pattern": "react",
          "group": "external",
          "position": "before"
        }
      ],
      "pathGroupsExcludedImportTypes": ["react"],
      "newlines-between": "always",
      "alphabetize": { "order": "asc", "caseInsensitive": true }
    }
  ], 
    }
    
  }),
];

export default eslintConfig;

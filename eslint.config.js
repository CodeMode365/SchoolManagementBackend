import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["*.ts"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@ngrx/recommended-requiring-type-checking",
      "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
    },
    rules: {
      "no-var": "error",
      "no-empty": "error",
      "no-empty-function": "error",
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "error",
      "no-debugger": "error",
      semi: "error",
      "prefer-const": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

module.exports = {
    parser: "@typescript-eslint/parser",
    globals: {
      jest: "readonly",
      test: "readonly",
      expect: "readonly",
      Float32Array: "readonly",
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "no-var": "off"
    }
  };
module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  ignorePatterns: ["webpack.config.js", "babel.config.js"],
  rules: {
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        code: 100,
        ignoreComments: true,
      },
    ],
    "import/no-unresolved": "off",
    "import/extensions": ["warn", "never"],
  },
  plugins: ["jest", "@typescript-eslint"],
};

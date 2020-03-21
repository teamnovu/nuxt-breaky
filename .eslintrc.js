module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "@nuxtjs",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
    "prettier",
    "prettier/vue"
  ],
  plugins: ["prettier"],
  rules: {
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "es5",
        semi: false
      }
    ]
  }
};

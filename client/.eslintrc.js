module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
  },
};

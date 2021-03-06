module.exports = {
  env: {
    "jest/globals": true,
  },
  extends: ["plugin:jest/recommended"],
  plugins: ["jest"],
  rules: {
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
};

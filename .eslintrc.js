module.exports = {
  "extends": [
    "google",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
  },
  "plugins": [
    "react"
  ],
  "settings": {
    "react": {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "15.3.1"
    }
  },
  "rules": {
    "new-cap": [2, {capIsNewExceptions: ["CSSModules"]}],
    "curly": [2, "multi-or-nest", "consistent"],
    "operator-linebreak": [2, "before", { "overrides": { "?": "after" } }],
    "require-jsdoc": 0,
    "no-alert": 0,
    "quote-props": 0,
    "max-len": 0,
    "no-implicit-coercion": 0,
    "no-negated-condition": 0,
    "react/prop-types": 0,
    "arrow-parens": 0,
    "comma-dangle": 0,
  }
};

module.exports = {
  // root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for ES8+
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    // Prettier plugin and recommended rules
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Include .prettierrc.js rules
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 25,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

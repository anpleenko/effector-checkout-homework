module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  globals: {
    window: true,
    module: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
};

module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    "prettier/prettier": "error",
    'no-console': ['error', { 'allow': ['info', 'warn', 'error'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }]
  },
}

module.exports = {
  root: true,
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    '@vue/typescript/recommended',
  ],
  plugins: ['import', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
      typescript: {
        project: './',
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/core-modules': ['vitest'],
  },
  rules: {
    'prefer-destructuring': ['error', { VariableDeclarator: { array: true } }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-spaced-func': 'off',
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'vue/require-default-prop': 'off',
  },
};

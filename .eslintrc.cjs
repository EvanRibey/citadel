module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:solid/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', '@stylistic', 'solid',],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'rules': {
    '@stylistic/indent': ['error', 2],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/jsx-indent': [2, 2],
  },
  'root': true,
};

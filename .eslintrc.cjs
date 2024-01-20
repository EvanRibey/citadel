module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:solid/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', '@stylistic', 'solid',],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
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

module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:solid/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
  ],
  'ignorePatterns': ['dist/**'],
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', '@stylistic', 'solid', 'no-relative-import-paths'],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'rules': {
    '@stylistic/arrow-parens': [2, 'as-needed', { 'requireForBlockBody': true }],
    '@stylistic/block-spacing': [2, 'always'],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/indent': ['error', 2],
    '@stylistic/jsx-indent': [2, 2],
    '@stylistic/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    '@stylistic/semi': ['error', 'always', { 'omitLastInOneLineBlock': true}],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-empty-function': ['error', { 'allow': ['arrowFunctions'] }],
    '@typescript-eslint/no-empty-function': ['error', { 'allow': ['arrowFunctions'] }],
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { 'allowSameFolder': true, 'rootDir': 'src', 'prefix': '@' },
    ],
  },
  'root': true,
};

module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: {
    commonjs: true,
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  parser: 'typescript-eslint-parser',
  plugins: ['typescript'],
  rules: {
    'typescript/no-unused-vars': 2
  }
};

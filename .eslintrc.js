module.exports = {
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {selector: 'classProperty', format: ['snake_case', 'camelCase']},
      {selector: 'variable', modifiers: ['const'], format: ['UPPER_CASE']},
    ],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/sort-type-constituents': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
  },
  extends: '@loopback/eslint-config',
};

import { Linter } from 'eslint';

require('@rushstack/eslint-patch/modern-module-resolution');

const config: Linter.Config = {
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.cts', '*.mts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array',
            readonly: 'array',
          },
        ],
        camelcase: 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
          },
          {
            selector: ['enum', 'enumMember'],
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: false,
            },
          },
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
          },
          {
            selector: 'parameter',
            modifiers: ['unused'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: 'variable',
            modifiers: ['global', 'const'],
            types: ['array', 'boolean', 'number', 'string'],
            format: ['UPPER_CASE'],
          },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
};

export = config;

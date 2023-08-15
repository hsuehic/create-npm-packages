/* eslint-disable @typescript-eslint/naming-convention */

import { Linter } from 'eslint';

require('@rushstack/eslint-patch/modern-module-resolution');

const config: Linter.Config = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },

    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true,
  },
  plugins: ['@typescript-eslint', 'cnp', 'import', 'json', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:cnp/recommended',
    'plugin:json/recommended-with-comments',
  ],

  overrides: [
    {
      files: ['*.ts?(x)'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
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

  rules: {
    'arrow-body-style': 'off',
    'max-lines': ['error', 520],
    'max-statements': ['error', 21],
    'no-await-in-loop': 'error',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        args: 'after-used',
      },
    ],
    'object-curly-spacing': 'off',
    'prefer-arrow-callback': 'error',
    'sort-imports': [
      'error',
      { ignoreDeclarationSort: true, ignoreMemberSort: false },
    ],
    'import/first': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react*/**',
            group: 'external',
            patternOptions: { partial: true, nocomment: true },
            position: 'before',
          },
          {
            pattern: './**/*.+(css|scss|less|sass|styl)',
            group: 'index',
            position: 'after',
            patternOptions: { nocomment: true },
          },
        ],
        distinctGroup: true,
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
          orderImportKind: 'asc',
        },
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import/no-unused-modules': 'error',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    camelcase: 'off',
  },
};

export = config;

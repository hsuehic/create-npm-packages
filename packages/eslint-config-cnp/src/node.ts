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

    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true,
  },
  plugins: ['cnp', 'import', 'json', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:cnp/recommended',
    'plugin:json/recommended-with-comments',
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

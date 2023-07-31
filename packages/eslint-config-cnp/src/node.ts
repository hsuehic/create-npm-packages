import { Linter } from 'eslint';

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
  plugins: ['cnp', 'import', 'json', 'prettier'],

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
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array',
            readonly: 'array',
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            args: 'after-used',
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
            pattern: '@shopee*/**',
            patternOptions: { partial: true, nocomment: true },
            group: 'external',
            position: 'after',
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
  },
};

export = config;

import { Linter } from 'eslint';

require('@rushstack/eslint-patch/modern-module-resolution');

const config: Linter.Config = {
  plugins: ['jsx-a11y', 'react', 'react-hooks'],
  overrides: [
    {
      files: ['*.jsx', '.tsx'],
      env: {
        browser: true,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      rules: {
        'react/jsx-no-bind': [
          'warn',
          {
            ignoreDOMComponents: false,
            ignoreRefs: false,
            allowArrowFunctions: false,
            allowFunctions: false,
            allowBind: false,
          },
        ],
        'react/prop-types': 'off',
      },
    },
  ],
};

export = config;

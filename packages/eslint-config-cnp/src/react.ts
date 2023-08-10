import { Linter } from 'eslint';

import nodeConfig from './node';

require('@rushstack/eslint-patch/modern-module-resolution');

const config: Linter.Config = {
  ...nodeConfig,
  root: true,
  env: {
    ...nodeConfig.env,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },

  extends: [
    ...(nodeConfig.extends as unknown as string[]),
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:css-modules/recommended',
  ],
  plugins: [
    ...(nodeConfig.plugins || []),
    'css-modules',
    'import',
    'jsx-a11y',
    'prettier',
    'react',
  ],

  overrides: [...(nodeConfig.overrides || [])],

  rules: {
    ...nodeConfig.rules,
    'cnp/no-console': 'error',
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
};

exports = config;

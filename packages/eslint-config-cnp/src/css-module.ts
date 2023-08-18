// Fix eslint shareable config (https://github.com/eslint/eslint/issues/3458)
import { Linter } from 'eslint';

require('@rushstack/eslint-patch/modern-module-resolution');

// We use eslint-loader so even warnings are very visible.
// This is why we prefer to use "WARNING" level for potential errors,
// and we try not to use "ERROR" level at all.

const config: Linter.Config = {
  plugins: ['css-modules'],
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      extends: ['plugin:css-modules/recommended'],
    },
  ],
};

export = config;

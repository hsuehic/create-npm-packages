import { Config } from 'stylelint';

const config: Config = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
    'stylelint-config-prettier-scss',
  ],
  rules: {
    'selector-class-pattern': null,
    'no-empty-source': null,
    'scss/at-mixin-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['global', 'local'],
      },
    ],
    'function-name-case': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
  },
};

export = config;

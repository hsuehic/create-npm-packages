/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable cnp/only-import-export */
import { Config } from 'stylelint';

const config: Config = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'selector-class-pattern': null,
    'no-empty-source': null,
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

/* eslint-disable @typescript-eslint/naming-convention */
import { Config } from 'stylelint';

const config: Config = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier-scss',
  ],
  rules: {
    'scss/at-mixin-pattern': null,
  },
};

export = config;

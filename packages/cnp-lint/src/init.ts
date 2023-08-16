#!/usr/bin/env node

import prompts, { PromptObject } from 'prompts';

import { initLints } from './api.js';
import {
  ESLINT_CONFIGS,
  EslintConfigKey,
  EslintConfigValue,
  LINT_TYPES,
  LintTypeKey,
  LintTypeValue,
  STYLELINT_CONFIGS,
  StylelintConfigKey,
  StylelintConfigValue,
} from './contant.js';

type PromptAnswerType = 'lintTypes' | 'eslintConfigs' | 'stylelintConfigs';

export interface LintOptions {
  lintTypes: LintTypeValue[];
  eslintConfigs: EslintConfigValue[];
  stylelintConfigs: StylelintConfigValue[];
}

//#region Inquire
const inquire = async (): Promise<LintOptions> => {
  const lintTypeChoices = Object.keys(LINT_TYPES).map(k => {
    const key = k as LintTypeKey;
    return {
      title: LINT_TYPES[key],
      value: LINT_TYPES[key],
    };
  });

  const eslintConfigChoices = Object.keys(ESLINT_CONFIGS).map(k => {
    const key = k as EslintConfigKey;
    return {
      title: ESLINT_CONFIGS[key],
      value: ESLINT_CONFIGS[key],
    };
  });

  const stylelintConfigChoices = Object.keys(STYLELINT_CONFIGS).map(k => {
    const key = k as StylelintConfigKey;
    return {
      title: STYLELINT_CONFIGS[key],
      value: STYLELINT_CONFIGS[key],
    };
  });
  const options: PromptObject<PromptAnswerType>[] = [
    {
      type: 'multiselect',
      name: 'lintTypes',
      message: "Select lints you'd like to set up",
      choices: lintTypeChoices,
    },
    {
      type: (_prev, answers) => {
        const lintTypes = answers.lintTypes as unknown as string[];
        return lintTypes.includes(LINT_TYPES.eslint) ? 'multiselect' : null;
      },
      name: 'eslintConfigs',
      message: "Select Stylelint configurations you'd like to add",
      choices: eslintConfigChoices,
    },
    {
      type: (_prev, answers) => {
        const lintTypes = answers.lintTypes as unknown as string[];
        return lintTypes.includes(LINT_TYPES.stylelint) ? 'multiselect' : null;
      },
      name: 'stylelintConfigs',
      message: "Select stylelint configurations you'd like to add",
      choices: stylelintConfigChoices,
    },
  ];

  const lintOptions = await prompts<PromptAnswerType>(options);
  const lintTypes = lintOptions.lintTypes as unknown as LintTypeValue[];
  return {
    lintTypes,
    eslintConfigs: lintOptions.eslintConfigs as unknown as EslintConfigValue[],
    stylelintConfigs:
      lintOptions.stylelintConfigs as unknown as StylelintConfigValue[],
  };
};
//#endregion

const lintOptions = await inquire();
await initLints(lintOptions);

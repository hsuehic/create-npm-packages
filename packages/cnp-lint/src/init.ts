#!/usr/bin/env node

import * as fs from 'node:fs';

import { program } from 'commander';
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
import { PACKAGE_VERSION } from './version.js';

type PromptAnswerType =
  | 'lintTypes'
  | 'eslintConfigs'
  | 'stylelintConfigs'
  | 'enableHuskyAndLintStaged';

export interface LintOptions {
  lintTypes: LintTypeValue[];
  eslintConfigs: EslintConfigValue[];
  stylelintConfigs: StylelintConfigValue[];
  enableHuskyAndLintStaged: boolean;
}

program.version(PACKAGE_VERSION, '-v, --version', 'output the current version');
program.parse();

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
    {
      type: 'toggle',
      name: 'enableHuskyAndLintStaged',
      message:
        'Enable husky and lintstaged(the command should be exected under the root of a git repo)',
      initial: false,
      active: 'yes',
      inactive: 'no',
    },
  ];

  const lintOptions = await prompts<PromptAnswerType>(options);
  const lintTypes = lintOptions.lintTypes as unknown as LintTypeValue[];
  return {
    lintTypes,
    eslintConfigs: lintOptions.eslintConfigs as unknown as EslintConfigValue[],
    stylelintConfigs:
      lintOptions.stylelintConfigs as unknown as StylelintConfigValue[],
    enableHuskyAndLintStaged:
      lintOptions.enableHuskyAndLintStaged as unknown as boolean,
  };
};

if (!fs.existsSync('package.json')) {
  console.log(
    'Please run this command under the root of the project where there is a "package.json"'
  );
  process.exit(1);
}

const lintOptions = await inquire();

await initLints(lintOptions);

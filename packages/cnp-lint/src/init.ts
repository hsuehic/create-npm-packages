#!/usr/bin/env node
/* eslint-disable no-irregular-whitespace */

import * as fs from 'node:fs/promises';

import {
  exec,
  getPackageJsonField,
  setPackageJsonField,
  setPackageJsonFields,
} from 'cnp-utils';
import prompts, { Answers, PromptObject } from 'prompts';

import {
  ESLINT_CONFIGS,
  ESLINT_CONFIG_PACKAGE,
  EslintConfigKey,
  EslintConfigValue,
  LINT_TYPES,
  LintTypeKey,
  LintTypeValue,
  STYLELINT_CONFIGS,
  STYLELINT_CONFIG_PACKAGE,
  StylelintConfigKey,
  StylelintConfigValue,
} from './contant.js';
import { getPackagePeerDependencies } from './dependence.js';

type PromptAnswerType = 'lintTypes' | 'eslintConfigs' | 'stylelintConfigs';

//#region User input
const init = async () => {
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

  if (lintTypes.includes(LINT_TYPES.eslint)) {
    await initEslint(lintOptions);
  }
  if (lintTypes.includes(LINT_TYPES.stylelint)) {
    await initStylelint(lintOptions);
  }
  if (lintTypes.includes(LINT_TYPES.npmPackageJsonLint)) {
    await initNpmPackageJsonLint();
  }

  if (lintTypes.includes(LINT_TYPES.markdownlint)) {
    await initMarkdownlint();
  }

  if (lintTypes.includes(LINT_TYPES.commitlint)) await initCommitLint();
  await initHuskyAndLintstaged(lintTypes);
};
//#endregion

const initHuskyAndLintstaged = async (lintTypes: LintTypeValue[]) => {
  const lintStagedTasks: string[] = [];
  if (lintTypes.includes(LINT_TYPES.eslint)) {
    lintStagedTasks.push(
      '  "*.{js,ts,jsx,tsx}": "eslint --cache --cache-location .eslintcache --fix"'
    );
  }
  if (lintTypes.includes(LINT_TYPES.stylelint)) {
    lintStagedTasks.push('  "*.{css,less,scss}": "stylelint --fix"');
  }
  if (lintTypes.includes(LINT_TYPES.npmPackageJsonLint)) {
    lintStagedTasks.push('  "package.json": "npmPkgJsonLint"');
  }
  if (lintTypes.includes(LINT_TYPES.markdownlint)) {
    lintStagedTasks.push(
      '  "*.md": ["markdownlint-cli2 --fix", "prettier --write"]'
    );
  }

  // init husky and lintstaged
  await exec`npm install husky -D`;
  await exec`npx husky install`;
  await exec`npm pkg set scripts.prepare="husky intall"`;
  if (lintTypes.includes(LINT_TYPES.commitlint)) {
    await exec`npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`;
  }
  await exec`npx husky add .husky/pre-commit 'npx lintstaged`;
  await fs.appendFile(
    '.lintstagedrc',
    `
{   
  ${lintStagedTasks.join(',\n')}
}
 `
  );
};

//#region  ESLint
const initEslint = async (lintOptions: Answers<PromptAnswerType>) => {
  // install dependencies
  const eslintConfigPeerDependencies = await getPackagePeerDependencies(
    ESLINT_CONFIG_PACKAGE
  );
  const promises = Object.keys(eslintConfigPeerDependencies).map(k => {
    return exec`npm add ${k}@${eslintConfigPeerDependencies[k]} -D`;
  });
  await Promise.all(promises);
  await exec`npm add ${ESLINT_CONFIG_PACKAGE} -D`;
  await createEslintConfig(
    lintOptions.eslintConfigs as unknown as EslintConfigValue[]
  );
  await setPackageJsonField('scripts.eslint', 'eslint .');
  await setPackageJsonField('scripts.eslint:fix', 'npm run eslint -- --fix');
};

const createEslintConfig = async (configs: EslintConfigValue[]) => {
  // init eslint configuration
  const isModule = (await getPackageJsonField('type')).trimEnd() === 'module';
  const fileName = isModule ? '.eslintrc.js' : '.eslintrc.cjs';
  const eslintConfigs = ["'cnp'"];
  configs.map(k => {
    eslintConfigs.push(`'cnp/${k}`);
    return k;
  });
  const content = `
module.exports = {
  root: true,
  extends: [${eslintConfigs.join(',')}],
  overrides: [
    {
      files: '*.ts?(x)',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};`;
  await fs.writeFile(fileName, content);
};
//#endregion

// #region stylelint
const initStylelint = async (lintOptions: Answers<PromptAnswerType>) => {
  const peerDependencies = await getPackagePeerDependencies(
    STYLELINT_CONFIG_PACKAGE
  );
  const promises = Object.keys(peerDependencies).map((pkg: string) => {
    return exec`npm -D add ${pkg}@${peerDependencies[pkg]}`;
  });
  await Promise.all(promises);
  await exec`npm -D addd ${STYLELINT_CONFIG_PACKAGE}`;
  const configs =
    lintOptions.stylelintConfigs as unknown as StylelintConfigValue[];
  await createStylelintConfig(configs);
  await setPackageJsonFields([
    {
      key: 'stylelint',
      value: 'stylelint "./src/**/*{.less,.scss,.css}"',
    },
    {
      key: 'stylelint:fix',
      value: 'npm run stylelint -- --fix',
    },
  ]);
};

const createStylelintConfig = async (configs: StylelintConfigValue[]) => {
  const isModule = (await getPackageJsonField('type')).trimEnd() === 'module';
  const fileName = isModule ? '.stylelintrc.js' : '.eslintrc.cjs';
  const stylelintConfigs = ["'stylelint-config-cnp'"];
  configs.map(k => {
    stylelintConfigs.push(`'stylelint-config-cnp/${k}`);
    return k;
  });
  const content = `
module.exports = {
  root: true,
  extends: [${stylelintConfigs.join(',')}],
};`;
  await fs.writeFile(fileName, content);
};
// #endregion

//#region  npmPackageJsonLint
const initNpmPackageJsonLint = async () => {
  await exec`npm -D add npm-package-json-lint-config-default npm-package-json-lint`;
  await fs.writeFile(
    '.npmpackagejsonlintrc.json',
    `{
    "extends": "npm-package-json-lint-config-default"
  }  
`
  );
  await setPackageJsonField('npmPkgJsonLint', 'npmPkgJsonLint .');
};
//#endregion

//#region CommitLint
const initCommitLint = async () => {
  await exec`npm -D -ws=false add @commitlint/cli @commitlint/config-conventional`;
  await fs.writeFile(
    '.commitlintrc.js',
    `module.exports = {
  extends: ['@commitlint/config-conventional'],
};
`
  );
};
//#endregion

//#region Markdownlint
const initMarkdownlint = async () => {
  await exec`npm -D add markdownlint-cli2 markdownlint-rule-search-replace`;
  await fs.writeFile(
    '.markdownlint-cli2.jsonc',
    `
// This file defines our configuration for Markdownlint. See
// https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md
// for more details on each rule.

{
  "config": {
    "default": true,
    // Disabled, as some callouts include headings.
    "header-increment": false,
    "ul-style": {
      "style": "dash"
    },
    "ul-indent": {
      "indent": 2
    },
    "no-hard-tabs": {
      "spaces_per_tab": 2
    },
    "line-length": false,
    "no-duplicate-header": {
      "allow_different_nesting": true
    },
    "single-title": {
      "front_matter_title": "^\\s*title\\s*[:=]"
    },
    "no-trailing-punctuation": {
      "punctuation": ".,;:"
    },
    // Consecutive Notes/Callouts currently don't conform with this rule
    "no-blanks-blockquote": false,
    // Force ordered numbering to catch accidental list ending from indenting
    "ol-prefix": {
      "style": "ordered"
    },
    "no-inline-html": {
      "allowed_elements": [
        "a",
        "abbr",
        "annotation",
        "br",
        "caption",
        "code",
        "col",
        "colgroup",
        "dd",
        "details",
        "div",
        "dl",
        "dt",
        "em",
        "h4",
        "h5",
        "img",
        "kbd",
        "li",
        "math",
        "menclose",
        "mfenced",
        "mfrac",
        "mfrac",
        "mi",
        "mmultiscripts",
        "mn",
        "mo",
        "mover",
        "mphantom",
        "mprescripts",
        "mroot",
        "mrow",
        "ms",
        "mspace",
        "mspace",
        "msqrt",
        "mstyle",
        "msub",
        "msubsup",
        "msup",
        "mtable",
        "mtd",
        "mtext",
        "mtr",
        "munder",
        "munderover",
        "none",
        "ol",
        "p",
        "pre",
        "q",
        "section",
        "semantics",
        "strong",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "tfoot",
        "th",
        "thead",
        "tr",
        "ul",
        "var"
      ]
    },
    "no-bare-urls": false,
    // Produces too many false positives
    "no-space-in-emphasis": false,
    "fenced-code-language": true,
    // See https://github.com/mdn/content/pull/20026, as macros currently break this
    "no-empty-links": false,
    "code-block-style": {
      "style": "fenced"
    },
    "emphasis-style": {
      "style": "underscore"
    },
    "strong-style": {
      "style": "asterisk"
    },
    // Disabled, as yari generates link fragments by replacing spaces with underscores, not dashes.
    "link-fragments": false,

    // https://github.com/OnkarRuikar/markdownlint-rule-search-replace
    "search-replace": {
      "rules": [
        {
          "name": "curly-double-quotes",
          "message": "Don't use curly double quotes",
          "searchPattern": "/“|”/g",
          "replace": "\\"",
          "searchScope": "text"
        },
        {
          "name": "curly-single-quotes",
          "message": "Don't use curly single quotes",
          "searchPattern": "/‘|’/g",
          "replace": "'",
          "searchScope": "text"
        },
        {
          "name": "nbsp",
          "message": "Don't use no-break spaces",
          "searchPattern": "/ /g",
          "replace": " ",
          "searchScope": "all"
        },
        {
          "name": "m-dash",
          "message": "Don't use '--'. Use m-dash — instead",
          "search": " -- ",
          "replace": " — ",
          "searchScope": "text"
        },
        {
          "name": "trailing-spaces",
          "message": "Avoid trailing spaces",
          "searchPattern": "/  +$/gm",
          "replace": "",
          "searchScope": "all"
        },
        {
          "name": "double-spaces",
          "message": "Avoid double spaces",
          "searchPattern": "/([^\\s>])  ([^\\s|])/g",
          "replace": "$1 $2",
          "searchScope": "text"
        },
        {
          "name": "stuck-definition",
          "message": "Character is stuck to definition description marker",
          "searchPattern": "/- :(\\w)/g",
          "replace": "- : $1",
          "searchScope": "text"
        },
        {
          "name": "incorrect-spelling",
          "message": "Incorrect spelling",
          "searchPattern": ["/e-mail/ig", "/(w)eb site/ig"],
          "replace": ["email", "$1ebsite"],
          "searchScope": "all"
        },
        {
          "name": "localhost-links",
          "message": "Don't use localhost for links",
          "searchPattern": "/\\]\\(https?:\\/\\/localhost:\\d+\\//g",
          "replace": "](/",
          "searchScope": "text"
        }
      ]
    }
  },
  "customRules": ["markdownlint-rule-search-replace"],
  "ignores": ["node_modules", ".git", ".github", "tests"]
}
`
  );
};
//#endregion

await init();

import fs from 'fs';
import path from 'path';
import { pluginId } from './lib/plugin-id';
(() => {
  const ruleId = process.argv[2];

  // Require rule ID.
  if (!ruleId) {
    console.error('Usage: npm run add-rule <RULE_ID>');
    process.exitCode = 1;
    return;
  }

  const docPath = path.resolve(__dirname, '../docs/rules', `${ruleId}.md`);
  const rulePath = path.resolve(__dirname, '../src/rules', `${ruleId}.ts`);
  const testPath = path.resolve(__dirname, '../tests/rules', `${ruleId}.ts`);

  // Overwrite check.
  for (const filePath of [docPath, rulePath, testPath]) {
    if (fs.existsSync(filePath)) {
      console.error(
        '%o has existed already.',
        path.relative(process.cwd(), filePath)
      );
      process.exitCode = 1;
      return;
    }
  }

  // Generate files.
  fs.writeFileSync(
    docPath,
    `<!--header-->
# ${pluginId}/${ruleId}

> (TODO: summary)
<!--header-->

(TODO: why is this rule useful?)

## Rule Details

(TODO: how does this rule check code?)

## Options

(TODO: what do options exist?)
`
  );

  fs.writeFileSync(
    rulePath,
    `import { TSESLint } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'${ruleId}', []> = {
  meta: {
    docs: {
      // TODO: write the rule summary.
      description: '',

      // TODO: choose the rule category.
      category: 'Possible Errors',
      category: 'Best Practices',
      category: 'Stylistic Issues',

      recommended: false,
      url: '',
    },

    fixable: null,
    messages: {
      '${ruleId}': '',
    },
    schema: [],

    // TODO: choose the rule type.
    type: 'problem',
    type: 'suggestion',
    type: 'layout',
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    return {};
  },
};

export = rule;
`
  );

  fs.writeFileSync(
    testPath,
    `
import { TSESLint } from '@typescript-eslint/utils';
import rule from '../../src/rules/${ruleId}';

export const cases = {
  valid: [],
  invalid: [],
} as const satisfies TSESLint.RunTests<'${ruleId}', []>;

new TSESLint.RuleTester().run('${ruleId}', rule, cases);
`
  );
})();

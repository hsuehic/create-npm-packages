import { TSESLint } from '@typescript-eslint/utils';
import rule from '../../src/rules/define-type';

export const cases = {
  valid: ['const foo: number = 1;', 'let foo: number;'],
  invalid: [
    {
      code: 'const foo = 1;',
      errors: [{ messageId: 'define-type' }],
    },
    {
      code: 'let foo;',
      errors: [{ messageId: 'define-type' }],
    },
  ],
} as const satisfies TSESLint.RunTests<'define-type', []>;

new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
}).run('define-type', rule, cases);

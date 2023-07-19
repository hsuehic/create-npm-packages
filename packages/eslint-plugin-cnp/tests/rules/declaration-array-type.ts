import { TSESLint } from '@typescript-eslint/utils';
import rule from '../../src/rules/declaration-array-type';

export const cases = {
  valid: [
    'let a: number[] = [];',
    'let a = Array<number>();',
    'let a = Array<number>(5);',
    'let a = new Array<number>();',
    'let a = new Array<number>(5);',
  ],
  invalid: [
    { code: 'let a = [];', errors: [{ messageId: 'declaration-array-type' }] },
    {
      code: 'let a = Array();',
      errors: [{ messageId: 'declaration-array-type' }],
    },
    {
      code: 'let a = Array(5);',
      errors: [{ messageId: 'declaration-array-type' }],
    },
    {
      code: 'let a = new Array();',
      errors: [{ messageId: 'declaration-array-type' }],
    },
    {
      code: 'let a = []; let b = new Array(5); let c = new Array(5); let d = new Array<number>(5);',
      errors: [
        { messageId: 'declaration-array-type' },
        { messageId: 'declaration-array-type' },
        { messageId: 'declaration-array-type' },
      ],
    },
  ],
} as const satisfies TSESLint.RunTests<'declaration-array-type', []>;

new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
}).run('declaration-array-type', rule, cases);

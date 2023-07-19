import { TSESLint } from '@typescript-eslint/utils';
import rule from '../../src/rules/no-console';

interface Options {
  allowMethods: string[];
}

const options: Options[] = [{ allowMethods: [] }];

export const cases = {
  valid: [
    {
      code: 'count(1);',
      options,
    },
    {
      code: 'console.count(3);',
      options: [
        {
          allowMethods: ['count'] as string[],
        },
      ],
    },
    'error(1);',
    'info(1)',
    'log(1);',
    'profile(1);',
    'time(1);',
    'timeEnd(1);',
    'timeStart(1);',
  ],
  invalid: [
    {
      code: 'console.count(1);',
      errors: [{ messageId: 'no-console', data: { method: 'count' } }],
      options,
      output: '',
    },
    {
      code: 'console.error(1);',
      errors: [{ messageId: 'no-console', data: { method: 'error' } }],
      options,
      output: '',
    },
    {
      code: 'console.info(1);',
      errors: [{ messageId: 'no-console', data: { method: 'info' } }],
      options,
      output: '',
    },
    {
      code: 'console.profile(1);',
      errors: [{ messageId: 'no-console', data: { method: 'profile' } }],
      options,
      output: '',
    },
    {
      code: 'console.time(1);',
      errors: [{ messageId: 'no-console', data: { method: 'time' } }],
      options,
      output: '',
    },
    {
      code: 'console.timeEnd(1);',
      errors: [{ messageId: 'no-console', data: { method: 'timeEnd' } }],
      options,
      output: '',
    },
    {
      code: 'console.timeStart(1);',
      errors: [{ messageId: 'no-console', data: { method: 'timeStart' } }],
      options,
      output: '',
    },
  ],
} as const satisfies TSESLint.RunTests<'no-console', Options[]>;

new TSESLint.RuleTester().run<'no-console', Options[]>(
  'no-console',
  rule,
  cases
);

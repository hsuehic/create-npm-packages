import { TSESLint } from '@typescript-eslint/utils';

import rule from '../../src/rules/only-import-export';

export const cases = {
  valid: [
    {
      code: "import { Sidebar } from './sidebar';\
             export { Sidebar }",
      filename: 'index.js',
    },
    {
      code: "import { Sidebar } from './sidebar';\
             export { Sidebar }",
      filename: 'index.ts',
    },
    {
      code: "import { Sidebar } from './sidebar';\
             export default Sidebar",
      filename: 'index.js',
    },
    {
      code: "import Sidebar from './sidebar';",
      filename: 'index.js',
    },
    {
      code: "export * from './sidebar';",
      filename: 'index.js',
    },
  ],
  invalid: [
    {
      code: "import { Sidebar } from './sidebar';\
              const count = 0;",
      filename: 'index.js',
      errors: [
        {
          messageId: 'only-import-export',
          data: { baseName: 'index.js' },
        },
      ],
    },
    {
      code: "import { Sidebar } from './sidebar';\
              export const count = 0;",
      filename: 'index.js',
      errors: [
        {
          messageId: 'only-import-export',
          data: { baseName: 'index.js' },
        },
      ],
    },
    {
      code: "import { Sidebar } from './sidebar';\
              export function Page() {}",
      filename: '/src/pages/catalog/index.ts',
      errors: [
        {
          messageId: 'only-import-export',
          data: { baseName: 'index.ts' },
        },
      ],
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    {
      code: 'export default function() {}',
      filename: 'index.ts',
      errors: [
        {
          messageId: 'only-import-export',
          data: { baseName: 'index.ts' },
        },
      ],
    },
    {
      code: 'export const Component = () => <div />;',
      filename: 'index.js',
      errors: [
        {
          messageId: 'only-import-export',
          data: { baseName: 'index.js' },
        },
      ],
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  ],
} as const satisfies TSESLint.RunTests<'only-import-export', []>;

new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
}).run('only-import-export', rule, cases);

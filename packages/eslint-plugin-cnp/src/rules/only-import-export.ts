import * as path from 'path';

import { TSESLint, TSESTree } from '@typescript-eslint/utils';

function allowed(node: TSESTree.ProgramStatement): boolean {
  const { type } = node;
  if (
    type === TSESTree.AST_NODE_TYPES.ImportDeclaration ||
    type === TSESTree.AST_NODE_TYPES.ExportAllDeclaration
  ) {
    return true;
  }
  if (type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration) {
    const { declaration } = node;
    return declaration.type === TSESTree.AST_NODE_TYPES.Identifier;
  }
  if (type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration) {
    const { declaration } = node;
    return declaration === null;
  }
  return false;
}

const rule: TSESLint.RuleModule<'only-import-export' | 'suggestion', []> = {
  meta: {
    docs: {
      description: 'Allow only import and export statements in index files',

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      category: 'Best Practices',

      recommended: 'warn',
      url: 'https://git.garena.com/shopee/promotion/promotion-fe/technique-proposal/promotion-fe-lint/-/blob/master/packages/eslint-plugin-sppt/docs/rules/only-import-export.md',
    },

    fixable: undefined,

    messages: {
      'only-import-export':
        'Only import and export statements are allowed in {{ baseName }} files.',
      suggestion:
        'Rename {{ baseName }} or move irrelevant code to another file.',
    },
    hasSuggestions: true,
    schema: [],

    type: 'suggestion',
  },
  create(context) {
    return {
      Program: function (node): void {
        const { body } = node;
        const filename = context.getFilename();
        const parsedPath = path.parse(filename);
        const index = parsedPath.name === 'index';

        if (index) {
          for (let i = 0; i < body.length; i++) {
            const node = body[i];
            if (!allowed(node)) {
              context.report({
                node: node,
                messageId: 'only-import-export',
                data: { baseName: parsedPath.base },
              });
            }
          }
        }
      },
    };
  },
};

export = rule;

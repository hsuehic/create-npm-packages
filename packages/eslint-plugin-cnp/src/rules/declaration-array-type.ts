import { TSESLint, TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'declaration-array-type', []> = {
  meta: {
    docs: {
      // TODO: write the rule summary.
      description:
        'Add explicit type declarations for array variables whose type can not be inferred',

      // TODO: choose the rule category.
      // @ts-expect-error
      category: 'Best Practices',

      recommended: 'error',
      url: 'https://github.com/hsuehic/eslint-plugin-sppt/blob/main/docs/rules/declaration-array-type.md',
    },

    fixable: undefined,
    messages: {
      'declaration-array-type':
        'Add explicit type declarations for array variables whose type can not be inferred',
    },
    schema: [],

    // TODO: choose the rule type.
    type: 'suggestion',
  },
  create(context) {
    // const source = context.getSourceCode();

    return {
      VariableDeclarator(node: TSESTree.VariableDeclarator): void {
        if (node.id.typeAnnotation) {
          return;
        }
        try {
          // let a = [];
          if (
            node.init?.type === AST_NODE_TYPES.ArrayExpression ||
            node.init?.type === AST_NODE_TYPES.ArrayPattern
          ) {
            if (node.init.elements.length === 0) {
              context.report({
                node,
                messageId: 'declaration-array-type',
              });
            }
          }

          // let a = Array(5);
          // let a = new Array(6);
          if (
            node.init?.type === AST_NODE_TYPES.CallExpression ||
            node.init?.type === AST_NODE_TYPES.NewExpression
          ) {
            // const s = source.getText(node.init);
            if (
              node.init.callee.type === AST_NODE_TYPES.Identifier &&
              node.init.callee.name === 'Array'
            ) {
              if (!node.init.typeParameters) {
                context.report({
                  node,
                  messageId: 'declaration-array-type',
                });
              }
            }
          }
        } catch (ex) {
          console.error(ex);
        }
      },
    };
  },
};

export = rule;

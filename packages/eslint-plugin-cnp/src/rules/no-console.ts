import { AST_NODE_TYPES, TSESLint } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';
export interface Options {
  allowMethods: string[];
}

const rule: TSESLint.RuleModule<'no-console', []> = {
  meta: {
    docs: {
      description: 'Disallow console expressions',

      // @ts-expect-error
      category: 'Best Practices',

      recommended: 'error',
      url: 'https://git.garena.com/shopee/promotion/promotion-fe/technique-proposal/promotion-fe-lint/-/blob/master/packages/eslint-plugin-sppt/docs/rules/no-console.md',
    },

    fixable: 'code',
    messages: {
      'no-console': 'No console.{{method}} expressions are allowed',
    },
    schema: {
      prefixItems: [
        {
          properties: {
            allowMethods: {
              type: 'array',
              description: 'Allow console methods',
              prefixItems: {
                type: 'string',
                description: 'Method name',
              },
            },
          },
          type: 'object',
        },
      ],
      type: 'array',
    },
    defaultOptions: [
      {
        allowMethods: [],
      },
    ],
    type: 'suggestion',
  },
  create(context: Readonly<RuleContext<'no-console', Options[]>>) {
    const sourceCode = context.getSourceCode();
    const opt = context.options[0] || { allowMethods: [] };
    const { allowMethods } = opt;
    return {
      ExpressionStatement(node) {
        if (node.expression.type === AST_NODE_TYPES.CallExpression) {
          if (node.expression.callee.type === AST_NODE_TYPES.MemberExpression) {
            if (
              sourceCode.getText(node.expression.callee.object) === 'console'
            ) {
              const method = sourceCode.getText(
                node.expression.callee.property
              );
              if (!allowMethods.includes(method)) {
                context.report({
                  node,
                  messageId: 'no-console',
                  data: {
                    method,
                  },
                  fix(fixer) {
                    return fixer.remove(node);
                  },
                });
              }
            }
          }
        }
      },
    };
  },
};

export default rule;

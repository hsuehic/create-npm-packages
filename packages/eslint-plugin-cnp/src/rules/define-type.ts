import { TSESLint, TSESTree } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'define-type', []> = {
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Enforce type anotation for array declaration.',
      suggestion: true,
      recommended: false,
      url: 'https://github.com/hsuehic/eslint-plugin-sppt/blob/main/docs/rules/define-type.md',
    },
    messages: {
      'define-type': 'Add type annotation for declaration.',
    },
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    return {
      VariableDeclarator(node: TSESTree.VariableDeclarator): void {
        if (node.id.typeAnnotation) {
          return;
        }
        context.report({
          node,
          messageId: 'define-type',
        });
      },
    };
  },
};

export = rule;

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { messageId } from './message-id.const';
import { noObjectLiterals } from './no-object-literals.const';

function fileName(): string {
  return __filename;
}

export default ESLintUtils.RuleCreator(fileName)({
  name: noObjectLiterals,
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow object literals except in constructors',
    },
    messages: {
      [messageId]: 'Object literals are not allowed. Use a class instead.',
    },
    schema: [],
  },
  create: function create(context) {
    return {
      ObjectExpression(node: TSESTree.ObjectExpression) {
        const parent = node.parent;

        // Allow object literals in constructor calls
        if (
          parent?.type === 'NewExpression' &&
          parent.arguments.includes(node)
        ) {
          return;
        }

        // Report all other object literals
        context.report({
          node,
          messageId,
        });
      },
    };
  },
});

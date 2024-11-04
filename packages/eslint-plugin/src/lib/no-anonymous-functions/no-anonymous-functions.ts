import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { messageId } from './message-id.const';
import { noAnonymousFunctions } from './no-anonymous-functions.const';

function fileName(): string {
  return __filename;
}

export default ESLintUtils.RuleCreator(fileName)({
  name: noAnonymousFunctions,
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensures only named functions are used.',
    },
    schema: [],
    messages: {
      [messageId]:
        'All functions should be named so they can be seen in debug tools.',
    },
  },
  defaultOptions: [],
  create: function create(context) {
    return {
      FunctionExpression: function functionExpression(
        node: TSESTree.FunctionExpression
      ) {
        // Allow class methods to be anonymous
        if (!node.id && node.parent?.type !== 'MethodDefinition') {
          context.report({
            node,
            messageId,
          });
        }
      },
      ArrowFunctionExpression: function arrowFunctionExpression(
        node: TSESTree.ArrowFunctionExpression
      ) {
        // Allow arrow functions in class methods
        if (node.parent?.type !== 'MethodDefinition') {
          context.report({
            node,
            messageId,
          });
        }
      },
    };
  },
});

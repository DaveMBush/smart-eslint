import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { messageId } from './message-id.const';
import { noAnonymousFunctions } from './no-anonymous-functions.const';

export default ESLintUtils.RuleCreator(() => __filename)({
  name: noAnonymousFunctions,
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensures only named functions are used.',
    },
    schema: [],
    messages: {
      [messageId]: 'All functions should be named so they can be seen in debug tools.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      FunctionExpression(node: TSESTree.FunctionExpression) {
        if (!node.id) {
          context.report({
            node,
            messageId,
          });
        }
      },
      ArrowFunctionExpression(node: TSESTree.ArrowFunctionExpression) {
        context.report({
          node,
          messageId,
        });
      },
    };
  },
});

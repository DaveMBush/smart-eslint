import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

export const RULE_NAME = 'no-anonymous-functions';
export const messageId = 'anonymousFunctionsNotAllowed';
export default ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensures only named functions are used.',
    },
    schema: [],
    messages: {
      [messageId]: 'Ensures that all functions are named.',
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

/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

export const RULE_NAME = 'one-exported-item-per-file';
export const messageId = 'expectedOneExportedItemPerFile';
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure only one exported item per file.',
    },
    schema: [],
    messages: {
      [messageId]: 'Expected only one exported item per file.',
    },
  },
  defaultOptions: [],
  create(context) {
    let exportCount = 0;

    return {
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration) {
        if (node.declaration) {
          exportCount += 1;
        } else {
          exportCount += node.specifiers.length;
        }
        if (exportCount > 1) {
          context.report({
            node,
            messageId,
          });
        }
      },
      ExportDefaultDeclaration(node: TSESTree.ExportDefaultDeclaration) {
        exportCount += 1;
        if (exportCount > 1) {
          context.report({
            node,
            messageId,
          });
        }
      },
    };
  },
});

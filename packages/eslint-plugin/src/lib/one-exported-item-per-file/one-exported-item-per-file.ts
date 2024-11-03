import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { messageId } from './message-id.const';
import { oneExportedItemPerFile } from './one-exported-item-per-file.const';

function fileName(): string {
  return __filename;
}

export default ESLintUtils.RuleCreator(fileName)({
  name: oneExportedItemPerFile,
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
  create: function create(context) {
    let exportCount = 0;

    return {
      ExportNamedDeclaration: function exportNamedDeclaration(node: TSESTree.ExportNamedDeclaration) {
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
      ExportDefaultDeclaration: function exportDefaultDeclaration(node: TSESTree.ExportDefaultDeclaration) {
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

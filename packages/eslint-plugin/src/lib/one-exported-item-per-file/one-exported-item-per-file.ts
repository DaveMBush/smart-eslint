import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { messageId } from './message-id.const';
import { oneExportedItemPerFile } from './one-exported-item-per-file.const';

function getFileName(): string {
  return __filename;
}

export default ESLintUtils.RuleCreator(getFileName)({
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

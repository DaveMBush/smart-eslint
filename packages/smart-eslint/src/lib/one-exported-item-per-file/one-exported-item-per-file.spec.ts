import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME, messageId } from './one-exported-item-per-file';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/test-utils';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `export const example = true;`,
    `const example = true;`,
    `const example = true;
     export { example };`,
    `export default function example() {}`,
    `// No exports in this file`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Two individually exported items',
      annotatedSource: `
export const example = true;
export const example2 = true;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Two bundled exported items',
      annotatedSource: `
const example = true;
const example2 = true;
export { example, example2 };
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Default and named export',
      annotatedSource: `
export default function example() {}
export const example2 = true;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Re-exporting items',
      annotatedSource: `
export { example } from './another-file';
export { example2 } from './another-file2';
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
  ],
});

import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/test-utils';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { messageId } from './message-id.const';
import rule from './no-object-literals';
import { noObjectLiterals } from './no-object-literals.const';

const ruleTester = new RuleTester();

ruleTester.run(noObjectLiterals, rule, {
  valid: [
    // Allow object literals in constructor calls
    `new MyClass({ prop: 'value' })`,

    // Allow class usage
    `class MyClass {
      method() {}
    }`,

    // Allow object destructuring
    `const { prop } = someObject`,

    // Allow object property access
    `const value = object.property`,

    // Allow empty object in constructor
    `new MyClass({})`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Simple object literal',
      annotatedSource: `
const config = { prop: 'value' };
               ~~~~~~~~~~~~~~~~~
`,
    }),

    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Object literal in function argument',
      annotatedSource: `
function process(data) {
  return someFunction({ prop: data });
                      ~~~~~~~~~~~~~~
}
`,
    }),

    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Object literal in variable declaration with methods',
      annotatedSource: `
const handler = { handle() {}, process() {} };
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),

    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Object literal as return value',
      annotatedSource: `
return { data: 'value' };
       ~~~~~~~~~~~~~~~~~`,
    }),
  ],
});

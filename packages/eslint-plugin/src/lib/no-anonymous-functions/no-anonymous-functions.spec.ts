import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/test-utils';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { messageId } from './message-id.const';
import rule from './no-anonymous-functions';
import { noAnonymousFunctions } from './no-anonymous-functions.const';

const ruleTester = new RuleTester();

ruleTester.run(noAnonymousFunctions, rule, {
  valid: [
    `function example() {}`,
    `export function example() {}`,
    `const namedFunctionExpression = function named() { return true; };`,
    `class Example {
      method() {
        return true;
      }
    }`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid even though it is assigned to a named variable',
      annotatedSource: `
const example = () => {};
                ~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid used as a callback',
      annotatedSource: `
setTimeout(() => foo(), 1000);
           ~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid because it is anonymous but not fat arrow',
      annotatedSource: `
setTimeout(function(){ foo(); }, 1000);
           ~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid because it is anonymous but assigned to a variable',
      annotatedSource: `
const foo = function(){ foo(); };
            ~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid anonymous function in object method',
      annotatedSource: `
const obj = {
  method: function() { return true; }
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~
};
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid anonymous function in array method',
      annotatedSource: `
[1, 2, 3].map(function(num) { return num * 2; });
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid anonymous function in event listener',
      annotatedSource: `
document.addEventListener('click', function() { console.log('clicked'); });
                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid anonymous function in IIFE',
      annotatedSource: `
(function() { console.log('IIFE'); })();
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid fat arrow function in object method',
      annotatedSource: `
const obj = {
  method: () => { return true; }
          ~~~~~~~~~~~~~~~~~~~~~~
};
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid fat arrow function in array method',
      annotatedSource: `
[1, 2, 3].map(num => num * 2);
              ~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid fat arrow function in event listener',
      annotatedSource: `
document.addEventListener('click', () => { console.log('clicked'); });
                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'Invalid fat arrow function in IIFE',
      annotatedSource: `
(() => { console.log('IIFE'); })();
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`,
    }),
  ],
});

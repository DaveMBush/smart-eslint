const nx = require('@nx/eslint-plugin');
const jsdoc = require('eslint-plugin-jsdoc');
const sonarjs = require('eslint-plugin-sonarjs');
const importPlugin = require('eslint-plugin-import');
const angularEslintPlugin = require('@angular-eslint/eslint-plugin');
const comments = require('eslint-plugin-eslint-comments');
const unusedImports = require('eslint-plugin-unused-imports');
const maxParamsNoConstructor = require('eslint-plugin-max-params-no-constructor');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-config-prettier');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

const eslintConfig = async () => {
  const { default: stylisticJs } = await import('@stylistic/eslint-plugin-js');
  const { default: unicorn } = await import('eslint-plugin-unicorn');
  return [
    sonarjs.configs.recommended,
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
      files: ['**/*'],
      plugins: {
        jsdoc,
        importPlugin,
        angularEslintPlugin,
        comments,
        unicorn,
        unusedImports,
        maxParamsNoConstructor,
        jest,
        prettier,
        simpleImportSort,
        stylisticJs,
        typescriptEslintPlugin,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: __dirname,
        },
      },
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      // Override or add rules here
      rules: {
        'simpleImportSort/imports': [
          'error',
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // 3rd party Packages.
              ['^@?\\w'],
              // Internal packages.
              ['^(@smart)(/.*|$)'],
              // Absolute imports and other imports such as Vue-style `@/foo`.
              ['^'],
              // Relative imports.
              // Anything that starts with a dot.
              ['^\\.'],
            ],
          },
        ],
        'simpleImportSort/exports': 'error',
      },
    },
    {
      files: ['**/*.ts'],
      rules: {
        // Standard ESLint Rules
        complexity: [
          'error',
          {
            max: 10,
          },
        ],
        //// Make sure that any constructors in a class that extends another
        //// class calls super()
        'constructor-super': 'error',
        curly: 'error',
        'default-case': 'error',
        'comments/require-description': 'error',
        'comments/no-restricted-disable': [
          'error',
          'eslint-comments/no-restricted-disable', // prevent from disabling THIS rule
          '@nx/enforce-module-boundaries',
          'no-console', // don"t checkin with console.  Use debugging API
          // // Strong typing issues
          'typescriptEslintPlugin/explicit-function-return-type',
          'typescriptEslintPlugin/explicit-module-boundary-types',
          'typescriptEslintPlugin/no-unsafe-argument',
          'typescriptEslintPlugin/no-unsafe-assignment',
          'typescriptEslintPlugin/no-unsafe-call',
          'typescriptEslintPlugin/no-unsafe-member-access',
          'typescriptEslintPlugin/no-unsafe-return',
          // the following enforce single responsibility principle
          'complexity',
          'max-depth', // also for code clarity
          'max-lines',
          'max-lines-per-function',
          'max-classes-per-file',
          'max-statements',
          'max-statements-per-line',
          'max-nested-callbacks', // also for clarity.
        ],
        eqeqeq: ['error', 'always'],
        'guard-for-in': 'error',
        'id-blacklist': [
          'warn',
          'any',
          'Number',
          'number',
          'String',
          'string',
          'Boolean',
          'boolean',
          'Undefined',
          'undefined',
        ],
        'id-match': 'off',
        //// Each file should do one, and only one, thing.
        //// Generally we want one export per file. This is
        //// a step in that direction.
        'max-classes-per-file': ['error', 1],
        //// Nesting deeper than 2 levels increases cognitive complexity
        //// and leads to bugs. Often, you can flip your conditions, return
        //// immediately and still have essentially the same code without
        //// the nesting issues. Other times, you can combine conditions
        //// to reduce nesting.
        'max-depth': [
          'error',
          {
            max: 2,
          },
        ],
        //// The statistical optimal number of lines of code per file is between
        //// 200 and 400 (possibly 500) with 300 being the sweet spot. See link.
        //// https://web.archive.org/web/20160725154648/http://www.mind2b.com/component/content/article/24-software-module-size-and-file-size
        'max-lines': [
          'error',
          {
            max: 300,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        //// Any function/method that has more than 50 executable lines is
        //// doing too much.
        'max-lines-per-function': [
          'error',
          {
            max: 50,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        //// Nesting of any sort is asking for bugs.
        'max-nested-callbacks': [
          'error',
          {
            max: 2,
          },
        ],
        'max-statements': ['error', 50],
        'max-statements-per-line': [
          'error',
          {
            max: 1,
          },
        ],
        'no-bitwise': 'error',
        'no-caller': 'error',
        //// don"t declare variables inside a case statement
        'no-case-declarations': 'error',
        //// use devConsoleLogger from @cu/core-logging instead,
        //// more info https://staging.clickup.com/333/v/dc/ad-34192/ad-857176
        'no-console': 'error',
        //// don"t allow constants in conditions ie, if(false) {}
        //// also catches if(v = "abc") {} when you meant if(v === "abc") {}
        'no-constant-condition': 'error',
        //// If you are going to return as part of the else, there is
        //// no need for the else.
        'no-else-return': [
          'error',
          {
            allowElseIf: false,
          },
        ],
        //// There is no reason for empty blocks of code
        'no-empty': 'error',
        //// There are multiple ways of eval()ing code, which is a security
        //// issue.  This makes sure we don"t use them.
        'no-eval': 'error',
        //// Where casting code to a boolean will already happen implicitly
        //// there is no good reason to force the cast ourselves.
        'no-extra-boolean-cast': 'error',
        //// Catches hidden whitespace issues
        'no-irregular-whitespace': 'error',
        //// Disallows calling some Object.prototype methods directly on objects.
        'no-prototype-builtins': 'error',
        'no-new-wrappers': 'error',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'ngx-bootstrap',
                message: 'Please use deep imports from ngx-bootstrap instead.',
              },
              {
                name: 'ngx-bootstrap/public_api',
                message: 'Please use deep imports from ngx-bootstrap instead.',
              },
              {
                name: 'moment',
                message: 'Please use moment-timezone instead.',
              },
              {
                name: '@angular/compiler',
                message:
                  'You should never need to import anything from this package',
              },
              {
                name: 'jest-preset-angular',
                message: 'Please use jest-preset-angular/setup-jest instead.',
              },
              {
                name: 'lodash',
                message: "Please don't use any form of lodash",
              },
              {
                name: 'lodash-es',
                message: "Please don't use any form of lodash",
              },
            ],
          },
        ],
        // NOTE: These rules are turned off for spec files (below).
        'no-restricted-syntax': [
          'error',
          {
            // these were added because there is no easy way to fix (so not worth writing a rule)
            // and lastValueFrom and firstValueFrom are not part of the ngrx/no-to-promise rule
            // as for WHY they were added see ngrx/no-to-promise
            selector:
              'NewExpression Identifier[name="Promise"], CallExpression Identifier[name="firstValueFrom"], CallExpression Identifier[name="lastValueFrom"]',
            message: 'Prefer Observables over of Promises',
          },
        ],
        //// Off because the typescript rule does this instead
        'no-shadow': 'off',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        //// prevent leading and trailing underscore in variable names
        'no-underscore-dangle': 'error',
        //// make sure all code can be executed
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        //// use typescriptEslintPlugin rule instead
        'no-unused-vars': 'off',
        //// fixup strings
        'no-useless-escape': 'error',
        'object-shorthand': 'error',
        'prefer-rest-params': 'error',
        //// This rule is aimed to flag usage of Function.prototype.apply()
        //// in situations where spread syntax could be used instead
        'prefer-spread': 'error',
        'prefer-arrow-callback': 'error',
        radix: 'error',
        // Typescript Rules
        'typescriptEslintPlugin/await-thenable': 'error',
        'typescriptEslintPlugin/adjacent-overload-signatures': 'error',
        'typescriptEslintPlugin/ban-ts-comment': 'error',
        'typescriptEslintPlugin/ban-tslint-comment': 'error',
        'typescriptEslintPlugin/no-empty-object-type': 'error',
        'typescriptEslintPlugin/no-unsafe-function-type': 'error',
        'typescriptEslintPlugin/no-wrapper-object-types': 'error',
        //// off because of prettier
        'typescriptEslintPlugin/brace-style': 'off',
        'typescriptEslintPlugin/consistent-indexed-object-style': 'error',
        'typescriptEslintPlugin/consistent-type-assertions': 'error',
        'typescriptEslintPlugin/consistent-type-definitions': 'error',
        //// Yes, this messes with old style reducers but if you
        //// move to new style reducers you will no longer have
        //// an issue following this standard.
        'typescriptEslintPlugin/default-param-last': 'error',
        //// prevents the use of index notation to go after
        //// a field/method of an object
        'typescriptEslintPlugin/dot-notation': [
          'error',
          {
            allowIndexSignaturePropertyAccess: true,
          },
        ],
        //// Explicit types for function return values makes
        //// it clear to any calling code what type is returned.
        //// Further it prevents accidentally returning multiple
        //// types.
        'typescriptEslintPlugin/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
          },
        ],
        'typescriptEslintPlugin/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],
        'typescriptEslintPlugin/member-ordering': [
          'error',
          {
            default: {
              memberTypes: [
                'public-static-field',
                'public-static-method',
                'protected-static-field',
                'protected-static-method',
                'private-static-field',
                'private-static-method',
                'public-constructor',
                'protected-constructor',
                'private-constructor',
                'public-instance-method',
                'protected-instance-method',
                'private-instance-method',
              ],
              order: 'as-written',
            },
          },
        ],
        'typescriptEslintPlugin/explicit-module-boundary-types': 'error',
        //// Improves code readability
        'stylisticJs/lines-between-class-members': [
          'error',
          'always',
          {
            exceptAfterSingleLine: true,
          },
        ],
        //// code consistency - make methods declared in interfaces look
        //// like methods declared in classes.
        'typescriptEslintPlugin/method-signature-style': ['error', 'method'],
        'typescriptEslintPlugin/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: ['classMethod'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
          },
          {
            selector: 'classProperty',
            format: ['camelCase'],
          },
          {
            selector: 'enumMember',
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              //Don"t let it start with an I
              regex: '^I[A-Z]',
              match: false,
            },
          },
          {
            selector: 'objectLiteralMethod',
            format: null,
          },
          {
            selector: 'objectLiteralProperty',
            format: null,
          },
          {
            selector: 'parameter',
            custom: {
              // multiple underscores or camelCase
              // also allow variable name to end with $, because classProperty allows it. For example, this.action$ is allowed so action$ should be allowed.
              regex: '^_*$|^[a-z0-9]{1,}([A-Z][a-z0-9]{0,}){0,}\\$?$',
              match: true,
            },
            format: null,
          },
          {
            selector: 'parameter',
            modifiers: ['destructured'],
            format: null,
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'typeProperty',
            format: ['camelCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            // Allow constants to be UPPER_CASE or camelCase
            modifiers: ['const'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            modifiers: ['destructured'],
            // Allow any formatting because it will be controlled by
            // what we are destructuring
            format: null,
          },
        ],
        //// requires toString() to provide useful information.
        'typescriptEslintPlugin/no-base-to-string': 'error',
        //// Using a non-null assertion (!) next to an assign or equals
        //// check (= or == or ===) creates code that is confusing as
        //// it looks similar to a not equals check (!= !==)
        'typescriptEslintPlugin/no-confusing-non-null-assertion': 'error',
        //// code clarity and consistency
        //// Requires expressions of type void to appear in statement position.
        'typescriptEslintPlugin/no-confusing-void-expression': [
          'error',
          {
            ignoreArrowShorthand: true,
          },
        ],
        // this rule is coming
        //'typescriptEslintPlugin/no-deprecated': 'error',
        'typescriptEslintPlugin/no-dupe-class-members': 'error',
        //// Dynamic deletes and strong typing are a really bad combination
        //// The ONLY place this MIGHT be acceptable is while transforming data
        //// from the service back to the effect.
        'typescriptEslintPlugin/no-dynamic-delete': 'error',
        'typescriptEslintPlugin/no-empty-function': 'error',
        //// Prevents unnecessary and possibly erroneous code
        'typescriptEslintPlugin/no-empty-interface': 'error',
        'typescriptEslintPlugin/no-explicit-any': 'error',
        'typescriptEslintPlugin/no-extra-non-null-assertion': 'error',
        'typescriptEslintPlugin/no-extraneous-class': [
          'error',
          {
            allowWithDecorator: true,
          },
        ],
        //// requires promises to be handled appropriately
        'typescriptEslintPlugin/no-floating-promises': 'error',
        'typescriptEslintPlugin/no-for-in-array': 'error',
        //// Disallow the use of eval()-like methods. (beyond just eval())
        'typescriptEslintPlugin/no-implied-eval': 'error',
        'typescriptEslintPlugin/no-inferrable-types': [
          'error',
          {
            ignoreParameters: true,
          },
        ],
        'typescriptEslintPlugin/no-invalid-this': 'error',
        'typescriptEslintPlugin/no-invalid-void-type': 'error',
        'typescriptEslintPlugin/no-loop-func': 'error',
        'typescriptEslintPlugin/no-loss-of-precision': 'error',
        'typescriptEslintPlugin/no-meaningless-void-operator': 'error',
        'typescriptEslintPlugin/no-misused-new': 'error',
        'typescriptEslintPlugin/no-misused-promises': 'error',
        'typescriptEslintPlugin/no-namespace': 'error',
        //// turning on typescriptEslintPlugin/non-null-assertion
        //// doesn"t work with the rule
        //// typescriptEslintPlugin/non-nullable-type-assertion-style.
        'typescriptEslintPlugin/no-non-null-assertion': 'off',
        'typescriptEslintPlugin/no-non-null-asserted-nullish-coalescing':
          'error',
        'typescriptEslintPlugin/no-non-null-asserted-optional-chain': 'error',
        'typescriptEslintPlugin/no-redeclare': 'error',
        'typescriptEslintPlugin/no-require-imports': 'error',
        'typescriptEslintPlugin/no-shadow': ['error'],
        'typescriptEslintPlugin/no-this-alias': 'error',
        // Use types for what interfaces can"t do.
        'typescriptEslintPlugin/no-type-alias': [
          'error',
          {
            allowAliases: 'always',
            allowCallbacks: 'always',
            allowGenerics: 'always',
            allowConstructors: 'always',
            allowConditionalTypes: 'always',
            // Because it is a lot easier to read and understand
            // than creating tuple definitions with interfaces
            allowTupleTypes: 'always',
          },
        ],
        'typescriptEslintPlugin/no-unnecessary-boolean-literal-compare':
          'error',
        //// no-unnecessary-condition requires strictNullCheck before we can turn it on
        //"typescriptEslintPlugin/no-unnecessary-condition": "error",
        'typescriptEslintPlugin/no-unnecessary-qualifier': 'error',
        'typescriptEslintPlugin/no-unnecessary-type-arguments': 'error',
        'typescriptEslintPlugin/no-unnecessary-type-assertion': 'error',
        'typescriptEslintPlugin/no-unnecessary-type-constraint': 'error',
        'typescriptEslintPlugin/no-unsafe-argument': 'error',
        'typescriptEslintPlugin/no-unsafe-assignment': 'error',
        'typescriptEslintPlugin/no-unsafe-call': 'error',
        'typescriptEslintPlugin/no-unsafe-member-access': 'error',
        'typescriptEslintPlugin/no-unsafe-return': 'error',
        'typescriptEslintPlugin/no-unused-expressions': 'error',
        // covered by another rule
        'typescriptEslintPlugin/no-unused-vars': 'off',
        'typescriptEslintPlugin/no-useless-constructor': 'error',
        'typescriptEslintPlugin/no-var-requires': 'error',
        //// This rule detects when an as cast is doing the same job as
        //// an ! would, and suggests fixing the code to be an !
        'typescriptEslintPlugin/non-nullable-type-assertion-style': 'error',
        'stylisticJs/padding-line-between-statements': 'error',
        'typescriptEslintPlugin/prefer-enum-initializers': 'error',
        // for of is 10x slower than for/next.  Use the forNext function
        // instead to gain the performance benefits as well as readability.
        'typescriptEslintPlugin/prefer-for-of': 'off',
        'typescriptEslintPlugin/prefer-function-type': 'error',
        'typescriptEslintPlugin/prefer-includes': 'error',
        'typescriptEslintPlugin/prefer-literal-enum-member': 'error',
        'typescriptEslintPlugin/prefer-namespace-keyword': 'error',
        // This rule requires strictNullChecks which is not yet enabled on the repo
        'typescriptEslintPlugin/prefer-nullish-coalescing': 'off',
        'typescriptEslintPlugin/prefer-optional-chain': 'error',
        'typescriptEslintPlugin/prefer-reduce-type-parameter': 'error',
        'typescriptEslintPlugin/prefer-regexp-exec': 'error',
        'typescriptEslintPlugin/prefer-return-this-type': 'error',
        'typescriptEslintPlugin/prefer-string-starts-ends-with': 'error',
        'typescriptEslintPlugin/prefer-ts-expect-error': 'error',
        'typescriptEslintPlugin/promise-function-async': 'error',
        'typescriptEslintPlugin/require-array-sort-compare': [
          'error',
          {
            ignoreStringArrays: true,
          },
        ],
        'typescriptEslintPlugin/require-await': 'error',
        'typescriptEslintPlugin/return-await': 'error',
        'typescriptEslintPlugin/restrict-template-expressions': 'error',
        'typescriptEslintPlugin/sort-type-constituents': 'error',
        'typescriptEslintPlugin/strict-boolean-expressions': 'error',
        'typescriptEslintPlugin/switch-exhaustiveness-check': 'error',
        'typescriptEslintPlugin/triple-slash-reference': 'error',
        'typescriptEslintPlugin/typedef': 'error',
        'typescriptEslintPlugin/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        'typescriptEslintPlugin/unified-signatures': [
          'error',
          {
            ignoreDifferentlyNamedParameters: true,
          },
        ],
        // Unused imports
        'unusedImports/no-unused-imports': 'error',
        'unusedImports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        // One off plugins
        'unicorn/filename-case': 'error',
        'unicorn/no-abusive-eslint-disable': 'error',
        'importPlugin/no-duplicates': ['error'],
        'importPlugin/prefer-default-export': 'off',
        'importPlugin/no-default-export': 'off', // not needed for lint rules
        //// If you need more params, your function/class is probably doing too
        //// much. So, the first thing you should look at is breaking things down
        //// more. If all else fails, your second choice would be passing an object.
        //// But, really try to break things down more first!
        'maxParamsNoConstructor/max-params-no-constructor': [
          'error',
          {
            max: 4,
          },
        ],
        // Sonarlint
        'sonarjs/cognitive-complexity': 'error',
        'sonarjs/max-switch-cases': 'error',
        // we can't control the API for writing lint rules
        // so we turn off new-cap
        'sonarjs/new-cap': 'off',
        'sonarjs/no-all-duplicated-branches': 'error',
        'sonarjs/no-collapsible-if': 'error',
        'sonarjs/no-duplicated-branches': 'error',
        'sonarjs/no-duplicate-string': 'error',
        'sonarjs/no-element-overwrite': 'error',
        // spec files for lint rules don't look like
        // jest spec files
        'sonarjs/no-empty-test-file': 'off',
        'sonarjs/no-identical-expressions': 'error',
        'sonarjs/no-identical-functions': 'error',
        'sonarjs/no-ignored-return': 'error',
        'sonarjs/no-gratuitous-expressions': 'error',
        'sonarjs/no-nested-switch': 'error',
        'sonarjs/no-nested-template-literals': 'error',
        'sonarjs/no-one-iteration-loop': 'error',
        'sonarjs/no-redundant-boolean': 'error',
        'sonarjs/no-redundant-jump': 'error',
        'sonarjs/no-small-switch': 'off',
        'sonarjs/no-use-of-empty-return-value': 'error',
        'sonarjs/prefer-single-boolean-return': 'error',
        // These next rules are not accurate enough to be useful
        'sonarjs/different-types-comparison': 'off',
        'sonarjs/no-dead-store': 'off',
        // For/Next is generally faster than forEach or forOf
        // because it doesn't have to use the iterator
        'sonarjs/prefer-for-of': 'off',
      },
    },
    {
      files: ['jest.config.js'],
      rules: {
        'comments/no-restricted-disable': 'off',
        'comments/require-description': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
      },
    },
  ];
};

module.exports = eslintConfig();

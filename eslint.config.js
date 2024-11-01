const nx = require('@nx/eslint-plugin');
const jsdoc = require('eslint-plugin-jsdoc');
const sonarjs = require('eslint-plugin-sonarjs');
const deprecation = require('eslint-plugin-deprecation');
const importPlugin = require('eslint-plugin-import');
const angularEslintPlugin = require('@angular-eslint/eslint-plugin');
const comments = require('eslint-plugin-eslint-comments');
const unicorn = require('eslint-plugin-unicorn');
const rxjs = require('eslint-plugin-rxjs');
const unusedImports = require('eslint-plugin-unused-imports');
const maxParamsNoConstructor = require('eslint-plugin-max-params-no-constructor');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-config-prettier');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
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
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      jsdoc,
      sonarjs,
      deprecation,
      importPlugin,
      angularEslintPlugin,
      comments,
      unicorn,
      rxjs,
      unusedImports,
      maxParamsNoConstructor,
      jest,
      prettier,
    },
    // Override or add rules here
    rules: {},
  },
];

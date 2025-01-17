import { Linter } from '@typescript-eslint/utils/ts-eslint';

import noAnonymousFunctions from './lib/no-anonymous-functions/no-anonymous-functions';
import noObjectLiterals from './lib/no-object-literals/no-object-literals';
import oneExportedItemPerFile from './lib/one-exported-item-per-file/one-exported-item-per-file';

// eslint-disable-next-line typescriptEslintPlugin/no-require-imports, typescriptEslintPlugin/no-var-requires -- needed to get information from package.json
const { name, version } = require('../package.json') as {
  name: string;
  version: string;
};

const meta = {
  name,
  version,
} satisfies Linter.PluginMeta;

const rules = {
  'one-exported-item-per-file': oneExportedItemPerFile,
  'no-anonymous-functions': noAnonymousFunctions,
  'no-object-literals': noObjectLiterals,
} satisfies Linter.PluginRules;

interface ESLintPlugin extends Linter.Plugin {
  meta: typeof meta;
  rules: typeof rules;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- ESLint rule names use kebab-case
const plugin: ESLintPlugin = {
  meta,
  rules,
};

export = plugin;

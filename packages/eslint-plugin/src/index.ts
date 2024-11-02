import type { Linter } from '@typescript-eslint/utils/ts-eslint';

import noAnonymousFunctions from './lib/no-anonymous-functions/no-anonymous-functions';
import oneExportedItemPerFile from './lib/one-exported-item-per-file/one-exported-item-per-file';

// eslint-disable-next-line typescriptEslintPlugin/no-require-imports, typescriptEslintPlugin/no-var-requires -- needed to get information from package.json
const { name, version } = require('../package.json') as { name: string; version: string };

const meta = {
	name,
	version,
} satisfies Linter.PluginMeta;

const rules = {
	'one-exported-item-per-file': oneExportedItemPerFile,
	'no-anonymous-functions': noAnonymousFunctions,
} satisfies Linter.PluginRules;

module.exports = { meta, rules } satisfies Linter.Plugin;

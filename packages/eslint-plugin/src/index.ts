import type { Linter } from '@typescript-eslint/utils/ts-eslint';

import oneExportedItemPerFile from './lib/one-exported-item-per-file/one-exported-item-per-file';
import noAnonymousFunctions from './lib/no-anonymous-functions/no-anonymous-functions';

const { name, version } = require('../package.json') as { name: string; version: string };

const meta = {
	name,
	version,
} satisfies Linter.PluginMeta;

const rules = {
	'one-exported-item-per-file': oneExportedItemPerFile,
	'no-anonymous-functions': noAnonymousFunctions,
} satisfies Linter.PluginRules;

export default { meta, rules } satisfies Linter.Plugin;

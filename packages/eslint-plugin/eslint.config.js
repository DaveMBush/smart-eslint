const baseConfigPromise = import('../../eslint.config.js');

module.exports = (async () => {
  const baseConfig = await baseConfigPromise;
  return [
    ...await baseConfig.default,
    {
      files: ['**/*.json'],
      rules: {
        '@nx/dependency-checks': [
          'error',
          {
            ignoredFiles: [
              '{projectRoot}/eslint.config.{js,cjs,mjs}',
              '{projectRoot}/esbuild.config.{js,ts,mjs,mts}',
            ],
          },
        ],
      },
      languageOptions: {
        parser: require('jsonc-eslint-parser'),
      },
    },
  ];
})();

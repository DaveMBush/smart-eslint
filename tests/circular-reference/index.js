const util = require('util');
const smart = require('@smarttools/eslint-plugin');

const result = util.inspect(smart, { depth: null });

if (result.includes('[Circular')) {
  console.log('Circular reference found');
  console.log(result);
  process.exit(1);
} else {
  console.log('No circular reference found');
  process.exit(0);
}

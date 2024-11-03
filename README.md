# @smarttools/eslint-plugin

## What is @smarttools/eslint-plugin?

This is a set of eslint rules that encourage extreme coding standards for performance and debugging.

## Installation

```bash
npm install @smarttools/eslint-plugin
```

## Usage

ESLint Flat-file Configuration

```javascript
const smartTools = require("@smarttools/eslint-plugin");

module.exports = [
  files: ["**/*.ts],
  plugins: {
    smartTools
  },
  rules: {
    "smartTools/rule-name-here": "error",
  },
];
```

ESLint Config Object

```javascript
module.exports = {
  plugins: ["@smarttools"],
  rules: {
    "@smarttools/rule-name-here": "error",
  },
};
```

## Rules

### no-anonymous-functions

This rule discourages the use of anonymous functions of any kind. There are multiple reasons why you should avoid them:

- They are difficult to debug because you can't see the name in the developer tools. This means when you are tracking down a performance issue in a flame chart, looking at a call stack, or tracking down a memory leak, you'll have to drill into the code to see what the function does.
- In some cases, they can increase performance overhead. While this is admittedly a micro-optimization, those of use looking for every millisecond of performance will avoid them.
- They make it harder to understand code. When you have a function that is more than a few lines, it can be difficult to understand what the function does just by reading the function body. Names help.

### one-exported-item-per-file

If you've ever worked on a very large codebase, you've already seen the problem where a single file has a bunch of exports in it. And then, when you are trying to re-organize the code into multiple libraries, you realize the problems multiple exports in the same file can cause you. Do yourself a favor and get in the habit of only exporting one item per file. Your future self will thank you.

### More to come

...

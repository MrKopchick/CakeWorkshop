/**
 * @type {import('prettier').Config}
 */
const config = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  overrides: [{ files: '*.scss', options: { singleQuote: false } }],
  printWidth: 80,
  quoteProps: 'preserve',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false
};

export default config;

/** @type {import('lint-staged').Config} */
const config = {
  '*': [
    () => 'npm run lint:editorconfig',
    () => 'npm run lint:fs',
    () => 'npm run lint:trash',
    () => 'npm run lint:format'
  ]
};

export default config;

import baseConfig from '../../eslint.config.js';

/** @typedef {import("eslint").Linter.Config} */
let Config;

/** @type {Config} */
const ignoresConfig = {
  ignores: ['build']
};

/** @type {Config[]} */
const overridesConfigs = [
  {
    files: ['knexfile.ts'],
    rules: {
      'import/no-default-export': ['off']
    }
  },
  {
    files: ['jest.config.js'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/no-magic-numbers': ['off'],
      '@typescript-eslint/no-unsafe-argument': ['off'],
      '@typescript-eslint/no-unsafe-assignment': ['off'],
      '@typescript-eslint/no-unsafe-call': ['off'],
      '@typescript-eslint/no-unsafe-member-access': ['off'],
      '@typescript-eslint/no-unsafe-return': ['off'],
      'import/no-default-export': ['off']
    }
  },
  {
    files: ['src/db/migrations/**/*.ts'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'snakeCase'
        }
      ]
    }
  },
  {
    files: ['src/libs/modules/controller/controller.module.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': ['off']
    }
  }
];

/** @type {Config[]} */
const config = [...baseConfig, ignoresConfig, ...overridesConfigs];

export default config;

import { type KnipConfig } from 'knip';

const config: KnipConfig = {
  prettier: ['./prettier.config.mjs'],
  stylelint: ['./stylelint.config.js'],
  workspaces: {
    '.': {
      entry: ['./dangerfile.ts']
    },
    'apps/backend': {
      entry: ['src/index.ts', 'src/db/**/*.ts', 'knexfile.ts'],
      ignoreDependencies: ['pino-pretty'],
      ignoreUnresolved: ['jest-environment-node']
    },
    'apps/frontend': {
      entry: ['src/index.tsx']
    },
    'packages/shared': {
      entry: ['src/index.ts'],
      includeEntryExports: true
    }
  }
};

export default config;

import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathsToModuleNameMapper } from 'ts-jest';

import tsconfigJson from './tsconfig.json' with { type: 'json' };

const sourcePath = join(fileURLToPath(import.meta.url), '../');

const manageKey = key => {
  return key.includes('(.*)') ? key.slice(0, -1) + String.raw`\.js$` : key;
};

const manageMapper = mapper => ({
  ...Object.fromEntries(
    Object.entries(mapper).map(([key, value]) => [manageKey(key), value])
  ),
  '^(\\.{1,2}/.*)\\.js$': '$1'
});

export default {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: manageMapper(
    pathsToModuleNameMapper(tsconfigJson.compilerOptions.paths, {
      prefix: sourcePath
    })
  ),
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-node',
  testPathIgnorePatterns: ['node_modules/', 'dist/', 'build/'],
  testTimeout: 10_000,
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  transformIgnorePatterns: ['node_modules/'],
  workerIdleMemoryLimit: '1GB'
};

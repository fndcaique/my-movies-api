import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  setupFilesAfterEnv: ['./src/core/common/infra/testing/expect-helpers.ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;

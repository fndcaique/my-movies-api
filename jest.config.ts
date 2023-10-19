import type { Config } from 'jest';

// const corePath = "<rootDir>/../../../node_modules/@fnd/core/dist";

const config: Config = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  setupFilesAfterEnv: ['./src/@core/common/infra/testing/expect-helpers.ts'],
  testRegex: './src/.*\\.*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;

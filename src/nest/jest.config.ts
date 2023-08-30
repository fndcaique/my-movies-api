import type { Config } from 'jest';

const config: Config = {
  displayName: {
    name: 'nest',
    color: 'green',
  },
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  // setupFilesAfterEnv: ['./common/domain/tests/validations.ts'],
  testRegex: '.*\\..*spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^core/(.*)$': '<rootDir>/../../../node_modules/core/dist/$1',
  },

  // moduleFileExtensions: ['js', 'json', 'ts'],
  // rootDir: 'src',
  // testRegex: '.*\\.spec\\.ts$',
  // transform: {
  //   '^.+\\.(t|j)s$': 'ts-jest',
  // },
  // collectCoverageFrom: ['**/*.(t|j)s'],
  // coverageDirectory: '../coverage',
  // testEnvironment: 'node',
};

export default config;

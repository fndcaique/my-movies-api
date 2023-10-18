import type { Config } from 'jest';

const corePath = '<rootDir>/../../../node_modules/@fnd/core/dist';

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
    '^@fnd/core/(.*)$': `${corePath}/$1`,
    // '^#common/(.*)$': `${corePath}/common/$1`,
    // '^#category/(.*)$': `${corePath}/category/$1`,
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

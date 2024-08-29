/** @type {import('ts-jest').JestConfigWithTsJest} **/
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1',
  },
  rootDir: '../../',
  testTimeout: 10000,
}

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json', // Ensure this path points to your correct tsconfig
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

import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tailwind from 'eslint-plugin-tailwindcss'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import importRecommended from 'eslint-plugin-import/config/recommended.js'
import tseslint from 'typescript-eslint'
import { fixupPluginRules } from '@eslint/compat'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  ...tailwind.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      import: fixupPluginRules(importPlugin),
    },
    settings: {
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', 'ts'],
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    rules: {
      ...importRecommended.rules,
      'import/no-named-as-default-member': 'off',
    },
    files: ['apps/functions/*.{ts,tsx,js,jsx}'],
  },
  {
    ignores: [
      '**/dist',
      '**/postcss.config.js',
      '**/vite-env.d.ts',
      'jest.config.js',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    files: ['apps/frontend/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          config: 'apps/frontend/tailwind.config.js',
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-restricted-imports': [
        2,
        {
          paths: [
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useStore', 'useDispatch'],
              message:
                'Please use pre-typed versions from `src/app/hooks.ts` instead.',
            },
          ],
        },
      ],
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-null': 'off',
    },
  },
]

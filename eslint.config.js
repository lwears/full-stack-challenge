import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tailwind from 'eslint-plugin-tailwindcss'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  ...tailwind.configs['flat/recommended'],
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['**/dist', '**/postcss.config.js', '**/vite-env.d.ts'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    files: ['apps/frontend/*.{ts,tsx}'],
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

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
// import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended
      // importPlugin.flatConfigs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'error',
      'no-console': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

          // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json or <root>/jsconfig.json by default

          // use <root>/path/to/folder/tsconfig.json or <root>/path/to/folder/jsconfig.json
          project: 'path/to/folder',

          // Multiple tsconfigs/jsconfigs (Useful for monorepos, but discouraged in favor of `references` supported)

          // use a glob pattern
          project: 'packages/*/{ts,js}config.json',

          // use an array
          project: ['packages/module-a/tsconfig.json', 'packages/module-b/jsconfig.json'],

          // use an array of glob patterns
          project: ['packages/*/tsconfig.json', 'other-packages/*/jsconfig.json']
        }
      }
    }
  }
)

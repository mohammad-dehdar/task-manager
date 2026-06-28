import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

const config = tseslint.config(
  {
    ignores: ['node_modules/', '.next/', 'src/app/globals.css'],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
      import: importPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/components/ui',
              from: './src',
              except: ['./src/components/ui'],
              message:
                'UI components must not import from outside components/ui. Use props instead.',
            },
            {
              target: './src/features',
              from: './src',
              except: [
                './src/features',
                './src/components/ui',
                './src/components/shared',
                './src/utils',
                './src/types',
                './src/constants',
                './src/config',
                './src/hooks',
                './src/store',
              ],
              message:
                'Feature modules should not import from other features. Use shared modules only.',
            },
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', './*/*/*'],
              message:
                'Use @/ path aliases instead of relative imports. Sibling imports (./) within the same folder are allowed.',
            },
          ],
        },
      ],
    },
  },
);

export default config;

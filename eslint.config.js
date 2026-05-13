import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';

export default tseslint.config(
    { ignores: ['dist', 'node_modules', '.next', 'out', 'build', 'e2e', 'playwright-report', 'test-results', 'playwright.config.ts'] },
    {
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        // [1] Prettier와 충돌하는 ESLint 규칙 끄기 (반드시 뒤쪽에 배치)
        prettierConfig,
      ],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'], // Vite 기본 tsconfig 구조
          tsconfigRootDir: import.meta.dirname,
        },
      },
      // React 플러그인 설정
      plugins: {
        react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        'react-compiler': reactCompiler,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react-compiler/react-compiler': 'error',

        // [사용자 요청 규칙]
        'react-hooks/static-components': 'off', // (참고: 이 규칙은 공식 플러그인에는 없지만 요청대로 유지)
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',

        // 추가 권장: React 17+ (import React 생략 가능)
        'react/react-in-jsx-scope': 'off',
      },
    },
);

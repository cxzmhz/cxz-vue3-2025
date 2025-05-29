import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import axiosUnderApi from './eslint-plugin-axios-extends.js';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  // 'plugin:prettier/recommended': eslint集成prettier
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    rules: {
      'vue/multi-word-component-names': 'off', // 禁用vue文件强制多个单词命名
      '@typescript-eslint/ban-ts-comment': 'off', // 允许使用@ts-ignore
    },
  },
  {
    files: ['**/*.{ts,vue,tsx}'],
    rules: {
      'cxz-plugin/axios-under-api': 'error',
    },
    plugins: {
      'cxz-plugin': {
        rules: {
          'axios-under-api': axiosUnderApi,
        },
      },
    },
  },
];

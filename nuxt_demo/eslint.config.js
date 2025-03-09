import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

const rules = {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    'no-empty': 'off',
    'no-redeclare': 'off',
    'no-useless-escape': 'off',
    'no-cond-assign': 'off',
    'vue/multi-word-component-names': 'off',
}
const ignores = ['node_modules', 'dist', '.nuxt/*']

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        ignores,
        rules,
    },
    { languageOptions: { globals: globals.browser } },
    {
        files: ['**/*.vue'],
        ignores,
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules,
    },
]

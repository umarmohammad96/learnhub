import globals from 'globals';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
export default [{ ignores: ['dist/**', 'node_modules/**'] }, { files: ['**/*.{js,jsx}'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } }, globals: { ...globals.browser } }, plugins: { react, 'react-hooks': hooks }, rules: { ...hooks.configs.recommended.rules, 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], 'react/jsx-uses-react': 'error', 'react/jsx-uses-vars': 'error' } }];

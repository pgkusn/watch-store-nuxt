module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'brace-style': ['error', 'stroustrup'],
        indent: ['error', 4],
        semi: ['error', 'always'],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': ['error', { singleline: 3 }],
        'vue/html-closing-bracket-newline': ['error', { multiline: 'always' }],
        'import/no-absolute-path': 'off',
        'no-undef': 'off',
        'eol-last': 'off',
        'import/first': 'off',
        'arrow-parens': ['error', 'as-needed'],
        curly: 'off',
        'no-unused-vars': 'off'
    }
};

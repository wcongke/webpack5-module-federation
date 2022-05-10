module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  extends: [
    'eslint-config-ali/typescript/vue',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],
};

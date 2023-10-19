// lint-staged.config.js
// eslint-disable-next-line no-undef
module.exports = {
  // Type check TypeScript files
  '**/*.(ts)': () => 'tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|js)': (filenames) => [`eslint --fix ${filenames.join(' ')}`],
};

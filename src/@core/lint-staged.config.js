// lint-staged.config.js
// eslint-disable-next-line no-undef
module.exports = {
  // Type check TypeScript files
  '**/*.(ts)': () => 'npm tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|js)': (filenames) => [`npm eslint --fix ${filenames.join(' ')}`]
};

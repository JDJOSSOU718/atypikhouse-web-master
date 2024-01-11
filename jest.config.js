module.exports = {
  preset: '@nuxt/test-utils',
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  moduleFileExtensions: ['js', 'json', 'vue', 'text', 'clover', 'lcov'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  
  verbose: false,
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    '../tests/browser/**/*.test.js',
    '../tests/nuxt.config/**/*.test.js',
    '../tests/login/**/*.test.js',

    // Ajoutez d'autres fichiers de test au besoin
  ],
  coverageReporters: ['html', 'text', 'lcov'],
  coverageDirectory: "coverage"
};

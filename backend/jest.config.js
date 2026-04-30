module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs'
        }
      }
    ]
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};

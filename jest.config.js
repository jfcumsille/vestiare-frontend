module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: ['<rootDir>/tests/unit/**/*.[tj]s'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};

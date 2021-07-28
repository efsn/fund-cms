module.exports = {
  roots: ['<rootDir>/src/'],
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(c|le|sa|sc)ss$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|xlsx|csv)$':
      '<rootDir>/jest/mocks/file.ts',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest/enzyme.setup.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/jest/jest-dom.setup.ts',
    '<rootDir>/jest/matchers.setup.ts',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 28,
      lines: 45,
      statements: 45,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,js,jsx,tsx}',
    '!<rootDir>/src/{App,index,icons,routes}.ts?x',
    '!<rootDir>/src/constants/**/*.ts',
    '!<rootDir>/src/store/**/*.ts',
    '!<rootDir>/src/fixtures/**/*.ts?x',
  ],
  coverageReporters: ['json', 'html', 'lcov', 'text', 'clover'],
}

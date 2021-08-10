/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['<rootDir>dist/'],
    coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/rest'],
    coverageReporters: ['text', 'lcov', 'clover'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    roots: ['<rootDir>/packages'],
    setupFilesAfterEnv: ['<rootDir>/scripts/jest.js', 'dotenv/config'],
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
};

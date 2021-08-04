/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['<rootDir>dist/'],
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
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
};

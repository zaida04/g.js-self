module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['<rootDir>dist/', '<rootDir>packages/itami', '<rootDir>packages/guilded-api-typings'],
    coverageReporters: ['text', 'lcov', 'clover'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    roots: ['<rootDir>packages/'],
    testEnvironment: 'node',
    testMatch: ['**/+(*.)+(spec|test).+(ts)?(x)'],
};

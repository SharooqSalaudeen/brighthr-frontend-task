import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

// Custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'node',
    // Setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);

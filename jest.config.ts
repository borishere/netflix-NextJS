import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/common/__mocks__/fileMock.js',
    '\\.(scss)$': '<rootDir>/src/common/__mocks__/styleMock.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>/cypress'
  ]
};
export default config;

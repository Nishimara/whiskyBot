import type { Config } from 'jest';

const config: Config = {
    transform: {
        '^.+\\.tsx?$': 'babel-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['./src/']
};

export default config;

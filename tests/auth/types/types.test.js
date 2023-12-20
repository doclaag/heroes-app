import { types } from '../../../src/auth';

describe('Tests on "Types.js"', () => {
    test('should return these types', () => {
        expect(types).toEqual({ login: '[Auth] login', logout: '[Auth] logout' });
    });

    test('should have these types', () => {
        expect(types).toHaveProperty('login');
        expect(types).toHaveProperty('logout');
    });
});

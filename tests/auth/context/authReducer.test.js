import { authReducer, types } from '../../../src/auth';



describe('Tests on authReducer', () => {

    test('should return the default state', () => {

        const state = authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });
    });


    test('should perform the login', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Carlos',
                id: '123'
            }
        };
        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({
            logged: true,
            user: action.payload
        });
    });


    test('should perform the logout', () => {

        const initState = {
            logged: true,
            user: {
                name: 'Carlos',
                id: '123',
            }
        };

        const action = {
            type: types.logout
        };

        const state = authReducer(initState, action);
        expect(state).toEqual({ logged: false });
    });

});

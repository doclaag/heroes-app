import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Tests on <AppRouter />', () => {

    test('should display the login if not authenticated', () => {
        const contextValue = {
            logged: false
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('should display the marvel component if authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '123456',
                name: 'Luis',
            }
        };

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
    });
});
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Tests on <PublicRoute />', () => {
    test('should display the children if not authenticated', () => {
        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Public Route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText('Public Route')).toBeTruthy();
    });

    test('should navigate if authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Luis',
                id: '123456'
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Public Route</h1>
                            </PublicRoute>
                        } />
                        <Route path="marvel" element={<h1>Página Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });
});

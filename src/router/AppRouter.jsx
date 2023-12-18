import { Routes, Route } from 'react-router-dom';

import { Login } from '../auth';
import { HeroesRoutes } from '../heroes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                {/* <Route path="login" element={<Login />} /> */}

                <Route path="/*" element={
                    <PrivateRoute>
                        <HeroesRoutes />
                    </PrivateRoute>
                } />
                {/* <Route path="/*" element={<HeroesRoutes />} /> */}
            </Routes>
        </>
    );
};

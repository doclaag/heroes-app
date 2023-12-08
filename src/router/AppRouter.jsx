import { Routes, Route, Navigate } from 'react-router-dom';
import { DC, Marvel } from '../heroes/pages';
import { Login } from '../auth/pages';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='marvel' element={<Marvel />} />
                <Route path='dc' element={<DC />} />
                <Route path='login' element={<Login />} />
                <Route path='/' element={<Navigate to='/marvel' />} />
            </Routes>

        </>
    );
};

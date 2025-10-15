import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import Mining from './components/Mining';
import Transactions from './components/Transactions';
import Tasks from './components/Tasks';
import Profile from './components/Profile';
import Referrals from './components/Referrals';
import { DataProvider } from './context/DataContext';
import type { User } from './types';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const handleLogin = (user: User) => {
        setCurrentUser(user);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans" style={{backgroundImage: `radial-gradient(circle at top right, rgba(29, 78, 216, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.15), transparent 40%)`}}>
            <HashRouter>
                <Routes>
                    <Route path="/auth" element={!currentUser ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} />
                    
                    {currentUser ? (
                         <Route 
                            path="/" 
                            element={
                                <DataProvider user={currentUser}>
                                    <DashboardLayout onLogout={handleLogout} />
                                </DataProvider>
                            }
                        >
                            <Route index element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="mining" element={<Mining />} />
                            <Route path="transactions" element={<Transactions />} />
                            <Route path="tasks" element={<Tasks />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="referrals" element={<Referrals />} />
                        </Route>
                    ) : (
                        <Route path="*" element={<Navigate to="/auth" />} />
                    )}
                </Routes>
            </HashRouter>
        </div>
    );
};

export default App;

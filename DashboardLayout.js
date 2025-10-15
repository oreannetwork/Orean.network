import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { MenuIcon } from './icons/UtilIcons';


interface DashboardLayoutProps {
    onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${isSidebarOpen ? 'bg-black/60' : 'pointer-events-none opacity-0'}`} onClick={() => setIsSidebarOpen(false)}></div>
            <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <Sidebar onLogout={onLogout} />
            </div>
           
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="w-64">
                    <Sidebar onLogout={onLogout} />
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

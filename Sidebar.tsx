import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoIcon from './icons/LogoIcon';
import { DashboardIcon, TransactionsIcon, TasksIcon, ProfileIcon, ReferralsIcon, LogoutIcon } from './icons/NavIcons';

interface SidebarProps {
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate('/auth');
    };

    const navLinkClasses = 'flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200';
    const activeLinkClasses = 'bg-indigo-600 text-white';

    return (
        <div className="flex flex-col h-full bg-gray-800 border-r border-gray-700">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <LogoIcon className="w-8 h-8 mr-2 text-indigo-400" />
                <span className="text-white text-xl font-bold">Orean Network</span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink to="/dashboard" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <DashboardIcon className="h-5 w-5 mr-3" /> Dashboard
                </NavLink>
                 <NavLink to="/mining" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a5 5 0 000 7.071l4.586-4.586a5 5 0 00-7.071 0z" />
                    </svg> Mining
                </NavLink>
                <NavLink to="/transactions" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <TransactionsIcon className="h-5 w-5 mr-3" /> Transactions
                </NavLink>
                <NavLink to="/tasks" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <TasksIcon className="h-5 w-5 mr-3" /> Tasks
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <ProfileIcon className="h-5 w-5 mr-3" /> Account Profile
                </NavLink>
                 <NavLink to="/referrals" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <ReferralsIcon className="h-5 w-5 mr-3" /> Referrals
                </NavLink>
            </nav>
            <div className="px-4 py-6">
                <button onClick={handleLogoutClick} className={navLinkClasses}>
                    <LogoutIcon className="h-5 w-5 mr-3" /> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

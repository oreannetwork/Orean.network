import React from 'react';
import { MenuIcon, BellIcon } from './icons/UtilIcons';
import { useData } from '../context/DataContext';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { user } = useData();
    
    return (
        <header className="flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-white focus:outline-none">
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <div className="ml-4 lg:ml-0">
                        <h1 className="text-xl font-semibold text-white">Welcome Back, {user.name}</h1>
                        <p className="text-sm text-gray-400">Track your mining John tokens</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative text-gray-400 hover:text-white">
                        <BellIcon className="h-6 w-6" />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="relative">
                        <button className="flex items-center space-x-2">
                             <img className="h-9 w-9 rounded-full object-cover bg-gray-700" src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.id}`} alt="User" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

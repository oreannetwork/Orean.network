import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400">{label}</label>
        <div className="mt-1 p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white">
            {value}
        </div>
    </div>
);

const Toggle: React.FC<{ label: string; enabled: boolean; setEnabled: (enabled: boolean) => void; }> = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-300">{label}</span>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`${enabled ? 'bg-indigo-600' : 'bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500`}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    </div>
);


const Profile: React.FC = () => {
    const { user } = useData();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState('');

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordStatus('Updating...');
        setTimeout(() => {
            setPasswordStatus('Password updated successfully!');
             setTimeout(() => setPasswordStatus(''), 3000);
        }, 1500);
    };
    
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-white mb-1">Account Profile</h2>
                <p className="text-gray-400">Manage your personal information and account settings</p>
            </div>
            
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
                <div className="flex items-center space-x-6 mb-8">
                     <img className="h-24 w-24 rounded-full object-cover bg-gray-700" src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.id}`} alt="Profile" />
                    <div>
                        <h4 className="text-2xl font-bold text-white">{user.name}</h4>
                        <p className="text-gray-400">{user.email}</p>
                        <p className="text-sm text-gray-500">User ID: {user.id}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoField label="Full Name" value={user.name} />
                    <InfoField label="Email Address" value={user.email} />
                    <InfoField label="User ID" value={user.id} />
                    <InfoField label="Registration Date" value={user.registrationDate} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-6">Change Password</h3>
                    <form className="space-y-4" onSubmit={handlePasswordUpdate}>
                         <div>
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="current-password">Current Password</label>
                            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="current-password" type="password" required />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="new-password">New Password</label>
                            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="new-password" type="password" required />
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                                Update Password
                            </button>
                        </div>
                         {passwordStatus && <p className="text-center text-green-400 text-sm mt-2">{passwordStatus}</p>}
                    </form>
                </div>
                 <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-6">Other Settings</h3>
                    <div className="space-y-4">
                        <Toggle label="Email Notifications" enabled={emailNotifications} setEnabled={setEmailNotifications} />
                        <Toggle label="Two-Factor Authentication (2FA)" enabled={twoFactorAuth} setEnabled={setTwoFactorAuth} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

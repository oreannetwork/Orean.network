import React, { useState, useEffect } from 'react';
import type { ReferredUser } from '../types';
import { CopyIcon } from './icons/UtilIcons';
import { useData } from '../context/DataContext';

const Referrals: React.FC = () => {
    const { user } = useData();
    const [copied, setCopied] = useState(false);
    const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
    
    const referralLink = `https://oreannetwork.vercel.app/#/auth?ref=${user.id}`;

    useEffect(() => {
        const savedReferrals = localStorage.getItem(`referrals_${user.id}`);
        if (savedReferrals) {
            setReferredUsers(JSON.parse(savedReferrals));
        }
    }, [user.id]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-white mb-1">Referrals</h2>
                <p className="text-gray-400">Manage your personal info settings</p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-2">Share your link and earn rewards!</h3>
                <p className="text-gray-400 mb-4">Earn 10% of your friends' mining rewards!</p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input type="text" readOnly value={referralLink} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-gray-300" />
                    <button onClick={copyToClipboard} className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 whitespace-nowrap">
                        <CopyIcon className="w-5 h-5 mr-2" />
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">My Referred Users</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                            <tr>
                                <th className="py-3 px-4">Referred User</th>
                                <th className="py-3 px-4">Join Date</th>
                                <th className="py-3 px-4">Mining Status</th>
                                <th className="py-3 px-4">Earned from Referrals</th>
                            </tr>
                        </thead>
                        <tbody>
                            {referredUsers.length > 0 ? (
                                referredUsers.map((refUser, index) => (
                                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                                        <td className="py-3 px-4 font-medium text-white">{refUser.name}</td>
                                        <td className="py-3 px-4 text-gray-300">{refUser.joinDate}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-opacity-20 ${refUser.miningStatus === 'Active' ? 'text-green-400 bg-green-500' : 'text-yellow-400 bg-yellow-500'}`}>
                                                {refUser.miningStatus}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-medium text-green-400">{refUser.earned}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-400">You have not referred any users yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                 <div className="mt-4 text-right text-sm text-gray-400">
                    {/* Pagination can be added here if needed */}
                </div>
            </div>
        </div>
    );
};

export default Referrals;

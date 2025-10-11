import React from 'react';
import type { Transaction } from '../types';
import { WalletIcon, CalendarIcon, ZapIcon } from './icons/StatIcons';
import { useData } from '../context/DataContext';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; subValue?: string; }> = ({ icon, title, value, subValue }) => (
    <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 flex flex-col justify-between hover:bg-gray-700/60 transition-all duration-300">
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400">{title}</p>
                <div className="text-indigo-400">{icon}</div>
            </div>
            <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        {subValue && <p className="text-sm text-gray-500 mt-2">{subValue}</p>}
    </div>
);

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const statusColor = transaction.status === 'Completed' ? 'text-green-400' : 'text-yellow-400';
    return (
        <tr className="border-b border-gray-700 hover:bg-gray-700/50">
            <td className="py-3 px-4 text-sm text-gray-300 whitespace-nowrap">{transaction.date}<br/><span className="text-gray-500">{transaction.time}</span></td>
            <td className="py-3 px-4 text-gray-300">{transaction.type}</td>
            <td className="py-3 px-4 text-gray-300">{transaction.description}</td>
            <td className="py-3 px-4 font-medium text-white">{transaction.amount}</td>
            <td className="py-3 px-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-opacity-20 ${statusColor} bg-${statusColor.replace('text-', '')}-500`}>
                    {transaction.status}
                </span>
            </td>
        </tr>
    );
};

const Dashboard: React.FC = () => {
    const { balance, miningStreak, transactions, miningProgress } = useData();
    const recentTransactions = transactions.slice(0, 3);
    const progressPercentage = Math.min((miningProgress / 1.2) * 100, 100);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-white mb-1">User Dashboard</h2>
                <p className="text-gray-400">Track your mining progress and manage your tokens</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon={<WalletIcon className="w-7 h-7" />} title="Orean Network Balance" value={`${balance.toFixed(2)} MTX`} subValue="Base Mining: 0.5 MTX/Day" />
                <StatCard icon={<CalendarIcon className="w-7 h-7" />} title="Mining Streak Days" value={miningStreak.toString()} subValue={`Total Daily Mining: ${miningProgress.toFixed(2)} MTX/Day`} />
                <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 flex flex-col justify-between hover:bg-gray-700/60 transition-all duration-300">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400">Today's Mining Progress</p>
                            <div className="text-purple-400"><ZapIcon className="w-7 h-7" /></div>
                        </div>
                        <h3 className="text-3xl font-bold text-white">{miningProgress.toFixed(2)} MTX</h3>
                    </div>
                     <div className="mt-2">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{width: `${progressPercentage}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                            <tr>
                                <th className="py-3 px-4">Date & Time</th>
                                <th className="py-3 px-4">Type</th>
                                <th className="py-3 px-4">Description</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map((tx, index) => (
                                <TransactionRow key={index} transaction={tx} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

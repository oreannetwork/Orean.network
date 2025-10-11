import React from 'react';
import type { Transaction } from '../types';
import { useData } from '../context/DataContext';

const TransactionRowComponent: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const statusColor = transaction.status === 'Completed' ? 'text-green-400' : transaction.status === 'Pending' ? 'text-yellow-400' : 'text-red-400';
    const amountColor = transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400';

    return (
        <tr className="border-b border-gray-700 hover:bg-gray-700/50">
            <td className="py-3 px-4 text-sm text-gray-300 whitespace-nowrap">
                {transaction.date}<br/><span className="text-gray-500">{transaction.time}</span>
            </td>
            <td className="py-3 px-4 text-gray-300">{transaction.type}</td>
            <td className="py-3 px-4 text-gray-300">{transaction.description}</td>
            <td className={`py-3 px-4 font-medium ${amountColor}`}>{transaction.amount}</td>
            <td className="py-3 px-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-opacity-20 ${statusColor} bg-${statusColor.replace('text-', '')}-500`}>
                    {transaction.status}
                </span>
            </td>
        </tr>
    );
};

const Transactions: React.FC = () => {
    const { transactions } = useData();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-white mb-1">Transaction History</h2>
                <p className="text-gray-400">View all your mining, swap, and wallet transactions</p>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
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
                            {transactions.map((tx, index) => (
                                <TransactionRowComponent key={index} transaction={tx} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;

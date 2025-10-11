import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { User, Transaction } from '../types';

interface IDataContext {
    user: User;
    balance: number;
    miningStreak: number;
    transactions: Transaction[];
    lastClaimTime: number | null;
    claimReward: () => void;
    isClaimed: boolean;
    completeTask: () => void;
    miningProgress: number;
}

const DataContext = createContext<IDataContext | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

const CLAIM_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

export const DataProvider: React.FC<{ children: ReactNode; user: User }> = ({ children, user }) => {
    const [balance, setBalance] = useState<number>(() => {
        const savedBalance = localStorage.getItem(`balance_${user.id}`);
        return savedBalance ? JSON.parse(savedBalance) : 0;
    });

    const [miningStreak, setMiningStreak] = useState<number>(() => {
        const savedStreak = localStorage.getItem(`miningStreak_${user.id}`);
        return savedStreak ? JSON.parse(savedStreak) : 0;
    });

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const savedTransactions = localStorage.getItem(`transactions_${user.id}`);
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });
    
    const [lastClaimTime, setLastClaimTime] = useState<number | null>(() => {
        const savedTime = localStorage.getItem(`lastClaimTime_${user.id}`);
        return savedTime ? JSON.parse(savedTime) : null;
    });

    const [miningProgress, setMiningProgress] = useState(0);
    
    const isClaimed = lastClaimTime ? (Date.now() - lastClaimTime) < CLAIM_COOLDOWN : false;

    // Persist data to localStorage when it changes
    useEffect(() => {
        localStorage.setItem(`balance_${user.id}`, JSON.stringify(balance));
    }, [balance, user.id]);

    useEffect(() => {
        localStorage.setItem(`miningStreak_${user.id}`, JSON.stringify(miningStreak));
    }, [miningStreak, user.id]);
    
    useEffect(() => {
        localStorage.setItem(`transactions_${user.id}`, JSON.stringify(transactions));
    }, [transactions, user.id]);

    useEffect(() => {
        if (lastClaimTime) {
            localStorage.setItem(`lastClaimTime_${user.id}`, JSON.stringify(lastClaimTime));
        } else {
            localStorage.removeItem(`lastClaimTime_${user.id}`);
        }
    }, [lastClaimTime, user.id]);


    // Simulate daily mining progress
    useEffect(() => {
        const interval = setInterval(() => {
            if (isClaimed) return;
            setMiningProgress(prev => Math.min(prev + 0.05, 1.2));
        }, 5000);
        return () => clearInterval(interval);
    }, [isClaimed]);

    const addTransaction = (transaction: Omit<Transaction, 'date' | 'time'>) => {
        const now = new Date();
        const newTransaction: Transaction = {
            ...transaction,
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const claimReward = () => {
        if (!isClaimed) {
            const reward = 0.5;
            setBalance(prev => prev + reward);
            setMiningStreak(prev => prev + 1);
            setLastClaimTime(Date.now());
            addTransaction({
                type: 'Mining',
                description: 'Daily Claim',
                amount: `+${reward.toFixed(2)} MTX`,
                status: 'Completed',
            });
            setMiningProgress(0); // Reset progress after claiming
        }
    };

    const completeTask = () => {
        // Simple check to prevent multiple task completions
        const hasCompletedTask = transactions.some(tx => tx.type === 'Task Reward');
        if (hasCompletedTask) {
            alert("You have already completed this task.");
            return;
        }

        const reward = 100;
        setBalance(prev => prev + reward);
        addTransaction({
            type: 'Task Reward',
            description: 'Follow on X',
            amount: `+${reward} MTX`,
            status: 'Completed'
        });
    };

    const value = {
        user,
        balance,
        miningStreak,
        transactions,
        lastClaimTime,
        claimReward,
        isClaimed,
        completeTask,
        miningProgress,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';

const CLAIM_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours in ms

const Mining: React.FC = () => {
    const { claimReward, isClaimed, lastClaimTime } = useData();
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        if (!isClaimed || !lastClaimTime) {
            setCountdown('');
            return;
        }

        const interval = setInterval(() => {
            const timeLeft = lastClaimTime + CLAIM_COOLDOWN - Date.now();
            if (timeLeft <= 0) {
                setCountdown('Ready to Claim!');
                clearInterval(interval);
            } else {
                const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
                const seconds = Math.floor((timeLeft / 1000) % 60);
                setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isClaimed, lastClaimTime]);

    const data = [
      { name: 'Jul 14', mtpx: 2.1 },
      { name: 'Jul 15', mtpx: 2.5 },
      { name: 'Jul 16', mtpx: 2.2 },
      { name: 'Jul 17', mtpx: 3.0 },
      { name: 'Jul 18', mtpx: 3.5 },
      { name: 'Jul 19', mtpx: 3.2 },
      { name: 'Jul 20', mtpx: 4.1 },
    ];
    
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-white mb-1">Mining Center</h2>
                <p className="text-gray-400">Claim your daily MTXP tokens and track mining progress</p>
            </div>
            
            <div className="bg-gray-800/60 p-6 sm:p-8 rounded-2xl border border-gray-700 text-center flex flex-col items-center">
                <img src="https://i.ibb.co/L95S2Yt/mining-crystals.png" alt="Mining Crystals" className="w-40 h-40 mb-4" />
                <h3 className="text-xl font-semibold text-white">Daily Mining</h3>
                <p className="text-gray-400 mb-4">Base Reward: 0.5 MTXP</p>
                <button 
                    onClick={claimReward} 
                    disabled={isClaimed} 
                    className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    <span>{isClaimed ? `Claim in ${countdown}` : 'Claim Mining Reward'}</span>
                     {!isClaimed && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>}
                </button>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Mining Statistics</h3>
                <p className="text-gray-400 mb-6">MTXP Mined Over Time</p>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                           <defs>
                                <linearGradient id="colorMtpx" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                            <XAxis dataKey="name" stroke="#9CA3BB" />
                            <YAxis stroke="#9CA3BB" />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', color: '#E5E7EB' }} />
                            <Area type="monotone" dataKey="mtpx" stroke="#818CF8" fillOpacity={1} fill="url(#colorMtpx)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Mining;

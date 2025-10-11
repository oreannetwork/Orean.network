import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Tasks: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'submitted' | 'approved'>('idle');
    const { completeTask } = useData();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitted');
        setTimeout(() => {
            setStatus('approved');
            completeTask();
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-white mb-1">Tasks</h2>
                <p className="text-gray-400">Complete tasks to earn more Orean Network tokens!</p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Submit Verification</h3>
                
                <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 mb-6 flex items-start space-x-4">
                    <div className="bg-blue-500 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-white">Follow on X</h4>
                        <p className="text-gray-400">Follow the live official account.</p>
                        <a href="https://x.com/oreannetwork" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Visit @oreannetwork</a>
                    </div>
                </div>

                <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 mb-6">
                    <p className="text-sm text-gray-400"><span className="font-bold text-gray-300">Rule:</span> Only one task can follow return or other. If rejected! If your agdik enoicbent igtils Approved submissions Disallow new tasks.</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="task-type">Task Type</label>
                            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" id="task-type" type="text" value="Follow on X" readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="twitter-username">Twitter Username</label>
                            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="twitter-username" type="text" placeholder="@yourusername" required disabled={status !== 'idle'}/>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <button type="submit" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={status !== 'idle'}>
                            {status === 'submitted' ? 'Submitting...' : status === 'approved' ? 'Completed' : 'Submit'}
                        </button>
                    </div>
                </form>

                {status === 'approved' && (
                    <div className="mt-6 flex items-center space-x-2 text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Status: Approved. +100 MTX</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tasks;

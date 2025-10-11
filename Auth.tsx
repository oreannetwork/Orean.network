import React, { useState } from 'react';
import LogoIcon from './icons/LogoIcon';
import type { User, Transaction, ReferredUser } from '../types';

interface AuthProps {
    onLogin: (user: User) => void;
}

const AuthComponent: React.FC<AuthProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        // Don't reset fields when toggling
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find((u: any) => u.email === email);
        if (existingUser) {
            setError("User with this email already exists.");
            return;
        }

        const newUser: User = {
            name,
            email,
            id: `ORN-${Date.now()}`,
            registrationDate: new Date().toISOString().split('T')[0],
        };

        const newUserWithPassword = { ...newUser, password }; // Don't store password in real app!
        users.push(newUserWithPassword);
        localStorage.setItem('users', JSON.stringify(users));

        // Handle referral logic
        const hash = window.location.hash;
        const queryString = hash.includes('?') ? hash.substring(hash.indexOf('?')) : '';
        const urlParams = new URLSearchParams(queryString);
        const referrerId = urlParams.get('ref');

        if (referrerId) {
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const referrer = allUsers.find((u: any) => u.id === referrerId);

            if (referrer) {
                const bonus = 10;
                // 1. Add bonus to referrer's balance
                const referrerBalanceKey = `balance_${referrerId}`;
                const currentReferrerBalance = JSON.parse(localStorage.getItem(referrerBalanceKey) || '0');
                localStorage.setItem(referrerBalanceKey, JSON.stringify(currentReferrerBalance + bonus));

                // 2. Add transaction for referrer
                const referrerTransactionsKey = `transactions_${referrerId}`;
                const currentReferrerTransactions = JSON.parse(localStorage.getItem(referrerTransactionsKey) || '[]') as Transaction[];
                const now = new Date();
                const newTransaction: Transaction = {
                    date: now.toISOString().split('T')[0],
                    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                    type: 'Referral',
                    description: `Bonus from ${newUser.name}`,
                    amount: `+${bonus} MTX`,
                    status: 'Completed',
                };
                currentReferrerTransactions.unshift(newTransaction);
                localStorage.setItem(referrerTransactionsKey, JSON.stringify(currentReferrerTransactions));

                // 3. Add new user to referrer's list
                const referralsKey = `referrals_${referrerId}`;
                const currentReferrals = JSON.parse(localStorage.getItem(referralsKey) || '[]') as ReferredUser[];
                const newReferredUser: ReferredUser = {
                    name: newUser.name,
                    joinDate: newUser.registrationDate,
                    miningStatus: 'Active',
                    earned: `+${bonus} ORN`
                };
                currentReferrals.unshift(newReferredUser);
                localStorage.setItem(referralsKey, JSON.stringify(currentReferrals));
            }
        }

        onLogin(newUser);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
            const { password, ...userToLogin } = user;
            onLogin(userToLogin);
        } else {
            setError("Invalid email or password.");
        }
    };


    const EyeIcon: React.FC<{ closed?: boolean, className?: string }> = ({ closed, className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            {closed ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5s-8.573-3.007-9.963-7.178z" />
            )}
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231d4ed8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
            <div className="text-center mb-10">
                <LogoIcon className="w-20 h-20 mx-auto text-indigo-400" />
                <h1 className="text-4xl font-bold text-white mt-4">Orean Network</h1>
                <p className="text-indigo-300 text-lg">Your Gateway to Digital Mining</p>
            </div>

            <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
                 {error && <div className="bg-red-500/20 border border-red-500 text-red-300 text-center p-3 rounded-lg mb-6">{error}</div>}
                 <div className="grid md:grid-cols-2 gap-8">
                    {/* Registration Form */}
                    <div className={`transition-all duration-500 ${isLogin ? 'opacity-50 blur-sm scale-95 md:opacity-100 md:blur-none md:scale-100' : 'opacity-100'}`}>
                        <h2 className="text-2xl font-bold text-white mb-6">Registrasi</h2>
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2" htmlFor="nama">Nama Lengkap</label>
                                <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="nama" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required disabled={isLogin} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2" htmlFor="email-reg">Email</label>
                                <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="email-reg" type="email" placeholder="john.doe@example.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={isLogin} />
                            </div>
                            <div className="mb-6 relative">
                                <label className="block text-gray-400 text-sm mb-2" htmlFor="password-reg">Password</label>
                                <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="password-reg" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required disabled={isLogin} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-400">
                                    <EyeIcon closed={!showPassword} className="h-5 w-5" />
                                </button>
                            </div>
                             <div className="mb-6 relative">
                                <label className="block text-gray-400 text-sm mb-2" htmlFor="confirm-password">Konfirmasi Password</label>
                                <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="confirm-password" type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required disabled={isLogin}/>
                                 <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-400">
                                    <EyeIcon closed={!showConfirmPassword} className="h-5 w-5" />
                                </button>
                            </div>
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:bg-indigo-800 disabled:cursor-not-allowed" type="submit" disabled={isLogin}>
                                Registrasi
                            </button>
                            <p className="text-center text-gray-400 text-sm mt-4">
                                Sudah punya akun? <button type="button" onClick={toggleForm} className="font-bold text-indigo-400 hover:text-indigo-300">Login di sini</button>
                            </p>
                        </form>
                    </div>

                    {/* Login Form */}
                    <div className={`transition-all duration-500 ${!isLogin ? 'opacity-50 blur-sm scale-95 md:opacity-100 md:blur-none md:scale-100' : 'opacity-100'}`}>
                        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2" htmlFor="email-login">Email</label>
                                <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="email-login" type="email" placeholder="john.doe@example.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={!isLogin} />
                            </div>
                            <div className="mb-6 relative">
                                <label className="block text-gray-400 text-sm mb-2" htmlFor="password-login">Password</label>
                                <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" id="password-login" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required disabled={!isLogin}/>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-400">
                                    <EyeIcon closed={!showPassword} className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="h-20 md:h-[136px]"></div> {/* Spacer to align buttons */}
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:bg-indigo-800 disabled:cursor-not-allowed" type="submit" disabled={!isLogin}>
                                Login
                            </button>
                             <p className="text-center text-gray-400 text-sm mt-4">
                                Belum punya akun? <button type="button" onClick={toggleForm} className="font-bold text-indigo-400 hover:text-indigo-300">Registrasi</button> | <a href="#" className="font-bold text-indigo-400 hover:text-indigo-300">Lupa Password?</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;

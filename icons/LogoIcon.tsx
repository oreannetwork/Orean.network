import React from 'react';

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6L36 14V30L24 38L12 30V14L24 6Z" stroke="url(#paint0_linear_1_2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 22C26.2091 22 28 20.2091 28 18C28 15.7909 26.2091 14 24 14C21.7909 14 20 15.7909 20 18C20 20.2091 21.7909 22 24 22Z" stroke="url(#paint1_linear_1_2)" strokeWidth="2"/>
        <path d="M12 14L24 22L36 14" stroke="url(#paint2_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 30L20 26" stroke="url(#paint3_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M36 30L28 26" stroke="url(#paint4_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 38V22" stroke="url(#paint5_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="24" y1="6" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#4F46E5"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1_2" x1="24" y1="14" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A78BFA"/>
                <stop offset="1" stopColor="#6D28D9"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1_2" x1="24" y1="14" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                 <stop stopColor="#A78BFA"/>
                <stop offset="1" stopColor="#6D28D9"/>
            </linearGradient>
            <linearGradient id="paint3_linear_1_2" x1="16" y1="26" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                 <stop stopColor="#A78BFA"/>
                <stop offset="1" stopColor="#6D28D9"/>
            </linearGradient>
            <linearGradient id="paint4_linear_1_2" x1="32" y1="26" x2="32" y2="30" gradientUnits="userSpaceOnUse">
                 <stop stopColor="#A78BFA"/>
                <stop offset="1" stopColor="#6D28D9"/>
            </linearGradient>
            <linearGradient id="paint5_linear_1_2" x1="24" y1="22" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                 <stop stopColor="#A78BFA"/>
                <stop offset="1" stopColor="#6D28D9"/>
            </linearGradient>
        </defs>
    </svg>
);

export default LogoIcon;

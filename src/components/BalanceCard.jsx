import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Plus, Send, Repeat, Eye, EyeOff } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import SkeletonLoader from './SkeletonLoader';

const data = [
    { value: 4000 },
    { value: 3000 },
    { value: 2000 },
    { value: 2780 },
    { value: 1890 },
    { value: 2390 },
    { value: 3490 },
    { value: 4000 },
    { value: 4500 },
    { value: 4200 },
    { value: 5000 },
];

const BalanceCard = ({ addToast }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [displayBalance, setDisplayBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const targetBalance = 124532.89;

    // Animated counter effect
    useEffect(() => {
        // Simulate loading
        const loadTimer = setTimeout(() => setIsLoading(false), 1000);

        let start = 0;
        const duration = 2000; // 2 seconds
        const increment = targetBalance / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetBalance) {
                setDisplayBalance(targetBalance);
                clearInterval(timer);
            } else {
                setDisplayBalance(start);
            }
        }, 16);

        return () => {
            clearInterval(timer);
            clearTimeout(loadTimer);
        };
    }, []);

    if (isLoading) {
        return <SkeletonLoader type="balance" />;
    }

    const formatBalance = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover-shine purple-glow">
            {/* Gradient bloom removed for solid clean look */}

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-gray-400 text-sm font-medium">Total Balance</h2>
                        <button
                            onClick={() => setIsVisible(!isVisible)}
                            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                            title={isVisible ? "Hide balance" : "Show balance"}
                        >
                            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 font-display tracking-tight">
                        {isVisible ? formatBalance(displayBalance) : '••••••••'}
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg w-fit">
                        <ArrowUpRight size={16} />
                        <span className="text-sm font-medium">+12.5% this month</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4 mt-6">
                    <button
                        onClick={() => addToast('Deposit feature coming soon!', 'info')}
                        className="flex-1 flex items-center justify-center space-x-2 bg-white text-deep-purple-dark py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5 cursor-pointer"
                    >
                        <Plus size={18} />
                        <span>Deposit</span>
                    </button>
                    <button
                        onClick={() => addToast('Transfer modal opening...', 'info')}
                        className="flex-1 flex items-center justify-center space-x-2 bg-deep-purple-dark border border-white/10 text-white py-2.5 rounded-xl font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 hover:border-white/20 cursor-pointer"
                    >
                        <Send size={18} />
                        <span>Send</span>
                    </button>
                    <button
                        onClick={() => addToast('Opening converter...', 'info')}
                        className="p-2.5 rounded-xl bg-deep-purple-dark border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <Repeat size={20} />
                    </button>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 w-48 h-24 opacity-50 pointer-events-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e1b2e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}
                            labelStyle={{ color: '#9ca3af' }}
                            itemStyle={{ color: '#3B82F6' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BalanceCard;

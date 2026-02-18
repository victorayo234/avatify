import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, isPositive, icon: Icon, index = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    // Extract numeric value from string (e.g., "$12,345" -> 12345)
    const numericValue = typeof value === 'string'
        ? parseFloat(value.replace(/[^0-9.-]+/g, ''))
        : value;

    const isNumeric = !isNaN(numericValue);

    useEffect(() => {
        if (!isNumeric) {
            setDisplayValue(value);
            return;
        }

        let start = 0;
        const duration = 1500;
        const increment = numericValue / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
                setDisplayValue(numericValue);
                clearInterval(timer);
            } else {
                setDisplayValue(start);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [numericValue, isNumeric, value]);

    const formatValue = (val) => {
        if (!isNumeric) return value;

        // Preserve original formatting
        if (typeof value === 'string') {
            if (value.includes('$')) {
                return '$' + Math.floor(val).toLocaleString();
            }
            if (value.includes('%')) {
                return Math.floor(val) + '%';
            }
        }
        return Math.floor(val).toLocaleString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-deep-purple-accent/70 hover:shadow-[0_0_50px_-5px_rgba(147,51,234,0.5)] hover:-translate-y-1 transition-all duration-300"
        >
            {/* Hover Sheen Effect - Purple Tinted */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine z-10 pointer-events-none" />

            {/* Background Glow on Hover - Stronger */}
            <div className="absolute inset-0 bg-deep-purple-accent/0 group-hover:bg-deep-purple-accent/10 transition-colors duration-300 pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-deep-purple-dark rounded-xl border border-white/5 text-white">
                    <Icon size={20} />
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <div>
                <h3 className="text-gray-400 text-xs md:text-sm font-medium mb-1">{title}</h3>
                <div className="text-xl md:text-2xl font-bold text-white mb-2 font-display tracking-tight">
                    {formatValue(displayValue)}
                </div>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`flex items-center space-x-1 text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}
                >
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>{change}</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                </motion.div>
            </div>

            {/* Mini Sparkline Background Effect */}
            <div className="absolute -bottom-4 -right-4 w-32 h-20 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 50" className={`w-full h-full ${isPositive ? 'text-emerald-500' : 'text-rose-500'} fill-current`}>
                    <path d="M0,50 L0,40 Q10,30 20,45 T40,20 T60,35 T80,10 T100,25 L100,50 Z" />
                </svg>
            </div>
        </motion.div>
    );
};

export default StatCard;

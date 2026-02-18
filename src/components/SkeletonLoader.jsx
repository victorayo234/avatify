import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'default', count = 1, className = '' }) => {
    const skeletons = {
        // Card skeleton
        card: (
            <div className={`bg-deep-purple-surface border border-white/5 rounded-3xl p-6 ${className}`}>
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
                    <div className="h-8 bg-slate-700/50 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
                </div>
            </div>
        ),

        // Table row skeleton
        tableRow: (
            <div className="animate-pulse flex items-center space-x-4 p-4 border-b border-white/5">
                <div className="w-10 h-10 bg-slate-700/50 rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700/50 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-700/50 rounded w-1/3"></div>
                </div>
                <div className="h-4 bg-slate-700/50 rounded w-20"></div>
                <div className="h-4 bg-slate-700/50 rounded w-16"></div>
            </div>
        ),

        // Chart skeleton
        chart: (
            <div className={`bg-deep-purple-surface border border-white/5 rounded-3xl p-6 ${className}`}>
                <div className="animate-pulse">
                    <div className="h-4 bg-slate-700/50 rounded w-1/4 mb-4"></div>
                    <div className="h-64 bg-slate-700/50 rounded-2xl"></div>
                </div>
            </div>
        ),

        // Stat card skeleton
        statCard: (
            <div className={`bg-deep-purple-surface border border-white/5 rounded-3xl p-6 ${className}`}>
                <div className="animate-pulse space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
                        <div className="w-8 h-8 bg-slate-700/50 rounded-xl"></div>
                    </div>
                    <div className="h-8 bg-slate-700/50 rounded w-2/3"></div>
                    <div className="h-3 bg-slate-700/50 rounded w-1/2"></div>
                </div>
            </div>
        ),

        // Balance card skeleton
        balance: (
            <div className={`bg-gradient-to-br from-deep-purple-accent to-electric-blue-500 rounded-3xl p-6 ${className}`}>
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-white/20 rounded w-1/3"></div>
                    <div className="h-12 bg-white/20 rounded w-2/3"></div>
                    <div className="flex space-x-2">
                        <div className="h-10 bg-white/20 rounded-xl flex-1"></div>
                        <div className="h-10 bg-white/20 rounded-xl flex-1"></div>
                        <div className="h-10 bg-white/20 rounded-xl flex-1"></div>
                    </div>
                </div>
            </div>
        ),

        // Default skeleton
        default: (
            <div className={`animate-pulse ${className}`}>
                <div className="h-4 bg-slate-700/50 rounded w-full"></div>
            </div>
        )
    };

    const SkeletonComponent = skeletons[type] || skeletons.default;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={index > 0 ? 'mt-4' : ''}>
                    {SkeletonComponent}
                </div>
            ))}
        </motion.div>
    );
};

export default SkeletonLoader;

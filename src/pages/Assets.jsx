import React from 'react';
import BalanceCard from '../components/BalanceCard';
import TransactionHistory from '../components/TransactionHistory';
import StatCard from '../components/StatCard';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Assets = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">My Assets</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <BalanceCard />
                </div>
                <div className="space-y-6">
                    <StatCard title="Total Assets" value="$124,532" change="12.5%" isPositive={true} icon={Wallet} />
                    <StatCard title="Total Liabilities" value="$4,200" change="2.1%" isPositive={false} icon={CreditCard} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 hover-shine purple-glow group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">Income Stream</h3>
                        <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs">+8.2%</span>
                    </div>
                    <div className="h-40 flex items-center justify-center text-gray-500">
                        {/* Placeholder for income chart */}
                        <div className="w-full h-full bg-gradient-to-t from-emerald-500/10 to-transparent rounded-xl flex items-end p-4">
                            <div className="w-full text-center text-xs">Income Trend Visualization</div>
                        </div>
                    </div>
                </div>
                <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 hover-shine purple-glow group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">Expense Breakdown</h3>
                        <span className="text-rose-400 bg-rose-400/10 px-2 py-1 rounded text-xs">-2.4%</span>
                    </div>
                    <div className="h-40 flex items-center justify-center text-gray-500">
                        {/* Placeholder for expense chart */}
                        <div className="w-full h-full bg-gradient-to-t from-rose-500/10 to-transparent rounded-xl flex items-end p-4">
                            <div className="w-full text-center text-xs">Expense Trend Visualization</div>
                        </div>
                    </div>
                </div>
            </div>

            <TransactionHistory />
        </div>
    );
};

export default Assets;

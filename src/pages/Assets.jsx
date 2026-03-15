import React from 'react';
import BalanceCard from '../components/BalanceCard';
import TransactionHistory from '../components/TransactionHistory';
import StatCard from '../components/StatCard';
import GlobalCashflowMap from '../components/GlobalCashflowMap';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Assets = () => {
    return (
        <div className="w-full max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">My Assets</h2>

            <div className="grid grid-cols-1 min-[1301px]:grid-cols-2 gap-4 md:gap-6">
                {/* Left Column: Asset Stats */}
                <div className="space-y-4 md:space-y-6 flex flex-col h-full">
                    {/* Top Row: Balance and Stats Grid */}
                    <div className="grid grid-cols-1 min-[1301px]:grid-cols-3 gap-4 md:gap-6">
                        <div className="min-[1301px]:col-span-2 h-full min-h-[300px]">
                            <BalanceCard />
                        </div>
                        <div className="flex flex-col gap-4 md:gap-6 min-[1301px]:h-full">
                            <div className="flex-1">
                                <StatCard title="Total Assets" value="$124,532" change="12.5%" isPositive={true} icon={Wallet} />
                            </div>
                            <div className="flex-1">
                                <StatCard title="Total Liabilities" value="$4,200" change="2.1%" isPositive={false} icon={CreditCard} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Cashflow Map / Expenses */}
                    <div className="grid grid-cols-1 min-[1301px]:grid-cols-2 gap-4 md:gap-6 flex-1">
                        <GlobalCashflowMap />
                        <div className="bg-dark-grey-surface border border-white/5 rounded-3xl p-4 md:p-6 hover-shine ash-glow group flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-white text-sm md:text-base">Expense Breakdown</h3>
                                <span className="text-rose-400 bg-rose-400/10 px-2 py-1 rounded text-xs">-2.4%</span>
                            </div>
                            <div className="flex-1 min-h-[160px] flex items-center justify-center text-gray-500">
                                {/* Placeholder for expense chart */}
                                <div className="w-full h-full bg-gradient-to-t from-rose-500/10 to-transparent rounded-xl flex items-end p-4">
                                    <div className="w-full text-center text-xs">Expense Trend Visualization</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Transaction History */}
                <div className="h-full flex flex-col">
                    <TransactionHistory className="flex-1 h-full" />
                </div>
            </div>
        </div>
    );
};

export default Assets;

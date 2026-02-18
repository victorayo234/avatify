import React from 'react';
import MarketChart from '../components/MarketChart';
import Converter from '../components/Converter';
import StatCard from '../components/StatCard';
import SessionsByCountry from '../components/SessionsByCountry';
import TransactionHistory from '../components/TransactionHistory';
import SalesEstimation from '../components/SalesEstimation';
import CustomerSatisfaction from '../components/CustomerSatisfaction';
import RecentActivity from '../components/RecentActivity';
import BalanceCard from '../components/BalanceCard';
import { Wallet, DollarSign, TrendingUp, Activity } from 'lucide-react';

const Dashboard = ({ addToast }) => {
    return (
        <div className="space-y-6">
            {/* Top Row: Balance Card & Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Balance Card Section - Spans 2 columns on large screens */}
                <div className="lg:col-span-2 h-full">
                    <BalanceCard addToast={addToast} />
                </div>

                {/* Stat Cards - 2 columns */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <StatCard title="Total Income" value="$48,574" change="+23%" isPositive={true} icon={TrendingUp} index={0} />
                    <StatCard title="Total Profit" value="$12,340" change="+18%" isPositive={true} icon={DollarSign} index={1} />
                </div>
            </div>

            {/* Second Row: Wide Market Chart & Smaller Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <MarketChart />
                </div>
                <div className="lg:col-span-1">
                    <SalesEstimation />
                </div>
            </div>

            {/* Third Row: Density Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <SessionsByCountry />
                </div>
                <div className="lg:col-span-1">
                    <CustomerSatisfaction />
                </div>
                <div className="lg:col-span-2">
                    <RecentActivity />
                </div>
            </div>

            {/* Fourth Row: Converter & Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <Converter addToast={addToast} />
                </div>
                {/* Transaction History - Spans 3 columns */}
                <div className="lg:col-span-3">
                    <TransactionHistory addToast={addToast} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

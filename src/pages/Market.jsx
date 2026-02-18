import React from 'react';
import MarketChart from '../components/MarketChart';
import SalesEstimation from '../components/SalesEstimation';
import SessionsByCountry from '../components/SessionsByCountry';

const Market = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Market Overview</h2>

            {/* Main Chart - Full Width */}
            <div className="w-full">
                <MarketChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesEstimation />
                <SessionsByCountry />
            </div>

            <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-8 text-center hover-shine purple-glow">
                <h3 className="text-xl font-bold text-white mb-2">Advanced Market Analysis Tools</h3>
                <p className="text-gray-400 mb-6">Unlock premium features to access real-time forex signals and AI-driven predictions.</p>
                <button
                    onClick={() => addToast('Pro subscription features coming soon!', 'info')}
                    className="px-6 py-3 bg-deep-purple-accent text-white font-bold rounded-xl hover:bg-purple-600 transition-all hover:scale-105 hover:shadow-lg shadow-deep-purple-accent/30"
                >
                    Upgrade to Pro
                </button>
            </div>
        </div>
    );
};

export default Market;

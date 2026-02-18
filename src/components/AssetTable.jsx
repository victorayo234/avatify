import React from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

const assets = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$45,231.89', change: '+2.4%', isPositive: true, marketCap: '$880B' },
    { name: 'Ethereum', symbol: 'ETH', price: '$3,210.45', change: '-1.2%', isPositive: false, marketCap: '$380B' },
    { name: 'Solana', symbol: 'SOL', price: '$98.50', change: '+5.6%', isPositive: true, marketCap: '$42B' },
    { name: 'Cardano', symbol: 'ADA', price: '$0.52', change: '-0.8%', isPositive: false, marketCap: '$18B' },
];

const AssetTable = () => {
    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Top Assets</h3>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-400 text-sm border-b border-white/5">
                            <th className="pb-4 font-medium">Asset</th>
                            <th className="pb-4 font-medium text-right">Price</th>
                            <th className="pb-4 font-medium text-right">24h Change</th>
                            <th className="pb-4 font-medium text-right hidden sm:table-cell">Market Cap</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {assets.map((asset) => (
                            <tr key={asset.symbol} className="group hover:bg-white/5 transition-colors">
                                <td className="py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-deep-purple-dark flex items-center justify-center font-bold text-xs text-white border border-white/5">
                                            {asset.symbol.substring(0, 1)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{asset.name}</div>
                                            <div className="text-xs text-gray-500">{asset.symbol}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-right font-medium text-white">{asset.price}</td>
                                <td className="py-4 text-right">
                                    <div className={`flex items-center justify-end space-x-1 ${asset.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {asset.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                        <span className="font-medium">{asset.change}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-right text-gray-400 hidden sm:table-cell">{asset.marketCap}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetTable;

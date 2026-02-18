import React, { useState } from 'react';
import { MoreHorizontal, Download, RefreshCcw, Search, ArrowUpDown } from 'lucide-react';

const transactions = [
    { id: '#TRX-9821', name: 'Spotify Subscription', date: 'Dec 13, 2023', amount: '-$14.99', status: 'Success', statusColor: 'bg-emerald-500/10 text-emerald-500', isIncome: false },
    { id: '#TRX-9822', name: 'Freelance Payment', date: 'Dec 13, 2023', amount: '+$3,021.50', status: 'Processing', statusColor: 'bg-orange-500/10 text-orange-500', isIncome: true },
    { id: '#TRX-9823', name: 'Apple Store Purchase', date: 'Dec 12, 2023', amount: '-$999.00', status: 'Success', statusColor: 'bg-emerald-500/10 text-emerald-500', isIncome: false },
    { id: '#TRX-9824', name: 'Figma Subscription', date: 'Dec 12, 2023', amount: '-$15.00', status: 'Pending', statusColor: 'bg-slate-700/50 text-gray-400', isIncome: false },
    { id: '#TRX-9825', name: 'Bitcoin Sale', date: 'Dec 11, 2023', amount: '+$12,400.00', status: 'Success', statusColor: 'bg-emerald-500/10 text-emerald-500', isIncome: true },
    { id: '#TRX-9826', name: 'Netflix Subscription', date: 'Dec 10, 2023', amount: '-$19.99', status: 'Success', statusColor: 'bg-emerald-500/10 text-emerald-500', isIncome: false },
    { id: '#TRX-9827', name: 'Upwork Payment', date: 'Dec 09, 2023', amount: '+$1,250.00', status: 'Success', statusColor: 'bg-emerald-500/10 text-emerald-500', isIncome: true },
    { id: '#TRX-9828', name: 'Server Costs', date: 'Dec 08, 2023', amount: '-$450.00', status: 'Failed', statusColor: 'bg-red-500/10 text-red-500', isIncome: false },
];

const TransactionHistory = ({ addToast }) => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    // Filter transactions
    const filteredTransactions = transactions.filter(trx => {
        const matchesFilter = filter === 'all' ||
            (filter === 'income' && trx.isIncome) ||
            (filter === 'expense' && !trx.isIncome);

        const matchesSearch = trx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trx.id.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    // Sort transactions
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'date') {
            comparison = new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'amount') {
            const amountA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ''));
            const amountB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ''));
            comparison = amountA - amountB;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const toggleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('desc');
        }
    };

    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 hover-shine purple-glow group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-bold text-white">Transaction History</h3>

                <div className="flex space-x-2">
                    <button
                        onClick={() => addToast('Exporting transaction data...', 'success')}
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                    >
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => addToast('Syncing blockchain data...', 'info')}
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium bg-deep-purple-accent text-white hover:bg-purple-600 transition-all shadow-lg shadow-deep-purple-accent/20"
                    >
                        <RefreshCcw size={16} />
                        <span>Sync</span>
                    </button>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'all'
                            ? 'bg-deep-purple-accent text-white shadow-lg shadow-deep-purple-accent/20'
                            : 'bg-deep-purple-dark text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('income')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'income'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                            : 'bg-deep-purple-dark text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Income
                    </button>
                    <button
                        onClick={() => setFilter('expense')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'expense'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                            : 'bg-deep-purple-dark text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Expenses
                    </button>
                </div>

                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-deep-purple-dark border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-deep-purple-accent/50 transition-all"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                            <th className="pb-4 font-medium pl-4">Transaction</th>
                            <th className="pb-4 font-medium text-center">Status</th>
                            <th
                                className="pb-4 font-medium cursor-pointer hover:text-white transition-colors group"
                                onClick={() => toggleSort('date')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Date</span>
                                    <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                            <th
                                className="pb-4 font-medium text-right pr-4 cursor-pointer hover:text-white transition-colors group"
                                onClick={() => toggleSort('amount')}
                            >
                                <div className="flex items-center justify-end space-x-1">
                                    <span>Amount</span>
                                    <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-white/5">
                        {sortedTransactions.map((trx) => (
                            <tr key={trx.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-4 pl-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${trx.isIncome ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {trx.isIncome ? '↓' : '↑'}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{trx.name}</div>
                                            <div className="text-xs text-gray-500">{trx.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${trx.statusColor}`}>
                                        {trx.status === 'Success' && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />}
                                        {trx.status}
                                    </span>
                                </td>
                                <td className="py-4 text-gray-400 font-medium">{trx.date}</td>
                                <td className={`py-4 pr-4 text-right font-bold ${trx.isIncome ? 'text-emerald-400' : 'text-white'}`}>
                                    {trx.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {sortedTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No transactions found matching your criteria.
                </div>
            )}

            <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-500">Showing {sortedTransactions.length} of {transactions.length} entries</span>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 rounded-lg border border-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">Previous</button>
                    <button className="px-3 py-1 rounded-lg border border-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">Next</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;

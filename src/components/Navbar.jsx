import React, { useState } from 'react';
import { Search, Bell, Calendar, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const Navbar = ({ onMenuClick, addToast }) => {
    const { theme, toggleTheme } = useTheme();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const notifications = [
        { id: 1, title: 'New deposit received', message: '+$3,021.50 from Freelance', time: '2 min ago', unread: true },
        { id: 2, title: 'Bitcoin price alert', message: 'BTC reached $45,000', time: '1 hr ago', unread: true },
        { id: 3, title: 'Transaction completed', message: 'Spotify subscription paid', time: '3 hrs ago', unread: false },
    ];

    const searchSuggestions = [
        { type: 'crypto', name: 'Bitcoin', symbol: 'BTC', price: '$45,231' },
        { type: 'crypto', name: 'Ethereum', symbol: 'ETH', price: '$2,891' },
        { type: 'action', name: 'Send Money', icon: '💸' },
        { type: 'action', name: 'View Transactions', icon: '📊' },
    ];

    const handleSearch = (value) => {
        if (value.length > 0) {
            const filtered = searchSuggestions.filter(item =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                (item.symbol && item.symbol.toLowerCase().includes(value.toLowerCase()))
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 md:hidden transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard Overview</h1>
                        <p className="text-gray-400 text-xs md:text-sm mt-1 hidden sm:block">Welcome back, get your latest updates here.</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3 md:space-x-6">
                    {/* Interactive Search Bar */}
                    <div className={`relative group hidden sm:block transition-all duration-300 ${isSearchFocused ? 'w-96' : 'w-64'}`}>
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-deep-purple-accent' : 'text-gray-500'}`} size={18} />
                        <input
                            type="text"
                            placeholder="Type 'btc', 'eth'..."
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => {
                                setIsSearchFocused(false);
                                setSearchResults([]);
                            }, 200)}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value) {
                                    addToast(`Searching for: ${e.target.value}`, 'info');
                                    e.target.value = '';
                                    setSearchResults([]);
                                }
                            }}
                            className={`bg-slate-800/50 border rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-deep-purple-accent/50 w-full transition-all ${isSearchFocused ? 'border-deep-purple-accent/50 bg-slate-800' : 'border-white/10'}`}
                        />

                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                            {searchResults.length > 0 && isSearchFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full mt-2 w-full bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                                >
                                    {searchResults.map((result, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                addToast(`Selected: ${result.name}`, 'success');
                                                setSearchResults([]);
                                                setIsSearchFocused(false);
                                            }}
                                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                        >
                                            <div className="flex items-center space-x-3">
                                                {result.type === 'crypto' ? (
                                                    <div className="w-8 h-8 rounded-full bg-deep-purple-accent/20 flex items-center justify-center text-xs font-bold">
                                                        {result.symbol}
                                                    </div>
                                                ) : (
                                                    <span className="text-2xl">{result.icon}</span>
                                                )}
                                                <div className="text-left">
                                                    <div className="text-sm font-medium text-white">{result.name}</div>
                                                    {result.symbol && <div className="text-xs text-gray-400">{result.symbol}</div>}
                                                </div>
                                            </div>
                                            {result.price && <span className="text-sm font-bold text-emerald-400">{result.price}</span>}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Search Icon for mobile */}
                    <button className="sm:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-slate-800/50">
                        <Search size={20} />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => {
                            toggleTheme();
                            addToast(`Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`, 'success');
                        }}
                        className="p-2 md:p-2.5 rounded-xl hover:bg-slate-800/50 text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/10"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Date Display */}
                    <div className="hidden lg:flex items-center space-x-2 text-gray-400 bg-slate-800/50 px-4 py-2.5 rounded-xl border border-white/10">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 md:p-2.5 rounded-xl hover:bg-slate-800/50 text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/10"
                        >
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-electric-blue-500 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
                        </button>

                        {/* Notification Dropdown */}
                        <AnimatePresence>
                            {showNotifications && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowNotifications(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                                    >
                                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                            <h3 className="font-bold text-white">Notifications</h3>
                                            <button
                                                onClick={() => setShowNotifications(false)}
                                                className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notif) => (
                                                <button
                                                    key={notif.id}
                                                    onClick={() => {
                                                        addToast(notif.message, 'info');
                                                        setShowNotifications(false);
                                                    }}
                                                    className={`w-full p-4 flex items-start space-x-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${notif.unread ? 'bg-deep-purple-accent/5' : ''}`}
                                                >
                                                    <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-electric-blue-500' : 'bg-transparent'}`} />
                                                    <div className="flex-1 text-left">
                                                        <div className="text-sm font-medium text-white">{notif.title}</div>
                                                        <div className="text-xs text-gray-400 mt-1">{notif.message}</div>
                                                        <div className="text-xs text-gray-500 mt-1">{notif.time}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="p-3 border-t border-white/10">
                                            <button className="w-full py-2 text-sm font-medium text-deep-purple-accent hover:text-purple-400 transition-colors">
                                                View all notifications
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Profile Pic */}
                    <div className="md:hidden w-8 h-8 rounded-full bg-deep-purple-accent flex items-center justify-center font-bold text-xs text-white">
                        AV
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

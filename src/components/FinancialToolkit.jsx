import React, { useState, useEffect } from 'react';
import { 
    ArrowRightLeft, 
    TrendingUp, 
    Clock, 
    Calculator, 
    Coins, 
    Briefcase, 
    Home, 
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Info,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FinancialToolkit = ({ addToast, variant = 'full' }) => {
    const isCompact = variant === 'compact';
    const [activeTab, setActiveTab] = useState(isCompact ? 'currency' : 'currency');
    const [isLoading, setIsLoading] = useState(false);

    // --- CURRENCY STATE ---
    const [amount, setAmount] = useState('1000');
    const [fromCurrency, setFromCurrency] = useState('BTC');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [conversionHistory, setConversionHistory] = useState([]);

    // --- INVESTMENT STATE ---
    const [principal, setPrincipal] = useState('5000');
    const [rate, setRate] = useState('8');
    const [years, setYears] = useState('10');
    const [monthlyContribution, setMonthlyContribution] = useState('500');
    const [investmentResult, setInvestmentResult] = useState({ total: 0, contributions: 0, interest: 0 });

    // --- LOAN STATE ---
    const [loanAmount, setLoanAmount] = useState('250000');
    const [loanRate, setLoanRate] = useState('4.5');
    const [loanTerm, setLoanTerm] = useState('30');
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const exchangeRates = {
        BTC: { USD: 45231.89, EUR: 41850.23, GBP: 35420.15, ETH: 18.5, NGN: 72371024 },
        ETH: { USD: 2445.67, EUR: 2261.34, GBP: 1914.89, BTC: 0.054, NGN: 3913072 },
        USD: { BTC: 0.0000221, ETH: 0.000409, EUR: 0.925, GBP: 0.783, NGN: 1600 },
        EUR: { BTC: 0.0000239, ETH: 0.000442, USD: 1.081, GBP: 0.846, NGN: 1735 },
        GBP: { BTC: 0.0000282, ETH: 0.000522, USD: 1.277, EUR: 1.182, NGN: 2045 },
        NGN: { BTC: 0.0000000138, ETH: 0.000000255, USD: 0.000625, EUR: 0.000576, GBP: 0.000489 }
    };

    const currencies = [
        { code: 'BTC', name: 'Bitcoin', symbol: '₿', icon: <Coins className="text-orange-500" size={16} /> },
        { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', icon: <Coins className="text-blue-400" size={16} /> },
        { code: 'USD', name: 'US Dollar', symbol: '$', icon: <span className="text-emerald-500 text-xs font-bold">$</span> },
        { code: 'EUR', name: 'Euro', symbol: '€', icon: <span className="text-blue-500 text-xs font-bold">€</span> },
        { code: 'GBP', name: 'British Pound', symbol: '£', icon: <span className="text-indigo-400 text-xs font-bold">£</span> },
        { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', icon: <span className="text-theme-ash text-xs font-bold">₦</span> }
    ];

    // --- ACTIONS ---
    useEffect(() => {
        if (activeTab === 'currency') {
            const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
            setConvertedAmount(parseFloat(amount || 0) * rate);
        }
    }, [amount, fromCurrency, toCurrency, activeTab]);

    useEffect(() => {
        if (activeTab === 'investment') {
            const p = parseFloat(principal || 0);
            const r = parseFloat(rate || 0) / 100 / 12;
            const n = parseFloat(years || 0) * 12;
            const c = parseFloat(monthlyContribution || 0);

            let total = p;
            let totalContributions = p;

            for (let i = 0; i < n; i++) {
                total = (total + c) * (1 + r);
                totalContributions += c;
            }

            setInvestmentResult({
                total,
                contributions: totalContributions,
                interest: total - totalContributions
            });
        }
    }, [principal, rate, years, monthlyContribution, activeTab]);

    useEffect(() => {
        if (activeTab === 'loan') {
            const p = parseFloat(loanAmount || 0);
            const r = parseFloat(loanRate || 0) / 100 / 12;
            const n = parseFloat(loanTerm || 0) * 12;

            if (r === 0) {
                setMonthlyPayment(p / n);
            } else {
                const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
                setMonthlyPayment(emi);
            }
        }
    }, [loanAmount, loanRate, loanTerm, activeTab]);

    const handleCurrencyConvert = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newHistory = {
                id: Date.now(),
                text: `${amount} ${fromCurrency} → ${convertedAmount.toLocaleString()} ${toCurrency}`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setConversionHistory([newHistory, ...conversionHistory].slice(0, 5));
            setIsLoading(false);
            addToast('Exchange synchronized', 'success');
        }, 600);
    };

    const tabs = [
        { id: 'currency', label: 'Exchange', icon: RefreshCw },
        { id: 'investment', label: 'Investments', icon: Briefcase },
        { id: 'loan', label: 'Repayments', icon: Home }
    ];

    return (
        <div className={`${isCompact ? '' : 'flex flex-col gap-6 lg:flex-row max-w-5xl mx-auto w-full pt-4'}`}>
            {/* Main Calculator Area */}
            <div className="flex-1 space-y-6">
                {/* Visual Header / Tab Overlays removed for cleaner look */}
                <div className={`bg-dark-grey-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden group ${isCompact ? 'p-6' : 'p-8 min-h-[600px] flex flex-col'}`}>
                    {!isCompact && (
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp size={120} />
                        </div>
                    )}

                    <div className="relative z-10">
                        {/* Tab Switcher - Only in full mode */}
                        {!isCompact && (
                            <div className="flex space-x-1 bg-dark-grey-base/50 p-1 rounded-2xl border border-white/5 mb-8 w-fit">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab.id 
                                            ? 'bg-theme-ash text-white shadow-lg' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <tab.icon size={16} />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            {/* CURRENCY TAB */}
                            {activeTab === 'currency' && (
                                <motion.div
                                    key="currency"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={isCompact ? 'space-y-3' : 'space-y-6'}
                                >
                                    {isCompact && (
                                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                                            <div className="flex items-center space-x-2">
                                                <RefreshCw size={14} className="text-theme-ash" />
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quick Swap</h4>
                                            </div>
                                            <div className="text-[10px] text-gray-500 font-medium">Live Rates</div>
                                        </div>
                                    )}

                                    <div className={`grid grid-cols-1 ${isCompact ? 'gap-3' : 'lg:grid-cols-2 gap-6 items-end'}`}>
                                        <div className="space-y-1.5">
                                            <label className={`text-[10px] font-bold text-gray-500 uppercase tracking-widest ${isCompact ? 'ml-2' : 'ml-4'}`}>Send</label>
                                            <div className={`flex items-center bg-dark-grey-base border border-white/5 rounded-2xl focus-within:border-theme-ash/40 transition-colors ${isCompact ? 'p-3' : 'p-4'}`}>
                                                <select 
                                                    value={fromCurrency} 
                                                    onChange={(e) => setFromCurrency(e.target.value)}
                                                    className="bg-transparent text-white font-bold outline-none cursor-pointer pr-3 border-r border-white/10 mr-3 text-sm"
                                                >
                                                    {currencies.map(c => <option key={c.code} value={c.code} className="bg-dark-grey-base">{c.code}</option>)}
                                                </select>
                                                <input 
                                                    type="number" 
                                                    value={amount} 
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    className={`bg-transparent flex-1 text-white font-display font-bold outline-none ${isCompact ? 'text-lg' : 'text-2xl'}`}
                                                />
                                            </div>
                                        </div>

                                        {!isCompact && (
                                            <div className="flex justify-center md:pb-6">
                                                <button 
                                                    onClick={() => {
                                                        const tmp = fromCurrency;
                                                        setFromCurrency(toCurrency);
                                                        setToCurrency(tmp);
                                                    }}
                                                    className="bg-dark-grey-base border border-white/5 hover:border-theme-ash/40 p-4 rounded-full text-gray-400 hover:text-white transition-all transform hover:rotate-180"
                                                >
                                                    <ArrowRightLeft size={24} />
                                                </button>
                                            </div>
                                        )}

                                        <div className="space-y-1.5">
                                            <label className={`text-[10px] font-bold text-gray-500 uppercase tracking-widest ${isCompact ? 'ml-2' : 'ml-4'}`}>Receive</label>
                                            <div className={`flex items-center bg-dark-grey-base border border-white/5 rounded-2xl ${isCompact ? 'p-3' : 'p-4'}`}>
                                                <select 
                                                    value={toCurrency} 
                                                    onChange={(e) => setToCurrency(e.target.value)}
                                                    className="bg-transparent text-white font-bold outline-none cursor-pointer pr-3 border-r border-white/10 mr-3 text-sm"
                                                >
                                                    {currencies.map(c => <option key={c.code} value={c.code} className="bg-dark-grey-base">{c.code}</option>)}
                                                </select>
                                                <div className={`flex-1 text-theme-ash-light font-display font-bold ${isCompact ? 'text-lg' : 'text-2xl'}`}>
                                                    {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: (isCompact ? 2 : 4) })}
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={handleCurrencyConvert}
                                            disabled={isLoading}
                                            className={`w-full bg-theme-ash text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-theme-ash-light transition-colors group shadow-xl ${isCompact ? 'py-3 mt-1' : 'py-4 mt-0'}`}
                                        >
                                            {isLoading ? <RefreshCw className="animate-spin" /> : <><span>{isCompact ? 'Swap Now' : 'Execute Conversion'}</span> <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* INVESTMENT TAB */}
                            {activeTab === 'investment' && (
                                <motion.div
                                    key="investment"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                                >
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Principal</label>
                                                <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full bg-dark-grey-base border border-white/5 p-3 rounded-xl text-white font-bold outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Contribution /mo</label>
                                                <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full bg-dark-grey-base border border-white/5 p-3 rounded-xl text-white font-bold outline-none" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">ROI (%)</label>
                                                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full bg-dark-grey-base border border-white/5 p-3 rounded-xl text-white font-bold outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Years</label>
                                                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-dark-grey-base border border-white/5 p-3 rounded-xl text-white font-bold outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-theme-ash/5 border border-theme-ash/10 rounded-3xl p-6 flex flex-col justify-center text-center space-y-4">
                                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Future Projection</div>
                                        <div className="text-4xl xl:text-5xl font-display font-black text-white">
                                            ${Math.floor(investmentResult.total).toLocaleString()}
                                        </div>
                                        <div className="flex justify-between text-xs font-bold pt-4 border-t border-white/5">
                                            <div className="text-gray-500">INVESTED: <span className="text-white">${Math.floor(investmentResult.contributions).toLocaleString()}</span></div>
                                            <div className="text-emerald-500">RETURNS: <span className="text-emerald-400">+${Math.floor(investmentResult.interest).toLocaleString()}</span></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* LOAN TAB */}
                            {activeTab === 'loan' && (
                                <motion.div
                                    key="loan"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                                >
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Borrowed Amount</label>
                                            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full bg-dark-grey-base border border-white/5 p-4 rounded-xl text-white text-xl font-bold outline-none" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Annual Rate (%)</label>
                                                <input type="number" value={loanRate} onChange={(e) => setLoanRate(e.target.value)} className="w-full bg-dark-grey-base border border-white/5 p-3 rounded-xl text-white font-bold outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Term (Years)</label>
                                                <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full bg-dark-grey-base border border-white/5 p-3 rounded-xl text-white font-bold outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-rose-500/5 border border-rose-500/10 rounded-3xl p-6 flex flex-col justify-center text-center space-y-4">
                                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Monthly Commitment</div>
                                        <div className="text-4xl xl:text-5xl font-display font-black text-rose-400">
                                            ${Math.floor(monthlyPayment).toLocaleString()}
                                        </div>
                                        <p className="text-xs text-gray-500">Based on a {loanTerm} year fixed term at {loanRate}% AIR.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Sub-Information Grid - Hide in compact */}
                {!isCompact && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-dark-grey-surface/40 border border-white/5 rounded-3xl p-6 flex items-start space-x-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500"><TrendingUp size={24} /></div>
                            <div>
                                <div className="text-sm font-bold text-white mb-1">Market Volatility</div>
                                <div className="text-xs text-gray-500">Low - Stable environment for calculations.</div>
                            </div>
                        </div>
                        <div className="bg-dark-grey-surface/40 border border-white/5 rounded-3xl p-6 flex items-start space-x-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Info size={24} /></div>
                            <div>
                                <div className="text-sm font-bold text-white mb-1">Fee Estimates</div>
                                <div className="text-xs text-gray-500">Standard network fees (~0.002%) apply.</div>
                            </div>
                        </div>
                        <div className="bg-dark-grey-surface/40 border border-white/5 rounded-3xl p-6 flex items-start space-x-4">
                            <div className="p-3 bg-theme-ash/10 rounded-2xl text-theme-ash-light"><RefreshCw size={24} /></div>
                            <div>
                                <div className="text-sm font-bold text-white mb-1">Auto-Sync</div>
                                <div className="text-xs text-gray-500">Rates updated 42 seconds ago.</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar: Activity & Insights - Hide in compact */}
            {!isCompact && (
                <div className="lg:w-80 space-y-6">
                    <div className="bg-dark-grey-surface border border-white/5 rounded-3xl p-6 h-full">
                        <div className="flex items-center space-x-2 text-white font-bold mb-6">
                            <Clock size={18} />
                            <span>Recent Logs</span>
                        </div>

                        <div className="space-y-4">
                            {conversionHistory.length > 0 ? conversionHistory.map(h => (
                                <div key={h.id} className="relative pl-6 pb-4 border-l border-white/5 last:pb-0">
                                    <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-theme-ash" />
                                    <div className="text-xs text-white font-semibold mb-1">{h.text}</div>
                                    <div className="text-[10px] text-gray-500 uppercase">{h.time}</div>
                                </div>
                            )) : (
                                <div className="text-center py-12 text-gray-500 text-sm">
                                    <Calculator className="mx-auto mb-3 opacity-20" size={40} />
                                    <p>No recent toolkit activity detected.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">System Health</div>
                            <div className="bg-dark-grey-base p-4 rounded-2xl space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400">Node Latency</span>
                                    <span className="text-emerald-500">12ms</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400">API Uptime</span>
                                    <span className="text-emerald-500">99.98%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinancialToolkit;


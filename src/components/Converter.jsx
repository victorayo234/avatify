import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, Clock } from 'lucide-react';

const Converter = ({ addToast }) => {
    const [amount, setAmount] = useState('1');
    const [fromCurrency, setFromCurrency] = useState('BTC');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [conversionHistory, setConversionHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Exchange rates (static for reliability, but you could use an API)
    const exchangeRates = {
        BTC: { USD: 45231.89, EUR: 41850.23, GBP: 35420.15, ETH: 18.5 },
        ETH: { USD: 2445.67, EUR: 2261.34, GBP: 1914.89, BTC: 0.054 },
        USD: { BTC: 0.0000221, ETH: 0.000409, EUR: 0.925, GBP: 0.783 },
        EUR: { BTC: 0.0000239, ETH: 0.000442, USD: 1.081, GBP: 0.846 },
        GBP: { BTC: 0.0000282, ETH: 0.000522, USD: 1.277, EUR: 1.182 }
    };

    const currencies = [
        { code: 'BTC', name: 'Bitcoin', symbol: '₿', color: 'orange' },
        { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', color: 'blue' },
        { code: 'USD', name: 'US Dollar', symbol: '$', color: 'green' },
        { code: 'EUR', name: 'Euro', symbol: '€', color: 'blue' },
        { code: 'GBP', name: 'British Pound', symbol: '£', color: 'purple' }
    ];

    const getCurrencyInfo = (code) => currencies.find(c => c.code === code) || currencies[0];

    // Calculate conversion
    useEffect(() => {
        const calculate = () => {
            const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
            const result = parseFloat(amount || 0) * rate;
            setConvertedAmount(result);
        };
        calculate();
    }, [amount, fromCurrency, toCurrency]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        addToast('Currencies swapped!', 'success');
    };

    const handleConvert = () => {
        setIsLoading(true);

        setTimeout(() => {
            const newConversion = {
                id: Date.now(),
                from: fromCurrency,
                to: toCurrency,
                amount: parseFloat(amount),
                result: convertedAmount,
                rate: exchangeRates[fromCurrency][toCurrency],
                timestamp: new Date().toLocaleTimeString()
            };

            setConversionHistory(prev => [newConversion, ...prev].slice(0, 3));
            setIsLoading(false);
            addToast(`Converted ${amount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}`, 'success');
        }, 500);
    };

    const fromInfo = getCurrencyInfo(fromCurrency);
    const toInfo = getCurrencyInfo(toCurrency);

    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Currency Converter</h3>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <TrendingUp size={14} />
                    <span>Live Rates</span>
                </div>
            </div>

            <div className="space-y-4">
                {/* From Currency */}
                <div className="bg-deep-purple-dark border border-white/5 rounded-2xl p-4">
                    <div className="text-sm text-gray-400 mb-2">From</div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full bg-${fromInfo.color}-500/20 flex items-center justify-center text-${fromInfo.color}-500 font-bold text-xs`}>
                                {fromInfo.symbol}
                            </div>
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                            >
                                {currencies.map(curr => (
                                    <option key={curr.code} value={curr.code} className="bg-deep-purple-dark">
                                        {curr.code} - {curr.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent text-right text-white font-bold text-xl focus:outline-none w-32"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-2 relative z-10">
                    <button
                        onClick={handleSwap}
                        className="bg-deep-purple-accent hover:bg-purple-600 text-white p-2 rounded-xl transition-all transform hover:scale-110 hover:rotate-180"
                    >
                        <ArrowRightLeft size={20} />
                    </button>
                </div>

                {/* To Currency */}
                <div className="bg-deep-purple-dark border border-white/5 rounded-2xl p-4">
                    <div className="text-sm text-gray-400 mb-2">To</div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full bg-${toInfo.color}-500/20 flex items-center justify-center text-${toInfo.color}-500 font-bold text-xs`}>
                                {toInfo.symbol}
                            </div>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                            >
                                {currencies.map(curr => (
                                    <option key={curr.code} value={curr.code} className="bg-deep-purple-dark">
                                        {curr.code} - {curr.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-right text-white font-bold text-xl">
                            {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })}
                        </div>
                    </div>
                </div>

                {/* Exchange Rate */}
                <div className="bg-slate-800/30 border border-white/5 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">Exchange Rate</div>
                    <div className="text-sm font-semibold text-white">
                        1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency]?.toLocaleString()} {toCurrency}
                    </div>
                </div>

                {/* Convert Button */}
                <button
                    onClick={handleConvert}
                    disabled={isLoading}
                    className="w-full bg-deep-purple-accent hover:bg-purple-600 text-white font-medium py-4 rounded-xl transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Converting...' : 'Convert Now'}
                </button>

                {/* Conversion History */}
                {conversionHistory.length > 0 && (
                    <div className="mt-6 space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                            <Clock size={14} />
                            <span>Recent Conversions</span>
                        </div>
                        {conversionHistory.map(conv => (
                            <div key={conv.id} className="bg-slate-800/30 border border-white/5 rounded-xl p-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <div className="text-gray-400">
                                        {conv.amount} {conv.from} → {conv.result.toFixed(2)} {conv.to}
                                    </div>
                                    <div className="text-xs text-gray-500">{conv.timestamp}</div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Rate: {conv.rate.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Converter;

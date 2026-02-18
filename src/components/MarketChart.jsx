import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const initialData = [
    { name: 'Jan', price: 4000 },
    { name: 'Feb', price: 3000 },
    { name: 'Mar', price: 2000 },
    { name: 'Apr', price: 2780 },
    { name: 'May', price: 1890 },
    { name: 'Jun', price: 2390 },
    { name: 'Jul', price: 3490 },
    { name: 'Aug', price: 4200 },
    { name: 'Sep', price: 3800 },
    { name: 'Oct', price: 5000 },
    { name: 'Nov', price: 5900 },
    { name: 'Dec', price: 6500 },
];

const MarketChart = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
    const [chartData, setChartData] = useState(initialData);
    const timeframes = ['1D', '1W', '1M', '1Y', 'ALL'];

    const handleTimeframeChange = (tf) => {
        setSelectedTimeframe(tf);
        // Simulate data change
        const multiplier = tf === '1D' ? 0.8 : tf === '1W' ? 1.2 : tf === '1M' ? 0.9 : 1;
        const newData = initialData.map(item => ({
            ...item,
            price: Math.floor(item.price * multiplier * (0.9 + Math.random() * 0.2))
        }));
        setChartData(newData);
    };

    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 relative overflow-hidden h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Market Overview</h3>
                    <p className="text-sm text-gray-400">Bitcoin Price Trends</p>
                </div>
                <div className="flex p-1 bg-deep-purple-dark rounded-xl border border-white/5">
                    {timeframes.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => handleTimeframeChange(tf)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${selectedTimeframe === tf
                                ? 'bg-deep-purple-accent text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                            </linearGradient>
                            <filter id="glow" height="200%" width="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.576  0 0 0 0 0.2  0 0 0 0 0.917  0 0 0 1 0" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#64748b"
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e1b2e',
                                borderColor: 'rgba(255,255,255,0.05)',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                                color: '#fff',
                                padding: '12px'
                            }}
                            itemStyle={{ color: '#d8b4fe', fontWeight: 'bold' }}
                            cursor={{ stroke: '#ffffff20', strokeWidth: 2 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#9333ea"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            filter="url(#glow)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MarketChart;

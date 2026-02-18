import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

const data = [
    { name: 'Jan', revenue: 4000, target: 2400 },
    { name: 'Feb', revenue: 3000, target: 1398 },
    { name: 'Mar', revenue: 2000, target: 9800 },
    { name: 'Apr', revenue: 2780, target: 3908 },
    { name: 'May', revenue: 1890, target: 4800 },
    { name: 'Jun', revenue: 2390, target: 3800 },
    { name: 'Jul', revenue: 3490, target: 4300 },
];

const SalesEstimation = () => {
    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Sales Estimation</h3>
                    <p className="text-sm text-gray-400">Revenue vs Target</p>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: '#ffffff05' }}
                            contentStyle={{
                                backgroundColor: '#1e1b2e',
                                borderColor: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="revenue" stackId="a" fill="#9333ea" radius={[0, 0, 4, 4]} name="Revenue" />
                        <Bar dataKey="target" stackId="a" fill="#1e1b2e" stroke="#9333ea" strokeWidth={1} radius={[4, 4, 0, 0]} name="Target" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesEstimation;

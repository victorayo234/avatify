import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

const data = [
    { name: 'Negative', count: 10, fill: '#f43f5e' },
    { name: 'Neutral', count: 20, fill: '#fbbf24' },
    { name: 'Positive', count: 70, fill: '#10b981' },
];

const CustomerSatisfaction = () => {
    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Satisfaction</h3>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="flex-1 min-h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="45%" innerRadius="30%" outerRadius="90%" barSize={15} data={data}>
                        <RadialBar
                            minAngle={15}
                            label={{ position: 'insideStart', fill: '#fff' }}
                            background={{ fill: '#ffffff10' }}
                            clockWise
                            dataKey="count"
                        />
                        <Legend
                            iconSize={10}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ paddingTop: '20px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e1b2e',
                                borderColor: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-xs text-gray-400">Score</div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSatisfaction;

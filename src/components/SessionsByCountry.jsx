import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const countryData = [
    { name: 'United States', code: '🇺🇸', percentage: 85, color: 'bg-emerald-500' },
    { name: 'Japan', code: '🇯🇵', percentage: 70, color: 'bg-deep-purple-accent' },
    { name: 'Indonesia', code: '🇮🇩', percentage: 45, color: 'bg-orange-500' },
    { name: 'South Korea', code: '🇰🇷', percentage: 38, color: 'bg-electric-blue-500' },
];

const SessionsByCountry = () => {
    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Session by Country</h3>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="space-y-6">
                {countryData.map((country) => (
                    <div key={country.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="flex items-center text-gray-300 font-medium">
                                <span className="mr-2 text-lg">{country.code}</span> {country.name}
                            </span>
                            <span className="text-white font-bold">{country.percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-deep-purple-dark rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${country.color}`}
                                style={{ width: `${country.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionsByCountry;

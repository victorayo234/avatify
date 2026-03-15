import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowUpRight, MapPin } from 'lucide-react';

const GlobalCashflowMap = () => {
    const [hoveredNode, setHoveredNode] = useState(null);

    // Coordinate System (0-100)
    // Lagos is roughly (48, 65) in this stylized view
    const hubs = [
        { id: 'lagos', name: 'Lagos', country: 'Nigeria', x: 48, y: 65, currency: 'NGN', rate: '1.00', isHome: true },
        { id: 'london', name: 'London', country: 'UK', x: 46, y: 35, currency: 'GBP', rate: '2,045' },
        { id: 'newyork', name: 'New York', country: 'USA', x: 25, y: 42, currency: 'USD', rate: '1,600' },
        { id: 'dubai', name: 'Dubai', country: 'UAE', x: 62, y: 52, currency: 'AED', rate: '435' },
        { id: 'tokyo', name: 'Tokyo', country: 'Japan', x: 88, y: 48, currency: 'JPY', rate: '10.8' },
    ];

    const trails = hubs.filter(h => !h.isHome).map(h => ({
        from: hubs.find(origin => origin.isHome),
        to: h,
        color: 'stroke-theme-ash-light'
    }));

    return (
        <div className="bg-dark-grey-surface/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full flex flex-col relative overflow-hidden group min-h-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 z-10">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Globe size={18} className="text-theme-ash" />
                        Global Cashflow
                    </h3>
                    <p className="text-xs text-gray-500">Live outbound liquidity from Lagos</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-1 text-[10px] font-bold text-theme-ash uppercase tracking-widest">
                    Network: Active
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d">
                    {/* Simplified stylized world shape (dots) */}
                    {[...Array(150)].map((_, i) => (
                        <circle
                            key={i}
                            cx={(i * 13) % 100}
                            cy={(i * 7) % 100}
                            r="0.4"
                            className="fill-white/5"
                        />
                    ))}

                    {/* Light Trails (Arcs) */}
                    {trails.map((trail, i) => (
                        <g key={trail.to.id}>
                            <motion.path
                                d={`M ${trail.from.x} ${trail.from.y} Q ${(trail.from.x + trail.to.x) / 2} ${(trail.from.y + trail.to.y) / 2 - 20} ${trail.to.x} ${trail.to.y}`}
                                fill="none"
                                stroke="url(#trailGradient)"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.4 }}
                                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Animated Particle on trail */}
                            <motion.circle
                                r="0.8"
                                fill="#ffffff"
                                className="shadow-[0_0_8px_#fff]"
                                initial={{ offsetDistance: "0%" }}
                                animate={{ offsetDistance: "100%" }}
                                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
                                style={{ offsetPath: `path('M ${trail.from.x} ${trail.from.y} Q ${(trail.from.x + trail.to.x) / 2} ${(trail.from.y + trail.to.y) / 2 - 20} ${trail.to.x} ${trail.to.y}')` }}
                            />
                        </g>
                    ))}

                    <defs>
                        <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>

                    {/* Nodes */}
                    {hubs.map(hub => (
                        <g 
                            key={hub.id} 
                            onMouseEnter={() => setHoveredNode(hub)}
                            onMouseLeave={() => setHoveredNode(null)}
                            className="cursor-pointer"
                        >
                            {/* Pulse for home node */}
                            {hub.isHome && (
                                <motion.circle
                                    cx={hub.x}
                                    cy={hub.y}
                                    r="3"
                                    className="fill-theme-ash/20"
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                            
                            <circle
                                cx={hub.x}
                                cy={hub.y}
                                r={hub.isHome ? 1.5 : 1}
                                className={`${hub.isHome ? 'fill-theme-ash' : 'fill-white/40'} hover:fill-white transition-colors`}
                            />
                        </g>
                    ))}
                </svg>

                {/* Glassmorphic Popup */}
                <AnimatePresence>
                    {hoveredNode && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute z-20 bg-dark-grey-base/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl pointer-events-none"
                            style={{ 
                                left: `${hoveredNode.x}%`, 
                                top: `${hoveredNode.y - 25}%`,
                                transform: 'translateX(-50%)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-xl">
                                    <MapPin size={16} className="text-theme-ash" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{hoveredNode.country}</div>
                                    <div className="text-sm font-bold text-white">{hoveredNode.name}</div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/5">
                                <div className="text-[9px] text-gray-500 font-bold uppercase mb-1">Exchange Snap</div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-xs text-white font-mono">1 {hoveredNode.currency}</span>
                                    <ArrowUpRight size={10} className="text-gray-500" />
                                    <span className="text-xs text-theme-ash-light font-bold">₦{hoveredNode.rate}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Insight */}
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2 text-gray-500 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-ash animate-pulse" />
                    LAGOS CORE HUB
                </div>
                <div className="text-white font-bold opacity-60">
                    AVG LATENCY: 48MS
                </div>
            </div>
        </div>
    );
};

export default GlobalCashflowMap;

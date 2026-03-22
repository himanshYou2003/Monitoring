import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const LiveLineChart = memo(({ data, color = "#f97316" }) => {
    const width = 240;
    const height = 100;
    if (!data || data.length < 2) return null;
    const points = data.map((val, i) => {
        const d = typeof val === 'number' && !isNaN(val) ? val : 0;
        const x = (i / (data.length - 1)) * width;
        const y = height - (d / 200) * height;
        return `${Number(x).toFixed(2)},${Number(y).toFixed(2)}`;
    }).join(' L ');
    const pathData = `M ${points || '0,0'}`;

    return (
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-2xl relative overflow-hidden group/graph h-full transition-all hover:border-orange-200">
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Real-Time Throughput</span>
                    <span className="text-xl font-bold text-slate-900 tabular-nums font-inter">{data[data.length-1]} p/h</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                   <span className="text-[8px] font-black text-orange-500 uppercase">Live Stream</span>
                </div>
            </div>
            
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="relative z-0 overflow-visible">
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: 'linear' }}
                    d={pathData} 
                    fill="none" 
                    stroke={color} 
                    strokeWidth="2" 
                    className="drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                />
                <motion.path 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    d={`${pathData} L ${width} ${height} L 0 ${height} Z`} 
                    fill="url(#chartGradient)" 
                />
            </svg>
        </div>
    );
});

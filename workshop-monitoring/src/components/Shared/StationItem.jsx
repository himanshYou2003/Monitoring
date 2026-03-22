import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const StationItem = memo(({ label, value, align }) => {
    const [history, setHistory] = useState(() => Array.from({ length: 12 }, () => Math.random() * 100));
    const val = parseFloat(value);
    
    const getStatus = (v) => {
        if (v > 145) return { color: 'text-red-600', dot: 'bg-red-500', glow: 'shadow-red-200' };
        if (v > 130) return { color: 'text-orange-500', dot: 'bg-orange-500', glow: 'shadow-orange-200' };
        return { color: 'text-green-600', dot: 'bg-green-500', glow: 'shadow-green-200' };
    };

    const status = getStatus(val);
    
    useEffect(() => {
        setHistory(prev => [...prev.slice(1), val]);
    }, [value]);

    return (
        <div className={`flex items-center gap-0 relative z-10 group/station ${align === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
            <motion.div 
                whileHover={{ scale: 1.15, x: align === 'right' ? -8 : 8, zIndex: 50 }}
                className={`flex-1 p-2 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group-hover/station:shadow-2xl transition-all duration-300 relative overflow-hidden`}
            >
                <div className="flex flex-col relative z-10">
                    <div className="flex items-center gap-1 mb-0.5">
                        <div className={`w-1 h-1 rounded-full ${status.dot} ${val > 145 ? 'animate-pulse' : ''}`}></div>
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter truncate w-10">{label}</span>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.span 
                            key={value}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-xs font-bold tracking-tight tabular-nums font-inter ${status.color}`}
                        >
                            {value}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <div className="flex items-end gap-[1px] h-4 relative z-10 px-0.5 opacity-40 group-hover/station:opacity-100 transition-opacity" aria-hidden="true">
                    {history.map((h, i) => (
                        <div key={i} className={`w-[1px] ${status.dot} rounded-full opacity-60`} style={{ height: `${(h/180)*100}%` }} />
                    ))}
                </div>
            </motion.div>
            
            <div className={`w-4 h-[2px] bg-slate-900 shrink-0 relative ${align === 'right' ? 'mr-0' : 'ml-0'}`}>
                <div className={`absolute inset-0 opacity-0 group-hover/station:opacity-100 transition-opacity blur-[2px] ${status.dot}`}></div>
            </div>
        </div>
    );
});

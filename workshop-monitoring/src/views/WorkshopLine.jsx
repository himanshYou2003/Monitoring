import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { StationItem } from '../components/Shared/StationItem';
import { LiquidFlow } from '../components/Shared/LiquidFlow';

export const WorkshopLine = memo(({ lineName, lineData, index }) => {
    const roomKeys = Object.keys(lineData.rooms);
    const oee = parseFloat(lineData.metrics.oee);
    
    const getHeatmapColor = (val) => {
        if (val > 90) return 'bg-green-50/10';
        if (val > 80) return 'bg-orange-50/10';
        return 'bg-red-50/10';
    };
    const getGlowColor = (val) => {
        if (val > 90) return 'glow-green';
        if (val > 80) return 'glow-orange';
        return 'glow-red';
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`w-full bg-white border border-slate-200 rounded-[20px] p-4 lg:p-5 shadow-xl flex flex-col gap-4 relative overflow-hidden transition-all duration-500 hover:border-orange-500/40 group/line ${getHeatmapColor(oee)} ${getGlowColor(oee)}`}
        >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/line:opacity-100 transition-opacity duration-700 animate-shine"></div>
            
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-slate-800 shadow-sm shrink-0 group-hover/line:scale-105 transition-transform">
                    <span className="text-[7px] font-bold mr-1 bg-slate-200 px-1 py-0.5 rounded text-orange-600 tracking-tighter">+V</span>
                    <h4 className="text-[10px] font-black tracking-wider uppercase">{lineName}</h4>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[8px] font-semibold text-slate-400 font-inter">OEE:</span>
                        <span className={`text-[10px] font-bold tabular-nums font-inter ${oee > 90 ? 'text-green-600' : 'text-orange-600'}`}>{oee}%</span>
                    </div>
                    <div className="bg-slate-100 p-1 rounded-lg">
                        <Zap size={12} className="text-orange-500" aria-hidden="true" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 relative">
                {roomKeys.map((roomKey, rIdx) => (
                    <div key={roomKey} className="relative min-w-0 font-poppins">
                        <div className="flex items-center justify-center gap-1 mb-3 bg-slate-50/50 py-1 rounded-lg border border-slate-100/50 text-center">
                            <h5 className="text-[7.5px] font-bold text-slate-500 uppercase tracking-tighter">{roomKey}</h5>
                        </div>
                        <div className="space-y-1.5 relative">
                            <div className="absolute left-1/2 -ml-[1.5px] top-0 bottom-0 w-[3px] bg-slate-900 rounded-full z-0 overflow-hidden shadow-inner font-sans">
                                <LiquidFlow color={rIdx === 0 ? "bg-orange-400" : "bg-blue-400"} delay={rIdx * 1.5} />
                            </div>
                            {Object.keys(lineData.rooms[roomKey]).filter(k => k !== 'PROPELIA-5').map((station) => (
                                <StationItem key={station} label={station} value={lineData.rooms[roomKey][station]} align={rIdx === 0 ? "right" : "left"} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-1 pt-4 border-t border-slate-100 flex flex-col items-center relative gap-1">
                <div className="w-1/2 p-2.5 bg-white rounded-[20px] text-center shadow-xl relative group/p5 overflow-hidden border border-slate-100 hover:scale-125 hover:z-50 hover:border-orange-500 transition-all cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover/p5:opacity-100 transition-opacity"></div>
                    <span className="text-[7px] font-black text-slate-400 uppercase block mb-0.5 relative z-10 font-poppins tracking-widest">Shared P-5</span>
                    <AnimatePresence mode="wait">
                        <motion.span key={lineData.rooms[roomKeys[0]]['PROPELIA-5']} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-900 font-black text-sm tracking-tighter relative z-10 block tabular-nums font-inter">
                            {lineData.rooms[roomKeys[0]]['PROPELIA-5']}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <div className="h-2 w-[2px] bg-slate-900"></div>
                <div className="w-24 h-1 bg-slate-900 rounded-full"></div>
            </div>
        </motion.div>
    );
});

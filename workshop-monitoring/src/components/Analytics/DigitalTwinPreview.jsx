import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ArrowUpRight } from 'lucide-react';

export const DigitalTwinPreview = memo(({ onExpand, data }) => (
    <div 
        onClick={onExpand}
        className="col-span-1 lg:col-span-3 bg-white p-6 rounded-[40px] border border-slate-100 shadow-2xl relative group/preview overflow-hidden cursor-pointer hover:border-orange-500/30 transition-all"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity"></div>
        <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <LayoutDashboard size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Digital Twin Control Matrix</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Sector 4 • 4-Track Production Stream</p>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl group-hover/preview:bg-orange-500 group-hover/preview:text-white transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest">Double-Click to Expand</span>
                <ArrowUpRight size={16} />
            </div>
        </div>

        <div className="grid grid-cols-4 gap-4 relative z-10">
            {Object.keys(data).map((lineKey, i) => (
                <div key={lineKey} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover/preview:bg-white transition-colors">
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{lineKey}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${data[lineKey].metrics.oee}%` }}
                            className="h-full bg-orange-500"
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
));

import React, { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const KPIItem = memo(({ label, value, trend, status, suffix = "", isAlert = false }) => (
    <div className="flex flex-col gap-1 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group lg:hover:-translate-y-1">
        <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${
                status === 'Optimal' ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 
                status === 'Warning' ? 'bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]' : 
                status === 'Critical' ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]' : 'bg-slate-300'
            } ${status === 'Critical' ? 'animate-ping' : ''}`}></div>
        </div>
        <div className="flex items-baseline gap-1">
            <span className={`text-xl font-bold tracking-tighter tabular-nums font-inter ${isAlert ? 'text-red-600' : 'text-slate-800'}`}>{value}</span>
            {suffix && <span className="text-[10px] font-semibold text-slate-400 font-inter tabular-nums">{suffix}</span>}
        </div>
        <div className="flex items-center gap-1 mt-1">
            {trend === 'up' ? <TrendingUp size={12} className="text-green-500" /> : <TrendingDown size={12} className="text-red-500" />}
            <span className={`text-[9px] font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>3.2% vs last shift</span>
        </div>
    </div>
));

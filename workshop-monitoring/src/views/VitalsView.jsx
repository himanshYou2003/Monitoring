import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Thermometer, Gauge, Zap, Waves } from 'lucide-react';
import { LiveLineChart } from '../components/Analytics/LiveLineChart';

const VitalCard = memo(({ icon: Icon, label, value, unit, status, color }) => (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl relative overflow-hidden group hover:border-orange-500/30 transition-all">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${status === 'STABLE' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {status}
                </span>
            </div>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900 tabular-nums font-inter">{value}</span>
            <span className="text-sm font-bold text-slate-400">{unit}</span>
        </div>
    </div>
));

const NeuralHeartbeat = memo(() => (
    <div className="relative w-full h-64 bg-slate-50 rounded-[40px] border border-slate-100 shadow-inner flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent"></div>
        <svg width="400" height="150" viewBox="0 0 400 150" className="relative z-10">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ 
                    pathLength: 1,
                    d: [
                        "M 0 75 L 50 75 L 60 40 L 80 110 L 90 75 L 150 75 L 160 20 L 180 130 L 190 75 L 250 75 L 260 50 L 280 100 L 290 75 L 400 75",
                        "M 0 75 L 50 75 L 55 60 L 75 90 L 85 75 L 150 75 L 155 40 L 175 110 L 185 75 L 250 75 L 255 60 L 275 90 L 285 75 L 400 75",
                        "M 0 75 L 50 75 L 60 40 L 80 110 L 90 75 L 150 75 L 160 20 L 180 130 L 190 75 L 250 75 L 260 50 L 280 100 L 290 75 L 400 75"
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                d="M 0 75 L 50 75 L 60 40 L 80 110 L 90 75 L 150 75 L 160 20 L 180 130 L 190 75 L 250 75 L 260 50 L 280 100 L 290 75 L 400 75"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                className="drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
            />
            <motion.circle
                animate={{ cx: [0, 400], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                r="4"
                fill="#f97316"
                className="drop-shadow-[0_0_10px_#f97316]"
            />
        </svg>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-orange-500 uppercase tracking-[0.6em] animate-pulse">
            Neural Sync Pulse Active
        </div>
    </div>
));

export const VitalsView = memo(({ data }) => {
    const [telemetry, setTelemetry] = useState(() => Array.from({ length: 20 }, () => 70 + Math.random() * 30));

    useEffect(() => {
        const interval = setInterval(() => {
            setTelemetry(prev => [...prev.slice(1), 70 + Math.random() * 30]);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">System Vitals</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">Real-Time Core Telemetry Stream</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-2xl border border-green-100">
                    <Activity size={16} className="text-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-green-600 uppercase">Neural Link Optimized</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <VitalCard icon={Thermometer} label="Core Temp" value="42.8" unit="°C" status="STABLE" color="bg-orange-500" />
                <VitalCard icon={Gauge} label="Matrix Pressure" value="1.2" unit="BAR" status="OPTIMAL" color="bg-blue-500" />
                <VitalCard icon={Zap} label="Neural Load" value="14.4" unit="KW" status="STABLE" color="bg-emerald-500" />
                <VitalCard icon={Waves} label="Sync Latency" value="12" unit="MS" status="PEAK" color="bg-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <NeuralHeartbeat />
                </div>
                <div className="lg:col-span-1">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Neural Bandwidth</h3>
                    <LiveLineChart data={telemetry} color="#3b82f6" />
                </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl relative overflow-hidden group/subsystems">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-8 relative z-10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    Sub-System Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {[
                        { name: "Atmospheric Stabilizer", load: 24, status: "Active" },
                        { name: "Fluid Catalyst Ring", load: 68, status: "Warning" },
                        { name: "Magnetic Shielding", load: 12, status: "Ready" },
                        { name: "Neural Logic Hive", load: 94, status: "High Load" },
                        { name: "Thermal Exchange KJ1", load: 45, status: "Active" },
                        { name: "Packet Routing mahipalpur", load: 8, status: "Dormant" }
                    ].map((sys, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-[24px] border border-slate-100 hover:bg-white hover:border-orange-200 transition-all cursor-pointer group/sys shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{sys.name}</span>
                                <span className={`text-[8px] font-black uppercase ${sys.load > 90 ? 'text-red-600' : 'text-slate-400'}`}>{sys.status}</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${sys.load}%` }}
                                    className={`h-full ${sys.load > 90 ? 'bg-red-500' : sys.load > 60 ? 'bg-orange-500' : 'bg-green-500'}`}
                                />
                            </div>
                            <div className="flex justify-between text-[9px] font-bold text-slate-400">
                                <span>Core Efficiency</span>
                                <span className="text-slate-900 tabular-nums">{sys.load}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

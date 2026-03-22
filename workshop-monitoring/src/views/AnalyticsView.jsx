import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Bell, ArrowUpRight } from 'lucide-react';
import { RadarChart } from '../components/Analytics/RadarChart';
import { LiveLineChart } from '../components/Analytics/LiveLineChart';
import { StatusMatrix } from '../components/Analytics/StatusMatrix';
import { DigitalTwinPreview } from '../components/Analytics/DigitalTwinPreview';

export const AnalyticsView = memo(({ stats, lines, onDetailView }) => {
    const [history, setHistory] = useState(() => Array.from({ length: 20 }, () => 140 + Math.random() * 30));
    
    useEffect(() => {
        const interval = setInterval(() => {
            setHistory(prev => [...prev.slice(1), 140 + Math.random() * 30]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const radarStats = [92, 88, 85, 96, 99];
    const radarLabels = ["AVIL", "PERF", "QUAL", "OEE", "SAFE"];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Executive Analytics</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">Real-Time Operational Insight Matrix</p>
                </div>
                <div className="flex items-center gap-3">
                    <StatusMatrix data={lines} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DigitalTwinPreview onExpand={() => onDetailView('layout')} data={lines} />
                
                <div className="lg:col-span-1">
                    <RadarChart data={radarStats} labels={radarLabels} />
                </div>
                <div className="lg:col-span-2">
                    <LiveLineChart data={history} />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl relative group/bottlenecks overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/30 rounded-full blur-3xl -mr-16 -mt-16 group-hover/bottlenecks:bg-orange-200 transition-colors"></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 tracking-tighter">
                            <Activity className="text-orange-600" />
                            Production Vector Efficiency
                        </h3>
                    </div>
                    <div className="space-y-6 relative z-10">
                        {Object.keys(lines).map(lineKey => (
                            <div key={lineKey} className="space-y-3 group/bar">
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{lineKey} Cluster</span>
                                        <span className="text-sm font-bold text-slate-800 tracking-tight">System Throughput Optimized</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-black text-orange-600 font-inter tabular-nums">{lines[lineKey].metrics.oee}%</span>
                                        <span className="text-[10px] font-bold text-slate-400">OEE</span>
                                    </div>
                                </div>
                                <div className="h-4 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100 p-1 flex items-center">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${lines[lineKey].metrics.oee}%` }}
                                        transition={{ type: 'spring', damping: 20 }}
                                        className={`h-full rounded-full ${parseFloat(lines[lineKey].metrics.oee) > 90 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'} shadow-[0_0_10px_rgba(249,115,22,0.4)] group-hover/bar:brightness-110 transition-all`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl relative overflow-hidden group/alerts transition-all hover:border-orange-200">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                            <Bell className="text-orange-500" />
                            Critical Matrix Alerts
                        </h3>
                    </div>
                    <div className="space-y-4 relative z-10">
                        {[
                            { title: "Pressure Matrix Drop", sub: "Line KJ1 • Chamber 5", type: "CRITICAL", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
                            { title: "Sync Latency Warning", sub: "System • mahipalpur,new delhi 37", type: "WARN", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
                            { title: "Material Log Finalized", sub: "Line KJ4 • Asset #402", type: "INFO", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" }
                        ].map((alert, i) => (
                            <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-[24px] flex items-center gap-4 hover:bg-white hover:border-orange-200 transition-all cursor-pointer group/alert shadow-sm hover:shadow-xl">
                                <div className={`w-12 h-12 ${alert.bg} ${alert.border} border rounded-xl flex items-center justify-center ${alert.color} font-black text-[10px] group-hover/alert:scale-110 transition-transform`}>
                                    {alert.type}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight">{alert.title}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{alert.sub}</p>
                                </div>
                                <div className="ml-auto w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover/alert:text-orange-600 transition-colors">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

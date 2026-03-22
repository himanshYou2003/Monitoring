import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Zap, Thermometer, Activity, ArrowRight, X, Clock, ShieldCheck, AlertCircle, History, Info } from 'lucide-react';

const VibrationWave = memo(({ intensity, color }) => (
    <div className="h-12 w-full flex items-center gap-[1.5px] items-end">
        {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
                key={i}
                animate={{ 
                    height: [
                        5 + Math.random() * (intensity * 40), 
                        5 + Math.random() * (intensity * 40),
                        5 + Math.random() * (intensity * 40)
                    ] 
                }}
                transition={{ duration: 0.15, repeat: Infinity, ease: "linear", delay: i * 0.005 }}
                className={`w-[1.5px] rounded-full ${color} opacity-60 hover:opacity-100 transition-opacity`}
            />
        ))}
    </div>
));

const MaintenanceTimeline = memo(() => (
    <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
        {[
            { date: 'Oct 14', type: 'Calibration', desc: 'Sync Hub KJ-9 alignment corrected.', user: 'Mark K.' },
            { date: 'Sep 22', type: 'Warning', desc: 'Thermal peak detected (58°C). Cooling cycle pulse.', user: 'System' },
            { date: 'Aug 04', type: 'Full Service', desc: 'Arm-902 structural audit and bearing lubrication.', user: 'Dr. Sarah' }
        ].map((item, i) => (
            <div key={i} className="flex gap-6 relative group">
                <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg relative z-10 flex items-center justify-center ${
                    item.type === 'Warning' ? 'bg-orange-500' : 
                    item.type === 'Full Service' ? 'bg-slate-900' : 'bg-blue-500'
                }`}>
                    {item.type === 'Warning' ? <AlertCircle size={10} className="text-white" /> : <Clock size={10} className="text-white" />}
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                        <span className="text-[10px] font-bold text-slate-800">{item.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1 opacity-60">Handled by {item.user}</p>
                </div>
            </div>
        ))}
    </div>
));

const RiskRadarMini = memo(({ risk }) => (
    <div className="grid grid-cols-2 gap-4">
        {[
            { label: 'Thermal', val: '12%', color: 'bg-orange-500' },
            { label: 'Mechanical', val: '45%', color: 'bg-blue-500' },
            { label: 'Electrical', val: '08%', color: 'bg-emerald-500' },
            { label: 'Network', val: '02%', color: 'bg-purple-500' }
        ].map((r, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[8px] font-black text-slate-400 uppercase">{r.label}</span>
                    <span className="text-[10px] font-black text-slate-900">{r.val}</span>
                </div>
                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: r.val }}
                        className={r.color}
                    />
                </div>
            </div>
        ))}
    </div>
));

const AssetCard = memo(({ asset, onDetail }) => (
    <motion.div 
        layoutId={`asset-${asset.id}`}
        onClick={() => onDetail(asset)}
        className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-2xl cursor-pointer hover:border-orange-500/40 transition-all group overflow-hidden relative"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-all"></div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${
                asset.status === 'Critical' ? 'bg-red-50 text-red-600' : 
                asset.status === 'Warning' ? 'bg-orange-50 text-orange-600' : 'bg-slate-900 text-white'
            }`}>
                <Wrench size={28} />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:animate-scan-fast rounded-2xl pointer-events-none"></div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{asset.id}</span>
                <span className="text-sm font-bold text-slate-800 tracking-tight">{asset.type} Matrix</span>
            </div>
        </div>

        <div className="mb-8 relative z-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2 leading-none">{asset.name}</h3>
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${
                    asset.status === 'Critical' ? 'bg-red-500 animate-pulse' : 
                    asset.status === 'Warning' ? 'bg-orange-500' : 'bg-green-500'
                }`} />
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em]">{asset.status} READY</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Health</p>
                <p className="text-lg font-black text-slate-900 tabular-nums">{asset.health}%</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Risk</p>
                <p className={`text-lg font-black tabular-nums ${asset.health < 80 ? 'text-orange-600' : 'text-slate-900'}`}>{100 - asset.health}%</p>
            </div>
        </div>

        <div className="mt-2 pt-6 border-t border-slate-50 group-hover:border-orange-100 transition-colors flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Core vibration</span>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-orange-600 transition-all translate-x-0 group-hover:translate-x-2" />
             </div>
             <VibrationWave intensity={asset.vibration} color={asset.health > 90 ? 'bg-green-500' : 'bg-orange-500'} />
        </div>
    </motion.div>
));

export const AssetView = memo(({ data, selectedAsset, onDetail }) => {
    const assets = data.assets || [];

    return (
        <div className="space-y-10 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">World-Class Asset Intelligence</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.5em]">Predictive Diagnostics • mahipalpur,new delhi 37</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-slate-900 text-white rounded-2xl flex items-center gap-2 shadow-xl shadow-slate-200">
                        <Info size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">System Audit: Normal</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {assets.map(asset => (
                    <AssetCard key={asset.id} asset={asset} onDetail={onDetail} />
                ))}
            </div>

            <AnimatePresence>
                {selectedAsset && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12 bg-white/60 backdrop-blur-2xl"
                        onClick={() => onDetail(null)}
                        data-lenis-prevent="true"
                    >
                        <motion.div 
                            layoutId={`asset-${selectedAsset.id}`}
                            className="bg-white w-full max-w-6xl h-[90vh] lg:h-auto lg:max-h-[90vh] rounded-[32px] md:rounded-[56px] border border-slate-100 shadow-[0_60px_120px_-20px_rgba(15,23,42,0.2)] overflow-y-auto lg:overflow-hidden relative flex flex-col lg:flex-row shrink-0"
                            onClick={(e) => e.stopPropagation()}
                            data-lenis-prevent="true"
                        >
                            <button 
                                onClick={() => onDetail(null)}
                                className="absolute top-4 right-4 md:top-10 md:right-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white transition-all z-20 shadow-sm"
                            >
                                <X size={24} className="md:w-7 md:h-7" />
                            </button>

                            <div className="w-full lg:w-[45%] bg-slate-50 p-6 lg:p-16 flex flex-col justify-center relative border-b lg:border-b-0 lg:border-r border-slate-200 shrink-0">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(249,115,22,0.15)_0%,transparent_60%)]"></div>
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative z-10"
                                >
                                    <div className={`w-20 h-20 md:w-28 md:h-28 rounded-[24px] md:rounded-[40px] mb-6 md:mb-12 flex items-center justify-center shadow-2xl relative group/scan ${
                                        selectedAsset.status === 'Critical' ? 'bg-red-500 text-white' : 
                                        selectedAsset.status === 'Warning' ? 'bg-orange-500 text-white' : 'bg-slate-900 text-white'
                                    }`}>
                                        <Wrench size={36} className="md:w-14 md:h-14" />
                                        <div className="absolute inset-0 bg-white/20 animate-scan rounded-[24px] md:rounded-[40px]"></div>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 md:mb-6 leading-none">{selectedAsset.name}</h2>
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Serial</span>
                                            <span className="text-lg font-bold text-slate-800">{selectedAsset.id}</span>
                                        </div>
                                        <div className="w-[1px] h-10 bg-slate-200"></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matrix Type</span>
                                            <span className="text-lg font-bold text-slate-800">{selectedAsset.type}</span>
                                        </div>
                                    </div>
                                </motion.div>
                                
                                <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative z-10">
                                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group/tele">
                                        <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl group-hover/tele:scale-110 transition-transform"><Activity size={24} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Vibration</p>
                                            <p className="text-xl font-black text-slate-800 tabular-nums">{selectedAsset.vibration} <span className="text-[10px] text-slate-400 tracking-tighter">m/s²</span></p>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group/tele">
                                        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl group-hover/tele:scale-110 transition-transform"><Thermometer size={24} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Thermal</p>
                                            <p className="text-xl font-black text-slate-800 tabular-nums">{selectedAsset.temp} <span className="text-[10px] text-slate-400 tracking-tighter">°C</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="flex-1 min-h-0 p-6 lg:p-16 flex flex-col justify-between lg:overflow-y-auto no-scrollbar"
                                data-lenis-prevent="true"
                            >
                                <div className="space-y-12">
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                                        <div>
                                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                                                <History size={14} className="text-orange-500" />
                                                Operational Chronology
                                            </h3>
                                            <MaintenanceTimeline />
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                                                <Info size={14} className="text-blue-500" />
                                                Risk Factor analysis
                                            </h3>
                                            <RiskRadarMini risk={selectedAsset.health} />
                                            <div className="mt-8 p-6 bg-slate-900 rounded-[32px] text-white overflow-hidden relative group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
                                                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2 relative z-10">AI Recommendation</p>
                                                <p className="text-sm font-medium leading-relaxed relative z-10">Asset integrity remains nominal. Schedule secondary audit in 240 operating hours. No critical faults detected.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-baseline mb-6">
                                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Real-time Vibration Signature</h3>
                                            <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1.5 animate-pulse">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                                LIVE DATA STREAM
                                            </span>
                                        </div>
                                        <div className="p-6 md:p-10 bg-slate-50 rounded-[40px] border border-slate-100 overflow-hidden group/wave transition-all hover:bg-white hover:border-orange-200">
                                            <VibrationWave intensity={selectedAsset.vibration * 3} color="bg-orange-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-col sm:flex-row gap-6">
                                    <button className="flex-1 py-5 bg-slate-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl hover:bg-orange-600 transition-all hover:-translate-y-1 active:translate-y-0">
                                        Deploy Field tech
                                    </button>
                                    <button className="flex-1 py-5 bg-white text-slate-900 rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-3">
                                        <ShieldCheck size={18} />
                                        Confirm Integrity
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

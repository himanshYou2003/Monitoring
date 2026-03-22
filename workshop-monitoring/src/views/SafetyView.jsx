import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Users, Lock, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

const SafetyProtocol = memo(({ icon: Icon, label, status, detail }) => (
    <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-lg relative overflow-hidden group hover:border-orange-500/30 transition-all">
        {/* Subtle Scan Pulse */}
        <motion.div 
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent skew-x-12 pointer-events-none"
        />
        
        <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                    <span className="text-xs font-bold text-slate-800 tracking-tight">{status}</span>
                </div>
            </div>
        </div>
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed relative z-10">{detail}</p>
    </div>
));

const ContainmentShield = memo(() => (
    <div className="relative w-full h-80 bg-slate-50 rounded-[40px] border border-slate-100 shadow-inner flex items-center justify-center overflow-hidden group/shield">
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05)_0%,transparent_70%)]"></div>
        
        {/* Scanning Line */}
        <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent z-10 blur-xl pointer-events-none"
        />
        <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-orange-500/30 z-10 pointer-events-none"
        />

        <div className="relative w-48 h-48">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-orange-500/20 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-2 border-dashed border-blue-500/20 rounded-full"
            />
            <div className="absolute inset-8 bg-white rounded-full shadow-2xl flex items-center justify-center border border-slate-100">
                <div className="text-center">
                    <Shield size={40} className="text-orange-500 mx-auto mb-2 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
                    <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Integrity</p>
                    <p className="text-2xl font-black text-orange-600 tracking-tighter">99.8%</p>
                </div>
            </div>
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        opacity: [0, 1, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.4,
                        ease: "easeInOut"
                    }}
                    style={{ 
                        left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                        top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`
                    }}
                    className="absolute w-2 h-2 bg-orange-500 rounded-full blur-[2px]"
                />
            ))}
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <div className="text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Perimeter Scan</p>
                <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-[10px] font-bold text-slate-800">Clear</p>
                </div>
            </div>
            <div className="w-[1px] h-6 bg-slate-200"></div>
            <div className="text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Bio-Auth</p>
                <p className="text-[10px] font-bold text-slate-800">Verified</p>
            </div>
        </div>
    </div>
));

export const SafetyView = memo(() => (
    <div className="space-y-8 pb-10">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Advanced Safety Matrix</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">Protocol Layer 4 • Multi-Sector Shielding</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-2">
                    <ShieldAlert size={16} className="text-red-600 animate-pulse" />
                    <span className="text-[10px] font-black text-red-600 uppercase">Emergency E-Stop Ready</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <ContainmentShield />
            </div>
            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-l-2 border-orange-500 pl-3">Staff Authorization</h3>
                {[
                    { name: "Dr. Sarah Vance", role: "Primary Overseer", id: "0018-A", status: "AUTH" },
                    { name: "Unit-04 Automata", role: "Maintenance Drone", id: "D-9211", status: "ACTIVE" },
                    { name: "Mark Kinsley", role: "Safety Engineer", id: "0449-C", status: "AUTH" }
                ].map((user, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800 tracking-tight">{user.name}</p>
                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{user.role}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{user.status}</span>
                            <p className="text-[8px] text-slate-300 font-mono mt-1">{user.id}</p>
                        </div>
                    </div>
                ))}
                <button className="w-full py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-slate-200">
                    Audit All Clearances
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SafetyProtocol 
                icon={Lock} 
                label="Perimeter Lock" 
                status="ACTIVE" 
                detail="All secondary access points in mahipalpur,new delhi 37 are structurally sealed and magnetic locks engaged."
            />
            <SafetyProtocol 
                icon={Eye} 
                label="Motion Scanners" 
                status="ACTIVE" 
                detail="Passive IR and LiDAR grid coverage is currently at 100% with zero unknown entities detected."
            />
            <SafetyProtocol 
                icon={AlertTriangle} 
                label="Gas Sensation" 
                status="ACTIVE" 
                detail="Atmospheric composition is optimal. Oxygen levels at 21%, Nitrogen 78%, trace elements within bounds."
            />
            <SafetyProtocol 
                icon={ShieldCheck} 
                label="Neural Guard" 
                status="ACTIVE" 
                detail="Firewall integrity confirmed. No intrusion attempts logged in the last 24-hour mission cycle."
            />
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                        <ShieldAlert size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Active Incident Monitoring</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Protocol KJ-90 Severity Matrix</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-black tracking-tighter text-emerald-500">00</p>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Alerts</p>
                </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em]">System Status: Nominal • All Safety Loops Closed</p>
            </div>
        </div>
    </div>
));

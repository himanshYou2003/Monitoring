import React from 'react';

export const LoadingSync = () => (
    <div className="h-screen w-full bg-white flex items-center justify-center font-inter text-center">
        <div className="flex flex-col items-center gap-8">
            <div className="relative">
                <div className="w-24 h-24 border-4 border-slate-50 border-t-orange-500 rounded-full animate-spin shadow-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-orange-50 rounded-full animate-ping border border-orange-100"></div>
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-slate-900 font-black text-2xl tracking-tighter mb-2">COREFLEET SYNC</h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.6em] animate-pulse">Establishing Mission Link...</p>
            </div>
        </div>
    </div>
);

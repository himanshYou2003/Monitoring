import React, { memo } from 'react';

export const StatusMatrix = memo(({ data }) => (
    <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100 gap-2 shadow-inner group/matrix hover:bg-white transition-colors">
        {Object.keys(data).map((lineKey) => (
            <div key={lineKey} className="grid grid-cols-2 gap-1 px-1 border-r border-slate-200 last:border-none">
                {[...Array(4)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full ${Math.random() > 0.05 ? 'bg-green-500' : 'bg-red-500'} shadow-[0_0_5px_rgba(34,197,94,0.3)] animate-pulse`}
                        style={{ animationDelay: `${Math.random() * 2}s` }}
                    />
                ))}
            </div>
        ))}
    </div>
));

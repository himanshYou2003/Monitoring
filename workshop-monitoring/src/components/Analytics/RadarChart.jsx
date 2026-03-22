import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const RadarChart = memo(({ data, labels }) => {
    const size = 180;
    const center = size / 2;
    const r = size * 0.35;
    
    const pointsArr = (Array.isArray(data) ? data : [0,0,0,0,0]);
    const points = pointsArr.map((val, i) => {
        const value = typeof val === 'number' && !isNaN(val) ? val : 0;
        const angle = (Math.PI * 2 * i) / (pointsArr.length || 5) - Math.PI / 2;
        const x = center + (r * (value / 100)) * Math.cos(angle);
        const y = center + (r * (value / 100)) * Math.sin(angle);
        return `${Number(x).toFixed(2)},${Number(y).toFixed(2)}`;
    }).join(' ');

    const gridPoints = [20, 40, 60, 80, 100].map(level => {
        return Array.from({ length: 5 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const x = center + (r * (level / 100)) * Math.cos(angle);
            const y = center + (r * (level / 100)) * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
    });

    return (
        <div className="relative flex items-center justify-center p-4 bg-white rounded-[32px] border border-slate-100 shadow-2xl group/radar overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
            <svg 
                width={size} 
                height={size} 
                className="relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                role="img"
                aria-label={`Radar chart showing efficiency metrics: ${labels.join(', ')}`}
            >
                {gridPoints.map((gp, i) => (
                    <polygon key={i} points={gp} className="fill-none stroke-slate-50 stroke-[1px]" />
                ))}
                
                {Array.from({ length: 5 }).map((_, i) => {
                    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    const x = center + r * Math.cos(angle);
                    const y = center + r * Math.sin(angle);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} className="stroke-slate-100 stroke-[0.5px]" />;
                })}

                <motion.polygon 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    points={points} 
                    className="fill-blue-500/10 stroke-blue-500 stroke-[2px]" 
                />
            </svg>
            
            {labels.map((label, i) => {
                const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                const x = center + (r + 25) * Math.cos(angle);
                const y = center + (r + 25) * Math.sin(angle);
                return (
                    <span 
                        key={i} 
                        style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                        className="absolute text-[8px] font-black text-slate-400 uppercase tracking-tighter w-12 text-center"
                    >
                        {label}
                    </span>
                );
            })}
        </div>
    );
});

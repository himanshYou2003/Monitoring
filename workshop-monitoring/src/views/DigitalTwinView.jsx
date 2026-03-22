import React from 'react';
import { WorkshopLine } from './WorkshopLine';

export const DigitalTwinView = ({ data }) => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Digital Twin Control Matrix</h3>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">4-Sector High-Density Monitoring</p>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {Object.keys(data).map((lineKey, idx) => (
                <WorkshopLine key={lineKey} lineName={lineKey} lineData={data[lineKey]} index={idx} />
            ))}
        </div>
    </div>
);

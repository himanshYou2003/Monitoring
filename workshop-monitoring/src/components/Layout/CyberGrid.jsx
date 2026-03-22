import React, { memo } from 'react';

export const CyberGrid = memo(() => (
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <div className="absolute inset-0 cyber-grid"></div>
    </div>
));

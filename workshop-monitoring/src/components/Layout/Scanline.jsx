import React, { memo } from 'react';

export const Scanline = memo(() => (
    <div className="fixed inset-0 pointer-events-none z-[9999] animate-scan opacity-[0.03]">
        <div className="w-full h-[2px] bg-orange-500 shadow-[0_0_20px_#ff6b00]"></div>
    </div>
));

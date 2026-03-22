import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const LiquidFlow = memo(({ color = "bg-orange-400", delay = 0 }) => (
    <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(2)].map((_, i) => (
            <motion.div
                key={`p-${i}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ 
                    y: [0, 400], 
                    opacity: [0, 1, 1, 0],
                }}
                transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: delay + (i * 2.5),
                    ease: "linear" 
                }}
                className={`absolute left-1/2 -ml-1 w-2 h-2 rounded-full ${color} opacity-40 blur-[1px]`}
            />
        ))}
    </div>
));

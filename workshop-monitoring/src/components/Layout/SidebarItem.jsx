import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SidebarItem = memo(({ icon, label, active, isOpen, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${
    active ? 'bg-slate-900/5 text-slate-900' : 'text-slate-400 hover:bg-slate-50'
  }`}>
    {active && (
        <motion.div 
            layoutId="sidebar-active"
            className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full shadow-[0_0_10px_#ff6b00]"
        />
    )}
    <div className={`shrink-0 ${active ? 'text-orange-600 scale-110' : 'group-hover:scale-110 transition-transform text-slate-400'}`}>{icon}</div>
    <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between flex-1 min-w-0"
            >
                <span className={`text-sm tracking-tight whitespace-nowrap overflow-hidden text-ellipsis ${active ? 'font-bold text-slate-900' : 'font-medium'}`}>
                    {label}
                </span>
                {badge && (
                    <span className="text-[9px] font-black bg-orange-500 text-white px-1.5 py-0.5 rounded-full shadow-lg shadow-orange-200">
                        {badge}
                    </span>
                )}
            </motion.div>
        )}
    </AnimatePresence>
  </button>
));

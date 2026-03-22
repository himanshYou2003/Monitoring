import React, { memo } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = memo(({ isOpen, value, onChange }) => (
    <div className="px-4 mb-6">
        <div className={`flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 transition-all hover:bg-white hover:border-orange-200 group/search ${!isOpen && 'justify-center'}`}>
            <Search size={18} className="text-slate-400 group-hover/search:text-orange-500 transition-colors" />
            {isOpen && (
                <input 
                    type="text" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search intelligence..." 
                    aria-label="Search intelligence"
                    className="bg-transparent border-none outline-none text-xs font-semibold text-slate-800 placeholder:text-slate-400 w-full tracking-tight"
                />
            )}
        </div>
    </div>
));

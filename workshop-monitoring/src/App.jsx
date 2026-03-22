import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ShieldCheck, 
  Wrench, 
  MapPin, 
  Activity, 
  LayoutDashboard,
  ArrowUpRight
} from 'lucide-react';
import Lenis from 'lenis';

// Hooks
import { useWorkshopData } from './hooks/useWorkshopData';

// Layout Components
import { CyberGrid } from './components/Layout/CyberGrid';
import { Scanline } from './components/Layout/Scanline';
import { SearchBar } from './components/Layout/SearchBar';
import { SidebarItem } from './components/Layout/SidebarItem';

// Shared Components
import { KPIItem } from './components/Shared/KPIItem';

// Views
import { AnalyticsView } from './views/AnalyticsView';
import { DigitalTwinView } from './views/DigitalTwinView';
import { VitalsView } from './views/VitalsView';
import { SafetyView } from './views/SafetyView';
import { AssetView } from './views/AssetView';
import { LoadingSync } from './views/LoadingSync';

const App = () => {
    const data = useWorkshopData();
    const [activeView, setActiveView] = useState('analytics');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const scrollWrapperRef = useRef(null);
    const scrollContentRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!scrollWrapperRef.current || !scrollContentRef.current) return;
        const lenis = new Lenis({
            wrapper: scrollWrapperRef.current,
            content: scrollContentRef.current,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, [activeView]);

    if (!data) return <LoadingSync />;

    return (
        <div className={`flex h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900 overflow-hidden relative`}>
            <CyberGrid />
            <Scanline />
            
            {/* Mobile overlay background */}
            <AnimatePresence>
                {isMobile && isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]"
                    />
                )}
            </AnimatePresence>
            <motion.aside 
                initial={false}
                animate={{ 
                    width: isMobile ? 280 : (isSidebarOpen ? 280 : 80),
                    x: isMobile ? (isSidebarOpen ? 0 : '-100%') : 0
                }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                style={{ willChange: 'width, transform' }}
                className={`bg-white border-r border-slate-200 flex flex-col z-[100] shadow-2xl shadow-slate-200/50 ${isMobile ? 'fixed inset-y-0 left-0' : 'relative'}`}
            >
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-10 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg z-[60] hover:scale-110 transition-transform group"
                >
                    <motion.div
                        animate={{ rotate: isSidebarOpen ? 0 : 180 }}
                        className="text-slate-400 group-hover:text-orange-500 transition-colors"
                    >
                        <ArrowUpRight size={14} className="rotate-[225deg]" />
                    </motion.div>
                </button>

                <div className={`p-8 pb-4 flex items-center gap-4 w-full transition-all duration-300 ${!isSidebarOpen && 'px-4 justify-center'}`}>
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-2xl relative group overflow-hidden cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <LayoutDashboard size={24} className="relative z-10" />
                    </div>
                    <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                exit={{ opacity: 0, x: -10 }}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                <h1 className="font-bold text-xl text-slate-800 tracking-tight leading-none mb-1">COREFLEET</h1>
                                <p className="text-[8px] font-bold text-orange-600 tracking-widest uppercase">Digital twin matrix</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                <div className="px-4 mb-4">
                    <div className="h-[1px] bg-slate-100 w-full"></div>
                </div>

                <SearchBar 
                    isOpen={isSidebarOpen} 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                />

                <AnimatePresence>
                    {searchQuery && isSidebarOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="px-4 mb-4 relative z-50"
                        >
                            <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 max-h-[300px] overflow-y-auto no-scrollbar">
                                {[
                                    { label: 'Analytics Overview', view: 'analytics' },
                                    { label: 'System Vitals', view: 'vitals' },
                                    { label: 'Safety Matrix', view: 'safety' },
                                    { label: 'Asset Health', view: 'assets' },
                                    ...(data?.assets || []).map(a => ({ label: `Asset: ${a.id}`, view: 'assets', asset: a }))
                                ].filter(item => 
                                    item.label.toLowerCase().includes(searchQuery.toLowerCase())
                                ).map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setActiveView(item.view);
                                            if (item.asset) setSelectedAsset(item.asset);
                                            setSearchQuery('');
                                        }}
                                        className="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl transition-all group flex items-center justify-between"
                                    >
                                        <span className="text-[10px] font-black text-slate-500 group-hover:text-slate-900 uppercase tracking-widest leading-none">{item.label}</span>
                                        <ArrowUpRight size={12} className="text-slate-300 group-hover:text-orange-500" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <nav className="flex-1 w-full px-4 space-y-1 overflow-y-auto no-scrollbar">
                    <div className="mb-6">
                        {isSidebarOpen && <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-3">Operational</p>}
                        <div className="space-y-1">
                            <SidebarItem icon={<Home size={22} />} label="Overview" active={activeView === 'analytics'} isOpen={isSidebarOpen} onClick={() => setActiveView('analytics')} />
                            <SidebarItem icon={<Activity size={22} />} label="Vitals" badge="LIVE" isOpen={isSidebarOpen} active={activeView === 'vitals'} onClick={() => setActiveView('vitals')} />
                            <SidebarItem icon={<ShieldCheck size={22} />} label="Safety" isOpen={isSidebarOpen} active={activeView === 'safety'} onClick={() => setActiveView('safety')} />
                        </div>
                    </div>

                    <div className="mb-6">
                        {isSidebarOpen && <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-3">Workshop</p>}
                        <div className="space-y-1">
                            <SidebarItem icon={<MapPin size={22} />} label="Layout" active={activeView === 'layout'} isOpen={isSidebarOpen} onClick={() => setActiveView('layout')} />
                            <SidebarItem icon={<Wrench size={22} />} label="Asset Health" isOpen={isSidebarOpen} active={activeView === 'assets'} onClick={() => setActiveView('assets')} />
                        </div>
                    </div>
                </nav>

                <div className="p-4 mt-auto border-t border-slate-100 w-full bg-slate-50/50">
                    <div 
                        onClick={() => window.open('https://portfolio-pi-cyan-73.vercel.app/', '_blank')}
                        className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white transition-all cursor-pointer group/profile"
                    >
                        <div className="w-10 h-10 bg-slate-900 rounded-xl shrink-0 border border-slate-800 shadow-xl overflow-hidden relative">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha`} alt="User" />
                            <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover/profile:opacity-100 transition-opacity"></div>
                        </div>
                        {isSidebarOpen && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="overflow-hidden flex-1"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-xs text-slate-800 truncate">Himanshu kumar</p>
                                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest truncate">Chief Overseer</p>
                                </div>
                            </motion.div>
                        )}
                        {isSidebarOpen && <ArrowUpRight size={14} className="text-slate-300 group-hover/profile:text-orange-500 transition-colors" />}
                    </div>
                </div>
            </motion.aside>

            <motion.main 
                layout
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="flex-1 flex flex-col min-w-0 relative"
            >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px] -mr-64 -mt-64 -z-10"></div>
                
                <div className="px-4 py-3 md:px-10 md:py-6 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-40 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
                        <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center gap-2 md:gap-3 mb-1">
                                {isMobile && (
                                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-600 hover:text-orange-500 rounded-xl hover:bg-slate-100 transition-colors shrink-0">
                                        <LayoutDashboard size={20} />
                                    </button>
                                )}
                                <motion.span 
                                    animate={{ opacity: [1, 0.7, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="px-2 py-1 md:px-3 md:py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 md:gap-2 shadow-sm shrink-0"
                                >
                                    <div className="relative">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"></div>
                                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                                    </div>
                                    <span className="hidden sm:inline">Live Sync</span>
                                    <span className="inline sm:hidden">Sync</span>
                                </motion.span>
                                <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-slate-900 tracking-tighter truncate">Industrial Command Center</h1>
                            </div>
                            <p className="hidden md:block text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] ml-1 truncate">Precision Workshop Monitoring System • mahipalpur,new delhi 37</p>
                        </div>
                        
                        <div className="flex bg-slate-100 p-1 rounded-[16px] md:rounded-[20px] shadow-inner gap-1 w-full md:w-auto overflow-x-auto no-scrollbar shrink-0">
                            {['layout', 'analytics'].map(v => (
                                <button key={v} onClick={() => setActiveView(v)} className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-2.5 rounded-[12px] md:rounded-[16px] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] transition-all whitespace-nowrap ${activeView === v ? 'bg-white text-slate-900 shadow-md md:shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}>
                                    {v === 'layout' ? 'Digital Twin' : 'Deep Analytics'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div ref={scrollWrapperRef} className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-4 lg:px-10 py-6 md:py-10 relative bg-gradient-to-b from-white/0 to-slate-50/50">
                    <div ref={scrollContentRef} className="">
                        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-5 mb-6 md:mb-8">
                            <KPIItem label="Overall OEE" value={`${data.global.oee}%`} trend="up" status="Optimal" />
                            <KPIItem label="Availability" value={`${data.global.availability}%`} trend="up" status="Optimal" />
                            <KPIItem label="Performance" value={`${data.global.performance}%`} trend="down" status="Warning" />
                            <KPIItem label="Quality" value={`${data.global.quality}%`} trend="up" status="Optimal" />
                            <KPIItem label="Throughput" value={data.global.throughput} suffix=" p/h" trend="up" status="Optimal" />
                            <KPIItem label="Active Alerts" value={data.global.activeAlerts} isAlert={data.global.activeAlerts > 0} status={data.global.activeAlerts > 0 ? 'Critical' : 'None'} />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeView}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                            >
                                {activeView === 'layout' ? (
                                    <DigitalTwinView data={data.lines} />
                                ) : activeView === 'vitals' ? (
                                    <VitalsView data={data} />
                                ) : activeView === 'safety' ? (
                                    <SafetyView />
                                ) : activeView === 'assets' ? (
                                    <AssetView data={data} selectedAsset={selectedAsset} onDetail={setSelectedAsset} />
                                ) : (
                                    <AnalyticsView stats={data.global} lines={data.lines} onDetailView={setActiveView} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.main>
        </div>
    );
};

export default App;

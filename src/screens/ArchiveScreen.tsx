import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpDown, Search, SlidersHorizontal, Info, Award, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { allArchiveProducts, Product } from '../lib/data';

export function ArchiveScreen({ onProductClick }: { onProductClick: (id: string) => void }) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

    const categories = ['All', 'Outerwear', 'Bottoms', 'Fleece', 'Accessories'];

    // Filtering logic
    const filteredProducts = allArchiveProducts.filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        return sortOrder === 'ASC' ? a.price - b.price : b.price - a.price;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[1440px] mx-auto px-6 md:px-8 pt-24 pb-12 flex flex-col gap-6"
        >
            {/* Archive Header & Stats Row Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-surface border border-outline rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-sm">
                    <div>
                        <span className="text-xs font-bold text-on-surface uppercase tracking-widest block mb-2">Inventory Ledger</span>
                        <h1 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-on-background mb-4">
                            The Complete Archive
                        </h1>
                        <p className="text-sm text-on-surface max-w-lg leading-relaxed">
                            A highly curated list of individual product releases. Every catalog piece contains detailed historical index coordinates and precise pricing matrices.
                        </p>
                    </div>
                    
                    {/* Category tabs styled beautifully inside the grid block */}
                    <div className="flex flex-wrap gap-2 mt-8 relative">
                        {categories.map(cat => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`relative px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-colors duration-300 shadow-sm z-10 border
                                        ${isActive 
                                            ? 'text-background border-transparent' 
                                            : 'border-outline bg-background text-on-surface hover:text-on-background hover:bg-surface-dim/40'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeCategoryBackground"
                                            className="absolute inset-0 bg-on-background rounded-full -z-10"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Registry overview / telemetry sidebar (No emojis, sleek metrics) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-primary rounded-3xl p-6 text-background shadow-md flex flex-col justify-between flex-1">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-white/50 tracking-widest uppercase">Vault Security</span>
                            <Award className="w-5 h-5 text-white/80" />
                        </div>
                        <div>
                            <span className="text-4xl font-bold tracking-tighter">LV-01</span>
                            <p className="text-xs text-white/80 mt-1 uppercase tracking-wider">Authorized Collector Rights Active</p>
                        </div>
                    </div>
                    <div className="bg-surface border border-outline rounded-3xl p-6 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-background rounded-xl border border-outline flex items-center justify-center">
                                <FileSpreadsheet className="w-5 h-5 text-on-surface" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Total Indexed</h4>
                                <p className="text-lg font-bold text-on-background">{allArchiveProducts.length} Unique Pieces</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold font-mono text-primary bg-primary/10 px-3 py-1.5 rounded-full">FW26 ACTIVE</span>
                    </div>
                </div>
            </div>

            {/* Filter controls row */}
            <div className="bg-surface border border-outline rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface" />
                    <input 
                        type="text" 
                        placeholder="Search archives by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background border border-outline/50 rounded-2xl py-2 px-10 text-xs focus:outline-none focus:border-primary placeholder:text-on-surface/50 text-on-background font-medium"
                    />
                </div>
                <div className="flex gap-3 justify-end w-full sm:w-auto">
                    <button 
                        onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
                        className="flex items-center gap-2 bg-background border border-outline/50 hover:bg-surface-dim transition-colors text-xs font-bold text-on-background px-4 py-2 rounded-2xl cursor-pointer"
                    >
                        <ArrowUpDown className="w-3.5 h-3.5" />
                        Sort: {sortOrder === 'DESC' ? 'Price High' : 'Price Low'}
                    </button>
                    <div className="flex items-center gap-2 bg-background border border-outline/50 text-xs font-bold text-on-surface px-4 py-2 rounded-2xl">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Active Results: {filteredProducts.length}
                    </div>
                </div>
            </div>

            {/* Product Database Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((p, i) => (
                        <motion.div
                            layout
                            key={p.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ y: -6 }}
                            className="group cursor-pointer bg-surface border border-outline rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                            onClick={() => onProductClick(p.id)}
                        >
                            <div className="relative w-full aspect-square overflow-hidden bg-surface-dim">
                                {p.isNew && (
                                    <div className="absolute top-3 left-3 z-10 bg-primary text-background rounded-full px-3 py-1 shadow-sm">
                                        <span className="font-bold text-[10px] uppercase tracking-wider">New Release</span>
                                    </div>
                                )}
                                {p.isSoldOut && (
                                    <div className="absolute top-3 left-3 z-10 bg-surface border border-outline text-on-surface rounded-full px-3 py-1 shadow-sm">
                                        <span className="font-bold text-[10px] uppercase tracking-wider">LOCKED // SOLD OUT</span>
                                    </div>
                                )}
                                <img 
                                    src={p.image} 
                                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${p.isSoldOut ? 'opacity-60 grayscale' : ''}`} 
                                    alt={p.name}
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            
                            <div className={`p-5 flex-grow flex flex-col justify-between ${p.isSoldOut ? 'opacity-60' : ''}`}>
                                <div className="mb-4">
                                    <span className="text-[10px] font-mono font-bold text-primary block mb-1 uppercase">NV-FW26-00{p.id}</span>
                                    <h3 className={`font-bold text-lg leading-tight mb-1 ${p.isSoldOut ? 'line-through text-on-surface' : 'text-on-background'}`}>{p.name}</h3>
                                    <p className="text-on-surface text-sm capitalize">{p.category}</p>
                                </div>
                                <div className="flex justify-between items-center border-t border-outline/50 pt-4 mt-1">
                                    <span className="font-bold text-on-background">£{p.price} GBP</span>
                                    <div className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-background transition-colors">
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredProducts.length === 0 && (
                    <div className="col-span-full bg-surface border border-outline rounded-3xl p-16 text-center text-on-surface">
                        <Info className="w-8 h-8 mx-auto text-on-surface/40 mb-3" />
                        <h3 className="font-bold text-lg text-on-background">No Archival Matches Found</h3>
                        <p className="text-sm mt-1 max-w-sm mx-auto">Please adjust your current ledger query parameters or select another luxury segment.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

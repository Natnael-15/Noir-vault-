import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, X, ArrowRight, CornerDownRight } from 'lucide-react';
import { allArchiveProducts, Product } from '../lib/data';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProduct: (id: string) => void;
}

export function SearchOverlay({ isOpen, onClose, onSelectProduct }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    
    if (!isOpen) return null;

    const filtered = query.trim() === '' ? [] : allArchiveProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.code.toLowerCase().includes(query.toLowerCase())
    );

    const presetSearches = ['Outerwear', 'Bottoms', 'Accessories', 'Velour', 'Heavyweight', 'FW26'];

    const handleSelect = (id: string) => {
        onSelectProduct(id);
        setQuery('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden font-body">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background"
            />

            {/* Content Area */}
            <div className="relative h-full w-full max-w-[800px] mx-auto px-6 md:px-8 pt-20 flex flex-col">
                
                {/* Close & Header */}
                <div className="flex justify-between items-center mb-10">
                    <span className="text-xs font-bold text-on-surface uppercase tracking-widest font-mono">Noir Vault Central Ledger</span>
                    <button onClick={onClose} className="p-3 bg-surface border border-outline rounded-full text-on-surface hover:text-on-background hover:scale-105 transition-all">
                        <X size={18} />
                    </button>
                </div>

                {/* Main Search Input */}
                <div className="relative border-b-2 border-primary/20 focus-within:border-primary transition-colors pb-4 flex items-center">
                    <Search className="w-8 h-8 text-primary shrink-0 mr-4" />
                    <input 
                        autoFocus
                        type="text" 
                        placeholder="Search items, categories, collections..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-transparent text-2xl md:text-3xl font-display font-medium text-on-background focus:outline-none placeholder:text-on-surface/40"
                    />
                </div>

                {/* Suggestions / Results */}
                <div className="flex-1 overflow-y-auto pt-8 pb-12 hide-scrollbar">
                    {query.trim() === '' ? (
                        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                            <div>
                                <span className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-3">Popular Directories</span>
                                <div className="flex flex-wrap gap-2">
                                    {presetSearches.map(preset => (
                                        <button 
                                            key={preset}
                                            onClick={() => setQuery(preset)}
                                            className="bg-surface border border-outline px-4 py-2 rounded-full text-xs font-bold text-on-surface hover:border-primary hover:text-primary transition-all cursor-pointer"
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <span className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-3">Quick Index Recommendations</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {allArchiveProducts.slice(0, 4).map(p => (
                                        <div 
                                            key={p.id}
                                            onClick={() => handleSelect(p.id)}
                                            className="p-4 bg-surface border border-outline rounded-2xl flex items-center gap-4 cursor-pointer hover:border-primary/40 transition-colors"
                                        >
                                            <div className="w-12 h-14 bg-surface-dim rounded-lg overflow-hidden shrink-0">
                                                <img src={p.image} className="w-full h-full object-cover" alt={p.name} referrerPolicy="no-referrer" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-on-background leading-none mb-1">{p.name}</h4>
                                                <p className="text-[10px] font-mono text-on-surface uppercase">{p.code}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                            <span className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2">
                                Search Results ({filtered.length})
                            </span>
                            
                            {filtered.length === 0 ? (
                                <div className="text-center py-12 px-4 bg-surface border border-outline rounded-3xl">
                                    <p className="text-sm font-bold text-on-background">No matching catalog pieces found</p>
                                    <p className="text-xs text-on-surface mt-1">Please try searching by outerwear, bottoms, fleece, accessories, or look up active product codes.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {filtered.map(p => (
                                        <div 
                                            key={p.id}
                                            onClick={() => handleSelect(p.id)}
                                            className="group flex justify-between items-center p-4 bg-surface border border-outline hover:border-primary rounded-2xl cursor-pointer transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-15 bg-surface-dim rounded-xl overflow-hidden shadow-sm">
                                                    <img src={p.image} className="w-full h-full object-cover" alt={p.name} referrerPolicy="no-referrer" />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-bold font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">{p.category}</span>
                                                    <h4 className="font-bold text-md text-on-background mt-1 leading-tight">{p.name}</h4>
                                                    <p className="text-[10px] text-on-surface font-mono lowercase">{p.code}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-mono font-bold text-sm text-on-background">£{p.price} GBP</span>
                                                <div className="w-8 h-8 rounded-full bg-background border border-outline group-hover:bg-primary group-hover:text-background flex items-center justify-center transition-colors">
                                                    <ArrowRight size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

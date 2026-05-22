import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { featuredProducts } from '../lib/data';
import { audioEngine } from '../lib/audio';

interface HomeScreenProps {
    onProductClick: (id: string) => void;
    onApplyClick: () => void;
    onLookbookClick: () => void;
    onSeeAllClick: () => void;
}

export function HomeScreen({ onProductClick, onApplyClick, onLookbookClick, onSeeAllClick }: HomeScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[1440px] mx-auto px-6 md:px-8 pt-24 pb-12 flex flex-col gap-6"
        >
            {/* Bento Grid Top Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
                {/* Hero Main Card */}
                <div className="lg:col-span-8 bg-surface rounded-3xl border border-outline shadow-sm overflow-hidden relative flex flex-col justify-end p-8 md:p-12 group/hero">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgfpXgfPNklsYufIWxL3U_jyNn6fl8TFDHfNsLSh9YLj2RYLGjB71V6LjF4aLeKTP4OCTflcwu19lL_iyELpWqQZzSl7xwGdk0m_55i7FSsfH_I6AA9JghZscGK1pvgbER41t2a9Y_bD5B9chAgUT_-CIGK3QuQ_xDtU6hmq4iwNo2xDcAYDxA47emkZ-Dj2FgqJ5hQ-c9tjaoUDOO0UeM72GBZVgnRdnT5XY41hUwRY-PWnn00r-vyjzv__2aeebOCRyuTlFoMg" 
                            className="w-full h-full object-cover object-[center_20%] opacity-80 transition-transform duration-1000 ease-out group-hover/hero:scale-102" 
                            alt="Striking cinematic fashion"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-transparent" />
                    </div>
                    
                    <div className="relative z-10 w-full text-left">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="font-display font-bold text-5xl md:text-6xl tracking-tight text-on-background mb-8"
                        >
                            Quiet luxury.<br/>Built for the few.
                        </motion.h1>
                        
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    audioEngine.playHaptic();
                                    onProductClick('1');
                                }}
                                className="bg-primary text-background font-bold text-sm px-8 py-3 rounded-full hover:bg-primary-dim transition-colors shadow-sm cursor-pointer"
                            >
                                View Collection
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    audioEngine.playTick();
                                    onLookbookClick();
                                }}
                                className="bg-surface border border-outline text-on-background font-bold text-sm px-8 py-3 rounded-full hover:bg-surface-dim transition-colors shadow-sm cursor-pointer"
                            >
                                Explore Lookbook
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Hero Side Cards */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <motion.div 
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex-1 bg-primary rounded-3xl p-8 text-background flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <motion.div 
                                animate={{ y: [0, -4, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="w-16 h-16 bg-white/20 rounded-2xl mb-4 mx-auto flex items-center justify-center text-2xl"
                            >
                                <Sparkles className="w-6 h-6 text-white animate-pulse" />
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2 font-display">Exclusive Access</h3>
                            <p className="text-white/80 text-sm max-w-[200px] mx-auto">Join the inner circle for unlisted ledger pieces.</p>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    audioEngine.playHaptic();
                                    onApplyClick();
                                }}
                                className="mt-6 bg-white text-primary px-8 py-2.5 rounded-full font-bold text-sm shadow-md cursor-pointer hover:bg-neutral-100 transition-colors"
                            >
                                Apply Now
                            </motion.button>
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white rounded-full opacity-10 blur-3xl"></div>
                    </motion.div>
                    
                    <motion.div 
                        whileHover={{ y: -3 }}
                        onClick={() => {
                            audioEngine.playHaptic();
                            onSeeAllClick();
                        }}
                        className="bg-surface border border-outline rounded-3xl p-6 flex items-center gap-6 shadow-sm cursor-pointer"
                    >
                        <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 transform -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-surface-dim" />
                                <motion.circle 
                                    cx="32" 
                                    cy="32" 
                                    r="28" 
                                    stroke="currentColor" 
                                    strokeWidth="6" 
                                    fill="transparent" 
                                    strokeDasharray="175.9" 
                                    initial={{ strokeDashoffset: 175.9 }}
                                    animate={{ strokeDashoffset: 175.9 * 0.25 }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                    className="text-primary" 
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center font-bold text-sm text-on-background">75%</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-on-surface uppercase mb-1">Archive Remaining</p>
                            <p className="text-lg font-bold text-on-background">12 of 16 Pieces</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="bg-surface border border-outline rounded-3xl shadow-sm p-8 md:p-12 w-full mt-2">
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-outline">
                    <div>
                        <h2 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Current season</h2>
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-on-background tracking-tight">Vault Collection 01</h3>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            audioEngine.playHaptic();
                            onSeeAllClick();
                        }}
                        className="font-bold text-sm text-primary hover:text-primary-dim transition-colors cursor-pointer bg-primary/10 px-4 py-2 rounded-full"
                    >
                        See All
                    </motion.button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                            whileHover={{ y: -6 }}
                            className="group cursor-pointer bg-surface border border-outline rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                            onClick={() => {
                                audioEngine.playHaptic();
                                onProductClick(p.id);
                            }}
                        >
                            <div className="relative w-full aspect-square overflow-hidden bg-surface-dim">
                                {p.isNew && (
                                    <div className="absolute top-3 left-3 z-10 bg-primary text-background rounded-full px-3 py-1 shadow-sm">
                                        <span className="font-bold text-[10px] uppercase tracking-wider">New</span>
                                    </div>
                                )}
                                {p.isSoldOut && (
                                    <div className="absolute top-3 left-3 z-10 bg-surface border border-outline text-on-surface rounded-full px-3 py-1 shadow-sm">
                                        <span className="font-bold text-[10px] uppercase tracking-wider">Sold Out</span>
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
                                    <h3 className={`font-bold text-lg leading-tight mb-1 ${p.isSoldOut ? 'line-through text-on-surface' : 'text-on-background'}`}>{p.name}</h3>
                                    <p className="text-on-surface text-sm capitalize">{p.category}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-on-background">£{p.price}</span>
                                    <div className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-background transition-colors">
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-12 flex justify-center">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            audioEngine.playHaptic();
                            onSeeAllClick();
                        }}
                        className="bg-surface border border-outline hover:bg-surface-dim font-bold text-sm text-on-background px-8 py-3 rounded-full transition-colors shadow-sm cursor-pointer"
                    >
                        Load More Archives
                    </motion.button>
                </div>
            </section>
        </motion.div>
    );
}

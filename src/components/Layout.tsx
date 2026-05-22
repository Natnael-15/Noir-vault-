import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { ViewState } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../lib/audio';

interface NavBarProps {
    currentView: ViewState;
    onViewChange: (view: ViewState) => void;
    onSearchOpen: () => void;
    onCartOpen: () => void;
    cartCount: number;
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

export function NavBar({ 
    currentView, 
    onViewChange, 
    onSearchOpen, 
    onCartOpen, 
    cartCount,
    darkMode,
    onToggleDarkMode
}: NavBarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [audioActive, setAudioActive] = useState(audioEngine.isEnabled());

    const toggleMobile = () => {
        audioEngine.playTick();
        setMobileOpen(!mobileOpen);
    };

    const handleNav = (view: ViewState) => {
        audioEngine.playHaptic();
        onViewChange(view);
        setMobileOpen(false);
    };

    const toggleAudio = () => {
        const nextState = audioEngine.toggle();
        setAudioActive(nextState);
    };

    const isHomeActive = currentView === 'HOME' || currentView === 'PRODUCT';

    return (
        <nav className="sticky top-0 w-full z-50 bg-background/90 backdrop-blur-xl pt-6 pb-4 border-b border-outline/10">
            <div className="flex justify-between items-center h-12 px-6 md:px-8 max-w-[1440px] mx-auto">
                {/* Desktop Tabs */}
                <div className="hidden md:flex bg-surface border border-outline rounded-full p-1 shadow-sm relative">
                    {['HOME', 'EDITORIAL', 'ARCHIVE', 'DROPS'].map((view) => {
                        const viewState = view as ViewState;
                        const label = view === 'HOME' ? 'Collections' : view === 'EDITORIAL' ? 'Editorial' : view === 'ARCHIVE' ? 'Archive' : 'Drops';
                        const isActive = view === 'HOME' ? isHomeActive : currentView === view;
                        return (
                            <button
                                key={view}
                                onClick={() => handleNav(viewState)}
                                className={`relative px-6 py-1.5 rounded-full text-sm font-medium cursor-pointer z-10 transition-colors duration-300 ${
                                    isActive ? 'text-background' : 'text-on-surface hover:text-on-background'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavBackground"
                                        className="absolute inset-0 bg-on-background rounded-full -z-10"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {label}
                            </button>
                        );
                    })}
                </div>
                
                {/* Mobile Menu Button */}
                <button onClick={toggleMobile} className="md:hidden text-on-background hover:opacity-70 transition-opacity p-2 -ml-2 cursor-pointer">
                    <Menu size={20} strokeWidth={1.5} />
                </button>
                
                <div 
                    onClick={() => handleNav('HOME')}
                    className="flex flex-col items-center cursor-pointer md:absolute md:left-1/2 md:-translate-x-1/2 group"
                >
                    <h1 className="font-display text-xl font-bold text-on-background tracking-tight transition-transform duration-300 group-hover:scale-105">Noir Vault</h1>
                </div>
                
                <div className="flex space-x-3 items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onToggleDarkMode}
                        className="w-10 h-10 flex items-center justify-center bg-surface border border-outline text-on-surface hover:text-on-background rounded-full shadow-sm cursor-pointer transition-colors"
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {darkMode 
                            ? <Sun size={18} strokeWidth={2} className="text-amber-500 animate-spin-slow" /> 
                            : <Moon size={18} strokeWidth={2} />
                        }
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleAudio}
                        className={`w-10 h-10 flex items-center justify-center border rounded-full shadow-sm cursor-pointer transition-all duration-300 ${
                            audioActive 
                            ? 'bg-primary text-background border-transparent' 
                            : 'bg-surface border-outline text-on-surface hover:text-on-background'
                        }`}
                        title={audioActive ? "Disable Cyber Haptic Audio" : "Enable Cyber Haptic Audio"}
                    >
                        {audioActive ? <Volume2 size={18} strokeWidth={2} className="animate-pulse" /> : <VolumeX size={18} strokeWidth={2} />}
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            audioEngine.playSwoosh();
                            onSearchOpen();
                        }}
                        className="w-10 h-10 flex items-center justify-center bg-surface border border-outline rounded-full shadow-sm text-on-surface hover:text-on-background transition-colors cursor-pointer"
                        title="Search Ledger Index"
                    >
                        <Search size={18} strokeWidth={2} />
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            audioEngine.playSwoosh();
                            onCartOpen();
                        }}
                        className="w-10 h-10 flex items-center justify-center bg-surface border border-outline rounded-full shadow-sm text-on-surface hover:text-on-background transition-colors cursor-pointer relative"
                        title="View Active Bag"
                    >
                        <ShoppingBag size={18} strokeWidth={2} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span 
                                    key={cartCount}
                                    initial={{ scale: 0.6, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.6, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                    className="absolute -top-1 -right-1 bg-primary text-background font-mono font-bold text-[9px] w-5 h-5 flex items-center justify-center rounded-full"
                                    id="nav-cart-badge"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Navigation Drawer with smooth slide interaction */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMobile}
                            className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-40 md:hidden"
                        />
                        {/* Content Panel */}
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                            className="md:hidden fixed top-0 bottom-0 left-0 w-4/5 max-w-sm z-50 bg-background flex flex-col p-6 border-r border-outline/30 shadow-2xl"
                        >
                            <div className="flex justify-between items-center h-12 mb-8">
                                <button onClick={toggleMobile} className="text-on-background hover:opacity-70 transition-opacity p-2 cursor-pointer">
                                    <X size={24} strokeWidth={1.5} />
                                </button>
                                <h2 className="font-display text-xl font-bold text-on-background tracking-tight">Noir Vault</h2>
                                <div className="w-10 h-10"></div> {/* Spacer to keep visual center */}
                            </div>

                            <div className="flex flex-col gap-4 text-2xl font-display font-medium text-on-background mt-4">
                                {['HOME', 'EDITORIAL', 'ARCHIVE', 'DROPS'].map((view, i) => {
                                    const viewState = view as ViewState;
                                    const label = view === 'HOME' ? 'Collections' : view === 'EDITORIAL' ? 'Editorial' : view === 'ARCHIVE' ? 'Archive' : 'Drops';
                                    const isActive = view === 'HOME' ? isHomeActive : currentView === view;
                                    return (
                                        <motion.button 
                                            initial={{ opacity: 0, x: -15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={view}
                                            onClick={() => handleNav(viewState)} 
                                            className={`text-left p-4 rounded-2xl flex justify-between items-center cursor-pointer border transition-all ${
                                                isActive 
                                                ? 'bg-surface border-outline font-bold text-primary pl-6' 
                                                : 'border-transparent text-on-surface/85 hover:text-on-background hover:bg-surface-dim/30'
                                            }`}
                                        >
                                            <span>{label}</span>
                                            {isActive && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="mt-auto pt-8 border-t border-outline/50 flex flex-col items-center gap-1.5">
                                <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">System Ledger Active</span>
                                <span className="text-[9px] font-mono text-on-surface/50">SECURE SHELL CONNECTED</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}

interface FooterProps {
    onInfoClick: (tab: 'PRIVACY' | 'TERMS' | 'SHIPPING' | 'CAREERS' | 'INSTAGRAM') => void;
}

export function Footer({ onInfoClick }: FooterProps) {
    const links = ['Privacy', 'Terms', 'Shipping', 'Careers', 'Instagram'] as const;

    const handleLinkClick = (e: React.MouseEvent, link: typeof links[number]) => {
        e.preventDefault();
        onInfoClick(link.toUpperCase() as 'PRIVACY' | 'TERMS' | 'SHIPPING' | 'CAREERS' | 'INSTAGRAM');
    };

    return (
        <footer className="bg-surface w-full py-16 md:py-24 border-t border-outline">
            <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col items-center text-center">
                <motion.div 
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-on-background rounded-2xl flex items-center justify-center text-background font-bold text-2xl tracking-tighter mb-8 shadow-md cursor-pointer"
                >
                    N
                </motion.div>
                
                <h2 className="font-display text-2xl font-bold text-on-background tracking-tight mb-8">Noir Vault</h2>
                
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {links.map(link => (
                        <motion.a 
                            whileHover={{ y: -2 }}
                            key={link} 
                            href={`#${link.toLowerCase()}`} 
                            onClick={(e) => handleLinkClick(e, link)}
                            className="font-bold text-sm text-on-surface hover:text-primary transition-colors bg-background px-4 py-2 rounded-full border border-outline cursor-pointer shadow-sm"
                        >
                            {link}
                        </motion.a>
                    ))}
                </div>
                
                <p className="text-sm font-medium text-on-surface/60">
                    © 2024 Noir Vault. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

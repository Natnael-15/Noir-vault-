import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Bell, ShieldCheck, Mail, ArrowRight, EyeOff } from 'lucide-react';
import { DropsLab } from '../components/DropsLab';

export function DropsScreen() {
    const [timeLeft, setTimeLeft] = useState({
        days: 8,
        hours: 14,
        minutes: 32,
        seconds: 45
    });
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    // Dynamic ticking countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const submitPriorityAccess = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() !== '') {
            setSubscribed(true);
        }
    };

    const upcomingPieces = [
        {
            code: "NV-D03-01",
            name: "Asymmetrical Waxed Field Jacket",
            spec: "600D water-repellent Japanese canvas coated in organic paraffin wax. Features articulated sleeves and storm collar.",
            materials: "Waxed Cotton, Custom Matte Black Branded Rivets",
            eta: "Release Priority 1"
        },
        {
            code: "NV-D03-02",
            name: "Crushable Memory-Nylon Balaclava",
            spec: "Ultralight double-woven memory nylon with interior fleece sweat-strip. Foldable crown allows modular storage.",
            materials: "Memory Tech-Nylon, Merino Fleece Lining",
            eta: "Release Priority 2"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[1440px] mx-auto px-6 md:px-8 pt-24 pb-12 flex flex-col gap-6"
        >
            {/* Top Row: Big Countdown Bento + Access Request Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Big Ticking Countdown */}
                <div className="lg:col-span-8 bg-surface border border-outline rounded-3xl p-8 md:p-12 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-bold text-on-surface uppercase tracking-widest block">System Status // Online</span>
                        </div>
                        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-on-background mb-1">
                            Scheduled Drop 03
                        </h1>
                        <p className="text-sm text-on-surface">
                            A limited release of technical outerwear. Available exclusively to certified collection keyholders.
                        </p>
                    </div>

                    {/* Countdown Digits Row */}
                    <div className="grid grid-cols-4 gap-4 max-w-lg mt-10 mb-6 bg-background p-6 rounded-2xl border border-outline/50 overflow-hidden">
                        <div className="text-center">
                            <motion.span 
                                key={timeLeft.days}
                                initial={{ y: 5, opacity: 0.7 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                                className="block font-mono text-4xl md:text-5xl font-extrabold text-on-background"
                            >
                                {String(timeLeft.days).padStart(2, '0')}
                            </motion.span>
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest block mt-1">Days</span>
                        </div>
                        <div className="text-center border-l border-outline/60">
                            <motion.span 
                                key={timeLeft.hours}
                                initial={{ y: 5, opacity: 0.7 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                                className="block font-mono text-4xl md:text-5xl font-extrabold text-on-background"
                            >
                                {String(timeLeft.hours).padStart(2, '0')}
                            </motion.span>
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest block mt-1">Hours</span>
                        </div>
                        <div className="text-center border-l border-outline/60">
                            <motion.span 
                                key={timeLeft.minutes}
                                initial={{ y: 5, opacity: 0.7 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                                className="block font-mono text-4xl md:text-5xl font-extrabold text-on-background"
                            >
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </motion.span>
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest block mt-1">Minutes</span>
                        </div>
                        <div className="text-center border-l border-outline/60">
                            <motion.span 
                                key={timeLeft.seconds}
                                initial={{ y: 10, opacity: 0.5 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                                className="block font-mono text-4xl md:text-5xl font-extrabold text-primary"
                            >
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </motion.span>
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest block mt-1">Seconds</span>
                        </div>
                    </div>
                </div>

                {/* Priority Sign-up list */}
                <motion.div 
                    whileHover={{ y: -3 }}
                    className="lg:col-span-4 bg-primary text-background rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-background/20 rounded-xl mb-6 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-background" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Priority Ledger</h3>
                        <p className="text-background/80 text-sm leading-relaxed mb-6">
                            Submit your verified email to receive encrypted notification protocols exactly 10 minutes prior to physical store release.
                        </p>
                    </div>

                    {/* Form block */}
                    <div className="relative z-10 w-full">
                        {!subscribed ? (
                            <form onSubmit={submitPriorityAccess} className="flex flex-col gap-3">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-background/60" />
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="Secure email link..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-background/10 hover:bg-background/15 focus:bg-background/20 transition-colors border border-background/20 rounded-full py-3.5 px-10 text-xs text-background placeholder:text-background/50 focus:outline-none focus:border-background font-medium"
                                    />
                                </div>
                                <button type="submit" className="w-full bg-background text-primary rounded-full py-3 text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
                                    Join Core Ledger
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        ) : (
                            <div className="bg-background/10 border border-background/20 rounded-2xl p-5 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <ShieldCheck className="w-8 h-8 text-background mb-2" />
                                <span className="text-xs font-bold uppercase tracking-wider block text-background">Registry Verified</span>
                                <p className="text-xs text-background/80 mt-1">Core communication linked to: {email}</p>
                            </div>
                        )}
                    </div>
                    <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-background/10 rounded-full opacity-20 blur-2xl"></div>
                </motion.div>
            </div>

            {/* Upcoming items overview */}
            <div className="bg-surface border border-outline rounded-3xl p-8 md:p-12 shadow-sm flex flex-col gap-8 w-full">
                <div className="flex justify-between items-center border-b border-outline pb-6">
                    <div>
                        <span className="text-xs font-bold text-on-surface uppercase tracking-widest block mb-1">Preview</span>
                        <h3 className="font-display font-bold text-2xl text-on-background tracking-tight">Drop 03 Materials & Spec Studies</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-on-surface bg-background border border-outline p-2 rounded-xl">
                        <EyeOff className="w-3.5 h-3.5 text-primary" />
                        Pre-orders Locked
                    </div>
                </div>

                {/* Grid list of upcoming products */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingPieces.map((piece, i) => (
                        <motion.div 
                            whileHover={{ y: -4, borderColor: "var(--color-primary)" }}
                            key={i} 
                            className="bg-background border border-outline rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm cursor-pointer"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">{piece.code}</span>
                                    <span className="text-xs font-bold text-on-surface uppercase tracking-wider">{piece.eta}</span>
                                </div>
                                <h4 className="font-bold text-lg text-on-background tracking-tight mb-2">{piece.name}</h4>
                                <p className="text-sm text-on-surface leading-relaxed mb-4">{piece.spec}</p>
                            </div>
                            <div className="border-t border-outline/50 pt-4 flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Tonal Material Matrix</span>
                                <span className="text-xs font-bold text-on-background font-mono">{piece.materials}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Interactive Concept Sandbox Study for Drop 04 */}
            <DropsLab />
        </motion.div>
    );
}

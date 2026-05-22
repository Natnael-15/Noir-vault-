import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Shield, Cpu, Key, Award, CheckCircle } from 'lucide-react';

interface ExclusiveModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ExclusiveModal({ isOpen, onClose }: ExclusiveModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        motive: 'curator',
        hardwareId: 'NV-KEY-2026'
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
        }, 1800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-body">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-on-background/70 backdrop-blur-sm"
            />

            {/* Container */}
            <motion.div 
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                className="relative bg-background border border-outline w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden"
            >
                {/* Close */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-on-surface hover:text-on-background rounded-full hover:bg-surface-dim transition-colors">
                    <X size={16} />
                </button>

                {!success ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-5 h-5 text-primary" />
                                <span className="text-[10px] font-bold font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-widest">SECURE KEY PROTOCOL</span>
                            </div>
                            <h3 className="font-display font-medium text-2xl text-on-background tracking-tight">Access Registry Ledger</h3>
                            <p className="text-xs text-on-surface leading-normal mt-1">
                                Apply for private keyholder status to unlock restricted pre-release orders, customized structural sizing adjustments, and archival catalogs.
                            </p>
                        </div>

                        {/* Input Fields */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-on-surface uppercase tracking-wider block mb-1.5">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Enter full name..."
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    className="w-full bg-surface border border-outline rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-background transition-colors placeholder:text-on-surface/40"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-on-surface uppercase tracking-wider block mb-1.5">Secure Email Link</label>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="yourname@domain.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-surface border border-outline rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-background transition-colors placeholder:text-on-surface/40"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-on-surface uppercase tracking-wider block mb-1.5">Access Role</label>
                                    <select 
                                        value={formData.motive}
                                        onChange={(e) => setFormData({...formData, motive: e.target.value})}
                                        className="w-full bg-surface border border-outline text-on-background rounded-xl py-3 px-3 text-xs font-semibold focus:outline-none focus:border-primary"
                                    >
                                        <option value="curator">Curator Collection</option>
                                        <option value="collector">Private Archiver</option>
                                        <option value="designer">Architect / Design</option>
                                    </select>
                                </div>
                                <div className="opacity-75">
                                    <label className="text-[10px] font-bold text-on-surface uppercase tracking-wider block mb-1.5">Protocol Node</label>
                                    <div className="w-full bg-surface-dim border border-outline rounded-xl py-3 px-4 text-xs font-mono font-bold text-on-surface select-none">
                                        NODE-A1-45
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cryptographic Ledger Warning */}
                        <div className="bg-surface border border-outline/70 rounded-xl p-4 flex gap-3 text-on-surface">
                            <Cpu className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-[10px] leading-relaxed">
                                Submission initiates an automated background audit. If verified, a cryptographic key link will be dispatched to your email address within 24 working hours.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className={`w-full h-12 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                                submitting 
                                ? 'bg-surface-dim border border-outline text-on-surface cursor-wait' 
                                : 'bg-primary hover:bg-primary-dim text-background'
                            }`}
                        >
                            {submitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-on-surface border-t-transparent rounded-full animate-spin"></span>
                                    Encrypting Ledger Entry...
                                </>
                            ) : (
                                <>
                                    <Key className="w-4 h-4" />
                                    Submit Application Protocol
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-6 flex flex-col items-center text-center gap-4"
                    >
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        
                        <div>
                            <span className="text-[10px] font-mono font-bold text-primary tracking-widest bg-primary/10 px-3 py-1 rounded-full uppercase">REGISTRY ASSIGNED</span>
                            <h3 className="font-display font-bold text-xl text-on-background mt-3 mb-1">Authorization Pending</h3>
                            <p className="text-xs text-on-surface leading-normal max-w-xs mx-auto">
                                Cryptographic Ledger entry successfully saved for <span className="font-semibold text-on-background">{formData.fullName}</span> ({formData.email}).
                            </p>
                        </div>

                        {/* Certificate Details */}
                        <div className="w-full bg-surface border border-outline border-dashed rounded-2xl p-5 text-left flex flex-col gap-2 relative mt-2">
                            <div className="flex justify-between items-center pb-2 border-b border-outline/50">
                                <span className="text-[9px] font-bold text-on-surface uppercase font-mono">Secure Node</span>
                                <span className="text-[9px] font-mono font-bold text-primary">NODE-A1-45-ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] font-bold text-on-surface uppercase font-mono">Ledger Certificate ID</span>
                                <span className="text-[9px] font-mono font-bold text-on-background">NV-LGD-{(Math.random()*1000000).toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] font-bold text-on-surface uppercase font-mono">Timestamp</span>
                                <span className="text-[9px] font-mono font-bold text-on-background">{new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC</span>
                            </div>
                            
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border border-outline rounded-full pr-0"></div>
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border border-outline rounded-full pl-0"></div>
                        </div>

                        <p className="text-[10px] text-on-surface leading-relaxed mt-2 max-w-xs">
                            Keep your communication channel secure. Verification logs are locked and cannot be resubmitted.
                        </p>

                        <button 
                            onClick={onClose}
                            className="bg-on-background text-background font-bold text-xs px-8 py-2.5 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider shadow-sm mt-4"
                        >
                            Close Protocol Window
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

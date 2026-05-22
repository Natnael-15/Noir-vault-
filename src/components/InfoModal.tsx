import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
    X, ShieldAlert, FileText, Truck, Briefcase, Instagram, 
    Send, CheckCircle, MapPin, Heart, Share2, ZoomIn, ArrowRight,
    ArrowLeft, Camera, MessageSquare, Sliders
} from 'lucide-react';
import { audioEngine } from '../lib/audio';

export type InfoTab = 'PRIVACY' | 'TERMS' | 'SHIPPING' | 'CAREERS' | 'INSTAGRAM';

interface InfoModalProps {
    isOpen: boolean;
    tab: InfoTab;
    onClose: () => void;
}

export function InfoModal({ isOpen, tab, onClose }: InfoModalProps) {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [careerForm, setCareerForm] = useState({
        name: '',
        email: '',
        role: 'Spatial Layout Engineer',
        manifesto: '',
    });

    const [likes, setLikes] = useState<Record<number, boolean>>({});
    const [likedCounts, setLikedCounts] = useState<Record<number, number>>({
        0: 412,
        1: 589,
        2: 320,
        3: 754,
    });

    const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
    const [imageFilters, setImageFilters] = useState({
        grayscale: 0,
        contrast: 100,
        exposure: 100
    });
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<Record<number, string[]>>({
        0: [
            "Observer_Delta: Absolute sublime geometry. Love the structural void pattern.",
            "Kojima_Tech: Is this concrete treated with weather sealer TX-1?",
            "Atelier_User: This scale looks massive. Reminds me of the Basel pavilion."
        ],
        1: [
            "Grid_Keyholder: Incredible seam structure. Is that 2-dot taping?",
            "Tactile_Wear: Cleanest pocket integration in the series.",
            "Loom_Master: Excellent stretch tension flow."
        ],
        2: [
            "Weft_Warp: Tonal balance is absolutely pristine.",
            "Merino_Lover: Incredible warmth retention coefficient, looking forward to Drop 04.",
            "Urban_Vault: Cleanest gray drape in the entire index."
        ],
        3: [
            "Brutalist_Arch: Shadow transition looks almost unreal.",
            "High_Contrast: The silhouette lines are incredibly crisp.",
            "Matrix_Drape: Minimalist perfection."
        ]
    });

    if (!isOpen) return null;

    const handleCareerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    const handleLike = (index: number) => {
        setLikes(prev => {
            const hasLiked = !!prev[index];
            setLikedCounts(counts => ({
                ...counts,
                [index]: hasLiked ? counts[index] - 1 : counts[index] + 1
            }));
            return { ...prev, [index]: !hasLiked };
        });
    };

    const instagramImages = [
        {
            title: "Study 014: Monolithic Concrete Canopy",
            tags: ["#brutalism", "#geometry", "#void"],
            image: "/assets/hero-editorial.jpeg",
            location: "Basel, Switzerland"
        },
        {
            title: "Study 089: Matte Black Techwear Seams",
            tags: ["#construction", "#polyamide", "#fused"],
            image: "/assets/obsidian-parka.jpeg",
            location: "Kojima Atelier"
        },
        {
            title: "Study 112: Heavy Wool Drapery",
            tags: ["#merino", "#tonal", "#matte"],
            image: "/assets/heavyweight-pullover.jpeg",
            location: "Biella Mills"
        },
        {
            title: "Study 204: Architectural Silhouette Shadow",
            tags: ["#silhouette", "#contrast", "#lightwork"],
            image: "/assets/asymmetrical-wool-vest.jpeg",
            location: "Restricted Node"
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 font-body">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-on-background/80 backdrop-blur-md"
            />

            {/* Container */}
            <motion.div 
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                className="relative bg-background border border-outline w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-5 right-5 p-2 text-on-surface hover:text-on-background rounded-full hover:bg-surface-dim transition-colors z-10"
                >
                    <X size={18} />
                </button>

                {/* PRIVACY POLICY CONTENT */}
                {tab === 'PRIVACY' && (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase">DE-IDENTIFIED TRANSITS</span>
                                <h3 className="font-display font-medium text-2xl text-on-background mt-1">Privacy Protocols</h3>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs leading-relaxed text-on-surface">
                            <p>
                                Noir Vault utilizes an enterprise-grade de-identified cryptographic database structure. We do not track browser finger-printing, cookies for cross-site advertisements, or utilize commercial pixel tracking.
                            </p>
                            <div className="bg-surface border border-outline rounded-2xl p-5 space-y-3">
                                <h4 className="font-bold text-on-background text-sm">01 // Keyholder Ledger Integrity</h4>
                                <p>
                                    Your Name, Billing Parameters, and Street Coordinates are heavily encrypted through AES-256 standard and mapped strictly to a private key unique to your transaction. No unhashed records exist in public nodes.
                                </p>
                            </div>
                            <div className="bg-surface border border-outline rounded-2xl p-5 space-y-3">
                                <h4 className="font-bold text-on-background text-sm">02 // Communication Vault</h4>
                                <p>
                                    All direct messages and sizing customization instructions sent to our curators are deleted 14 business days after delivery verification, completely locking the metadata archives permanently.
                                </p>
                            </div>
                            <p className="text-[10px] text-on-surface/50 font-mono">
                                SECURITY AUDIT STATUS: COMPLIANT / ISO-27001 METHODOLOGY // VERIFIED
                            </p>
                        </div>
                    </div>
                )}

                {/* TERMS & CONDITIONS CONTENT */}
                {tab === 'TERMS' && (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase">CATALOG LICENSE AGREEMENT</span>
                                <h3 className="font-display font-medium text-2xl text-on-background mt-1">Terms of Sovereignty</h3>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs leading-relaxed text-on-surface">
                            <p>
                                By committing order transits inside this ledger, you participate directly with high-limit couture architecture. Every item received is subject to the following spatial and functional regulations:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-surface border border-outline rounded-2xl p-5 space-y-2">
                                    <h4 className="font-bold text-on-background text-xs font-mono">A // NON-REFLATION GUARANTEE</h4>
                                    <p className="text-[11px] text-on-surface">
                                        Client agrees not to inflate, artificial-price scalp, or create commercial bot listings mapping to customized technical parkas. SCARCITY MUST BE RESPECTED.
                                    </p>
                                </div>
                                <div className="bg-surface border border-outline rounded-2xl p-5 space-y-2">
                                    <h4 className="font-bold text-on-background text-xs font-mono">B // STRUCTURAL GUARANTEE</h4>
                                    <p className="text-[11px] text-on-surface">
                                        Asymmetric silhouettes and micro-membrane properties are protected for 5 annual cycles. Damage under rigorous urban deployment is fully restored free by our Kojima atelier.
                                    </p>
                                </div>
                            </div>
                            <p>
                                Any breach of spatial terms and ledger integrity triggers immediate revocation of private keyholder credentials, disabling future access to the limited catalog ledger indefinitely.
                            </p>
                        </div>
                    </div>
                )}

                {/* SHIPPING TRANSIT CONTENT */}
                {tab === 'SHIPPING' && (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <Truck className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase">DHL GLOBAL AIR PROTOCOLS</span>
                                <h3 className="font-display font-medium text-2xl text-on-background mt-1">Shipping & Transit Logs</h3>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs leading-relaxed text-on-surface">
                            <p>
                                Noir Vault operates a localized node courier distribution model. We guarantee absolute transit integrity, wrapping garments inside vacuum-sealed anti-static high-density packaging frames:
                            </p>
                            <div className="bg-surface border border-outline rounded-2xl p-5 space-y-4">
                                <div className="flex justify-between items-center border-b border-outline/30 pb-2">
                                    <span className="font-bold text-on-background">Express Air Delivery</span>
                                    <span className="text-primary font-mono font-bold">Complimentary over £500</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-outline/30 pb-2">
                                    <span className="font-bold text-on-background">Standard Processing</span>
                                    <span className="text-on-surface/80 font-mono">3 - 5 Business Days</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-on-background">Signature Protocol</span>
                                    <span className="font-bold text-on-background">MANDATORY UPON HANDOVER</span>
                                </div>
                            </div>
                            <p className="bg-primary/5 text-primary border border-primary/20 p-4 rounded-xl leading-relaxed">
                                Note: Customs and brokerage tax waivers are fully authorized by Noir Vault. Import procedures will be coordinated directly by our custom broker agencies. Absolutely zero redundant paperwork required.
                            </p>
                        </div>
                    </div>
                )}

                {/* CAREERS CONTENT WITH REAL INTERACTIVE APPLICATION FORM */}
                {tab === 'CAREERS' && (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase">JOIN ATELIER DEV TEAM</span>
                                <h3 className="font-display font-medium text-2xl text-on-background mt-1">Structural Apprenticeship</h3>
                            </div>
                        </div>

                        {!submitted ? (
                            <form onSubmit={handleCareerSubmit} className="space-y-4">
                                <p className="text-xs text-on-surface leading-relaxed">
                                    We do not look for traditional resumes. We demand candidates who understand spatial density, architectural restraint, and raw structural brutalism over commercial fast fashion.
                                </p>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-[9px] font-bold text-on-surface uppercase tracking-wider block mb-1">Your Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Enter full name..."
                                            value={careerForm.name}
                                            onChange={e => setCareerForm({...careerForm, name: e.target.value})}
                                            className="w-full bg-surface border border-outline rounded-xl py-2.5 px-4 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-background transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[9px] font-bold text-on-surface uppercase tracking-wider block mb-1">Secure Email</label>
                                            <input 
                                                required
                                                type="email" 
                                                placeholder="name@domain.com"
                                                value={careerForm.email}
                                                onChange={e => setCareerForm({...careerForm, email: e.target.value})}
                                                className="w-full bg-surface border border-outline rounded-xl py-2.5 px-4 text-xs font-semibold focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-bold text-on-surface uppercase tracking-wider block mb-1">Sought Apprenticeship</label>
                                            <select 
                                                value={careerForm.role}
                                                onChange={e => setCareerForm({...careerForm, role: e.target.value})}
                                                className="w-full bg-surface border border-outline text-on-background rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-primary"
                                            >
                                                <option value="Lead Fabric Architect">Lead Fabric Architect</option>
                                                <option value="Spatial Layout Engineer">Spatial Layout Engineer</option>
                                                <option value="High-Fusion Seamstress">High-Fusion Seamstress</option>
                                                <option value="Scarcity Control Agent">Scarcity Control Agent</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-bold text-on-surface uppercase tracking-wider block mb-1">Manifesto statement / Design philosophy</label>
                                        <textarea 
                                            required
                                            rows={3}
                                            placeholder="Explain your understanding of negative space and textile architecture..."
                                            value={careerForm.manifesto}
                                            onChange={e => setCareerForm({...careerForm, manifesto: e.target.value})}
                                            className="w-full bg-surface border border-outline rounded-xl py-2.5 px-4 text-xs font-semibold focus:outline-none focus:border-primary resize-none placeholder:text-on-surface/40 leading-relaxed text-on-background"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className={`w-full h-11 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 ${
                                        submitting ? 'bg-surface-dim text-on-surface cursor-wait border border-outline' : 'bg-on-background text-background hover:bg-on-background/90'
                                    }`}
                                >
                                    {submitting ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-on-surface border-t-transparent rounded-full animate-spin"></span>
                                            Transmitting Dossier...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5" />
                                            Transmit Application Dossier
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-8 flex flex-col items-center text-center gap-4 bg-surface border border-outline border-dashed rounded-3xl"
                            >
                                <CheckCircle className="w-12 h-12 text-primary" />
                                <div>
                                    <h4 className="font-display font-medium text-lg text-on-background">Dossier Transmitted Successfully</h4>
                                    <p className="text-xs text-on-surface leading-relaxed mt-2 max-w-sm px-4">
                                        Thank you, <span className="font-bold text-on-background">{careerForm.name}</span>. Your spatial study application for the role of <span className="italic text-primary font-medium">{careerForm.role}</span> is locked into our secure archive. Our leads will review your manifesto.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setSubmitted(false)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline mt-2"
                                >
                                    Submit New Application Protocol
                                </button>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* INSTAGRAM / BRUTALIST GRID CONTENT */}
                {tab === 'INSTAGRAM' && (
                    <div className="flex flex-col gap-6">
                        {selectedPostIndex === null ? (
                            <>
                                <div className="flex items-center justify-between border-b border-outline pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                            <Instagram className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase">@NOIRVAULT.STUDIO</span>
                                            <h3 className="font-display font-medium text-2xl text-on-background mt-1">Lookbook Studies</h3>
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <span className="text-lg font-bold font-mono block text-on-background">14.8k</span>
                                        <span className="text-[9px] tracking-wider text-on-surface uppercase font-bold">Ledger Observers</span>
                                    </div>
                                </div>

                                <p className="text-xs text-on-surface leading-relaxed">
                                    Captured moments of brutalist architecture juxtapositioned with technical drapes. Follow space, geometry, shadow mechanics, and raw textiles study coordinates:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {instagramImages.map((img, i) => (
                                        <div 
                                            key={i} 
                                            onClick={() => {
                                                setSelectedPostIndex(i);
                                                audioEngine.playHaptic();
                                            }}
                                            className="group bg-surface border border-outline rounded-3xl overflow-hidden shadow-sm relative flex flex-col h-[280px] cursor-pointer hover:border-primary transition-all duration-300"
                                        >
                                            <div className="relative flex-grow overflow-hidden bg-surface-dim">
                                                <img 
                                                    src={img.image} 
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
                                                    alt={img.title}
                                                    referrerPolicy="no-referrer"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                                                
                                                {/* Image hover actions overlay */}
                                                <div className="absolute top-3 right-3 flex gap-2">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleLike(i);
                                                        }}
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                                                            likes[i] 
                                                            ? 'bg-primary border-primary text-background' 
                                                            : 'bg-background/80 border-outline/30 text-on-surface hover:text-on-background'
                                                        }`}
                                                    >
                                                        <Heart size={14} className={likes[i] ? 'fill-current' : ''} />
                                                    </button>
                                                </div>

                                                {/* Zoom hover indicator banner */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-on-background text-background px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                                                        <ZoomIn size={12} className="text-primary" />
                                                        ANALYZE STUDY
                                                    </div>
                                                </div>

                                                {/* Detail info pinned */}
                                                <div className="absolute bottom-3 left-4 right-4 text-left pointer-events-none">
                                                    <div className="flex items-center gap-1.5 text-[10px] text-white/70 font-mono mb-1">
                                                        <MapPin size={10} className="text-primary" />
                                                        {img.location}
                                                    </div>
                                                    <h4 className="font-display text-white text-xs font-bold leading-tight line-clamp-1">{img.title}</h4>
                                                </div>
                                            </div>
                                            
                                            {/* Action Footbar */}
                                            <div className="p-3 bg-surface flex justify-between items-center text-[10px] font-mono border-t border-outline/50">
                                                <span className="text-on-surface font-bold">
                                                    {likedCounts[i]} structural observers
                                                </span>
                                                <div className="flex gap-2 text-on-surface">
                                                    {img.tags.slice(0, 2).map((tg, idx) => (
                                                        <span key={idx} className="text-primary font-bold">{tg}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center border-t border-outline/30 pt-4">
                                    <a 
                                        href="https://instagram.com" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-xs font-bold text-on-background hover:text-primary transition-colors bg-surface border border-outline/80 px-5 py-2 rounded-full cursor-pointer shadow-sm"
                                    >
                                        Enter Instagram Protocol Network
                                        <ArrowRight size={12} />
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col gap-5">
                                {/* Navigation and Title Study Header */}
                                <div className="flex items-center justify-between border-b border-outline pb-4">
                                    <button 
                                        onClick={() => {
                                            setSelectedPostIndex(null);
                                            audioEngine.playSwoosh();
                                        }}
                                        className="flex items-center gap-1.5 text-xs font-mono font-bold text-on-surface hover:text-on-background cursor-pointer bg-surface hover:bg-surface-dim border border-outline py-1.5 px-3 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft size={12} />
                                        BACK TO GRID
                                    </button>
                                    <div className="text-right">
                                        <span className="text-[9px] font-mono tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase block">Active Laboratory Node</span>
                                        <span className="text-xs font-bold text-on-surface italic">{instagramImages[selectedPostIndex].location}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    {/* Left Panel: Image Microscope & Filters */}
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-surface-dim border border-outline/65 rounded-2xl overflow-hidden aspect-square relative shadow-xs flex items-center justify-center">
                                            <img 
                                                src={instagramImages[selectedPostIndex].image} 
                                                className="w-full h-full object-cover transition-all" 
                                                alt={instagramImages[selectedPostIndex].title}
                                                style={{ 
                                                    filter: `grayscale(${imageFilters.grayscale}%) contrast(${imageFilters.contrast}%) brightness(${imageFilters.exposure}%)` 
                                                }}
                                                referrerPolicy="no-referrer"
                                            />
                                            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-[9px] font-mono text-on-background shadow-xs">
                                                LENS MULTIPLIER MODE
                                            </div>
                                        </div>

                                        {/* Image study filter controls */}
                                        <div className="bg-background border border-outline rounded-2xl p-4 flex flex-col gap-3">
                                            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-on-background">
                                                <span className="flex items-center gap-1"><Sliders size={10} className="text-primary" /> DIGITAL MONO FILTER</span>
                                                <span>{imageFilters.grayscale}%</span>
                                            </div>
                                            <input 
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={imageFilters.grayscale}
                                                onChange={(e) => {
                                                    setImageFilters(prev => ({ ...prev, grayscale: Number(e.target.value) }));
                                                    audioEngine.playTick();
                                                }}
                                                className="w-full h-1 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                                            />

                                            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-on-background mt-1">
                                                <span>SHADOW CONTRAST</span>
                                                <span>{imageFilters.contrast}%</span>
                                            </div>
                                            <input 
                                                type="range"
                                                min="50"
                                                max="150"
                                                value={imageFilters.contrast}
                                                onChange={(e) => {
                                                    setImageFilters(prev => ({ ...prev, contrast: Number(e.target.value) }));
                                                    audioEngine.playTick();
                                                }}
                                                className="w-full h-1 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                                            />

                                            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-on-background mt-1 font-sans">
                                                <span>EXPOSURE INTENSITY</span>
                                                <span>{imageFilters.exposure}%</span>
                                            </div>
                                            <input 
                                                type="range"
                                                min="50"
                                                max="150"
                                                value={imageFilters.exposure}
                                                onChange={(e) => {
                                                    setImageFilters(prev => ({ ...prev, exposure: Number(e.target.value) }));
                                                    audioEngine.playTick();
                                                }}
                                                className="w-full h-1 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                                            />

                                            <button 
                                                onClick={() => {
                                                    setImageFilters({ grayscale: 0, contrast: 100, exposure: 100 });
                                                    audioEngine.playTick();
                                                }}
                                                className="mt-2 text-center text-[9px] font-bold uppercase tracking-wider text-primary hover:underline bg-surface py-1 rounded-md border border-outline/40"
                                            >
                                                Aesthetic Reset Defaults
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Panel: Metadata & Dynamic Observer Comments Feed */}
                                    <div className="flex flex-col gap-4">
                                        {/* Headline metadata details */}
                                        <div className="bg-surface border border-outline p-4 rounded-2xl">
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">ACTIVE SPECIFICATION</span>
                                            <h4 className="font-display font-bold text-sm text-on-background mt-1">{instagramImages[selectedPostIndex].title}</h4>
                                            
                                            <div className="grid grid-cols-2 gap-2.5 mt-3 text-[10px] font-mono text-on-surface">
                                                <div className="bg-background/80 p-2 rounded-xl border border-outline/30">
                                                    <span className="block text-[8px] text-on-surface/50 font-bold">ALTITUDE</span>
                                                    <span className="text-on-background font-bold font-mono">248m Normal</span>
                                                </div>
                                                <div className="bg-background/80 p-2 rounded-xl border border-outline/30">
                                                    <span className="block text-[8px] text-on-surface/50 font-bold">SHUTTER SECTOR</span>
                                                    <span className="text-on-background font-bold font-mono">1/400s F2.4 24mm</span>
                                                </div>
                                                <div className="bg-background/80 p-2 rounded-xl border border-outline/30">
                                                    <span className="block text-[8px] text-on-surface/50 font-bold">LEDGER OBSERVERS</span>
                                                    <span className="text-on-background font-bold font-mono">{likedCounts[selectedPostIndex]} users</span>
                                                </div>
                                                <div className="bg-background/80 p-2 rounded-xl border border-outline/30">
                                                    <span className="block text-[8px] text-on-surface/50 font-bold">GEOPLANAR IND</span>
                                                    <span className="text-primary font-bold font-mono">47.5° N, 7.5° E</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ledger Comments */}
                                        <div className="flex flex-col gap-2.5">
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-background flex items-center gap-1.5"><MessageSquare size={10} className="text-primary" /> Atelier Comment Logs</span>
                                            
                                            <div className="bg-surface-dim/70 max-h-[160px] overflow-y-auto rounded-2xl border border-outline/60 p-3 flex flex-col gap-2.5 hide-scrollbar">
                                                {(comments[selectedPostIndex] || []).map((cmt, idx) => {
                                                    const dotIdx = cmt.indexOf(':');
                                                    const author = dotIdx !== -1 ? cmt.substring(0, dotIdx) : "Anonymous";
                                                    const contentStr = dotIdx !== -1 ? cmt.substring(dotIdx + 1) : cmt;
                                                    return (
                                                        <div key={idx} className="bg-background/90 p-2.5 rounded-xl border border-outline/20 text-xs text-left leading-relaxed">
                                                            <div className="flex items-center gap-2 mb-1.5 border-b border-outline/5 pb-1">
                                                                <div className="w-4 h-4 rounded-full bg-primary/15 text-primary text-[8px] font-extrabold flex items-center justify-center font-mono">
                                                                    {author.substring(0, 1).toUpperCase()}
                                                                </div>
                                                                <span className="text-[9px] font-mono font-bold text-on-background">{author}</span>
                                                            </div>
                                                            <p className="text-on-surface leading-normal text-[11px]">{contentStr}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Leave a commentary */}
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                if (!newComment.trim() || selectedPostIndex === null) return;
                                                const currentList = comments[selectedPostIndex] || [];
                                                setComments({
                                                    ...comments,
                                                    [selectedPostIndex]: [...currentList, `Observer_${Math.floor(Math.random() * 800) + 100}: ${newComment.trim()}`]
                                                });
                                                setNewComment('');
                                                audioEngine.playSuccess();
                                            }} className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    required
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="Input architectural observations..."
                                                    className="flex-grow bg-surface border border-outline hover:border-on-surface/40 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-background text-on-background"
                                                />
                                                <button 
                                                    type="submit"
                                                    className="px-3 bg-on-background hover:bg-on-background/90 text-background rounded-xl flex items-center justify-center cursor-pointer shadow-xs"
                                                >
                                                    <Send size={12} />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

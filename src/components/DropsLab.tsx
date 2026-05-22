import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Check, RefreshCw, Layers, Zap, Info, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface SilhouetteOption {
    id: string;
    label: string;
    description: string;
    baseWeight: number; // grams
    thermalBase: number; // score 1-10
    aerodynamicBase: string;
}

interface MaterialOption {
    id: string;
    label: string;
    multiplier: number;
    thermalBonus: number;
    specWeight: number; // per square meter
}

interface HardwareOption {
    id: string;
    label: string;
    description: string;
    weight: number;
}

const silOptionList: SilhouetteOption[] = [
    { id: 'SHELL', label: 'Windbreaker Shell', description: 'Fluid asymmetrical weather shielding', baseWeight: 450, thermalBase: 4, aerodynamicBase: 'High' },
    { id: 'VEST', label: 'Articulated Cargo Vest', description: 'Dual asymmetrical hardware rig overlay', baseWeight: 380, thermalBase: 5, aerodynamicBase: 'Medium' },
    { id: 'PANTHERS', label: 'Modular Ergo Pants', description: 'Tension dart pleated bottoms with cinch belts', baseWeight: 520, thermalBase: 6, aerodynamicBase: 'High-Darted' }
];

const materialOptionList: MaterialOption[] = [
    { id: 'RIPSTOP', label: 'Membranous Coated Ripstop', multiplier: 1.0, thermalBonus: 1, specWeight: 240 },
    { id: 'VENTILE', label: 'Ventile High-Density Cotton', multiplier: 1.25, thermalBonus: 3, specWeight: 380 },
    { id: 'SHEARLING', label: 'Thermal Merino Shearling', multiplier: 1.6, thermalBonus: 8, specWeight: 680 }
];

const hardwareOptionList: HardwareOption[] = [
    { id: 'COBRA', label: 'Cobra Buckle System', description: 'Heavy-duty quick release alloy clasp', weight: 85 },
    { id: 'MAGNETIC', label: 'Fidlock Magnet Latches', description: 'Automatic mechanical snaps', weight: 40 },
    { id: 'HARNESS', label: 'Overlay Utility Strap Webbing', description: 'D-ring tactical webbing harnesses', weight: 120 }
];

export function DropsLab() {
    const [selectedSil, setSelectedSil] = useState<string>('SHELL');
    const [selectedMat, setSelectedMat] = useState<string>('RIPSTOP');
    const [selectedHw, setSelectedHw] = useState<string>('COBRA');
    const [voted, setVoted] = useState(false);

    // Retrieve active details
    const activeSil = silOptionList.find(s => s.id === selectedSil) || silOptionList[0];
    const activeMat = materialOptionList.find(m => m.id === selectedMat) || materialOptionList[0];
    const activeHw = hardwareOptionList.find(h => h.id === selectedHw) || hardwareOptionList[0];

    // Calculated metrics
    const totalGrams = Math.round((activeSil.baseWeight + activeHw.weight) * (activeMat.multiplier));
    const finalThermal = Math.min(10, activeSil.thermalBase + activeMat.thermalBonus);
    const costEstimate = Math.round((280 + (activeSil.baseWeight * 0.4) + (activeMat.specWeight * 0.35) + (activeHw.weight * 0.8)));

    const handleSelectSil = (id: string) => {
        audioEngine.playTick();
        setSelectedSil(id);
    };

    const handleSelectMat = (id: string) => {
        audioEngine.playTick();
        setSelectedMat(id);
    };

    const handleSelectHw = (id: string) => {
        audioEngine.playTick();
        setSelectedHw(id);
    };

    const handleVoteSubmit = () => {
        audioEngine.playSuccess();
        setVoted(true);
        setTimeout(() => {
            setVoted(false);
        }, 5000);
    };

    return (
        <div className="bg-surface border border-outline rounded-3xl p-8 md:p-12 shadow-sm flex flex-col gap-8 w-full" id="drops-lab-container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline pb-6 gap-4">
                <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Interactive Customizer Blueprints</span>
                    <h3 className="font-display font-medium text-3xl text-on-background tracking-tight">Drop 04 Conceptual Sandbox</h3>
                    <p className="text-sm text-on-surface mt-1 leading-relaxed max-w-xl">
                        Design and optimize specifications for the upcoming Drop 04 releases in our sandboxed environment. Submit your design to log voting indicators in our master queue.
                    </p>
                </div>
                <button
                    onClick={() => {
                        audioEngine.playHaptic();
                        setSelectedSil('SHELL');
                        setSelectedMat('RIPSTOP');
                        setSelectedHw('COBRA');
                    }}
                    className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-background hover:bg-surface-dim text-on-surface border border-outline rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                    <RefreshCw size={12} />
                    Reset Sandbox
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Customizer Selections Panel */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Step 1: Base Silhouette */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold px-2 py-0.5 bg-on-background text-background font-mono rounded-md">01</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-on-background">Select Base Silhouette Geometry</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {silOptionList.map((sil) => {
                                const isActive = selectedSil === sil.id;
                                return (
                                    <button
                                        key={sil.id}
                                        onClick={() => handleSelectSil(sil.id)}
                                        className={`p-4 rounded-2xl cursor-pointer text-left transition-all duration-300 border flex flex-col justify-between h-32
                                            ${isActive 
                                                ? 'bg-background border-primary shadow-sm text-on-background pl-5' 
                                                : 'bg-background/40 border-outline text-on-surface hover:text-on-background hover:border-on-background/25'
                                            }
                                        `}
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-sm leading-tight">{sil.label}</span>
                                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                            </div>
                                            <p className="text-[10px] text-on-surface/85 leading-relaxed">{sil.description}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-3 text-[9px] font-mono border-t border-outline/30 pt-2 w-full text-on-surface">
                                            <span>BASE: {sil.baseWeight}g</span>
                                            <span>THERMAL: {sil.thermalBase}/10</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step 2: Tech Materials */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold px-2 py-0.5 bg-on-background text-background font-mono rounded-md">02</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-on-background">Select Technical Material Integration</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {materialOptionList.map((mat) => {
                                const isActive = selectedMat === mat.id;
                                return (
                                    <button
                                        key={mat.id}
                                        onClick={() => handleSelectMat(mat.id)}
                                        className={`p-4 rounded-2xl cursor-pointer text-left transition-all duration-300 border flex flex-col justify-between h-32
                                            ${isActive 
                                                ? 'bg-background border-primary shadow-sm text-on-background pl-5' 
                                                : 'bg-background/40 border-outline text-on-surface hover:text-on-background hover:border-on-background/25'
                                            }
                                        `}
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-sm leading-tight">{mat.label}</span>
                                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                            </div>
                                            <p className="text-[10px] text-on-surface/85 leading-relaxed">Multiplies base weight by {mat.multiplier}x for specific protection structures.</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-3 text-[9px] font-mono border-t border-outline/30 pt-2 w-full text-on-surface">
                                            <span>WEIGHT: {mat.specWeight}g/m²</span>
                                            <span>HOT BONUS: +{mat.thermalBonus}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step 3: Fasteners */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold px-2 py-0.5 bg-on-background text-background font-mono rounded-md">03</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-on-background">Select Hardware & Rig Elements</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {hardwareOptionList.map((hw) => {
                                const isActive = selectedHw === hw.id;
                                return (
                                    <button
                                        key={hw.id}
                                        onClick={() => handleSelectHw(hw.id)}
                                        className={`p-4 rounded-2xl cursor-pointer text-left transition-all duration-300 border flex flex-col justify-between h-32
                                            ${isActive 
                                                ? 'bg-background border-primary shadow-sm text-on-background pl-5' 
                                                : 'bg-background/40 border-outline text-on-surface hover:text-on-background hover:border-on-background/25'
                                            }
                                        `}
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-sm leading-tight">{hw.label}</span>
                                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                            </div>
                                            <p className="text-[10px] text-on-surface/85 leading-relaxed">{hw.description}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-3 text-[9px] font-mono border-t border-outline/30 pt-2 w-full text-on-surface">
                                            <span>HARDWARE BASE</span>
                                            <span>WEIGHT: +{hw.weight}g</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Analytical Output & Ledger Integration Panel */}
                <div className="lg:col-span-4 flex flex-col bg-background border border-outline rounded-3xl p-6 shadow-sm justify-between gap-6">
                    <div>
                        <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest block mb-1">Interactive Results</span>
                        <h4 className="font-display font-bold text-xl text-on-background mb-4">Laboratory Output Specification</h4>
                        
                        <div className="space-y-4 border-b border-outline/30 pb-6 mb-6">
                            {/* Spec weight */}
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-on-surface font-bold">Estimated Mass</span>
                                <span className="font-mono text-sm font-bold text-on-background">{totalGrams} grams</span>
                            </div>
                            
                            {/* Thermal index gauge */}
                            <div>
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="text-on-surface font-bold">Estimated Thermal Rating</span>
                                    <span className="font-mono font-bold text-primary">{finalThermal} / 10 ISO</span>
                                </div>
                                <div className="w-full h-1 bg-outline rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${finalThermal * 10}%` }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>

                            {/* Aero drag index */}
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-on-surface font-bold">Aero drag shape index</span>
                                <span className="font-mono text-sm font-bold text-on-background">{activeSil.aerodynamicBase} Coefficient</span>
                            </div>

                            {/* Projected studio target cost */}
                            <div className="flex justify-between items-center border-t border-outline/30 pt-4 mt-2">
                                <span className="text-xs text-on-surface font-bold">Estimated Target Price</span>
                                <span className="font-mono text-lg font-bold text-primary">£{costEstimate} GBP</span>
                            </div>
                        </div>

                        {/* Interactive summary item representation */}
                        <div className="flex gap-3 bg-surface border border-outline p-4 rounded-2xl items-start">
                            <Layers className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div>
                                <span className="text-[10px] font-bold text-on-surface uppercase tracking-wide block">Synthesized Blueprint</span>
                                <p className="text-xs text-on-background leading-relaxed font-bold mt-1">
                                    {activeSil.label} + {activeMat.label} + {activeHw.label}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            {!voted ? (
                                <button
                                    onClick={handleVoteSubmit}
                                    className="w-full py-3.5 bg-on-background text-background font-bold text-xs rounded-full cursor-pointer hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md"
                                >
                                    <Zap size={14} className="text-primary fill-primary" />
                                    Submit Concept to Queue
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0 }}
                                    className="bg-green-600/10 text-green-700 border border-green-600/20 rounded-2xl p-4 text-center flex flex-col items-center gap-1.5"
                                >
                                    <ShieldCheck className="w-6 h-6 text-green-600 animate-bounce" />
                                    <span className="text-xs font-bold uppercase tracking-wider block text-green-700">Proposal Lodged Successfully</span>
                                    <span className="text-[10px] text-green-700/80">Specifications calibrated and stored in master server ledger index databases.</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

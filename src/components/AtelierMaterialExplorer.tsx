import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Layers, Sliders, RefreshCw, Eye, Percent, Activity } from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface FiberSpec {
    id: string;
    name: string;
    code: string;
    origin: string;
    composition: string;
    baseDensity: number; // GSM
    baseBreathability: number; // g/m²/24h
    retention: number; // CLO thermal rate
    hydrophobic: boolean;
}

const fibers: FiberSpec[] = [
    {
        id: 'GAB_WOOL',
        name: 'Structural Heavy Gabardine Wool',
        code: 'TX-GAB-620',
        origin: 'Biella, Italy',
        composition: '70% Alpaca Virgin Wool, 30% Cashmere Fine Warp',
        baseDensity: 620,
        baseBreathability: 8500,
        retention: 3.8,
        hydrophobic: false
    },
    {
        id: 'TECH_RIP',
        name: 'Membranous Bonded Ripstop Nylon',
        code: 'TX-RIP-240',
        origin: 'Kojima, Japan',
        composition: '85% Technical Polyamide, 15% Polyurethane Laminate',
        baseDensity: 240,
        baseBreathability: 18500,
        retention: 1.4,
        hydrophobic: true
    },
    {
        id: 'THERM_FLEECE',
        name: 'Micro-Knit Compressed Thermal',
        code: 'TX-THR-450',
        origin: 'Prato, Italy',
        composition: '90% Recycled Merino Fleece Wool, 10% Elastane braid',
        baseDensity: 450,
        baseBreathability: 12000,
        retention: 4.2,
        hydrophobic: false
    }
];

type WeavePattern = 'PLAIN' | 'TWILL' | 'BASKET' | 'SATIN';

export function AtelierMaterialExplorer() {
    const [selectedFiber, setSelectedFiber] = useState<string>('GAB_WOOL');
    const [densityMultiplier, setDensityMultiplier] = useState<number>(1.0);
    const [threadTension, setThreadTension] = useState<number>(65); // %
    const [weavePattern, setWeavePattern] = useState<WeavePattern>('TWILL');
    const [activeX, setActiveX] = useState<number | null>(null);
    const [activeY, setActiveY] = useState<number | null>(null);

    const currentFiber = fibers.find(f => f.id === selectedFiber) || fibers[0];

    const handleSelectFiber = (id: string) => {
        setSelectedFiber(id);
        audioEngine.playHaptic();
    };

    const handleSelectPattern = (pattern: WeavePattern) => {
        setWeavePattern(pattern);
        audioEngine.playTick();
    };

    const handleMultiplierChange = (val: number) => {
        setDensityMultiplier(val);
        audioEngine.playTick();
    };

    const handleTensionChange = (val: number) => {
        setThreadTension(val);
        audioEngine.playTick();
    };

    const handleReset = () => {
        setSelectedFiber('GAB_WOOL');
        setDensityMultiplier(1.0);
        setThreadTension(65);
        setWeavePattern('TWILL');
        audioEngine.playHaptic();
    };

    // Calculate dynamic physical metrics simulated based on inputs
    const finalDensity = Math.round(currentFiber.baseDensity * densityMultiplier);
    const finalBreathability = Math.round(currentFiber.baseBreathability * (1.4 - (threadTension / 100) * 0.4) * (2.0 - densityMultiplier));
    const thermalRetention = Math.round((currentFiber.retention * densityMultiplier * (0.8 + (threadTension / 100) * 0.3)) * 10) / 10;
    const elasticityIndex = Math.round((100 - threadTension) * 0.85);

    // Interactive thread nodes for weaving grid SVG
    const gridSize = 10;
    const spacing = 28;

    return (
        <div className="bg-surface border border-outline rounded-3xl p-8 md:p-12 shadow-sm flex flex-col gap-8 w-full mt-4" id="atelier-material-explorer">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline pb-6 gap-4">
                <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Textile Laboratory Index</span>
                    <h3 className="font-display font-medium text-3xl text-on-background tracking-tight">Atelier Custom Material Weave Study</h3>
                    <p className="text-sm text-on-surface mt-1 leading-relaxed max-w-xl">
                        Interactively zoom into the weave structure of our sustainable premium materials. Change patterns, adjust density multiplier parameters, and assess dynamic physical properties.
                    </p>
                </div>
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-background hover:bg-surface-dim text-on-surface border border-outline rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                    <RefreshCw size={12} />
                    Reset Materials
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visualizer Weave Grid Viewport */}
                <div className="lg:col-span-6 bg-surface-dim border border-outline/50 hover:border-outline rounded-2xl aspect-[1.1] relative overflow-hidden flex flex-col items-center justify-center p-6 group/mesh transition-colors">
                    
                    {/* Render live SVG warp/weft interconnections */}
                    <div className="w-full max-h-[300px] flex items-center justify-center relative select-none">
                        <svg viewBox="0 0 280 280" className="w-full h-full max-w-[260px] cursor-crosshair">
                            {/* Base drop-shadow effect filter */}
                            <defs>
                                <filter id="thread-glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodOpacity="0.12" floodColor="#000" />
                                </filter>
                            </defs>

                            {/* Background ambient square overlay */}
                            <rect width="280" height="280" fill="var(--color-background)" rx="16" opacity="0.3" />

                            {/* Dynamic thread elements */}
                            {Array.from({ length: gridSize }).map((_, warpIndex) => {
                                // Warp (Vertical) coordinate
                                const x = 14 + warpIndex * spacing;
                                return (
                                    <g key={`warp-line-${warpIndex}`}>
                                        {/* Underlay shadow backing */}
                                        <line 
                                            x1={x} 
                                            y1={6} 
                                            x2={x} 
                                            y2={274} 
                                            stroke="rgba(0,0,0,0.06)" 
                                            strokeWidth={6 + (densityMultiplier * 3)} 
                                        />

                                        {/* Main Warp thread element line */}
                                        <motion.line 
                                            x1={x} 
                                            y1={8} 
                                            x2={x} 
                                            y2={272} 
                                            stroke="var(--color-primary-dim)" 
                                            strokeWidth={4 + (densityMultiplier * 2)} 
                                            strokeLinecap="round"
                                            animate={{ strokeWidth: 4 + (densityMultiplier * 2) }}
                                            transition={{ type: 'spring' }}
                                        />
                                    </g>
                                );
                            })}

                            {Array.from({ length: gridSize }).map((_, weftIndex) => {
                                // Weft (Horizontal) coordinate
                                const y = 14 + weftIndex * spacing;
                                return (
                                    <g key={`weft-line-${weftIndex}`}>
                                        {/* Underlay support */}
                                        <line 
                                            x1={6} 
                                            y1={y} 
                                            x2={274} 
                                            y2={y} 
                                            stroke="rgba(0,0,0,0.08)" 
                                            strokeWidth={5 + (threadTension / 20)} 
                                        />

                                        {/* Weft thread element line */}
                                        <motion.line 
                                            x1={8} 
                                            y1={y} 
                                            x2={272} 
                                            y2={y} 
                                            stroke="var(--color-outline)" 
                                            strokeWidth={3 + (threadTension / 25)} 
                                            strokeLinecap="round"
                                            filter="url(#thread-glow)"
                                            animate={{ strokeWidth: 3 + (threadTension / 25) }}
                                            transition={{ type: 'spring' }}
                                        />
                                    </g>
                                );
                            })}

                            {/* Structural weave intersection points overlay (Warp over Weft pattern) */}
                            {Array.from({ length: gridSize }).map((_, warpIndex) => {
                                const x = 14 + warpIndex * spacing;
                                return Array.from({ length: gridSize }).map((_, weftIndex) => {
                                    const y = 14 + weftIndex * spacing;
                                    
                                    // Determine weaving formula under pattern settings
                                    let isWarpOver = false;
                                    if (weavePattern === 'PLAIN') {
                                        isWarpOver = (warpIndex + weftIndex) % 2 === 0;
                                    } else if (weavePattern === 'TWILL') {
                                        isWarpOver = (warpIndex - weftIndex) % 3 === 0;
                                    } else if (weavePattern === 'BASKET') {
                                        isWarpOver = Math.floor(warpIndex / 2) % 2 === Math.floor(weftIndex / 2) % 2;
                                    } else { // SATIN
                                        isWarpOver = (warpIndex * 3 + weftIndex) % 5 === 0;
                                    }

                                    const isHighlighted = activeX === warpIndex && activeY === weftIndex;

                                    return isWarpOver && (
                                        <motion.circle 
                                            key={`node-${warpIndex}-${weftIndex}`}
                                            cx={x}
                                            cy={y}
                                            r={3.5 + (densityMultiplier * 1.5)}
                                            fill="var(--color-primary)"
                                            className="cursor-pointer hover:scale-130 transition-transform duration-200"
                                            animate={{ r: isHighlighted ? 7 : 3.5 + (densityMultiplier * 1.5) }}
                                            onClick={() => {
                                                audioEngine.playTick();
                                                setActiveX(warpIndex);
                                                setActiveY(weftIndex);
                                            }}
                                        />
                                    );
                                });
                            })}
                        </svg>
                    </div>

                    <div className="absolute top-4 left-4 flex gap-2 text-[10px] font-mono font-bold text-on-surface">
                        <span className="flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-full border border-outline">
                            <Eye size={10} className="text-primary" />
                            WEAVE PATTERN: {weavePattern} INDEX
                        </span>
                    </div>

                    <div className="absolute bottom-4 right-4 text-[9px] font-mono font-bold text-on-surface/80 bg-background/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        {activeX !== null && activeY !== null ? `FOCUS NODE: [${activeX}, ${activeY}]` : 'HOVER O NOUNT ON NODES'}
                    </div>
                </div>

                {/* Laboratory Parameters Spec details sidebar */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                    {/* Fiber Sourcing Toggle */}
                    <div className="space-y-3">
                        <span className="text-xs font-bold text-on-surface uppercase tracking-wider block">Atelier Sourced Fibers</span>
                        <div className="flex flex-col gap-2.5">
                            {fibers.map((f) => {
                                const isActive = selectedFiber === f.id;
                                return (
                                    <div
                                        key={f.id}
                                        onClick={() => handleSelectFiber(f.id)}
                                        className={`p-4 rounded-2xl border cursor-pointer text-left transition-all duration-300 flex items-center justify-between
                                            ${isActive 
                                                ? 'bg-background border-primary shadow-sm text-on-background pl-5' 
                                                : 'bg-background/40 border-outline text-on-surface hover:text-on-background hover:border-on-background/25'
                                            }
                                        `}
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm leading-tight">{f.name}</span>
                                                <span className="text-[9px] font-mono tracking-widest bg-surface border border-outline px-1.5 py-0.5 rounded text-on-surface">{f.code}</span>
                                            </div>
                                            <span className="text-[10px] text-on-surface/80 block mt-1">Origin: {f.origin} // {f.composition}</span>
                                        </div>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 ml-3" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Weave style picker row */}
                    <div>
                        <span className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2.5">Weaving Pattern Type</span>
                        <div className="grid grid-cols-4 gap-2">
                            {(['PLAIN', 'TWILL', 'BASKET', 'SATIN'] as WeavePattern[]).map((pattern) => {
                                const isActive = weavePattern === pattern;
                                return (
                                    <button
                                        key={pattern}
                                        onClick={() => handleSelectPattern(pattern)}
                                        className={`py-2 rounded-xl text-[10px] font-bold uppercase transition-all border cursor-pointer text-center
                                            ${isActive 
                                                ? 'bg-on-background text-background border-transparent' 
                                                : 'bg-background border-outline text-on-surface hover:text-on-background'
                                            }
                                        `}
                                    >
                                        {pattern}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Param 1: Thread density multiplier */}
                    <div>
                        <div className="flex justify-between items-center text-xs font-bold text-on-background mb-1.5">
                            <span className="uppercase tracking-wide">Ends Per Inch Density Multiplier</span>
                            <span className="font-mono text-primary font-bold">{Math.round(densityMultiplier * 100)}% API</span>
                        </div>
                        <input 
                            type="range" 
                            min="0.5" 
                            max="1.8" 
                            step="0.05"
                            value={densityMultiplier}
                            onChange={(e) => handleMultiplierChange(Number(e.target.value))}
                            className="w-full h-1 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    {/* Param 2: Thread tension */}
                    <div>
                        <div className="flex justify-between items-center text-xs font-bold text-on-background mb-1.5">
                            <span className="uppercase tracking-wide">Yarn Structural Tension</span>
                            <span className="font-mono text-primary font-bold">{threadTension}% ISO Tension</span>
                        </div>
                        <input 
                            type="range" 
                            min="20" 
                            max="95" 
                            step="5"
                            value={threadTension}
                            onChange={(e) => handleTensionChange(Number(e.target.value))}
                            className="w-full h-1 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Simulated Live Output Matrix for Weave */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-background p-5 rounded-2xl border border-outline border-dashed">
                <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Dynamic Weight Density</span>
                        <span className="font-mono text-sm font-extrabold text-on-background">{finalDensity} g/m²</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Percent className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Breathability Coefficient</span>
                        <span className="font-mono text-sm font-extrabold text-on-background">{finalBreathability.toLocaleString()} g/m²</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Thermal Retention Rank</span>
                        <span className="font-mono text-sm font-extrabold text-on-background">{thermalRetention} CLO Unit</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Sliders className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Fiber Elasticity Stretch</span>
                        <span className="font-mono text-sm font-extrabold text-on-background">{elasticityIndex}% Stretch</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

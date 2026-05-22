import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, RefreshCw, Activity, Layers, CornerDownRight } from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface SilhouetteStudyProps {
    productName: string;
    productCategory: string;
}

export function SilhouetteStudy({ productName, productCategory }: SilhouetteStudyProps) {
    const [density, setDensity] = useState(450); // g/m²
    const [tension, setTension] = useState(40); // %
    const [wind, setWind] = useState(15); // km/h
    const [draftAngle, setDraftAngle] = useState(0);

    // Audio interaction helper
    const handleSliderChange = (setter: any, val: number) => {
        setter(val);
        audioEngine.playTick();
    };

    const handleReset = () => {
        audioEngine.playHaptic();
        setDensity(450);
        setTension(40);
        setWind(15);
    };

    // Calculate simulated engineering values
    const drapeIndex = Math.round((1 - (density / 1200) * 0.4 - (tension / 100) * 0.3) * 100);
    const stressPeak = Math.round(((tension / 100) * 2.8 + (wind / 120) * 1.5) * 10) / 10;
    const dragCoeff = Math.round((0.15 + (wind / 120) * 0.75) * 100) / 100;
    const elasticityRate = Math.round((tension * 0.8) * 10) / 10;

    // Generate simulated dynamic SVG silhouette points based on parameters
    const [pathD, setPathD] = useState('');
    const [gridNodes, setGridNodes] = useState<{ x: number; y: number; stress: number }[]>([]);

    useEffect(() => {
        // Base coordinate skeleton
        const baseWidth = 260;
        const baseHeight = 220;
        const startX = 70;
        const startY = 40;

        // Apply deformation formula
        const xOffset = (wind / 120) * 45;
        const ySag = (density / 1000) * 35 - (tension / 100) * 20;

        // Custom curve points simulating dynamic jacket/bottom draping flow
        const p1x = startX;
        const p1y = startY;

        const p2x = startX + baseWidth / 2 + xOffset * 0.3;
        const p2y = startY + ySag * 0.5;

        const p3x = startX + baseWidth + xOffset;
        const p3y = startY + 15;

        const p4x = startX + baseWidth - 30 + xOffset * 1.2;
        const p4y = startY + baseHeight - 10;

        const p5x = startX + baseWidth / 2 + xOffset * 0.6;
        const p5y = startY + baseHeight + ySag - 15;

        const p6x = startX + 30;
        const p6y = startY + baseHeight - 5;

        // Assemble SVG Path
        const pathString = `M ${p1x} ${p1y} Q ${p2x} ${p2y} ${p3x} ${p3y} L ${p4x} ${p4y} Q ${p5x} ${p5y} ${p6x} ${p6y} Z`;
        setPathD(pathString);

        // Compute simulated stress nodes for a beautiful visual mesh overlay
        const nodesList = [];
        const cols = 5;
        const rows = 5;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const ratioC = c / (cols - 1);
                const ratioR = r / (rows - 1);

                // Grid mapping with flow deformation
                const baseX = startX + ratioC * baseWidth + (ratioR * xOffset * 0.8);
                const baseY = startY + ratioR * baseHeight + (Math.sin(ratioC * Math.PI) * ySag);

                // Stress level calculation (higher tension/wind yields higher node stress)
                const nodeStress = Math.min(100, Math.round(
                    (tension * 0.5) + (wind * 0.4) + (Math.sin(ratioC * Math.PI) * 15)
                ));

                nodesList.push({ x: baseX, y: baseY, stress: nodeStress });
            }
        }
        setGridNodes(nodesList);
    }, [density, tension, wind]);

    return (
        <div className="bg-background rounded-3xl border border-outline/65 p-6 md:p-8 shadow-sm flex flex-col gap-6 mt-1.5" id="silhouette-study-root">
            <div className="flex justify-between items-start border-b border-outline/30 pb-4">
                <div>
                    <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase font-bold tracking-widest mb-1">
                        <Activity size={12} />
                        Ledger Analytical Laboratory
                    </div>
                    <h3 className="font-display font-medium text-lg text-on-background">Material Silhouette & Drape Study</h3>
                </div>
                <button
                    onClick={handleReset}
                    className="p-2 border border-outline hover:border-primary text-on-surface hover:text-primary rounded-xl cursor-pointer transition-colors duration-300 shadow-sm"
                    title="Reset parameters to reference defaults"
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            {/* Simulated interactive split grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Visualizer Frame */}
                <div className="lg:col-span-7 bg-surface-dim rounded-2xl border border-outline/40 aspect-[4/3] relative overflow-hidden flex items-center justify-center p-4">
                    
                    {/* Render stress mesh network */}
                    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] select-none">
                        {/* Reference standard grid */}
                        <g opacity="0.08" className="stroke-on-background" strokeWidth="1">
                            {Array.from({ length: 11 }).map((_, i) => (
                                <line key={`vl-${i}`} x1={i * 40} y1={0} x2={i * 40} y2={300} strokeDasharray="3 3" />
                            ))}
                            {Array.from({ length: 8 }).map((_, i) => (
                                <line key={`hl-${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40} strokeDasharray="3 3" />
                            ))}
                        </g>

                        {/* Silhouette dynamic boundary outline */}
                        {pathD && (
                            <motion.path 
                                d={pathD}
                                className="fill-primary/10 dark:fill-primary/25 stroke-primary"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            />
                        )}

                        {/* Interconnecting stress mesh lines */}
                        <g opacity="0.15">
                            {gridNodes.map((n, i) => {
                                const nextCol = (i + 1) % 5 !== 0 ? gridNodes[i + 1] : null;
                                const nextRow = i + 5 < 25 ? gridNodes[i + 5] : null;
                                return (
                                    <React.Fragment key={`mesh-${i}`}>
                                        {nextCol && (
                                            <line x1={n.x} y1={n.y} x2={nextCol.x} y2={nextCol.y} stroke="currentColor" strokeWidth="1" />
                                        )}
                                        {nextRow && (
                                            <line x1={n.x} y1={n.y} x2={nextRow.x} y2={nextRow.y} stroke="currentColor" strokeWidth="1" />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </g>

                        {/* Interactive dynamic thermal stress focal points */}
                        {gridNodes.map((node, i) => {
                            const isHighStress = node.stress > 60;
                            return (
                                <g 
                                    key={i} 
                                    className="cursor-crosshair group/node"
                                    onClick={() => {
                                        audioEngine.playTick();
                                        setDraftAngle(node.stress);
                                    }}
                                >
                                    <circle 
                                        cx={node.x} 
                                        cy={node.y} 
                                        r={isHighStress ? 3.5 : 2} 
                                        className={`transition-all duration-300 ${
                                            isHighStress 
                                            ? 'fill-primary animate-ping opacity-75' 
                                            : 'fill-on-surface group-hover/node:fill-primary'
                                        }`}
                                    />
                                    <circle 
                                        cx={node.x} 
                                        cy={node.y} 
                                        r={isHighStress ? 2.5 : 1.5} 
                                        className={`${isHighStress ? 'fill-primary' : 'fill-on-background/60 group-hover/node:fill-primary'} transition-colors`}
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Gauge labels overlay */}
                    <div className="absolute top-3 left-4 flex gap-3 text-[10px] font-mono font-bold text-on-surface">
                        <div className="flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-full border border-outline">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                            SURFACE MESH STIMULATOR
                        </div>
                    </div>

                    <div className="absolute bottom-3 right-4 flex gap-1 items-center text-[10px] font-mono font-bold text-on-surface">
                        <span>PITCH RECOVERY RATE :</span>
                        <span className="text-on-background font-bold">{Math.round(100 - (density * 0.05))} Hz</span>
                    </div>
                </div>

                {/* Cyber Parameters sliders panel */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="space-y-4">
                        {/* Parameter 1 */}
                        <div>
                            <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-on-background">
                                <span className="uppercase tracking-wide">Yarn Density (Weight)</span>
                                <span className="font-mono text-primary font-bold">{density} g/m²</span>
                            </div>
                            <input 
                                type="range" 
                                min="120" 
                                max="900" 
                                step="10"
                                value={density}
                                onChange={(e) => handleSliderChange(setDensity, Number(e.target.value))}
                                className="w-full h-1 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[9px] font-bold text-on-surface uppercase mt-1">
                                <span>Ultra-Light Cotton</span>
                                <span>Heavy Wool/Canvas</span>
                            </div>
                        </div>

                        {/* Parameter 2 */}
                        <div>
                            <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-on-background">
                                <span className="uppercase tracking-wide">Tensile Force</span>
                                <span className="font-mono text-primary font-bold">{tension}% Tension</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                step="5"
                                value={tension}
                                onChange={(e) => handleSliderChange(setTension, Number(e.target.value))}
                                className="w-full h-1 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[9px] font-bold text-on-surface uppercase mt-1">
                                <span>Fluid Hang / Loose</span>
                                <span>Rigid / Compressed</span>
                            </div>
                        </div>

                        {/* Parameter 3 */}
                        <div>
                            <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-on-background">
                                <span className="uppercase tracking-wide">Atmospheric Wind Load</span>
                                <span className="font-mono text-primary font-bold">{wind} km/h</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="120" 
                                step="2"
                                value={wind}
                                onChange={(e) => handleSliderChange(setWind, Number(e.target.value))}
                                className="w-full h-1 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[9px] font-bold text-on-surface uppercase mt-1">
                                <span>Static Vault Vault</span>
                                <span>Storm Force Exposure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulated Analytical Output Matrix Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface p-4 rounded-2xl border border-outline border-dashed">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider mb-1">Drape Coefficient</span>
                    <span className="font-mono text-sm font-extrabold text-on-background select-none">{drapeIndex}% Gravity Slope</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider mb-1">Max Warp Point</span>
                    <span className="font-mono text-sm font-extrabold text-on-background select-none">{stressPeak} MPa</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider mb-1">Ref Aerodynamic Drag</span>
                    <span className="font-mono text-sm font-extrabold text-on-background select-none">{dragCoeff} cd</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider mb-1">Woven Elasticity Coefficient</span>
                    <span className="font-mono text-sm font-extrabold text-on-background select-none">ε = {elasticityRate}</span>
                </div>
            </div>
            
            <div className="flex items-start gap-2 bg-primary/5 text-[11px] text-on-surface p-3 rounded-xl border border-primary/10">
                <Layers className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                    Adjust parameters above of <b className="text-on-background font-bold">{productName}</b> to examine how the material drapes, stretches, and contours under virtual storm simulations. Clicking on nodes visualizes local tensile load indices.
                </p>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, X } from 'lucide-react';
import { allArchiveProducts } from '../lib/data';
import { SilhouetteStudy } from '../components/SilhouetteStudy';

interface ProductScreenProps {
    productId: string;
    onAddToCart: (product: any, size: string) => void;
}

export function ProductScreen({ productId, onAddToCart }: ProductScreenProps) {
    // Dynamically retrieve selected piece details
    const product = allArchiveProducts.find(p => p.id === productId) || allArchiveProducts[0];
    const imagesToUse = product.detailImages && product.detailImages.length > 0 ? product.detailImages : [product.image];

    // Local select states
    const [selectedSize, setSelectedSize] = useState('M');
    const [isAdded, setIsAdded] = useState(false);
    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

    const handleAdd = () => {
        if (product.isSoldOut) return;
        onAddToCart(product, selectedSize);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-[80px] pb-12 w-full max-w-[1440px] mx-auto px-6 md:px-8 min-h-screen flex flex-col gap-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left Image Gallery */}
                <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 hide-scrollbar relative">
                    {imagesToUse.map((img, i) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            key={i} 
                            className="w-full h-auto aspect-[4/5] md:min-h-[80vh] relative group bg-surface border border-outline rounded-3xl overflow-hidden shadow-sm p-4"
                        >
                            <img src={img} className="w-full h-full object-cover rounded-2xl transition-all duration-700 hover:scale-[1.02]" alt={`${product.name} detail view ${i + 1}`} referrerPolicy="no-referrer" />
                        </motion.div>
                    ))}
                </div>
                
                {/* Right Sticky Info Panel */}
                <div className="md:col-span-5 lg:col-span-4 bg-surface rounded-3xl border border-outline shadow-sm relative">
                    <div className="md:sticky top-[80px] p-6 lg:p-8 flex flex-col gap-8">
                        
                        {/* Headers & Price */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">Archive // {product.code}</span>
                            <h1 className="font-display text-4xl lg:text-5xl font-bold text-on-background tracking-tight leading-none mb-2">{product.name}</h1>
                            <p className="font-bold text-xl text-primary">£{product.price}.00 GBP</p>
                        </div>
 
                         {/* Description */}
                        <p className="text-sm text-on-surface leading-relaxed border-l-2 border-primary/25 pl-4 py-1">
                            {product.description}
                        </p>
 
                         {/* Size Selector */}
                        <div className="flex flex-col gap-4 bg-background p-5 rounded-2xl border border-outline/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-on-background">Size</span>
                                <button 
                                    onClick={() => setSizeGuideOpen(true)}
                                    className="text-xs font-bold uppercase tracking-wider text-primary underline hover:text-primary-dim transition-colors cursor-pointer"
                                >
                                    Size Guide
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-3 relative">
                                {['S', 'M', 'L', 'XL'].map((size) => {
                                    const isSoldOutXL = size === 'XL' && product.isSoldOut;
                                    const isActive = selectedSize === size;
                                    return (
                                        <button
                                            key={size}
                                            disabled={isSoldOutXL}
                                            onClick={() => setSelectedSize(size)}
                                            className={`relative h-12 flex items-center justify-center font-bold text-sm rounded-xl cursor-pointer z-10 border transition-colors duration-300 overflow-hidden
                                                ${isActive && !isSoldOutXL
                                                    ? 'text-background border-transparent' 
                                                    : isSoldOutXL 
                                                    ? 'bg-surface border-outline text-on-surface opacity-35 cursor-not-allowed' 
                                                    : 'bg-surface border border-outline text-on-surface hover:border-primary hover:text-primary'
                                                }
                                            `}
                                        >
                                            {isActive && !isSoldOutXL && (
                                                <motion.div
                                                    layoutId="activeSizeBackground"
                                                    className="absolute inset-0 bg-primary rounded-xl -z-10"
                                                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                                />
                                            )}
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
 
                        {/* CTA */}
                        <button 
                            disabled={product.isSoldOut || isAdded}
                            onClick={handleAdd}
                            className={`w-full h-14 rounded-full font-bold text-sm transition-all duration-300 shadow-md ${
                                product.isSoldOut 
                                ? 'bg-surface-dim border border-outline text-on-surface/50 cursor-not-allowed' 
                                : isAdded
                                ? 'bg-surface border border-outline text-on-background flex items-center justify-center gap-2 scale-[0.98]'
                                : 'bg-on-background text-background hover:opacity-90'
                            }`}
                        >
                            {product.isSoldOut ? 'Sold Out' : isAdded ? 'Added to Bag ✓' : 'Add To Bag'}
                        </button>
 
                        {/* Accordions */}
                        <div className="mt-2 flex flex-col gap-3">
                            <Accordion title="Materials & Care">
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between border-b border-outline/30 pb-2">
                                        <span className="font-bold text-on-surface">Outer Fabric</span>
                                        <span className="font-bold text-on-background text-right pl-4">{product.outerMaterial}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-outline/30 pb-2">
                                        <span className="font-bold text-on-surface">Inner Fabric</span>
                                        <span className="font-bold text-on-background text-right pl-4">{product.innerMaterial}</span>
                                    </div>
                                    <p className="pt-1 text-on-surface">Dry clean or clean selectively with specialized apparel compound. Maintain in cool environment with dust cover.</p>
                                </div>
                            </Accordion>
                            <Accordion title="Shipping">
                                <p className="text-sm text-on-surface leading-relaxed">
                                    Complimentary express global shipping on all orders over £500. Standard delivery within 3-5 business days. Signature required upon delivery.
                                </p>
                            </Accordion>
                            <Accordion title="Returns">
                                <p className="text-sm text-on-surface leading-relaxed">
                                    Returns accepted within 14 days of delivery. Items must be in original unworn condition with all heavy-duty tags fully attached.
                                </p>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulated interactive physical textile outline analyzer study */}
            <SilhouetteStudy productName={product.name} productCategory={product.category} />

            {/* Sizing Guide modal */}
            <AnimatePresence>
                {sizeGuideOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSizeGuideOpen(false)}
                            className="absolute inset-0 bg-on-background/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, y: 15, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 15, opacity: 0 }}
                            className="relative bg-background border border-outline w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 z-10"
                        >
                            <button 
                                onClick={() => setSizeGuideOpen(false)}
                                className="absolute top-4 right-4 p-2 text-on-surface hover:text-on-background rounded-full hover:bg-surface-dim transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>

                            <h3 className="font-display font-medium text-2xl text-on-background mb-1">Structural Sizing Matrix</h3>
                            <p className="text-xs text-on-surface mb-6 leading-relaxed">
                                Measurements are detailed in metric centimeters, captured across flat garment tension. Engineered with three-dimensional articulation tolerances of +/- 1.5%.
                            </p>

                            <div className="overflow-x-auto rounded-xl border border-outline">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="bg-surface border-b border-outline">
                                            <th className="p-3 font-bold text-on-background">Archive Tag</th>
                                            <th className="p-3 font-bold text-on-background">Chest</th>
                                            <th className="p-3 font-bold text-on-background">Shoulder</th>
                                            <th className="p-3 font-bold text-on-background">Sleeve</th>
                                            <th className="p-3 font-bold text-on-background">Length</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline/10 font-mono">
                                        <tr className="hover:bg-surface-dim/30">
                                            <td className="p-3 font-bold text-primary">S // 46</td>
                                            <td className="p-3">112 cm</td>
                                            <td className="p-3">46 cm</td>
                                            <td className="p-3">84 cm</td>
                                            <td className="p-3">74 cm</td>
                                        </tr>
                                        <tr className="hover:bg-surface-dim/30 bg-surface/5">
                                            <td className="p-3 font-bold text-primary">M // 48</td>
                                            <td className="p-3">118 cm</td>
                                            <td className="p-3">48 cm</td>
                                            <td className="p-3">86 cm</td>
                                            <td className="p-3">76 cm</td>
                                        </tr>
                                        <tr className="hover:bg-surface-dim/30">
                                            <td className="p-3 font-bold text-primary">L // 50</td>
                                            <td className="p-3">124 cm</td>
                                            <td className="p-3">50 cm</td>
                                            <td className="p-3">88 cm</td>
                                            <td className="p-3">78 cm</td>
                                        </tr>
                                        <tr className="hover:bg-surface-dim/30 bg-surface/5">
                                            <td className="p-3 font-bold text-primary">XL // 52</td>
                                            <td className="p-3">130 cm</td>
                                            <td className="p-3">52 cm</td>
                                            <td className="p-3">90 cm</td>
                                            <td className="p-3">80 cm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex flex-col gap-2 bg-surface text-[10px] text-on-surface border border-outline/50 p-4 rounded-xl leading-relaxed">
                                <span className="font-bold text-on-background uppercase block mb-1">FIT SUGGESTIONS // SLU-22</span>
                                <p>
                                    Model is 187cm (6&apos;1&quot;) wearing size <b className="text-on-background font-bold">M</b> for custom draped drop-shoulder effect, or size <b className="text-on-background font-bold">S</b> for structured body-fit geometry.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function Accordion({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <details className="group bg-background rounded-2xl border border-outline/50 overflow-hidden cursor-pointer">
            <summary className="flex justify-between items-center p-4 font-bold text-sm text-on-background list-none outline-none">
                {title}
                <ChevronDown className="w-4 h-4 text-primary group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <div className="px-4 pb-5 pt-1 animate-in fade-in slide-in-from-top-4 duration-300">
                {children}
            </div>
        </details>
    );
}

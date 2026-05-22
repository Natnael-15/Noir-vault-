import { motion } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, ShieldCheck, Trash2 } from 'lucide-react';

export interface CartItem {
    id: string;
    name: string;
    code: string;
    price: number;
    size: string;
    image: string;
    quantity: number;
}

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    onUpdateQuantity: (id: string, size: string, delta: number) => void;
    onRemoveItem: (id: string, size: string) => void;
    onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }: CartDrawerProps) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const freeShippingThreshold = 1500;
    const isFreeShipping = subtotal >= freeShippingThreshold;
    const amountToFreeShipping = freeShippingThreshold - subtotal;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden font-body">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-on-background/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="w-screen max-w-md bg-background border-l border-outline shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-outline/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="w-5 h-5 text-primary" />
                            <h2 className="font-display font-bold text-lg text-on-background">Your Bag</h2>
                            <span className="bg-primary/10 text-primary text-xs font-bold font-mono px-2.5 py-1 rounded-full">
                                {totalItems}
                            </span>
                        </div>
                        <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-surface-dim transition-colors text-on-surface hover:text-on-background">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Progress to Free Shipping */}
                    {cart.length > 0 && (
                        <div className="bg-surface px-6 py-4 border-b border-outline/30">
                            <p className="text-xs font-bold text-on-surface uppercase mb-2">
                                {isFreeShipping ? (
                                    <span className="text-primary">✓ Compliments of Noir Vault: Free Secure Express Courier Shipping</span>
                                ) : (
                                    <span>Add <span className="text-primary font-mono">£{amountToFreeShipping} GBP</span> more for Free Courier Shipping</span>
                                )}
                            </p>
                            <div className="w-full bg-surface-dim h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-primary h-full transition-all duration-500"
                                    style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 hide-scrollbar">
                        {cart.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 gap-4">
                                <div className="w-16 h-16 rounded-full bg-surface-dim flex items-center justify-center text-on-surface hover:scale-105 transition-transform">
                                    <ShoppingBag size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg text-on-background mb-1">Your bag is empty</h3>
                                    <p className="text-xs text-on-surface max-w-xs mx-auto">
                                        Architectural items from the current drop are limited and require reservation. Start exploring the collection.
                                    </p>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="bg-primary text-background font-bold text-xs px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider shadow-sm mt-2"
                                >
                                    Browse Collection
                                </button>
                            </div>
                        ) : (
                            cart.map((item, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={`${item.id}-${item.size}`} 
                                    className="flex gap-4 p-3 bg-surface border border-outline/55 rounded-2xl relative"
                                >
                                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-surface-dim shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-0.5">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-bold text-sm text-on-background leading-tight">{item.name}</h4>
                                                <button 
                                                    onClick={() => onRemoveItem(item.id, item.size)}
                                                    className="p-1 -mr-1 text-on-surface hover:text-red-500 transition-colors"
                                                    title="Remove Item"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <p className="text-[10px] font-mono text-on-surface uppercase tracking-wide mt-0.5">{item.code}</p>
                                            <span className="inline-block mt-2 text-[10px] font-mono font-bold uppercase tracking-wider bg-background px-2.2 py-0.7 border border-outline text-on-background rounded-md">
                                                Size: {item.size}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-3">
                                            <div className="flex items-center bg-background border border-outline rounded-lg p-0.5">
                                                <button 
                                                    onClick={() => onUpdateQuantity(item.id, item.size, -1)}
                                                    className="w-6 h-6 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                                                >
                                                    <Minus size={10} />
                                                </button>
                                                <span className="w-6 text-center font-mono font-bold text-xs text-on-background">{item.quantity}</span>
                                                <button 
                                                    onClick={() => onUpdateQuantity(item.id, item.size, 1)}
                                                    className="w-6 h-6 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                                                >
                                                    <Plus size={10} />
                                                </button>
                                            </div>
                                            <span className="font-mono font-bold text-sm text-primary">£{item.price * item.quantity} GBP</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="px-6 py-6 border-t border-outline/50 bg-surface flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-on-surface uppercase tracking-wider">Subtotal</span>
                                <span className="font-mono font-bold text-lg text-on-background">£{subtotal} GBP</span>
                            </div>
                            <p className="text-[10px] text-on-surface text-center">
                                Taxes are calculated during dispatch protocol checkout. Local customs are complimentary.
                            </p>
                            <button 
                                onClick={onCheckout}
                                className="w-full bg-primary hover:bg-primary-dim text-background font-bold text-sm h-13 rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Begin Secure Checkout
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

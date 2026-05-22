import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NavBar, Footer } from './components/Layout';
import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';
import { EditorialScreen } from './screens/EditorialScreen';
import { ArchiveScreen } from './screens/ArchiveScreen';
import { DropsScreen } from './screens/DropsScreen';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { ExclusiveModal } from './components/ExclusiveModal';
import { InfoModal, InfoTab } from './components/InfoModal';
import { ShieldCheck, Check } from 'lucide-react';
import { audioEngine } from './lib/audio';

export type ViewState = 'HOME' | 'PRODUCT' | 'EDITORIAL' | 'ARCHIVE' | 'DROPS';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedProductId, setSelectedProductId] = useState<string>('1');

  // Dark/Light Mode state manager
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('noir-dark-mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('noir-dark-mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    audioEngine.playSwoosh();
    setDarkMode(!darkMode);
  };

  // State mechanics for drawer and search indexes
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [exclusiveOpen, setExclusiveOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<InfoTab>('PRIVACY');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Cart operations
  const handleAddToCart = (product: any, size: string) => {
    audioEngine.playSuccess();
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          code: product.code,
          price: product.price,
          size: size,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    audioEngine.playTick();
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id && item.size === size ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string, size: string) => {
    audioEngine.playTick();
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  const handleCheckout = () => {
    audioEngine.playSuccess();
    setCartOpen(false);
    setCheckoutSuccess(true);
    // Clear cart upon successful layout checkout
    setCart([]);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 4000);
  };

  const handleViewChange = (view: ViewState) => {
    if (view === currentView) return;
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleProductSelection = (productId: string) => {
    setSelectedProductId(productId);
    handleViewChange('PRODUCT');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-background min-h-screen text-on-background font-body selection:bg-surface-bright selection:text-primary relative overflow-x-hidden">
      <NavBar 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
        cartCount={cartCount}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <main className="w-full mx-auto min-h-screen">
        <AnimatePresence mode="wait">
          {currentView === 'HOME' && (
            <div key="home">
              <HomeScreen 
                onProductClick={handleProductSelection} 
                onApplyClick={() => setExclusiveOpen(true)}
                onLookbookClick={() => handleViewChange('EDITORIAL')}
                onSeeAllClick={() => handleViewChange('ARCHIVE')}
              />
            </div>
          )}
          {currentView === 'PRODUCT' && (
            <div key="product">
              <ProductScreen 
                productId={selectedProductId} 
                onAddToCart={handleAddToCart}
              />
            </div>
          )}
          {currentView === 'EDITORIAL' && (
            <div key="editorial">
              <EditorialScreen />
            </div>
          )}
          {currentView === 'ARCHIVE' && (
            <div key="archive">
              <ArchiveScreen onProductClick={handleProductSelection} />
            </div>
          )}
          {currentView === 'DROPS' && (
            <div key="drops">
              <DropsScreen />
            </div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer onInfoClick={(tab) => {
        setActiveInfoTab(tab);
        setInfoOpen(true);
      }} />

      {/* Slide-out Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer 
            isOpen={cartOpen} 
            onClose={() => setCartOpen(false)} 
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay 
            isOpen={searchOpen} 
            onClose={() => setSearchOpen(false)} 
            onSelectProduct={handleProductSelection}
          />
        )}
      </AnimatePresence>

      {/* Exclusive Invitation Sign-up Modal */}
      <AnimatePresence>
        {exclusiveOpen && (
          <ExclusiveModal 
            isOpen={exclusiveOpen} 
            onClose={() => setExclusiveOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Information Modals for Footer link actions */}
      <AnimatePresence>
        {infoOpen && (
          <InfoModal 
            isOpen={infoOpen}
            tab={activeInfoTab}
            onClose={() => setInfoOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Checkout Success Notification Banner */}
      <AnimatePresence>
        {checkoutSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-on-background text-background border border-outline/20 shadow-2xl rounded-2xl p-5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-background">Order Dispatched</h4>
              <p className="text-xs text-background/80 mt-1 leading-relaxed">
                Secure transaction recorded. Your archival reservation has been validated. DHL Express link and tracking protocol sent to your keyholder ledger.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

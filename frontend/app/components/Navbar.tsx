import { Search, User, ShoppingCart, Menu, X, Trash2, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";

export function Navbar({ onOpenCheckout }: { onOpenCheckout: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, itemCount, total, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-4 shadow-2xl" : "py-6"
        } bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/20`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl tracking-wider cursor-pointer"
            style={{ color: "#d4af37" }}
          >
            LUXE
          </motion.div>

          {/* Center Navigation Menu */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="text-white hover:text-[#d4af37] transition-colors text-sm tracking-widest relative group"
            >
              HOME
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="#collections"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300 text-sm tracking-widest font-semibold"
            >
              COLLECTIONS
            </motion.a>
            
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              className="text-white hover:text-[#d4af37] transition-colors text-sm tracking-widest relative group"
            >
              ABOUT
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="text-white hover:text-[#d4af37] transition-colors text-sm tracking-widest relative group"
            >
              CONTACT
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-[#d4af37] transition-colors relative group"
            >
              <Search size={24} className="text-white" />
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-[#d4af37] transition-colors relative"
            >
              <User size={24} className="text-white" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-[#d4af37] transition-colors"
            >
              <ShoppingCart size={24} className="text-white" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[#d4af37] text-[#0a0a0a] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#1a1a1a] z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl text-white flex items-center gap-3">
                  <ShoppingCart className="text-[#d4af37]" />
                  Your Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/50 gap-4">
                    <ShoppingCart size={64} strokeWidth={1} />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-24 bg-[#0a0a0a] overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-sm mb-1">{item.name}</h3>
                        <p className="text-[#d4af37] font-bold mb-2">${item.price}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-white/20">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-white hover:text-[#d4af37]"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-white text-xs">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-white hover:text-[#d4af37]"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/30 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-white">
                    <span>Total</span>
                    <span className="text-[#d4af37] text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      onOpenCheckout();
                    }}
                    className="w-full py-4 bg-[#d4af37] text-[#0a0a0a] font-bold hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] right-0 bottom-0 w-64 bg-[#0a0a0a]/95 backdrop-blur-md border-l border-[#d4af37]/20 z-40 md:hidden"
          >
            <div className="flex flex-col gap-6 p-6">
              {/* Navigation Links */}
              <motion.a
                href="#home"
                whileHover={{ x: 5 }}
                className="text-white hover:text-[#d4af37] transition-colors tracking-wider"
              >
                HOME
              </motion.a>
              
              <motion.a
                href="#collections"
                whileHover={{ x: 5 }}
                className="px-4 py-2 border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300 text-sm tracking-widest text-center font-semibold"
              >
                COLLECTIONS
              </motion.a>
              
              <motion.a
                href="#about"
                whileHover={{ x: 5 }}
                className="text-white hover:text-[#d4af37] transition-colors tracking-wider"
              >
                ABOUT
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ x: 5 }}
                className="text-white hover:text-[#d4af37] transition-colors tracking-wider"
              >
                CONTACT
              </motion.a>
              
              <div className="border-t border-white/10 pt-6 mt-2 flex flex-col gap-6">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-white hover:text-[#d4af37] transition-colors"
                >
                  <Search size={24} />
                  <span>Search</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-white hover:text-[#d4af37] transition-colors"
                >
                  <User size={24} />
                  <span>Profile</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex items-center gap-3 text-white hover:text-[#d4af37] transition-colors"
                >
                  <ShoppingCart size={24} />
                  <span>Cart ({itemCount})</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

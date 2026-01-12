import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              className="relative hover:text-[#d4af37] transition-colors"
            >
              <ShoppingCart size={24} className="text-white" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-[#d4af37] text-[#0a0a0a] rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                0
              </motion.span>
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
                className="flex items-center gap-3 text-white hover:text-[#d4af37] transition-colors"
              >
                <ShoppingCart size={24} />
                <span>Cart (0)</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

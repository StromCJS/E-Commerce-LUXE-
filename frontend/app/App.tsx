import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CategoryGrid } from "./components/CategoryGrid";
import { OutfitShowcase } from "./components/OutfitShowcase";
import { ProductGrid } from "./components/ProductGrid";
import { AccessoriesSection } from "./components/AccessoriesSection";
import { Footer } from "./components/Footer";
import { StripeCheckout } from "./components/StripeCheckout";
import { useCart } from "./context/CartContext";
import { motion } from "motion/react";

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { total } = useCart();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <Hero />
      <CategoryGrid />
      <OutfitShowcase />
      <ProductGrid />
      <AccessoriesSection />
      
      {/* About Section */}
      <section className="py-24 px-6 bg-[#111] border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl text-white mb-6 tracking-wider"
            >
              The Essence of <span className="text-[#d4af37]">Luxe</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/70 text-lg leading-relaxed mb-8"
            >
              Founded on the principles of timeless elegance and unparalleled quality, LUXE brings together the world's most exquisite fashion collections. We believe that style is a reflection of one's identity, and our mission is to provide pieces that resonate with sophistication and grace.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 text-center"
            >
              <div>
                <p className="text-[#d4af37] text-3xl font-bold mb-2">15+</p>
                <p className="text-white/50 text-sm uppercase">Years of Excellence</p>
              </div>
              <div>
                <p className="text-[#d4af37] text-3xl font-bold mb-2">50k+</p>
                <p className="text-white/50 text-sm uppercase">Happy Clients</p>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-[#d4af37]/10 border border-[#d4af37]/20 overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800" 
                alt="Our Atelier" 
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      <StripeCheckout 
        amount={total}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

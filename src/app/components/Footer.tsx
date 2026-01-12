import { useState } from "react";
import { motion } from "motion/react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#d4af37]/20 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl mb-4 text-[#d4af37]">LUXE</h3>
            <p className="text-white/70 leading-relaxed">
              Timeless elegance meets modern sophistication. Discover premium
              fashion for every generation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Collections", "Size Guide", "Shipping", "Returns"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-[#d4af37] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl mb-4 text-white">Stay Updated</h4>
            <p className="text-white/70 mb-4">
              Subscribe to get updates on new drops and exclusive offers
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-3 bg-[#1a1a1a] text-white border border-white/20 focus:border-[#d4af37] outline-none transition-colors duration-300"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#d4af37] text-[#0a0a0a] hover:bg-white transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Payment Icons & Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Payment Icons */}
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-sm">We Accept:</span>
              <div className="flex gap-3">
                {["Visa", "Mastercard", "Stripe", "PayPal"].map((payment) => (
                  <div
                    key={payment}
                    className="px-3 py-2 bg-[#1a1a1a] border border-white/20 text-white/70 text-xs"
                  >
                    {payment}
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <p className="text-white/50 text-sm">
              © 2026 LUXE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { motion } from "motion/react";
import { useRef } from "react";

const accessories = [
  {
    id: 1,
    name: "Heritage Timepiece",
    price: "$1,299.00",
    image: "https://images.unsplash.com/photo-1751437730397-ef83024b5339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwbHV4dXJ5JTIwd2F0Y2h8ZW58MXx8fHwxNzY4MjA3ODM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Signature Fragrance",
    price: "$250.00",
    image: "https://images.unsplash.com/photo-1708979165880-dd0ff61fa748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBlcmZ1bWV8ZW58MXx8fHwxNzY4MTc2NTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Luxury Watch Collection",
    price: "$2,499.00",
    image: "https://images.unsplash.com/photo-1636289141131-389e44e981c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2ODExNjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    name: "Elite Perfume Set",
    price: "$399.00",
    image: "https://images.unsplash.com/photo-1708979165880-dd0ff61fa748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBlcmZ1bWV8ZW58MXx8fHwxNzY4MTc2NTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function AccessoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 overflow-hidden relative">
      {/* Marble Texture Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)",
        }}
      />
      
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-4xl text-center text-white mb-4">
            Luxury Accessories
          </h2>
          <p className="text-center text-white/70">
            Elevate your style with our exclusive collection
          </p>
        </div>

        {/* Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 px-6 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {accessories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[400px] group cursor-pointer"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative h-[500px] overflow-hidden mb-6 border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="text-center">
                <h3
                  className="text-2xl mb-3 text-white group-hover:text-[#d4af37] transition-colors duration-300"
                  style={{ fontFamily: "serif" }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-3xl text-[#d4af37]"
                  style={{ fontFamily: "serif" }}
                >
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="flex justify-center mt-8">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/50 text-sm flex items-center gap-2"
          >
            <span>Scroll to explore</span>
            <span>→</span>
          </motion.div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

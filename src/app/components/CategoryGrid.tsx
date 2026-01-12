import { motion } from "motion/react";
import { useState } from "react";

const categories = [
  {
    id: 1,
    title: "Men's Collection",
    image: "https://images.unsplash.com/photo-1533478784933-5fdbddc8ea7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzY4MjA3ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Little Gentlemen",
    image: "https://images.unsplash.com/photo-1758782213591-61d145d7c76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZm9ybWFsJTIwd2VhcnxlbnwxfHx8fDE3NjgyMDc4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Luxury Accessories",
    image: "https://images.unsplash.com/photo-1636289141131-389e44e981c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2ODExNjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function CategoryGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-16 text-white">
          Explore Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="relative h-[500px] overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredId === category.id
                      ? "scale-110 grayscale-0"
                      : "grayscale scale-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                    hoveredId === category.id ? "opacity-30" : "opacity-60"
                  }`}
                />
              </div>

              {/* Title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3
                  className={`text-3xl tracking-wider text-center px-6 transition-all duration-500 ${
                    hoveredId === category.id ? "text-[#d4af37]" : "text-white"
                  }`}
                >
                  {category.title}
                </h3>
              </div>

              {/* Border effect */}
              <div
                className={`absolute inset-0 border-2 transition-all duration-500 ${
                  hoveredId === category.id
                    ? "border-[#d4af37] opacity-100"
                    : "border-transparent opacity-0"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

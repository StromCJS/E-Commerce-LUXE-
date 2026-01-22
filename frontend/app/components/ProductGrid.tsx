import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { ShoppingCart, Heart, Eye, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  collection: string;
  size: string;
  image: string;
  badge?: string;
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all'>('all');
  const [selectedCollection, setSelectedCollection] = useState<'all' | 'new' | 'old'>('all');
  const [selectedSize, setSelectedSize] = useState<'all' | 'kids' | 'regular' | 'big'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const { addToCart } = useCart();
  const itemsPerPage = selectedCategory === 'all' ? 24 : 20;

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
        console.error('Error fetching products:', err);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const collectionMatch = selectedCollection === 'all' || product.collection === selectedCollection;
      const sizeMatch = selectedSize === 'all' || product.size === selectedSize;
      return categoryMatch && collectionMatch && sizeMatch;
    });
  }, [products, selectedCategory, selectedCollection, selectedSize]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 px-6 bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-[#0a0a0a] min-h-screen">
      {/* Centered Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl mb-4 text-white tracking-wider"
        >
          Our Collection
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-lg"
        >
          {filteredProducts.length} Premium Products
        </motion.p>
      </div>

      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-72 space-y-8"
          >
            {/* Category Filter */}
            <div>
              <h3 className="text-xl mb-4 text-[#d4af37] flex items-center gap-2">
                <Sparkles size={20} />
                Category
              </h3>
              <div className="space-y-2">
                {(['all', 'shirt', 't-shirt', 'pants', 'watch', 'perfume', 'sunglasses', 'shoes', 'accessories'] as const).map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full text-left py-3 px-4 transition-all duration-300 relative overflow-hidden group ${
                      selectedCategory === cat
                        ? "bg-[#d4af37] text-[#0a0a0a]"
                        : "text-white hover:text-[#d4af37] border border-white/20 hover:border-[#d4af37]"
                    }`}
                  >
                    {selectedCategory !== cat && (
                      <motion.div
                        className="absolute inset-0 bg-[#d4af37]/10"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative capitalize">{cat === 'all' ? 'All Products' : cat.replace('-', ' ')}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Collection Filter */}
            <div>
              <h3 className="text-xl mb-4 text-[#d4af37]">Collection</h3>
              <div className="space-y-2">
                {(['all', 'new', 'old'] as const).map((col) => (
                  <motion.button
                    key={col}
                    onClick={() => { setSelectedCollection(col); setCurrentPage(1); }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full text-left py-3 px-4 transition-all duration-300 ${
                      selectedCollection === col
                        ? "bg-[#d4af37] text-[#0a0a0a]"
                        : "text-white hover:text-[#d4af37] border border-white/20 hover:border-[#d4af37]"
                    }`}
                  >
                    {col === 'all' ? 'All Collections' : col === 'new' ? 'New Models' : 'Classic Models'}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-xl mb-4 text-[#d4af37]">Size Range</h3>
              <div className="space-y-2">
                {(['all', 'kids', 'regular', 'big'] as const).map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => { setSelectedSize(size); setCurrentPage(1); }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full text-left py-3 px-4 transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-[#d4af37] text-[#0a0a0a]"
                        : "text-white hover:text-[#d4af37] border border-white/20 hover:border-[#d4af37]"
                    }`}
                  >
                    {size === 'all' ? 'All Sizes' : size.charAt(0).toUpperCase() + size.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={`${product.id}-${selectedCategory}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="relative bg-[#1a1a1a] overflow-hidden group"
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Badge */}
                  {product.badge && (
                    <motion.div
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      className="absolute top-4 left-0 bg-[#d4af37] text-[#0a0a0a] px-4 py-1 text-xs z-10 tracking-wider"
                    >
                      {product.badge}
                    </motion.div>
                  )}

                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      favorites.has(product.id)
                        ? 'bg-[#d4af37] text-[#0a0a0a]'
                        : 'bg-black/30 text-white hover:bg-[#d4af37] hover:text-[#0a0a0a]'
                    }`}
                  >
                    <Heart size={18} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                  </motion.button>

                  {/* Image */}
                  <div className="h-72 overflow-hidden relative">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Quick View Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white rounded-full text-[#0a0a0a]"
                      >
                        <Eye size={24} />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-[#d4af37] mb-1 uppercase tracking-wider">
                      {product.category.replace('-', ' ')}
                    </p>
                    <h3 className="text-sm mb-2 text-white line-clamp-2 h-10">
                      {product.name}
                    </h3>
                    <p className="text-xl text-[#d4af37] mb-3">${product.price}</p>

                    {/* Animated Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="relative w-full py-3 bg-[#d4af37] text-[#0a0a0a] overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative flex items-center justify-center gap-2 group-hover:text-[#d4af37] transition-colors duration-300">
                        <ShoppingCart size={18} />
                        Add to Cart
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && selectedCategory === 'all' && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 bg-[#1a1a1a] text-white border border-[#d4af37] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
                >
                  Previous
                </motion.button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-12 h-12 ${
                          currentPage === pageNum
                            ? 'bg-[#d4af37] text-[#0a0a0a]'
                            : 'bg-[#1a1a1a] text-white border border-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a]'
                        } transition-all duration-300`}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 bg-[#1a1a1a] text-white border border-[#d4af37] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
                >
                  Next
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

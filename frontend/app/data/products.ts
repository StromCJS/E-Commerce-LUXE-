// Generate 1000 products across different categories
export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'shirt' | 't-shirt' | 'pants' | 'watch' | 'perfume' | 'sunglasses' | 'shoes' | 'accessories';
  collection: 'new' | 'old';
  size: 'kids' | 'regular' | 'big';
  badge?: string;
  image: string;
}

const categories = {
  shirt: { base: 'Dress Shirt', variants: ['Classic', 'Premium', 'Luxury', 'Executive', 'Slim Fit', 'Regular Fit', 'Oxford', 'Linen', 'Cotton', 'Silk'] },
  't-shirt': { base: 'T-Shirt', variants: ['Crew Neck', 'V-Neck', 'Polo', 'Henley', 'Long Sleeve', 'Graphic', 'Plain', 'Striped', 'Premium Cotton', 'Athletic'] },
  pants: { base: 'Pants', variants: ['Chino', 'Dress', 'Casual', 'Slim', 'Straight', 'Tailored', 'Cotton', 'Wool', 'Linen', 'Cargo'] },
  watch: { base: 'Watch', variants: ['Chronograph', 'Automatic', 'Classic', 'Sport', 'Dress', 'Diver', 'Pilot', 'Racing', 'Skeleton', 'Smart'] },
  perfume: { base: 'Perfume', variants: ['Eau de Parfum', 'Eau de Toilette', 'Cologne', 'Woody', 'Fresh', 'Oriental', 'Citrus', 'Aquatic', 'Spicy', 'Leather'] },
  sunglasses: { base: 'Sunglasses', variants: ['Aviator', 'Wayfarer', 'Round', 'Square', 'Cat Eye', 'Sport', 'Classic', 'Polarized', 'Vintage', 'Modern'] },
  shoes: { base: 'Shoes', variants: ['Oxford', 'Derby', 'Loafer', 'Monk Strap', 'Chelsea', 'Brogue', 'Sneaker', 'Boot', 'Driving', 'Moccasin'] },
  accessories: { base: 'Accessory', variants: ['Belt', 'Wallet', 'Tie', 'Pocket Square', 'Cufflinks', 'Briefcase', 'Scarf', 'Hat', 'Gloves', 'Keychain'] }
};

const colors = ['Black', 'White', 'Navy', 'Gray', 'Brown', 'Burgundy', 'Olive', 'Charcoal', 'Tan', 'Blue'];
const materials = ['Cotton', 'Leather', 'Wool', 'Silk', 'Linen', 'Cashmere', 'Stainless Steel', 'Gold', 'Silver', 'Titanium'];
const brands = ['Luxe', 'Elite', 'Premium', 'Heritage', 'Classic', 'Modern', 'Royal', 'Imperial', 'Signature', 'Exclusive'];

// Image pool - using placeholder images with different seeds for variety
const generateImageUrl = (category: string, id: number): string => {
  const seed = Math.abs(id * 7919) % 1000; // Generate consistent but varied seed
  return `https://picsum.photos/seed/${category}${seed}/400/500`;
};

export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let id = 1;

  // Generate products for each category
  Object.entries(categories).forEach(([catKey, catData]) => {
    const category = catKey as Product['category'];
    const itemsPerCategory = Math.floor(1000 / Object.keys(categories).length);

    for (let i = 0; i < itemsPerCategory; i++) {
      const variant = catData.variants[i % catData.variants.length];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      
      // Price ranges by category
      const priceRanges: Record<string, [number, number]> = {
        'shirt': [89, 299],
        't-shirt': [49, 149],
        'pants': [129, 399],
        'watch': [499, 2999],
        'perfume': [149, 599],
        'sunglasses': [199, 799],
        'shoes': [249, 899],
        'accessories': [79, 399]
      };

      const [minPrice, maxPrice] = priceRanges[category];
      const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
      
      const collection = Math.random() > 0.3 ? 'new' : 'old';
      const sizeOptions: Product['size'][] = ['kids', 'regular', 'big'];
      const size = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      
      // Special badges for some items
      let badge: string | undefined;
      if (collection === 'new' && Math.random() > 0.7) {
        badge = 'New Arrival';
      } else if (collection === 'old' && Math.random() > 0.8) {
        badge = 'Vintage Edition';
      } else if (Math.random() > 0.9) {
        badge = 'Limited Edition';
      }

      products.push({
        id: id++,
        name: `${brand} ${color} ${material} ${variant} ${catData.base}`,
        price,
        category,
        collection,
        size,
        badge,
        image: generateImageUrl(category, id)
      });
    }
  });

  // Fill remaining slots to reach exactly 1000
  while (products.length < 1000) {
    const categories = Object.keys(categories);
    const category = categories[Math.floor(Math.random() * categories.length)] as Product['category'];
    const catData = categories[category];
    
    products.push({
      id: id++,
      name: `${brands[id % brands.length]} Premium ${catData.base}`,
      price: Math.floor(Math.random() * 500 + 100),
      category,
      collection: 'new',
      size: 'regular',
      image: generateImageUrl(category, id)
    });
  }

  return products;
};

export const products = generateProducts();

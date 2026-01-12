import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CategoryGrid } from "./components/CategoryGrid";
import { OutfitShowcase } from "./components/OutfitShowcase";
import { ProductGrid } from "./components/ProductGrid";
import { AccessoriesSection } from "./components/AccessoriesSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <OutfitShowcase />
      <ProductGrid />
      <AccessoriesSection />
      <Footer />
    </div>
  );
}

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { StripeCheckout } from "./StripeCheckout";

const outfits = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1533478784933-5fdbddc8ea7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzY4MjA3ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Executive Classic",
    hotspots: [
      { x: "35%", y: "30%", item: "Premium Suit Jacket", price: "$599" },
      { x: "35%", y: "60%", item: "Dress Pants", price: "$199" },
      { x: "30%", y: "45%", item: "Luxury Watch", price: "$1,299" },
    ],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1619225379807-e9002c44c462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW5zJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjgyMDc4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Modern Gentleman",
    hotspots: [
      { x: "40%", y: "35%", item: "Designer Shirt", price: "$249" },
      { x: "40%", y: "65%", item: "Tailored Trousers", price: "$299" },
      { x: "55%", y: "50%", item: "Leather Belt", price: "$149" },
    ],
  },
];

interface Hotspot {
  x: string;
  y: string;
  item: string;
  price: string;
}

export function OutfitShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [checkoutAmount, setCheckoutAmount] = useState<number>(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <section className="py-24 px-6 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-4 text-white">
          Shop Complete Looks
        </h2>
        <p className="text-center text-white/70 mb-16">
          Click on the hotspots to discover individual pieces
        </p>

        <Slider {...settings} className="outfit-slider">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="px-4">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Image with Hotspots */}
                <div className="relative w-full md:w-2/3 h-[600px] group">
                  <img
                    src={outfit.image}
                    alt={outfit.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hotspots - Hidden dots, click on image areas */}
                  {outfit.hotspots.map((hotspot, index) => (
                    <button
                      key={index}
                      className="absolute w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-transform duration-300 opacity-0 hover:opacity-20 hover:bg-[#d4af37]"
                      style={{ left: hotspot.x, top: hotspot.y }}
                      onClick={() => setActiveHotspot(hotspot)}
                      aria-label={`View ${hotspot.item}`}
                    >
                    </button>
                  ))}
                </div>

                {/* Details */}
                <div className="w-full md:w-1/3 text-center md:text-left">
                  <h3 className="text-3xl mb-6 text-[#d4af37]">{outfit.title}</h3>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    A carefully curated ensemble that combines timeless elegance
                    with modern sophistication. Each piece is selected to
                    complement the others perfectly.
                  </p>
                  <button
                    className="px-8 py-3 bg-[#d4af37] text-[#0a0a0a] hover:bg-white hover:text-[#d4af37] transition-all duration-300"
                    onClick={() => {
                      const total = outfit.hotspots.reduce((sum, h) => sum + parseFloat(h.price.replace('$', '').replace(',', '')), 0);
                      setCheckoutAmount(total);
                      setIsCheckoutOpen(true);
                    }}
                  >
                    Shop Full Set
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Hotspot Popup */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-6"
            onClick={() => setActiveHotspot(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-[#1a1a1a] p-8 max-w-md w-full border-2 border-[#d4af37] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-4 text-white hover:text-[#d4af37] transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl mb-4 text-white">{activeHotspot.item}</h3>
              <p className="text-3xl mb-6 text-[#d4af37]">{activeHotspot.price}</p>
              <button
                className="w-full py-3 bg-[#d4af37] text-[#0a0a0a] hover:bg-white hover:text-[#d4af37] transition-all duration-300"
                onClick={() => {
                  const price = parseFloat(activeHotspot.price.replace('$', '').replace(',', ''));
                  setCheckoutAmount(price);
                  setIsCheckoutOpen(true);
                  setActiveHotspot(null);
                }}
              >
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stripe Checkout */}
      <StripeCheckout
        amount={checkoutAmount}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </section>
  );
}

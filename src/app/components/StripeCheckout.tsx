import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

const stripePromise = loadStripe("pk_test_51Qd8wJGJzQ8xJcZv8wJ8wJ8w"); // Replace with your Stripe publishable key

interface CheckoutFormProps {
  amount: number;
  onClose: () => void;
}

function CheckoutForm({ amount, onClose }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // Redirect to Stripe Checkout (using client-side checkout)
    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await (stripe as any).redirectToCheckout({
        lineItems: [{ price: "price_1Qd8wJGJzQ8xJcZv8wJ8wJ8w", quantity: 1 }], // Example test price ID
        mode: "payment",
        successUrl: window.location.origin + "/success",
        cancelUrl: window.location.origin,
      });
      if (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-[#1a1a1a] p-8 max-w-md w-full border-2 border-[#d4af37] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[#d4af37] transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl mb-6 text-white">Complete Your Purchase</h2>
        <p className="text-white/70 mb-6">Total: ${amount}</p>

        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#d4af37] text-[#0a0a0a] hover:bg-white hover:text-[#d4af37] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay with Stripe"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

interface StripeCheckoutProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
}

export function StripeCheckout({ amount, isOpen, onClose }: StripeCheckoutProps) {
  if (!isOpen) return null;

  return <CheckoutForm amount={amount} onClose={onClose} />;
}

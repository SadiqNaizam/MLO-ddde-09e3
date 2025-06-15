import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';
import CharacterButton from '@/components/CharacterButton'; // Assuming this path from already-generated-components

interface AnimatedMenuItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  onAddToCart: (itemId: string) => void;
}

// Animation variants
const cardVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)", // Adjusted shadow
  },
  hover: {
    scale: 1.05, // Slightly more wiggle
    y: -8,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)", // Enhanced shadow
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const peekingElementVariants = {
  rest: { opacity: 0, y: 20, x: 10, rotate: -15 },
  hover: { opacity: 1, y: -5, x: 0, rotate: 10, transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.1 } }
};

const addToCartOverlayVariants = {
  initial: { opacity: 0, scale: 0.7, rotate: -10 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 350, damping: 12 } },
  exit: { opacity: 0, scale: 0.8, rotate: 10, transition: { duration: 0.3 } }
};

const AnimatedMenuItem: React.FC<AnimatedMenuItemProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  onAddToCart,
}) => {
  console.log(`AnimatedMenuItem loaded for: ${name}`);
  const [showAddedToCartAnim, setShowAddedToCartAnim] = useState(false);

  const handleAddToCartClick = () => {
    onAddToCart(id);
    setShowAddedToCartAnim(true);
    setTimeout(() => {
      setShowAddedToCartAnim(false);
    }, 2000); // Show animation for 2 seconds
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 rounded-xl overflow-hidden p-5 shadow-lg w-full max-w-xs sm:max-w-sm border-2 border-blue-200 hover:border-blue-400 transition-colors duration-300"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      layout // Enables smooth layout changes if content size changes
    >
      {/* Peeking Element (e.g., Dorami-like or gadget) */}
      <motion.div
        className="absolute -top-3 -right-2 text-4xl transform z-0" // z-0 to be behind content if it overlaps weirdly
        variants={peekingElementVariants}
      >
        <span>✨</span> {/* Sparkle for a magical/gadget feel */}
      </motion.div>

      <div className="relative mb-4 z-10"> {/* z-10 to be above peeking element if necessary */}
        <img
          src={imageUrl || `https://via.placeholder.com/300x200.png?text=${encodeURIComponent(name)}`}
          alt={name}
          className="w-full h-48 object-cover rounded-lg bg-white p-1 shadow-md border border-gray-200"
        />
      </div>

      <div className="relative z-10"> {/* Content above peeking element */}
        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-1 truncate" title={name}>
          {name}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 h-14 overflow-y-auto"> {/* scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 if tailwind scrollbar plugin used */}
          {description}
        </p>
        <p className="text-xl sm:text-2xl font-extrabold text-orange-500 mb-4">
          ¥{price.toLocaleString()}
        </p>

        <CharacterButton
          onClick={handleAddToCartClick}
          className="w-full text-sm sm:text-base py-2 sm:py-3" // Example of passing className, CharacterButton needs to support it
          aria-label={`Add ${name} to order`}
        >
          <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Add to Order
        </CharacterButton>
      </div>

      <AnimatePresence>
        {showAddedToCartAnim && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-xl z-20 p-4"
            variants={addToCartOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.span
              className="text-5xl sm:text-6xl mb-2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0, transition: { delay: 0.1, type: 'spring', stiffness: 260, damping: 10 } }}
            >
              👍
            </motion.span>
            <motion.div
              initial={{ opacity:0, y: 20 }}
              animate={{ opacity:1, y: 0, transition: { delay: 0.2, duration: 0.3 } }}
              className="flex items-center text-white text-base sm:text-lg font-semibold"
            >
              <Zap className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" /> Added!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedMenuItem;
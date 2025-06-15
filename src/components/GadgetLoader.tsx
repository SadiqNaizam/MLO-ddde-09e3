import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wind } from 'lucide-react'; // Using Zap for gadget, Wind for flying

interface GadgetLoaderProps {
  loadingText?: string;
  fullscreen?: boolean; // Optional prop to make it cover the whole screen
}

const GadgetLoader: React.FC<GadgetLoaderProps> = ({
  loadingText = "Loading your adventure...",
  fullscreen = true,
}) => {
  console.log('GadgetLoader loaded');

  // Variants for the flying Doraemon-like element
  const flyingElementVariants = {
    hidden: { x: "-100vw", opacity: 0, rotate: -15 },
    visible: {
      x: "100vw",
      opacity: [0.5, 1, 1, 0.5],
      rotate: 15,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "linear",
        },
        opacity: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.2, 0.8, 1],
        },
        rotate: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1.5,
          ease: "easeInOut",
        }
      },
    },
  };

  // Variants for gadget activation effect (e.g., pulsing light)
  const gadgetActivationVariants = {
    initial: { scale: 0.8, opacity: 0.7 },
    animate: {
      scale: [1, 1.2, 1, 1.2, 1],
      opacity: [0.7, 1, 0.7, 1, 0.7],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const loaderContainerClasses = fullscreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-100 bg-opacity-90 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-8 bg-sky-100 rounded-lg shadow-xl";

  return (
    <div className={loaderContainerClasses}>
      <div className="relative w-full h-32 overflow-hidden mb-6">
        {/* Doraemon flying element */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          variants={flyingElementVariants}
          initial="hidden"
          animate="visible"
          style={{ left: '-50px' }} // Start off-screen
        >
          <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg">
            <Wind className="w-8 h-8 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Gadget activation element */}
      <motion.div
        className="p-3 bg-yellow-400 rounded-full shadow-md mb-4"
        variants={gadgetActivationVariants}
        initial="initial"
        animate="animate"
      >
        <Zap size={40} className="text-white" />
      </motion.div>

      {loadingText && (
        <p className="text-lg font-semibold text-blue-700 animate-pulse">
          {loadingText}
        </p>
      )}
      <p className="text-sm text-gray-600 mt-2">Please wait a moment...</p>
    </div>
  );
};

export default GadgetLoader;
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import clsx from 'clsx';

interface CharacterButtonProps extends Omit<MotionProps, 'onClick'> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  variant?: 'bell' | 'anywhere-door' | 'time-kerchief' | 'default';
  className?: string;
  disabled?: boolean;
  title?: string; // For accessibility
  type?: 'button' | 'submit' | 'reset';
}

const CharacterButton: React.FC<CharacterButtonProps> = ({
  onClick,
  children,
  variant = 'bell',
  className,
  disabled = false,
  title,
  type = 'button',
  ...rest
}) => {
  console.log('CharacterButton loaded, variant:', variant);

  const commonButtonClasses = clsx(
    'flex items-center justify-center font-medium rounded-lg shadow-md transition-all duration-150 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg',
    className // Allow external override of base styles or adding new ones
  );

  const animationProps = {
    whileHover: disabled ? {} : { scale: 1.05, y: -2 },
    whileTap: disabled ? {} : { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };

  if (variant === 'bell') {
    return (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        title={title || 'Doraemon Bell Button'}
        className={clsx(
          commonButtonClasses,
          'relative bg-yellow-400 text-black', // Bell color, text color
          'w-16 h-16 p-2 rounded-full', // Bell shape and default size
          disabled ? '' : 'hover:bg-yellow-500',
          'focus:ring-blue-500' // Doraemon's primary color for focus ring
        )}
        {...animationProps}
        {...rest}
      >
        {/* Bell decorations */}
        {/* Upper band line */}
        <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 w-[70%] h-1.5 bg-black rounded-sm" />
        {/* Lower band line (optional, can be single thick band) */}
        <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 w-[70%] h-1 bg-gray-800 rounded-sm" />
        {/* "Clapper" dot */}
        <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full" />
        
        {/* Yellow circle inside the "ringer" outline */}
        <div className="absolute bottom-[24%] left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 border-2 border-black rounded-full" />
        <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full" />


        {children && (
          <span className={clsx(
            "relative z-10 text-xs leading-none text-center",
            // If children are text, ensure it's visible.
            // If children are an icon, this might need adjustment or children are not used.
          )}>
            {children}
          </span>
        )}
      </motion.button>
    );
  }

  // Fallback for 'anywhere-door', 'time-kerchief', or 'default' variants
  // This provides a generic animated button that can be styled further via `className`
  // or extended with more specific variant styles later.
  let variantClasses = 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400'; // Default theme
  if (variant === 'anywhere-door') {
    // Example: Pink for Anywhere Door
    variantClasses = 'bg-pink-500 hover:bg-pink-600 text-white focus:ring-pink-400 px-6 py-3';
    // Potentially add an icon or specific shape if desired
  } else if (variant === 'time-kerchief') {
    // Example: Red/pattern for Time Kerchief
    variantClasses = 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 px-6 py-3';
  } else { // 'default' variant
     variantClasses = 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 px-4 py-2';
  }


  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={clsx(commonButtonClasses, variantClasses, 'px-4 py-2 text-sm md:text-base')}
      {...animationProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default CharacterButton;
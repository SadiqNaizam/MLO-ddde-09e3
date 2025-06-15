import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import DoraemonHeader from '@/components/layout/DoraemonHeader';
import DoraemonFooter from '@/components/layout/DoraemonFooter';
import GadgetLoader from '@/components/GadgetLoader';
import CharacterButton from '@/components/CharacterButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Package, Clock } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('OrderConfirmationPage loaded');
    // Simulate a short delay for the confirmation "processing" or animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loader for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const placeholderOrder = {
    id: `DORA${Math.floor(Math.random() * 90000) + 10000}`,
    items: [
      { name: "Memory Bread Slice", quantity: 2, price: 300 },
      { name: "Dorayaki Special Pack", quantity: 1, price: 500 },
    ],
    total: 1100, // (2*300) + 500
    estimatedDelivery: "30-45 minutes",
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 font-sans">
      <DoraemonHeader cartItemCount={0} /> {/* Assuming cart is empty after order */}

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {isLoading ? (
          <GadgetLoader loadingText="Confirming your magical order..." fullscreen={false} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <Card className="w-full shadow-xl rounded-2xl border-4 border-yellow-400 bg-white p-4 sm:p-8 overflow-hidden">
              <CardHeader className="text-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1, transition: { delay: 0.1, type: 'spring', stiffness: 260, damping: 15 } }}
                >
                  <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-4" />
                </motion.div>
                <CardTitle className="text-2xl sm:text-4xl font-bold text-blue-600 tracking-tight">
                  Order Confirmed!
                </CardTitle>
                <p className="text-md sm:text-lg text-gray-700 mt-2">
                  Your delicious adventure is on its way!
                </p>
              </CardHeader>
              <CardContent className="space-y-6 mt-4">
                <div className="text-center">
                  <motion.img 
                    src="https://placehold.co/450x250/E0F7FA/0284C7?text=Doraemon+%26+Friends+Say+Arigato!" 
                    alt="Doraemon and friends celebrating your order" 
                    className="mx-auto rounded-lg shadow-md mb-6 border border-blue-200"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg shadow-inner border border-blue-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2 flex items-center">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500 flex-shrink-0" />
                    Order Summary
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700"><strong>Order ID:</strong> {placeholderOrder.id}</p>
                  <ul className="list-disc list-inside ml-1 text-sm sm:text-base text-gray-600">
                    {placeholderOrder.items.map(item => (
                      <li key={item.name}>{item.name} (x{item.quantity})</li>
                    ))}
                  </ul>
                  <p className="text-sm sm:text-base text-gray-700 mt-1"><strong>Total:</strong> ¥{placeholderOrder.total.toLocaleString()}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg shadow-inner border border-green-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 flex items-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-500 flex-shrink-0" />
                    Estimated Arrival
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    Your order will arrive in approximately <strong>{placeholderOrder.estimatedDelivery}</strong>.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Get ready for a magical meal!</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 justify-center">
                  <CharacterButton
                    variant="anywhere-door"
                    className="w-full sm:w-auto text-sm py-2.5 px-5 sm:text-base sm:py-3 sm:px-6"
                    asChild
                  >
                    <Link to="/menu" className="flex items-center justify-center w-full h-full">
                      {/* Icon can be part of CharacterButton or added here if needed */}
                      Order More Magic (Menu)
                    </Link>
                  </CharacterButton>
                  <CharacterButton
                    variant="default" // Or a specific variant like 'time-kerchief' if styled
                    className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black text-sm py-2.5 px-5 sm:text-base sm:py-3 sm:px-6"
                    asChild
                  >
                     <Link to="/user-profile" className="flex items-center justify-center w-full h-full">
                      View Order History
                    </Link>
                  </CharacterButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      <DoraemonFooter />
    </div>
  );
};

export default OrderConfirmationPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner'; // For "Added to cart" notifications

// Custom Components
import DoraemonHeader from '@/components/layout/DoraemonHeader';
import GadgetLoader from '@/components/GadgetLoader';
import AnimatedMenuItem from '@/components/AnimatedMenuItem';
import CharacterButton from '@/components/CharacterButton';
import DoraemonFooter from '@/components/layout/DoraemonFooter';

// Shadcn/ui Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'; // For a generic button if needed

// Icons (example, not directly used in this page structure but good to have in mind)
import { Zap, UtensilsCrossed } from 'lucide-react';

// Placeholder data for menu items
const featuredItems = [
  {
    id: '1',
    name: 'Dorayaki Delight',
    price: 350,
    description: 'Doraemon\'s favorite! Fluffy pancakes filled with sweet red bean paste. A classic treat!',
    imageUrl: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Dorayaki&font=Pacifico', // Doraemon blue bg
  },
  {
    id: '2',
    name: 'Memory Bread Toast',
    price: 450,
    description: 'Magically delicious toast that helps you remember everything! (Disclaimer: Magic not included).',
    imageUrl: 'https://placehold.co/600x400/FBBF24/333333?text=Memory+Bread&font=Caveat', // Yellow, like bread
  },
  {
    id: '3',
    name: 'Anywhere Door Pizza Pocket',
    price: 600,
    description: 'A savory pizza filling inside a convenient pocket, ready to take you on a flavor journey!',
    imageUrl: 'https://placehold.co/600x400/EC4899/FFFFFF?text=Pizza+Pocket&font=Kalam', // Pink for Anywhere Door
  },
  {
    id: '4',
    name: 'Time Kerchief Pasta',
    price: 700,
    description: 'A timeless pasta dish that will make you feel young again with every bite.',
    imageUrl: 'https://placehold.co/600x400/EF4444/FFFFFF?text=Pasta&font=Comic+Neue' // Red for Time Kerchief
  }
];

const Homepage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0); // Example cart count

  useEffect(() => {
    console.log('Homepage mounted');
    // Simulate loading time for GadgetLoader
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('Homepage loading complete');
    }, 2500); // Show loader for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (itemId: string) => {
    const item = featuredItems.find(i => i.id === itemId);
    console.log(`Adding item ${itemId} (${item?.name}) to cart.`);
    setCartItemCount(prevCount => prevCount + 1);
    toast.success(`${item?.name || 'Item'} added to your order!`, {
      description: "Check your cart to proceed.",
      icon: <Zap className="w-4 h-4" />,
    });
  };

  if (isLoading) {
    return <GadgetLoader loadingText="Warming up the Time Machine..." fullscreen={true} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <DoraemonHeader cartItemCount={cartItemCount} />

      <main className="flex-grow">
        {/* Hero Section - Immersion */}
        <section
          className="relative py-20 sm:py-32 bg-gradient-to-br from-blue-400 via-sky-300 to-yellow-200 text-center text-white"
          style={{
            backgroundImage: "url('https://placehold.co/1920x1080/87CEEB/FFFFFF/png?text=Doraemon%27s+Sky&font=Pacifico')", // Placeholder sky background
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Overlay for text readability */}
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-shadow-lg" // text-shadow-lg is a custom class you might need to define
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Welcome to Doraemon's Restaurant!
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-8 text-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Your magical food adventure begins here. Explore our delightful menu!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 150 }}
            >
              <CharacterButton
                variant="bell" // Use 'bell' or other thematic variant
                onClick={() => document.getElementById('featured-items')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg" // Adjust size if needed
                title="Explore Featured Dishes"
              >
                Explore Treats!
              </CharacterButton>
            </motion.div>
          </div>
        </section>

        {/* Featured Items Carousel Section */}
        <section id="featured-items" className="py-12 sm:py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-4 flex items-center justify-center">
              <UtensilsCrossed className="w-8 h-8 mr-3 text-red-500" />
              Today's Magical Munchies
            </h2>
            <p className="text-center text-gray-600 mb-10 text-lg">
              Handpicked by Doraemon and friends, just for you!
            </p>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
            >
              <CarouselContent className="-ml-4">
                {featuredItems.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3 flex justify-center">
                    <div className="p-1 w-full"> {/* Ensures AnimatedMenuItem takes full width of item */}
                      <AnimatedMenuItem
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-2 sm:ml-0 text-blue-600 border-blue-600 hover:bg-blue-100 disabled:bg-gray-200" />
              <CarouselNext className="mr-2 sm:mr-0 text-blue-600 border-blue-600 hover:bg-blue-100 disabled:bg-gray-200" />
            </Carousel>
          </div>
        </section>

        {/* Call to Action / Full Menu Section */}
        <section className="py-12 sm:py-16 bg-sky-100">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-2xl mx-auto shadow-xl bg-white p-6 sm:p-8 rounded-xl border-2 border-yellow-400">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-pink-600 mb-3">
                  Ready for More Adventures?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 text-md sm:text-lg">
                  Our full menu is packed with even more enchanting dishes and magical gadgets.
                  Open the 'Anywhere Door' to a world of flavors!
                </p>
                <Link to="/menu"> {/* Path from App.tsx */}
                  <CharacterButton
                    variant="anywhere-door" // Themed button
                    className="px-8 py-3 text-base sm:text-lg"
                    title="View Full Menu"
                  >
                    View Full Menu
                  </CharacterButton>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      <DoraemonFooter />
    </div>
  );
};

export default Homepage;

// Minimal CSS for text-shadow if not available via Tailwind utility out of the box
// This would typically go into your global CSS file (e.g., src/index.css)
/*
.text-shadow {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}
.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
*/
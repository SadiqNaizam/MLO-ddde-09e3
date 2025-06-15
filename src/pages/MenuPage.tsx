import React, { useState, useEffect } from 'react';
import DoraemonHeader from '@/components/layout/DoraemonHeader';
import GadgetLoader from '@/components/GadgetLoader';
import AnimatedMenuItem from '@/components/AnimatedMenuItem';
import DoraemonFooter from '@/components/layout/DoraemonFooter';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'; // TabsContent not strictly needed with current filter logic
import { Search, Utensils, IceCream, Coffee, Pizza, Sparkles as SpecialsIcon } from 'lucide-react';
import { toast } from "sonner";
import { ShoppingCart } from 'lucide-react'; // For toast icon

// Define MenuItem interface, based on AnimatedMenuItemProps and with category
interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

// Placeholder menu items data
const allMenuItemsData: MenuItem[] = [
  { id: '1', name: 'Memory Bread Slices', price: 500, description: 'Toasted slices that help you remember anything! Perfect for exam days.', imageUrl: 'https://placehold.co/300x200/FFDD57/3B3B3B?text=Memory+Bread', category: 'Specials' },
  { id: '2', name: 'Giant Dorayaki Stack', price: 750, description: 'A tall stack of Doraemon\'s favorite sweet pancakes, filled with rich red bean paste.', imageUrl: 'https://placehold.co/300x200/D2691E/FFFFFF?text=Dorayaki+Stack', category: 'Desserts' },
  { id: '3', name: 'Anywhere Door Pepperoni Pizza', price: 1200, description: 'A classic pepperoni pizza that can transport your taste buds to Italy!', imageUrl: 'https://placehold.co/300x200/FF6347/FFFFFF?text=Door+Pizza', category: 'Main Courses' },
  { id: '4', name: 'Time Kerchief Carbonara', price: 950, description: 'Creamy carbonara pasta, aged to perfection with the Time Kerchief.', imageUrl: 'https://placehold.co/300x200/FFFACD/8B4513?text=Time+Pasta', category: 'Main Courses' },
  { id: '5', name: 'Small Light Latte', price: 400, description: 'A perfectly sized, energizing latte. Makes your tasks feel smaller!', imageUrl: 'https://placehold.co/300x200/A52A2A/FFFFFF?text=Small+Latte', category: 'Drinks' },
  { id: '6', name: 'Big Light Lemonade', price: 350, description: 'An enlarging experience with this zesty and refreshing lemonade!', imageUrl: 'https://placehold.co/300x200/FFFF00/000000?text=Big+Lemonade', category: 'Drinks' },
  { id: '7', name: 'Translation Jelly Parfait', price: 650, description: 'Layers of fruit, cream, and special jelly. Understand the universal language of deliciousness.', imageUrl: 'https://placehold.co/300x200/FFC0CB/3B3B3B?text=Jelly+Parfait', category: 'Desserts' },
  { id: '8', name: 'Take-copter Tacos (Set of 3)', price: 800, description: 'Fly high with flavor! Three delicious tacos with your choice of filling.', imageUrl: 'https://placehold.co/300x200/FFA500/000000?text=Copter+Tacos', category: 'Specials' },
  { id: '9', name: 'Gourmet Robot Cookie Platter', price: 600, description: 'Assorted cookies shaped like friendly robots, baked by our best chefs.', imageUrl: 'https://placehold.co/300x200/87CEEB/000000?text=Robot+Cookies', category: 'Desserts' },
  { id: '10', name: 'Dress-Up Camera Cappuccino', price: 450, description: 'A creamy cappuccino with fun cocoa art that changes with your mood!', imageUrl: 'https://placehold.co/300x200/D2B48C/3B3B3B?text=Camera+Coffee', category: 'Drinks' },
];

// Define categories with appropriate icons
const categoriesData = [
  { value: 'All', label: 'All Items', icon: <Utensils className="w-4 h-4 mr-1 sm:mr-2" /> },
  { value: 'Specials', label: 'Gadget Specials', icon: <SpecialsIcon className="w-4 h-4 mr-1 sm:mr-2" /> },
  { value: 'Main Courses', label: 'Main Adventures', icon: <Pizza className="w-4 h-4 mr-1 sm:mr-2" /> },
  { value: 'Desserts', label: 'Sweet Inventions', icon: <IceCream className="w-4 h-4 mr-1 sm:mr-2" /> },
  { value: 'Drinks', label: 'Potion Drinks', icon: <Coffee className="w-4 h-4 mr-1 sm:mr-2" /> },
];

const MenuPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMenuItems, setCurrentMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItemCount, setCartItemCount] = useState(0); // Local example for header badge

  useEffect(() => {
    console.log('MenuPage loaded');
    // Simulate fetching menu items
    setTimeout(() => {
      setCurrentMenuItems(allMenuItemsData);
      setIsLoading(false);
    }, 1200); // Corresponds to GadgetLoader display time
  }, []);

  // Memoize or move to useEffect if performance becomes an issue with very large lists
  const filteredAndSearchedItems = currentMenuItems
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAddToCart = (itemId: string) => {
    const item = allMenuItemsData.find(i => i.id === itemId);
    if (item) {
      console.log(`Added ${item.name} to cart (ID: ${itemId})`);
      toast.success(`${item.name} added to your adventure bag!`, {
        description: "Doraemon gives a thumbs-up! 🎉",
        icon: <ShoppingCart className="w-5 h-5 text-green-500" />,
      });
      setCartItemCount(prevCount => prevCount + 1); // Update local count for header
      // In a real application, this would typically dispatch an action to a global state manager.
    }
  };

  if (isLoading) {
    return <GadgetLoader loadingText="Unpacking Doraemon's 4D Pocket Menu..." fullscreen={true} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 selection:bg-yellow-400 selection:text-blue-800">
      <DoraemonHeader cartItemCount={cartItemCount} />

      <main className="flex-grow container mx-auto px-2 sm:px-4 lg:px-6 py-6 sm:py-8">
        <section aria-labelledby="menu-title" className="text-center mb-8 sm:mb-10">
          <h1 id="menu-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-700 mb-2">
            Doraemon's Magical Menu
          </h1>
          <p className="text-md sm:text-lg text-gray-700">
            Explore a universe of flavors, delivered by Doraemon's amazing gadgets!
          </p>
        </section>

        {/* Search and Tabs Controls - Sticky */}
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl sticky top-[4.5rem] sm:top-[5rem] z-40 border border-blue-200">
            <div className="relative mb-4">
              <Input
                type="search"
                placeholder="Search for Memory Bread, Dorayaki..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-blue-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-full shadow-inner transition-colors duration-300 w-full"
                aria-label="Search menu items"
              />
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-5 gap-1 sm:gap-2 bg-blue-100/50 p-1 rounded-lg shadow-sm">
                {categoriesData.map(cat => (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    className="data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-800 data-[state=active]:shadow-lg data-[state=active]:font-semibold text-blue-600 hover:bg-blue-200/70 transition-all duration-200 ease-in-out rounded-md py-2 px-1.5 sm:px-3 flex items-center justify-center text-xs sm:text-sm"
                  >
                    {cat.icon} <span className="ml-1 truncate">{cat.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
        </div>

        {/* Menu Items Grid */}
        <section aria-live="polite" aria-atomic="true">
          {filteredAndSearchedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredAndSearchedItems.map(item => (
                <AnimatedMenuItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-16 bg-white/60 rounded-lg shadow-md mt-4 border border-blue-200">
              <img src="https://placehold.co/120x120/E0E0E0/757575?text=Doraemon+Thinking..." alt="Doraemon looking puzzled" className="mx-auto mb-4 rounded-full opacity-80 shadow-sm" />
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">No Magical Dishes Found!</h2>
              <p className="text-gray-600 px-4">
                Doraemon seems to be searching his 4D pocket... <br/> Try a different category or search term for your delicious adventure!
              </p>
            </div>
          )}
        </section>
      </main>

      <DoraemonFooter />
    </div>
  );
};

export default MenuPage;
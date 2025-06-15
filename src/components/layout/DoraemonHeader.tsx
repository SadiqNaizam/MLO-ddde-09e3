import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, UserCircle, Home as HomeIcon, LogIn, DoorOpen, Menu as MenuIconLucide } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CharacterButton from '@/components/CharacterButton'; // Assumed to exist at src/components/CharacterButton.tsx

interface DoraemonHeaderProps {
  cartItemCount?: number;
}

const DoraemonHeader: React.FC<DoraemonHeaderProps> = ({ cartItemCount = 0 }) => {
  console.log('DoraemonHeader loaded. Cart items:', cartItemCount);

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50 print:hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-bold flex items-center group" aria-label="Doraemon Eats Homepage">
          {/* In a real app, this could be an <img /> tag with an SVG logo */}
          <span className="tracking-tight text-white group-hover:text-yellow-300 transition-colors duration-300">
            Doraemon Eats
          </span>
        </Link>

        {/* Navigation Links - hidden on small screens, shown on medium screens and up */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <Button variant="ghost" asChild>
            <Link 
              to="/" 
              className="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-300 rounded-md"
            >
              <HomeIcon className="mr-1.5 h-5 w-5" /> Home
            </Link>
          </Button>
          
          {/* Menu link using CharacterButton as per user journey */}
          {/* Assumes CharacterButton supports 'asChild' for Link integration and can be styled as 'Anywhere Door' */}
          <CharacterButton asChild>
            <Link 
              to="/menu" 
              className="flex items-center px-3 py-2 text-sm font-medium text-white hover:text-yellow-300 transition-colors duration-300 rounded-md"
              // CharacterButton would provide its unique styling. Classes here are for text and layout within the button.
            >
              <DoorOpen className="mr-1.5 h-5 w-5" /> {/* Icon representing 'Anywhere Door' */}
              Menu
            </Link>
          </CharacterButton>
        </nav>

        {/* Right-side Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link 
              to="/cart" 
              aria-label={`Shopping cart with ${cartItemCount} items`}
              className="relative text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-300 rounded-full p-2"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 min-w-[1rem] sm:h-5 sm:min-w-[1.25rem] px-1 flex items-center justify-center text-xs bg-red-600 text-white rounded-full shadow-md"
                >
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link 
              to="/user-profile" 
              aria-label="User Profile"
              className="text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-300 rounded-full p-2"
            >
              <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">User Profile</span>
            </Link>
          </Button>
          
          <div className="hidden sm:flex"> {/* Hide Login button on very small screens if space is tight, show on sm+ */}
            <Button 
              variant="outline" 
              asChild 
              className="border-white text-white hover:bg-white hover:text-blue-700 transition-colors duration-300 text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-1.5 rounded-md"
            >
              <Link to="/authentication" className="flex items-center">
                <LogIn className="mr-1 h-4 w-4 sm:mr-1.5" /> Login
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Toggle Button (visible on small screens, md:hidden) */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700 hover:text-yellow-300">
              {/* This button would typically open a drawer or dropdown menu. Functionality not implemented here. */}
              <MenuIconLucide className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DoraemonHeader;
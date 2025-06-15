import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import DoraemonHeader from '@/components/layout/DoraemonHeader';
import DoraemonFooter from '@/components/layout/DoraemonFooter';
import GadgetLoader from '@/components/GadgetLoader';
import CharacterButton from '@/components/CharacterButton';

// shadcn/ui Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // Using buttons for quantity instead

// lucide-react Icons
import { Trash2, Plus, Minus, ShoppingCart as ShoppingCartIcon, Package, Percent, CircleDollarSign } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  character?: string; // Optional: for thematic elements
}

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'item1', name: 'Memory Bread Slice', price: 800, quantity: 1, imageUrl: 'https://placehold.co/80x80/FFFACD/4A90E2?text=🍞', character: 'Doraemon' },
    { id: 'item2', name: 'Giant Dorayaki', price: 550, quantity: 2, imageUrl: 'https://placehold.co/80x80/FFDAB9/C71585?text=🥞', character: 'Dorami' },
    { id: 'item3', name: 'Anywhere Door Juice', price: 350, quantity: 1, imageUrl: 'https://placehold.co/80x80/ADD8E6/FF4500?text=🚪🍹', character: 'Nobita' },
  ]);

  const [isLoading, setIsLoading] = useState(true); // Simulate initial loading

  useEffect(() => {
    // Simulate fetching cart data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show loader for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Minimum quantity is 1
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId:string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const taxRate = 0.10; // 10% tax
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;
  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return <GadgetLoader loadingText="Fetching your magical goodies..." fullscreen={true} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-blue-50 to-yellow-50 font-sans"> {/* Doraemon-themed background */}
      <DoraemonHeader cartItemCount={totalItemsInCart} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-700 flex items-center justify-center">
            <ShoppingCartIcon className="mr-3 h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
            Your Magical Cart {/* Use a custom Doraemon-like font class here if available e.g., "DoraemonFont" */}
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Review your items and prepare for a delicious adventure!</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <img src="https://placehold.co/200x200/FAFAD2/4A90E2?text=텅텅!" alt="Empty Cart - Doraemon Sad" className="mx-auto mb-6 rounded-full shadow-lg" />
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Oh no! Your cart is empty!</h2>
            <p className="text-gray-500 mb-8">Looks like Doraemon's pocket is empty for now. Let's fill it up!</p>
            <CharacterButton
              variant="anywhere-door"
              onClick={() => navigate('/menu')}
              className="px-8 py-3 text-lg"
            >
              Explore Menu
            </CharacterButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items Table */}
            <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-2 border-yellow-400 hover:shadow-2xl transition-shadow duration-300">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-blue-200">
                    <TableHead className="w-[80px] sm:w-[100px] text-blue-700 font-semibold">Item</TableHead>
                    <TableHead className="text-blue-700 font-semibold">Product</TableHead>
                    <TableHead className="text-right text-blue-700 font-semibold">Price</TableHead>
                    <TableHead className="text-center w-32 sm:w-36 text-blue-700 font-semibold">Quantity</TableHead>
                    <TableHead className="text-right text-blue-700 font-semibold">Total</TableHead>
                    <TableHead className="text-center text-blue-700 font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id} className="border-b border-sky-100 hover:bg-sky-50 transition-colors">
                      <TableCell>
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md bg-gray-100 p-1" />
                      </TableCell>
                      <TableCell className="font-medium text-gray-800">{item.name}</TableCell>
                      <TableCell className="text-right text-gray-700">¥{item.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                          <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 border-blue-300 text-blue-500 hover:bg-blue-100" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium text-gray-700 text-sm sm:text-base">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 border-blue-300 text-blue-500 hover:bg-blue-100" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-800">¥{(item.price * item.quantity).toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100" onClick={() => handleRemoveItem(item.id)} title={`Remove ${item.name}`}>
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-4 sticky top-24"> {/* Sticky summary for long carts */}
              <Card className="shadow-xl border-2 border-blue-500 bg-gradient-to-br from-blue-100 via-yellow-50 to-pink-50 rounded-2xl p-2 sm:p-4">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl text-blue-700 font-bold flex items-center">
                     {/* Use a custom Doraemon-like font class here if available */}
                    <img src="https://placehold.co/40x40/FFDD57/333?text=🔔" alt="Doraemon Bell" className="mr-2" /> {/* Bell Icon */}
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="flex items-center"><Package className="mr-2 h-5 w-5 text-blue-500" />Subtotal:</span>
                    <span className="font-medium">¥{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="flex items-center"><Percent className="mr-2 h-5 w-5 text-green-500" />Tax ({(taxRate * 100).toFixed(0)}%):</span>
                    <span className="font-medium">¥{taxAmount.toLocaleString()}</span>
                  </div>
                  <hr className="my-2 border-blue-200"/>
                  <div className="flex justify-between items-center text-xl font-bold text-blue-800">
                    <span className="flex items-center"><CircleDollarSign className="mr-2 h-6 w-6 text-yellow-500" />Total:</span>
                    <span>¥{totalAmount.toLocaleString()}</span>
                  </div>
                  
                  <CharacterButton
                    variant="bell" // Or 'default' with custom styling
                    onClick={() => navigate('/checkout')}
                    className="w-full mt-6 py-3 text-base sm:text-lg" // Ensure CharacterButton supports className prop effectively
                    title="Proceed to Checkout"
                  >
                    Proceed to Checkout
                  </CharacterButton>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/menu')}
                    className="w-full mt-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <DoraemonFooter />
    </div>
  );
};

export default CartPage;
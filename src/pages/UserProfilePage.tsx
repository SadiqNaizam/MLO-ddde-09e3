import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import DoraemonHeader from '@/components/layout/DoraemonHeader';
import DoraemonFooter from '@/components/layout/DoraemonFooter';
import GadgetLoader from '@/components/GadgetLoader';

// Shadcn/ui Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Lucide Icons
import { Save, Search, UserCircle as UserIcon, ShoppingBag, MapPin } from 'lucide-react';

// Placeholder data for order history
const sampleOrders = [
  { id: 'GADGET-001', date: '2024-07-20', items: 'Memory Bread, Small Light', total: 3500, status: 'Delivered' as 'Delivered' | 'Processing' | 'Shipped' },
  { id: 'GADGET-002', date: '2024-07-25', items: 'Anywhere Door Rental (1hr)', total: 5000, status: 'Processing' as 'Delivered' | 'Processing' | 'Shipped' },
  { id: 'GADGET-003', date: '2024-07-28', items: 'Dorayaki Pack (x5)', total: 1200, status: 'Shipped' as 'Delivered' | 'Processing' | 'Shipped' },
];

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage component function called');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for profile data
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('UserProfilePage content loaded');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <GadgetLoader loadingText="Summoning your Profile Portal..." fullscreen={true} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 font-sans">
      <DoraemonHeader cartItemCount={3} /> {/* Example cart item count */}

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-blue-600 mb-8 text-center tracking-tight"
        >
          Doraemon's User Portal
        </motion.h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-blue-100 p-1.5 rounded-lg mb-6 shadow-inner">
            <TabsTrigger value="profile" className="py-2.5 text-sm sm:text-base data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700 data-[state=active]:shadow-md rounded-md transition-all duration-200 ease-in-out flex items-center justify-center space-x-2">
              <UserIcon className="h-5 w-5" />
              <span>My Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="py-2.5 text-sm sm:text-base data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700 data-[state=active]:shadow-md rounded-md transition-all duration-200 ease-in-out flex items-center justify-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Order History</span>
            </TabsTrigger>
            <TabsTrigger value="track" className="py-2.5 text-sm sm:text-base data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700 data-[state=active]:shadow-md rounded-md transition-all duration-200 ease-in-out flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Track Order</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-white shadow-xl border-2 border-blue-200 rounded-lg overflow-hidden">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle className="text-xl text-blue-700">Manage Your Information</CardTitle>
                <CardDescription className="text-blue-500">Keep your details up to date for a magical experience!</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-blue-600 font-semibold block mb-1">Full Name</Label>
                      <Input id="name" defaultValue="Nobita Nobi" placeholder="e.g., Nobita Nobi" className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-blue-600 font-semibold block mb-1">Email Address</Label>
                      <Input id="email" type="email" defaultValue="nobita@doraemon.magic" placeholder="your.email@example.com" className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-blue-600 font-semibold block mb-1">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="080-1234-5678" placeholder="Your phone number" className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500" />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-blue-600 font-semibold block mb-1">Saved Address</Label>
                    <Textarea id="address" defaultValue="123 Anywhere Door Lane, Future Tokyo, Japan" placeholder="Your primary delivery address" className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500 min-h-[100px]" />
                  </div>
                  <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-blue-700 font-bold py-2.5 px-6 rounded-md transition-colors duration-200">
                    <Save className="mr-2 h-5 w-5" /> Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-white shadow-xl border-2 border-blue-200 rounded-lg overflow-hidden">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle className="text-xl text-blue-700">Your Past Adventures (Orders)</CardTitle>
                <CardDescription className="text-blue-500">Relive your delicious journeys!</CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-2 md:p-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-100 hover:bg-blue-100">
                        <TableHead className="text-blue-700 font-semibold">Order ID</TableHead>
                        <TableHead className="text-blue-700 font-semibold">Date</TableHead>
                        <TableHead className="text-blue-700 font-semibold">Items</TableHead>
                        <TableHead className="text-right text-blue-700 font-semibold">Total</TableHead>
                        <TableHead className="text-center text-blue-700 font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleOrders.length > 0 ? sampleOrders.map(order => (
                        <TableRow key={order.id} className="hover:bg-yellow-50 transition-colors duration-150">
                          <TableCell className="font-medium text-gray-800">{order.id}</TableCell>
                          <TableCell className="text-gray-600">{order.date}</TableCell>
                          <TableCell className="text-gray-600">{order.items}</TableCell>
                          <TableCell className="text-right text-gray-800 font-medium">¥{order.total.toLocaleString()}</TableCell>
                          <TableCell className="text-center">
                            <Badge 
                              variant={
                                order.status === 'Delivered' ? 'default' : 
                                order.status === 'Processing' ? 'secondary' : 
                                'outline' // For 'Shipped'
                              }
                              className={
                                order.status === 'Delivered' ? 'bg-green-500 text-white' :
                                order.status === 'Processing' ? 'bg-orange-400 text-white' :
                                order.status === 'Shipped' ? 'border-blue-500 text-blue-600' : ''
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-500 py-10">
                            No past orders found. <Link to="/menu" className="text-blue-500 hover:underline font-semibold">Time for a new adventure!</Link>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track">
            <Card className="bg-white shadow-xl border-2 border-blue-200 rounded-lg overflow-hidden">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle className="text-xl text-blue-700">Track Your Current Gadget... I mean, Order!</CardTitle>
                <CardDescription className="text-blue-500">See where your delicious package is with the Time TV!</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Input type="text" placeholder="Enter Order ID (e.g., GADGET-002)" className="flex-grow border-blue-300 focus:border-yellow-500 focus:ring-yellow-500" />
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-6 rounded-md transition-colors duration-200">
                    <Search className="mr-2 h-5 w-5" /> Track Order
                  </Button>
                </div>
                <div className="mt-4 p-6 bg-blue-50 rounded-md border border-blue-200 min-h-[100px] flex items-center justify-center">
                  <p className="text-gray-600 text-center">
                    Enter your order ID above to see its current status.
                    <br />
                    (Psst... Doraemon is using his fastest gadget to deliver it!)
                  </p>
                  {/* Example tracking result (dynamic content) */}
                  {/* <p className="text-green-600 font-semibold">Status for GADGET-002: <strong>Processing in the 22nd Century Kitchen!</strong> Estimated arrival: Tomorrow!</p> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <DoraemonFooter />
    </div>
  );
};

// Adding motion import for page title animation
// It's good practice to ensure all used libraries are imported.
// Framer-motion should be imported if 'motion.h1' is used.
import { motion } from 'framer-motion';

export default UserProfilePage;
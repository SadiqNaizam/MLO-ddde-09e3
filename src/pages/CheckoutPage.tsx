import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Custom Components
import DoraemonHeader from '@/components/layout/DoraemonHeader';
import DoraemonFooter from '@/components/layout/DoraemonFooter';
import CharacterButton from '@/components/CharacterButton';
import GadgetLoader from '@/components/GadgetLoader';

// Shadcn/UI Components
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label }_from "@/components/ui/label"; // Note: Shadcn Label is imported, but FormLabel is typically used within FormItem.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast"; // For form submission feedback

// Lucide Icons
import { User, Home as HomeIcon, MapPin, Landmark, Mail, Phone, CreditCard, CalendarDays, ShieldCheck, CircleDollarSign, VenetianMask, ShoppingBag } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Doraemon needs your full name (at least 2 characters)!" }),
  address1: z.string().min(5, { message: "Where should the Time Machine land? (Address line 1 required)" }),
  address2: z.string().optional(),
  city: z.string().min(2, { message: "Which city in the future (or past)? (City required)" }),
  postalCode: z.string().min(3, { message: "A postal code helps the Anywhere Door!" }),
  country: z.string().min(2, { message: "Please select a country." }),
  phone: z.string().min(7, { message: "A contact number, in case Nobita gets lost." }).regex(/^\+?[0-9\s-()]{7,}$/, { message: "That phone number looks a bit futuristic (or ancient!)." }),
  
  paymentMethod: z.enum(["creditCard", "paypal", "doraPay"], {
    required_error: "Choose a gadget (payment method) to complete your order!",
  }),
  
  ccNumber: z.string().optional(),
  ccExpiry: z.string().optional(),
  ccCvv: z.string().optional(),
  ccName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "creditCard") {
    if (!data.ccNumber || !/^\d{13,19}$/.test(data.ccNumber.replace(/\s/g, ''))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "This credit card number seems to be from another dimension!", path: ["ccNumber"] });
    }
    if (!data.ccExpiry || !/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(data.ccExpiry)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Expiry date (MM/YY) incorrect. Is your Time Kerchief working?", path: ["ccExpiry"] });
    }
    if (!data.ccCvv || !/^\d{3,4}$/.test(data.ccCvv)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CVV not quite right. Check the back of the card!", path: ["ccCvv"] });
    }
    if (!data.ccName || data.ccName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Whose name is on this magical card?", path: ["ccName"] });
    }
  }
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address1: "",
      address2: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      paymentMethod: undefined,
      ccNumber: "",
      ccExpiry: "",
      ccCvv: "",
      ccName: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = async (values: CheckoutFormValues) => {
    console.log("Checkout form submitted:", values);
    setIsSubmitting(true);
    // Simulate API call with GadgetLoader
    await new Promise(resolve => setTimeout(resolve, 2500)); 
    setIsSubmitting(false);
    
    toast({
      title: "Order Placed Magically!",
      description: "Your Doraemon goodies are being prepared!",
      className: "bg-green-500 text-white", // Themed toast
    });
    navigate('/order-confirmation', { state: { orderDetails: values, totalAmount: 3500 } }); // Path from App.tsx
  };

  const dummyCartItemCount = 2; // Placeholder

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 selection:bg-yellow-300 selection:text-blue-700">
      <DoraemonHeader cartItemCount={dummyCartItemCount} />

      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 mr-3 text-red-500" />
              Checkout Your Magical Order!
            </h1>
            <p className="text-gray-600">Just a few more details and your adventure begins!</p>
          </div>

          {isSubmitting && (
            <div className="my-6">
              <GadgetLoader loadingText="Processing your order with Doraemon's help..." fullscreen={false} />
            </div>
          )}

          {!isSubmitting && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Delivery Address Section */}
                <Card className="shadow-xl border-2 border-blue-400 bg-white rounded-xl overflow-hidden">
                  <CardHeader className="bg-blue-500 text-white p-4">
                    <CardTitle className="text-2xl flex items-center"><HomeIcon className="mr-2 w-6 h-6" />Delivery Address</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-blue-700 font-semibold">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Nobita Nobi" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-blue-700 font-semibold">Address Line 1</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Dokodemo Door Way" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-blue-700 font-semibold">Address Line 2 <span className="text-gray-500 text-sm">(Optional Gadget Room)</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Apartment, suite, etc." {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700 font-semibold">City</FormLabel>
                          <FormControl>
                            <Input placeholder="Tokyo" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700 font-semibold">Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="123-4567" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-blue-700 font-semibold">Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500">
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-blue-300">
                              <SelectItem value="Japan" className="hover:bg-blue-100">Japan</SelectItem>
                              <SelectItem value="Future" className="hover:bg-blue-100">The Future</SelectItem>
                              <SelectItem value="USA" className="hover:bg-blue-100">USA</SelectItem>
                              <SelectItem value="Other" className="hover:bg-blue-100">Other Dimension</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-blue-700 font-semibold">Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+81 90-1234-5678" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Payment Method Section */}
                <Card className="shadow-xl border-2 border-yellow-500 bg-white rounded-xl overflow-hidden">
                  <CardHeader className="bg-yellow-400 text-blue-800 p-4">
                    <CardTitle className="text-2xl flex items-center"><CircleDollarSign className="mr-2 w-6 h-6" />Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-blue-700 font-semibold text-base">Choose your payment gadget:</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col sm:flex-row gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md hover:border-yellow-500 transition-all flex-1 bg-amber-50">
                                <FormControl>
                                  <RadioGroupItem value="creditCard" id="creditCard" />
                                </FormControl>
                                <Label htmlFor="creditCard" className="font-medium text-gray-700 flex items-center cursor-pointer"><CreditCard className="mr-2 h-5 w-5 text-blue-500" />Credit Card</Label>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md hover:border-yellow-500 transition-all flex-1 bg-sky-50">
                                <FormControl>
                                  <RadioGroupItem value="paypal" id="paypal" />
                                </FormControl>
                                <Label htmlFor="paypal" className="font-medium text-gray-700 flex items-center cursor-pointer"><Landmark className="mr-2 h-5 w-5 text-blue-500" />PayPal</Label>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md hover:border-yellow-500 transition-all flex-1 bg-red-50">
                                <FormControl>
                                  <RadioGroupItem value="doraPay" id="doraPay"/>
                                </FormControl>
                                <Label htmlFor="doraPay" className="font-medium text-gray-700 flex items-center cursor-pointer"><VenetianMask className="mr-2 h-5 w-5 text-red-500" />DoraPay™</Label>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentMethod === 'creditCard' && (
                      <div className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50/50">
                        <h3 className="text-lg font-semibold text-blue-600 mb-3">Credit Card Details</h3>
                        <FormField
                          control={form.control}
                          name="ccNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-700 font-semibold">Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="**** **** **** 1234" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="ccExpiry"
                            render={({ field }) => (
                              <FormItem className="sm:col-span-2">
                                <FormLabel className="text-blue-700 font-semibold">Expiry Date (MM/YY)</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM / YY" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="ccCvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-blue-700 font-semibold">CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="ccName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-700 font-semibold">Name on Card</FormLabel>
                              <FormControl>
                                <Input placeholder="Doraemon" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                     {paymentMethod === 'doraPay' && (
                        <div className="p-4 border border-red-300 rounded-lg bg-red-50 text-center">
                            <p className="text-red-700 font-semibold">DoraPay™ selected! You're using the most futuristic payment method! No further details needed, it's magic!</p>
                        </div>
                    )}
                    {paymentMethod === 'paypal' && (
                         <div className="p-4 border border-sky-300 rounded-lg bg-sky-50 text-center">
                            <p className="text-sky-700 font-semibold">You'll be redirected to PayPal to complete your purchase securely.</p>
                        </div>
                    )}
                  </CardContent>
                </Card>

                {/* Order Summary (Placeholder) */}
                <Card className="shadow-xl border-2 border-red-500 bg-white rounded-xl overflow-hidden">
                  <CardHeader className="bg-red-500 text-white p-4">
                    <CardTitle className="text-2xl flex items-center"><Package className="mr-2 w-6 h-6" />Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-2 text-gray-700">
                    <div className="flex justify-between"><span>Memory Bread (x2)</span> <span>¥2,000</span></div>
                    <div className="flex justify-between"><span>Dorayaki Box (x1)</span> <span>¥1,500</span></div>
                    <Separator className="my-3 bg-red-200" />
                    <div className="flex justify-between text-xl font-bold text-red-600">
                      <span>Total Amount:</span>
                      <span>¥3,500</span>
                    </div>
                     <p className="text-xs text-gray-500 mt-2">Includes magical delivery fee!</p>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center pt-4">
                  <CharacterButton 
                    type="submit" 
                    variant="anywhere-door" 
                    className="w-full sm:w-auto px-8 py-4 text-lg" 
                    disabled={isSubmitting || !form.formState.isValid && form.formState.isSubmitted} // Disable if not valid after first submit attempt
                  >
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Confirm & Place Magical Order!
                  </CharacterButton>
                </div>
                 <div className="text-center mt-4">
                    <Link to="/cart" className="text-sm text-blue-600 hover:text-yellow-500 hover:underline">
                        &larr; Back to Cart Dimension
                    </Link>
                </div>
              </form>
            </Form>
          )}
        </div>
      </main>
      
      <DoraemonFooter />
    </div>
  );
};

export default CheckoutPage;
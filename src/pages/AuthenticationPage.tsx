import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import DoraemonHeader from '@/components/layout/DoraemonHeader';
import DoraemonFooter from '@/components/layout/DoraemonFooter';
import GadgetLoader from '@/components/GadgetLoader';
import CharacterButton from '@/components/CharacterButton';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Can be used if not using react-hook-form's FormLabel
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Bell, KeyRound, Mail, User, LogIn as LogInIcon } from 'lucide-react'; // Icons for inputs

// Login Form Schema
const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

// Registration Form Schema
const registerFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }).max(20, { message: "Username must be at most 20 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});
type RegisterFormValues = z.infer<typeof registerFormSchema>;

const AuthenticationPage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthenticationPage loaded');
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500); // Show loader for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onLoginSubmit(data: LoginFormValues) {
    console.log("Login form submitted:", data);
    // Here you would typically call an API to authenticate the user
    // For demo, navigate to homepage on successful "login"
    alert(`Logged in as ${data.email}! Redirecting to homepage... (Demo)`);
    navigate('/'); // Navigate to homepage, path from App.tsx
  }

  function onRegisterSubmit(data: RegisterFormValues) {
    console.log("Register form submitted:", data);
    // Here you would typically call an API to register the user
    // For demo, navigate to homepage on successful "registration"
    alert(`Registered user ${data.username}! Redirecting to homepage... (Demo)`);
    navigate('/'); // Navigate to homepage, path from App.tsx
  }

  if (showLoader) {
    return <GadgetLoader loadingText="Preparing the Authentication Portal..." fullscreen={true} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-yellow-100 font-['Comic_Sans_MS',_'Arial',_sans-serif]">
      <DoraemonHeader cartItemCount={0} />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-lg shadow-2xl bg-white/95 backdrop-blur-sm border-4 border-blue-500 rounded-2xl transform transition-all hover:scale-[1.01] duration-300">
          <CardHeader className="text-center p-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2600/2600314.png" // Doraemon-like icon (replace with actual if available)
              alt="Doraemon Icon" 
              className="mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-yellow-400 p-1 bg-white" 
            />
            <CardTitle className="text-3xl sm:text-4xl font-bold text-blue-700" style={{ fontFamily: "'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif" }}>
              Join The Adventure!
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm sm:text-base mt-1">
              Sign in or create an account to order yummy treats!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-blue-100 border-2 border-blue-300 rounded-lg p-1">
                <TabsTrigger 
                  value="login" 
                  className="py-2 text-sm sm:text-base font-semibold data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-800 data-[state=active]:shadow-md rounded-md transition-all"
                >
                  <LogInIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="py-2 text-sm sm:text-base font-semibold data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-800 data-[state=active]:shadow-md rounded-md transition-all"
                >
                  <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="mt-6">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700 font-semibold flex items-center">
                            <Mail className="mr-2 h-5 w-5 text-yellow-500" /> Email Address
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="nobita@example.com" 
                              {...field} 
                              className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700 font-semibold flex items-center">
                            <KeyRound className="mr-2 h-5 w-5 text-yellow-500" /> Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Your Secret Gadget Code" 
                              {...field} 
                              className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CharacterButton 
                      type="submit" 
                      variant="bell" // Doraemon's Bell button
                      className="w-full text-base py-3"
                      title="Login to your account"
                      disabled={loginForm.formState.isSubmitting}
                    >
                      Login
                    </CharacterButton>
                  </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                  <Link to="#" className="text-blue-600 hover:text-yellow-600 hover:underline">
                    Forgot your password? (Time Machine needed!)
                  </Link>
                </div>
              </TabsContent>

              {/* Registration Tab */}
              <TabsContent value="register" className="mt-6">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700 font-semibold flex items-center">
                            <User className="mr-2 h-5 w-5 text-yellow-500" /> Username
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your Adventure Name (e.g., DoraFan123)" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700 font-semibold flex items-center">
                            <Mail className="mr-2 h-5 w-5 text-yellow-500" /> Email Address
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700 font-semibold flex items-center">
                            <KeyRound className="mr-2 h-5 w-5 text-yellow-500" /> Create Password
                          </FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="A Strong Secret Code" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700 font-semibold flex items-center">
                            <KeyRound className="mr-2 h-5 w-5 text-yellow-500" /> Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Repeat Your Secret Code" {...field} className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <CharacterButton 
                      type="submit" 
                      variant="anywhere-door" // Anywhere Door button for registration
                      className="w-full text-base py-3 mt-2" // Added mt-2 for spacing
                      title="Create your new account"
                      disabled={registerForm.formState.isSubmitting}
                    >
                      Create Account
                    </CharacterButton>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col items-center p-6 pt-2">
            <p className="text-xs text-gray-500 mt-4">
              By signing up, you agree to our <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Doraemon_ پڑوسی.PNG/200px-Doraemon_ پڑوسی.PNG" alt="Small Doraemon waving" className="mt-4 h-12"/> {/* Placeholder image for Doraemon */}
          </CardFooter>
        </Card>
      </main>

      <DoraemonFooter />
    </div>
  );
};

export default AuthenticationPage;
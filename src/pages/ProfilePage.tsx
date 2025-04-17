
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { fetchUserProfile } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/auth/AuthForm';
import { User as UserIcon, Settings, LogOut, ShoppingBag } from 'lucide-react';

// Profile form schema
const profileSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }).optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UserProfile {
  id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
}

const ProfilePage: React.FC = () => {
  const { user, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  useEffect(() => {
    const getProfile = async () => {
      if (user?.id) {
        try {
          const profile = await fetchUserProfile(user.id);
          setUserProfile(profile);
          
          form.reset({
            fullName: profile?.full_name || user?.user_metadata?.full_name || '',
            email: profile?.email || user?.email || '',
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    getProfile();
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    try {
      await updateProfile({
        fullName: values.fullName,
      });
      // Update local state
      setUserProfile(prev => prev ? {
        ...prev,
        full_name: values.fullName || prev.full_name,
      } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // If not logged in, show the auth form
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="godhadya-container max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Sign In to Your Account</CardTitle>
                <CardDescription>
                  Sign in to view your profile information and order history.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuthForm />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="godhadya-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-godhadya-100 rounded-full flex items-center justify-center mb-4">
                      {userProfile?.avatar_url ? (
                        <img 
                          src={userProfile.avatar_url} 
                          alt={userProfile.full_name || 'User'} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <UserIcon size={40} className="text-godhadya-500" />
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {userProfile?.full_name || user?.user_metadata?.full_name || 'User'}
                    </h2>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => navigate('/profile')}
                    >
                      <UserIcon size={18} className="mr-2" />
                      My Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => navigate('/profile?tab=orders')}
                    >
                      <ShoppingBag size={18} className="mr-2" />
                      Order History
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => navigate('/profile?tab=settings')}
                    >
                      <Settings size={18} className="mr-2" />
                      Account Settings
                    </Button>
                    <Separator className="my-2" />
                    <Button 
                      variant="ghost" 
                      className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut size={18} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Manage your personal information and contact details.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="your.email@example.com" 
                                    {...field} 
                                    disabled 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="bg-godhadya-500 hover:bg-godhadya-600" 
                            disabled={loading}
                          >
                            {loading ? "Saving..." : "Save Changes"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>
                        View details of your previous orders.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                        <p>You haven't placed any orders yet.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences and security settings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Password</h3>
                          <p className="text-gray-500 text-sm mb-4">
                            Update your password to keep your account secure.
                          </p>
                          <Button variant="outline">Change Password</Button>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                          <p className="text-gray-500 text-sm mb-4">
                            Permanently delete your account and all associated data.
                            This action cannot be undone.
                          </p>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;

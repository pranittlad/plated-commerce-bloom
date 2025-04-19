
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import type { LoginFormValues, RegisterFormValues } from './schemas';

interface AuthFormProps {
  onSuccess?: () => void;
  defaultTab?: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  onSuccess, 
  defaultTab = 'login' 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message || "Invalid email or password",
        });
      } else if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(values.email, values.password, values.fullName);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message || "Could not create your account",
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
        });
        setActiveTab('login');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm onSubmit={onLoginSubmit} isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm onSubmit={onRegisterSubmit} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;

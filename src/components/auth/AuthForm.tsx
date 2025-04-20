
import React, { useState, useEffect } from 'react';
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
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Generate CSRF token on component mount
  const [csrfToken, setCsrfToken] = useState('');
  
  useEffect(() => {
    // Generate a random token for CSRF protection
    const token = Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
    setCsrfToken(token);
    
    // Store token in localStorage for verification
    localStorage.setItem('csrf_token', token);
  }, []);

  // Handle rate limiting cooldown
  useEffect(() => {
    let interval: number | undefined;
    
    if (cooldownTimer > 0) {
      interval = window.setInterval(() => {
        setCooldownTimer(prevTimer => {
          const newTime = prevTimer - 1;
          if (newTime <= 0) {
            setIsRateLimited(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldownTimer]);

  const onLoginSubmit = async (values: LoginFormValues) => {
    // Verify CSRF token
    const storedToken = localStorage.getItem('csrf_token');
    if (storedToken !== csrfToken) {
      toast({
        variant: "destructive",
        title: "Security Error",
        description: "Invalid security token. Please refresh the page and try again.",
      });
      return;
    }
    
    // Check rate limiting
    if (isRateLimited) {
      toast({
        variant: "destructive",
        title: "Too many attempts",
        description: `Please try again in ${cooldownTimer} seconds.`,
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        // Increment login attempts for rate limiting
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        // Implement progressive rate limiting
        if (newAttempts >= 5) {
          const cooldown = Math.min(30 * (newAttempts - 4), 300); // Max 5 minutes
          setIsRateLimited(true);
          setCooldownTimer(cooldown);
          toast({
            variant: "destructive",
            title: "Too many failed attempts",
            description: `Please try again in ${cooldown} seconds.`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: error.message || "Invalid email or password",
          });
        }
      } else {
        // Reset attempts on successful login
        setLoginAttempts(0);
        
        if (onSuccess) {
          onSuccess();
        }
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
    // Verify CSRF token
    const storedToken = localStorage.getItem('csrf_token');
    if (storedToken !== csrfToken) {
      toast({
        variant: "destructive",
        title: "Security Error",
        description: "Invalid security token. Please refresh the page and try again.",
      });
      return;
    }

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
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <input type="hidden" name="_csrf" value={csrfToken} />
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

      {isRateLimited && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">
          <p>Account locked due to too many failed attempts.</p>
          <p>Please try again in {cooldownTimer} seconds.</p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  
  // Get the intended destination from location state, default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear login error
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = 'Email or username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login({
        emailOrUsername: formData.emailOrUsername,
        password: formData.password
      });
      
      // Redirect to intended destination or dashboard after successful login
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    }
  };
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f9f8fd]">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#4c146c]">Welcome Back</h1>
            <p className="mt-2 text-gray-600">
              Sign in to your NurturePath account
            </p>
          </div>
          <Card>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {loginError}
                  </div>
                )}
                
                <Input 
                  label="Email or Username" 
                  type="text" 
                  name="emailOrUsername" 
                  id="emailOrUsername" 
                  value={formData.emailOrUsername} 
                  onChange={handleChange} 
                  error={errors.emailOrUsername} 
                  fullWidth 
                  autoComplete="email"
                  placeholder="Enter your email or username"
                />
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-[#4c146c] hover:text-[#b083f7]">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    error={errors.password} 
                    fullWidth 
                    autoComplete="current-password"
                    placeholder="Enter your password"
                  />
                </div>
                
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    name="remember-me" 
                    type="checkbox" 
                    className="h-4 w-4 text-[#4c146c] focus:ring-[#4c146c] border-gray-300 rounded" 
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-[#4c146c] hover:text-[#b083f7]">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
export default LoginPage;
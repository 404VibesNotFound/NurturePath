import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { authService, Role } from '../services/authService';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 1 // Default to Patient role
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationError, setRegistrationError] = useState<string>('');
  const [registrationSuccess, setRegistrationSuccess] = useState<string>('');
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    // Fetch available roles
    const fetchRoles = async () => {
      try {
        const availableRoles = await authService.getRoles();
        setRoles(availableRoles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' ? parseInt(value) : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear registration error
    if (registrationError) {
      setRegistrationError('');
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    // Contains number
    if (/[0-9]/.test(password)) strength += 1;
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const getStrengthText = (strength: number) => {
    if (strength === 0) return '';
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = (strength: number) => {
    if (strength === 0) return 'bg-gray-200';
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthText = getStrengthText(passwordStrength);
  const strengthColor = getStrengthColor(passwordStrength);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
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
      await register({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        role: formData.role
      });
      
      setRegistrationSuccess('Registration successful! Please sign in with your new account.');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setRegistrationError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f9f8fd]">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#4c146c]">
              Create an Account
            </h1>
            <p className="mt-2 text-gray-600">
              Join NurturePath healthcare communication platform
            </p>
          </div>
          <Card>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {registrationError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {registrationError}
                  </div>
                )}
                
                {registrationSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                    {registrationSuccess}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="First Name" 
                    type="text" 
                    name="firstName" 
                    id="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    error={errors.firstName} 
                    fullWidth 
                    autoComplete="given-name"
                    placeholder="Enter first name"
                  />
                  <Input 
                    label="Last Name" 
                    type="text" 
                    name="lastName" 
                    id="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    error={errors.lastName} 
                    fullWidth 
                    autoComplete="family-name"
                    placeholder="Enter last name"
                  />
                </div>
                
                <Input 
                  label="Email Address" 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  error={errors.email} 
                  fullWidth 
                  autoComplete="email"
                  placeholder="Enter your email address"
                />
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    I am a...
                  </label>
                  <select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4c146c] focus:border-[#4c146c] text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name} - {role.description}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                  )}
                </div>
                
                <div>
                  <Input 
                    label="Password" 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    error={errors.password} 
                    fullWidth 
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                  />
                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${strengthColor} rounded-full transition-all duration-300`} 
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500 w-16 text-right">
                          {strengthText}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <Input 
                  label="Confirm Password" 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  error={errors.confirmPassword} 
                  fullWidth 
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                />
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#4c146c] hover:text-[#b083f7]">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignupPage;
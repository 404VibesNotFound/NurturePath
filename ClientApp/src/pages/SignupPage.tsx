import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
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
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
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
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, handle submission
      console.log('Form submitted:', formData);
      // In a real app, you would make an API call here
    }
  };
  return <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f9f8fd]">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#4c146c]">
              Create an Account
            </h1>
            <p className="mt-2 text-gray-600">
              Sign up to get started with HealthSync
            </p>
          </div>
          <Card>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Input label="Full Name" type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} fullWidth autoComplete="name" />
                <Input label="Email Address" type="email" name="email" id="email" value={formData.email} onChange={handleChange} error={errors.email} fullWidth autoComplete="email" />
                <div>
                  <Input label="Password" type="password" name="password" id="password" value={formData.password} onChange={handleChange} error={errors.password} fullWidth autoComplete="new-password" />
                  {/* Password strength indicator */}
                  {formData.password && <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${strengthColor} rounded-full transition-all duration-300`} style={{
                        width: `${passwordStrength / 5 * 100}%`
                      }}></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500 w-16 text-right">
                          {strengthText}
                        </span>
                      </div>
                    </div>}
                </div>
                <Input label="Confirm Password" type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} fullWidth autoComplete="new-password" />
                <Button type="submit" variant="primary" fullWidth>
                  Create Account
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
    </MainLayout>;
};
export default SignupPage;
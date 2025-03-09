import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema
const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  role: z.enum(['patient', 'doctor', 'nurse', 'receptionist']),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignupForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'patient',
      agreeToTerms: false
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSignupError('');
    
    try {
      // This would be replaced with an actual API call
      // const response = await api.post('/auth/signup', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful signup
      setSignupSuccess(true);
      
      // Redirect to OTP verification page
      setTimeout(() => {
        navigate('/verify-email', { 
          state: { 
            email: data.email,
            message: 'Please check your email for a verification code.'
          } 
        });
      }, 1500);
      
    } catch (error) {
      setSignupError(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create an Account</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Join AIEMR to manage your healthcare information
        </p>
      </div>
      
      {signupError && (
        <div className="mb-4 p-3 bg-accent-50 text-accent-700 rounded-md">
          {signupError}
        </div>
      )}
      
      {signupSuccess && (
        <div className="mb-4 p-3 bg-secondary-50 text-secondary-700 rounded-md">
          Account created successfully! Redirecting to verification...
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="John"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-accent-600">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Doe"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-accent-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-accent-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-accent-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-accent-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            I am a
          </label>
          <select
            id="role"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            {...register('role')}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="receptionist">Receptionist</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-accent-600">{errors.role.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Note: Healthcare staff accounts require verification by an administrator.
          </p>
        </div>

        <div className="flex items-center">
          <input
            id="agreeToTerms"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            {...register('agreeToTerms')}
          />
          <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the <a href="/terms" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="/privacy" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-accent-600">{errors.agreeToTerms.message}</p>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 
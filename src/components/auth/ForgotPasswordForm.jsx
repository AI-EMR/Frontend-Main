import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // This would be replaced with an actual API call
      // const response = await api.post('/auth/forgot-password', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful request
      setSuccess(true);
      
    } catch (error) {
      setError(error.message || 'Failed to process your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Forgot Password</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-accent-50 text-accent-700 rounded-md">
          {error}
        </div>
      )}
      
      {success ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-secondary-50 text-secondary-700 rounded-md">
            <p className="font-medium">Password reset email sent!</p>
            <p className="mt-1">Please check your email for instructions to reset your password.</p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-accent-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
          
          <div className="text-center">
            <Link to="/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
} 
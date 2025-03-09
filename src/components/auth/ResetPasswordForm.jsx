import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema
const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Get token from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // This would be replaced with an actual API call
      // const response = await api.post('/auth/reset-password', {
      //   token,
      //   password: data.password
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful password reset
      setSuccess(true);
      
      // Redirect to login page after a delay
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Your password has been reset successfully. You can now log in with your new password.' 
          } 
        });
      }, 2000);
      
    } catch (error) {
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no token is provided, show an error
  if (!token) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-8 max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
        </div>
        
        <div className="mb-4 p-3 bg-accent-50 text-accent-700 rounded-md">
          Invalid or missing reset token. Please request a new password reset link.
        </div>
        
        <div className="text-center mt-6">
          <Link
            to="/forgot-password"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Enter your new password below
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
            <p className="font-medium">Password reset successful!</p>
            <p className="mt-1">Redirecting you to the login page...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
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
              Confirm New Password
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 
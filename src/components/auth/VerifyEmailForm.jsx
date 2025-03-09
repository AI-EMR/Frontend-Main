import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema
const verifyEmailSchema = z.object({
  otp: z.string().min(6, 'OTP must be at least 6 characters').max(6, 'OTP must be 6 characters'),
});

export default function VerifyEmailForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  useEffect(() => {
    // Get email and message from location state if available
    if (location.state) {
      if (location.state.email) {
        setEmail(location.state.email);
      }
      if (location.state.message) {
        setMessage(location.state.message);
      }
    }
  }, [location]);
  
  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: '',
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // This would be replaced with an actual API call
      // const response = await api.post('/auth/verify-email', {
      //   email,
      //   otp: data.otp
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful verification
      setSuccess(true);
      
      // Redirect to login page after a delay
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Email verified successfully! You can now log in to your account.' 
          } 
        });
      }, 2000);
      
    } catch (error) {
      setError(error.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResendOTP = async () => {
    setResendDisabled(true);
    setCountdown(60); // 60 seconds cooldown
    setError('');
    
    try {
      // This would be replaced with an actual API call
      // const response = await api.post('/auth/resend-otp', { email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful resend
      setMessage('A new verification code has been sent to your email.');
      
    } catch (error) {
      setError(error.message || 'Failed to resend verification code. Please try again later.');
      setResendDisabled(false);
      setCountdown(0);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Verify Your Email</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {message || 'Enter the verification code sent to your email'}
        </p>
        {email && (
          <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
            {email}
          </p>
        )}
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-accent-50 text-accent-700 rounded-md">
          {error}
        </div>
      )}
      
      {success ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-secondary-50 text-secondary-700 rounded-md">
            <p className="font-medium">Email verified successfully!</p>
            <p className="mt-1">Redirecting you to the login page...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-center text-lg tracking-widest"
              placeholder="123456"
              maxLength={6}
              {...register('otp')}
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-accent-600">{errors.otp.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className="text-sm font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendDisabled 
                ? `Resend code in ${countdown}s` 
                : 'Didn\'t receive a code? Resend'}
            </button>
          </div>
          
          <div className="text-center pt-2 border-t border-gray-200 dark:border-gray-700">
            <Link to="/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
} 
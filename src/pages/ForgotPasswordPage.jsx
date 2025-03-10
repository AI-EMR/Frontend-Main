import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import PublicHeader from '../components/layout/PublicHeader';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-soft rounded-lg sm:px-10 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
              Check your email
            </h2>
            <p className="body-base text-gray-600 dark:text-gray-400 mb-6">
              We've sent password reset instructions to:
              <br />
              <span className="font-medium text-gray-900 dark:text-white">{email}</span>
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  try again
                </button>
              </p>
              <Link
                to="/login"
                className="text-sm font-medium text-primary-600 hover:text-primary-500 block"
              >
                Return to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <PublicHeader />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.svg"
          alt="AIEMR"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-soft rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send reset instructions'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 
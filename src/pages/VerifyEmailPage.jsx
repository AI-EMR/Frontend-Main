import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerifyEmailForm from '../components/auth/VerifyEmailForm';
import PublicHeader from '../components/layout/PublicHeader';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus('error');
        return;
      }

      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        setVerificationStatus('success');
      } catch (error) {
        setVerificationStatus('error');
        toast.error(error.message || 'Failed to verify email');
      }
    };

    verifyEmail();
  }, [token]);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Verification email has been resent');
    } catch (error) {
      toast.error(error.message || 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'verifying':
        return (
          <>
            <div className="mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
            <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
              Verifying your email
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we verify your email address...
            </p>
          </>
        );

      case 'success':
        return (
          <>
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
              Email verified successfully
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for verifying your email address. You can now proceed to sign in.
            </p>
            <Link
              to="/login"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign in
            </Link>
          </>
        );

      case 'error':
        return (
          <>
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
              Verification failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The verification link is invalid or has expired.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Resending...' : 'Resend verification email'}
              </button>
              <Link
                to="/login"
                className="block text-center text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Return to sign in
              </Link>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <PublicHeader />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.svg"
          alt="AIEMR"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-soft rounded-lg sm:px-10 text-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage; 
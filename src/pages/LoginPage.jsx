import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const demoCredentials = [
    { role: 'Admin', email: 'admin@example.com', password: 'admin123' },
    { role: 'Doctor', email: 'doctor@example.com', password: 'doctor123' },
    { role: 'Nurse', email: 'nurse@example.com', password: 'nurse123' },
    { role: 'Receptionist', email: 'receptionist@example.com', password: 'reception123' },
    { role: 'Patient', email: 'patient@example.com', password: 'patient123' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData);
      if (result.success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setIsLoading(true);
    const credentials = role === 'admin' 
      ? { email: 'admin@example.com', password: 'admin123' }
      : { email: 'doctor@example.com', password: 'doctor123' };

    try {
      const result = await login(credentials);
      if (result.success) {
        toast.success('Demo login successful!');
        navigate('/');
      } else {
        toast.error(result.error || 'Demo login failed');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const applyDemoCredentials = (email, password) => {
    setFormData(prev => ({
      ...prev,
      email,
      password
    }));
    setShowDemoCredentials(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="heading-2 text-center text-gray-900 dark:text-white">
          Sign in to AIEMR
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
            Register your organization
          </Link>
        </p>
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
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Demo Credentials Floating Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setShowDemoCredentials(!showDemoCredentials)}
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Demo Credentials Popup */}
        {showDemoCredentials && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-72 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Demo Credentials</h3>
              <button
                type="button"
                onClick={() => setShowDemoCredentials(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{cred.role}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email: {cred.email}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Password: {cred.password}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => applyDemoCredentials(cred.email, cred.password)}
                      className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100 px-2 py-1 rounded-md hover:bg-primary-200 dark:hover:bg-primary-700"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
              Note: These are demo credentials for testing purposes only.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage; 
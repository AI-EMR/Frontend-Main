import { Link } from 'react-router-dom';
import PublicHeader from '../components/layout/PublicHeader';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <PublicHeader />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-soft rounded-lg sm:px-10">
          <div className="text-center">
            <svg 
              className="mx-auto h-16 w-16 text-accent-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 0V7m0 2h2m-2 0H9" 
              />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              You don't have permission to access this page.
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
import React, { useState } from 'react';

export default function SimpleApp() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          AIEMR Application
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This is a simplified version of the application to verify that rendering is working correctly.
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h2 className="font-medium text-blue-800 dark:text-blue-200">Information</h2>
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
              The application is currently in development mode.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
            <h2 className="font-medium text-green-800 dark:text-green-200">Success</h2>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              The component has rendered successfully.
            </p>
          </div>
        </div>
        
        <button 
          className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={toggleTheme}
        >
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
  );
} 
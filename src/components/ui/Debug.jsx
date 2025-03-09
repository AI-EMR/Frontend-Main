import { useState } from 'react';
import useAuthStore from '../../store/authStore';

export default function Debug() {
  const [isOpen, setIsOpen] = useState(false);
  const authState = useAuthStore();
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? 'Close' : 'Debug'}
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Debug Info</h3>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <div>
              <strong>Authenticated:</strong> {authState.isAuthenticated ? 'Yes' : 'No'}
            </div>
            {authState.user && (
              <>
                <div>
                  <strong>User:</strong> {authState.user.name}
                </div>
                <div>
                  <strong>Role:</strong> {authState.role}
                </div>
                <div>
                  <strong>Permissions:</strong> {authState.permissions.length}
                </div>
              </>
            )}
            <div>
              <strong>Loading:</strong> {authState.isLoading ? 'Yes' : 'No'}
            </div>
            {authState.error && (
              <div className="text-red-500">
                <strong>Error:</strong> {authState.error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
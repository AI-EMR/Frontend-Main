import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import AIAssistant from './AIAssistant';

const AIAssistantSidebar = () => {
  const { role } = useAuthStore();
  const [isExpanded, setIsExpanded] = useState(false);

  // Only show for admin and doctor roles
  if (role !== 'admin' && role !== 'doctor') return null;

  return (
    <div 
      className={`
        fixed top-4 right-4 h-[calc(100vh-32px)] bg-white dark:bg-gray-800
        transition-all duration-700 ease-in-out z-40
        border-l border-gray-200 dark:border-gray-700
        rounded-xl shadow-lg
        ${isExpanded ? 'w-96' : 'w-16'}
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          absolute -left-3 top-1/2 transform -translate-y-1/2 
          bg-primary-600 hover:bg-primary-700 
          text-white p-1.5 rounded-full shadow-lg 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          transition-all duration-700 ease-in-out
          hover:scale-110
          ${isExpanded ? 'rotate-180' : ''}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Collapsed State */}
      {!isExpanded && (
        <div className="h-full flex flex-col items-center justify-center py-4 space-y-12 opacity-0 animate-fadeIn">
          <div 
            className="transform -rotate-90 origin-center whitespace-nowrap"
            style={{ marginBottom: '4rem' }}
          >
            <span className="font-medium text-gray-900 dark:text-white text-sm tracking-wide">
              AI Assistant
            </span>
          </div>
          <div 
            className="transform -rotate-90 origin-center whitespace-nowrap"
            style={{ marginTop: '4rem' }}
          >
            <span className="text-xs text-primary-600 dark:text-primary-400 font-medium tracking-wide">
              {role === 'admin' ? 'Admin Mode' : 'Doctor Mode'}
            </span>
          </div>
        </div>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div className="opacity-0 animate-fadeIn">
          <AIAssistant
            isOpen={true}
            onClose={() => setIsExpanded(false)}
            position="sidebar"
          />
        </div>
      )}
    </div>
  );
};

// Add these styles to your global CSS or Tailwind config
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out forwards;
  animation-delay: 0.2s;
}
`;

export default AIAssistantSidebar; 
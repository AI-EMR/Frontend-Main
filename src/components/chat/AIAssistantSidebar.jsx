import React, { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import AIAssistant from './AIAssistant';

const AIAssistantExtension = () => {
  const { role } = useAuthStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setIsContentVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsContentVisible(false);
    }
  }, [isExpanded]);

  // Only show for admin and doctor roles
  if (role !== 'admin' && role !== 'doctor') return null;

  return (
    <div 
      className={`
        fixed bottom-4 right-4
        transition-all duration-500 ease-in-out
        overflow-hidden
        ${isExpanded ? 'w-[400px] h-[600px]' : 'w-12 h-12'}
        z-50
      `}
    >
      {/* Main Container */}
      <div className={`
        w-full h-full
        bg-gray-900
        rounded-2xl
        shadow-2xl
        transition-all duration-500 ease-in-out
        overflow-hidden
        border border-gray-800
      `}>
        {/* Toggle Button / Collapsed State */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-full h-full
            flex items-center justify-center
            bg-gray-900 hover:bg-gray-800
            text-blue-400 hover:text-blue-300
            transition-all duration-300 ease-in-out
            ${isExpanded ? 'hidden' : 'block'}
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5"
            />
          </svg>
        </button>

        {/* Expanded State */}
        <div 
          className={`
            absolute top-0 left-0 w-full h-full
            transition-opacity duration-300 ease-in-out
            ${isContentVisible ? 'opacity-100' : 'opacity-0'}
            ${!isExpanded && 'pointer-events-none'}
          `}
        >
          {isExpanded && (
            <div className="relative w-full h-full">
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-300 z-10"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <AIAssistant
                isOpen={true}
                onClose={() => setIsExpanded(false)}
                position="extension"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantExtension; 
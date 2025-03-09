import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize theme based on user preference or system preference
  useEffect(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Use saved preference
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  // Toggle theme with animation
  const toggleTheme = () => {
    setIsTransitioning(true);
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Update DOM
    document.documentElement.classList.toggle('dark', newDarkMode);
    
    // Save preference
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5 transition-transform duration-300 ease-in-out" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5 transition-transform duration-300 ease-in-out" aria-hidden="true" />
      )}
    </button>
  );
} 
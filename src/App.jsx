import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Store
import useAuthStore from './store/authStore';

// Components
import ThemeToggle from './components/ui/ThemeToggle';
import Sidebar from './components/ui/Sidebar';

// Pages
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import StaffManagementPage from './pages/StaffManagementPage';
import PatientsPage from './pages/PatientsPage';
import RecordsPage from './pages/RecordsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import OrganizationSettingsPage from './pages/OrganizationSettingsPage';
import SystemSettingsPage from './pages/SystemSettingsPage';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Please try refreshing the page</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main layout component
function MainLayout({ children }) {
  const { user, role, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="text-xl font-display font-bold text-primary-600 ml-2 lg:ml-0 tracking-tight">AIEMR</div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={logout}
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-display"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar for mobile */}
        <div className={`fixed inset-0 lg:hidden z-40 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar />
          </div>
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { isAuthenticated, role } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Simulate a short loading time to ensure store is hydrated
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/" />} />
          <Route path="/reset-password" element={!isAuthenticated ? <ResetPasswordPage /> : <Navigate to="/" />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Admin only routes */}
          <Route
            path="/staff"
            element={
              isAuthenticated ? (
                role === 'admin' ? (
                  <MainLayout>
                    <StaffManagementPage />
                  </MainLayout>
                ) : (
                  <Navigate to="/unauthorized" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/patients"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <PatientsPage />
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/records"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <RecordsPage />
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/appointments"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <AppointmentsPage />
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/analytics"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <AnalyticsPage />
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/settings/organization"
            element={
              isAuthenticated ? (
                role === 'admin' ? (
                  <MainLayout>
                    <OrganizationSettingsPage />
                  </MainLayout>
                ) : (
                  <Navigate to="/unauthorized" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/settings/system"
            element={
              isAuthenticated ? (
                role === 'admin' ? (
                  <MainLayout>
                    <SystemSettingsPage />
                  </MainLayout>
                ) : (
                  <Navigate to="/unauthorized" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Toast notifications */}
        <ToastContainer position="top-right" autoClose={5000} />
      </Router>
    </ErrorBoundary>
  );
}

export default App;

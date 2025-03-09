import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Store
import useAuthStore from './store/authStore';

// Components
import ThemeToggle from './components/ui/ThemeToggle';

// Pages
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Placeholder pages
const PatientsPage = () => (
  <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Patients</h2>
    <p className="text-gray-600 dark:text-gray-300">
      This page will display a list of patients and allow you to manage patient information.
      The backend API integration will be added later.
    </p>
  </div>
);

const RecordsPage = () => (
  <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Medical Records</h2>
    <p className="text-gray-600 dark:text-gray-300">
      This page will display medical records and allow authorized users to create and edit records.
      The backend API integration will be added later.
    </p>
  </div>
);

const AppointmentsPage = () => (
  <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Appointments</h2>
    <p className="text-gray-600 dark:text-gray-300">
      This page will display appointments and allow scheduling new appointments.
      The backend API integration will be added later.
    </p>
  </div>
);

const AnalyticsPage = () => (
  <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics</h2>
    <p className="text-gray-600 dark:text-gray-300">
      This page will display analytics and reports.
      The backend API integration will be added later.
    </p>
  </div>
);

const SettingsPage = () => (
  <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
    <p className="text-gray-600 dark:text-gray-300">
      This page will allow administrators to configure system settings.
      The backend API integration will be added later.
    </p>
  </div>
);

// Main layout component
function MainLayout({ children }) {
  const { user, role, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-soft transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="text-xl font-bold text-primary-600">AIEMR</div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={logout}
                className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}

function App() {
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a short loading time to ensure store is hydrated
  useEffect(() => {
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
          path="/settings"
          element={
            isAuthenticated ? (
              <MainLayout>
                <SettingsPage />
              </MainLayout>
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
  );
}

export default App;

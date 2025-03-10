import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, role } = useAuthStore();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check role-based access for specific routes
  const pathname = window.location.pathname;
  
  // Admin-only routes
  const adminOnlyRoutes = [
    '/staff',
    '/organization-settings',
    '/system-settings',
    '/analytics'
  ];
  if (adminOnlyRoutes.includes(pathname) && role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  // Doctor and Admin routes
  const doctorAndAdminRoutes = ['/records'];
  if (doctorAndAdminRoutes.includes(pathname) && !['doctor', 'admin'].includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Medical staff routes (doctors, nurses, admin)
  const medicalStaffRoutes = ['/patients'];
  if (medicalStaffRoutes.includes(pathname) && !['doctor', 'nurse', 'admin'].includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Laboratory routes (doctors, lab technicians, nurses, and admin)
  if (pathname === '/laboratory' && !['doctor', 'lab_tech', 'nurse', 'admin'].includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Pharmacy routes (doctors, pharmacists, and admin)
  if (pathname === '/pharmacy' && !['doctor', 'pharmacist', 'admin'].includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // If all checks pass, render the protected route
  return <Outlet />;
};

export default ProtectedRoute; 
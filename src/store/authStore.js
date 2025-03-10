import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../api/authService';

// Define user roles
export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  RECEPTIONIST: 'receptionist',
  PHARMACIST: 'pharmacist',
  PATIENT: 'patient',
};

// Define permissions for each role
export const PERMISSIONS = {
  [ROLES.ADMIN]: [
    'view_all_patients',
    'edit_all_patients',
    'view_all_records',
    'edit_all_records',
    'manage_users',
    'view_analytics',
    'manage_system',
  ],
  [ROLES.DOCTOR]: [
    'view_assigned_patients',
    'edit_assigned_patients',
    'view_medical_records',
    'create_medical_records',
    'edit_medical_records',
    'prescribe_medication',
    'view_limited_analytics',
    'send_pharmacy_messages',
  ],
  [ROLES.NURSE]: [
    'view_assigned_patients',
    'update_vitals',
    'view_medical_records',
    'update_medical_records',
    'administer_medication',
  ],
  [ROLES.PHARMACIST]: [
    'view_prescriptions',
    'manage_pharmacy_inventory',
    'process_prescriptions',
    'view_pharmacy_messages',
    'send_pharmacy_messages',
  ],
  [ROLES.RECEPTIONIST]: [
    'view_patient_info',
    'register_patients',
    'schedule_appointments',
    'manage_billing',
  ],
  [ROLES.PATIENT]: [
    'view_own_records',
    'view_appointments',
    'request_appointments',
  ],
};

// Create the auth store
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      permissions: [],
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          // Use auth service for login
          const response = await authService.login(credentials);
          
          const { user, token, permissions } = response;
          const role = user.role;
          
          set({ 
            user, 
            token, 
            role, 
            permissions, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message || 'Failed to login', 
            isLoading: false 
          });
          return { success: false, error: error.message };
        }
      },

      // Register action
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // Use auth service for registration
          const response = await authService.register(userData);
          
          set({ isLoading: false });
          
          return { success: true, message: response.message };
        } catch (error) {
          set({ 
            error: error.message || 'Failed to register', 
            isLoading: false 
          });
          return { success: false, error: error.message };
        }
      },

      // Logout action
      logout: async () => {
        try {
          // Use auth service for logout
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ 
            user: null, 
            token: null, 
            role: null, 
            permissions: [], 
            isAuthenticated: false 
          });
        }
      },

      // Check if user has a specific permission
      hasPermission: (permission) => {
        const { permissions } = get();
        return permissions.includes(permission);
      },

      // Check if user has a specific role
      hasRole: (roleToCheck) => {
        const { role } = get();
        return role === roleToCheck;
      },
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        role: state.role, 
        permissions: state.permissions, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore; 
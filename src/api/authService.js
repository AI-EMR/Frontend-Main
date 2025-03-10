import apiClient from './apiClient';
import mockApi from './mockApi';

// Flag to determine whether to use mock API or real API
const USE_MOCK_API = true; // Set to false when backend is ready

/**
 * Authentication service for handling auth-related API calls
 */
const authService = {
  /**
   * Login user
   * @param {Object} credentials - User credentials (email, password)
   * @returns {Promise<Object>} User data and token
   */
  login: async (credentials) => {
    if (USE_MOCK_API) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock credentials check
      const mockUsers = {
        admin: {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin',
          permissions: [
            'view_all_patients',
            'edit_all_patients',
            'view_all_records',
            'edit_all_records',
            'manage_users',
            'view_analytics',
            'manage_system',
          ],
        },
        doctor: {
          id: 2,
          name: 'Doctor User',
          email: 'doctor@example.com',
          password: 'doctor123',
          role: 'doctor',
          permissions: [
            'view_assigned_patients',
            'edit_assigned_patients',
            'view_medical_records',
            'create_medical_records',
            'edit_medical_records',
            'prescribe_medication',
            'view_limited_analytics',
            'send_pharmacy_messages',
          ],
        },
        nurse: {
          id: 3,
          name: 'Nurse User',
          email: 'nurse@example.com',
          password: 'nurse123',
          role: 'nurse',
          permissions: [
            'view_assigned_patients',
            'update_vitals',
            'view_medical_records',
            'update_medical_records',
            'administer_medication',
          ],
        },
        pharmacist: {
          id: 4,
          name: 'Pharmacist User',
          email: 'pharmacist@example.com',
          password: 'pharm123',
          role: 'pharmacist',
          permissions: [
            'view_prescriptions',
            'manage_pharmacy_inventory',
            'process_prescriptions',
            'view_pharmacy_messages',
            'send_pharmacy_messages',
            'communicate_with_patients',
          ],
        },
        receptionist: {
          id: 5,
          name: 'Receptionist User',
          email: 'receptionist@example.com',
          password: 'reception123',
          role: 'receptionist',
          permissions: [
            'view_patient_info',
            'register_patients',
            'schedule_appointments',
            'manage_billing',
          ],
        },
        patient: {
          id: 6,
          name: 'Patient User',
          email: 'patient@example.com',
          password: 'patient123',
          role: 'patient',
          permissions: [
            'view_own_records',
            'view_appointments',
            'request_appointments',
            'communicate_with_pharmacy',
          ],
        },
      };

      // Find user by email
      const user = Object.values(mockUsers).find(u => u.email === credentials.email);
      
      if (user && user.password === credentials.password) {
        const { password, ...userWithoutPassword } = user;
        return {
          user: userWithoutPassword,
          token: 'mock-jwt-token',
          permissions: user.permissions,
        };
      }

      throw new Error('Invalid credentials');
    }
    
    return apiClient.post('/auth/login', credentials);
  },
  
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration result
   */
  register: async (userData) => {
    if (USE_MOCK_API) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock registration success
      return {
        message: 'Registration successful. Please check your email for verification.',
      };
    }
    
    return apiClient.post('/auth/register', userData);
  },
  
  /**
   * Verify email with OTP
   * @param {Object} data - Verification data (email, otp)
   * @returns {Promise<Object>} Verification result
   */
  verifyEmail: async (data) => {
    if (USE_MOCK_API) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        message: 'Email verified successfully',
      };
    }
    
    return apiClient.post('/auth/verify-email', data);
  },
  
  /**
   * Resend verification OTP
   * @param {Object} data - Email data
   * @returns {Promise<Object>} Resend result
   */
  resendVerificationOtp: async (data) => {
    if (USE_MOCK_API) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful resend
      return {
        success: true,
        message: 'Verification code sent successfully.',
      };
    }
    
    return apiClient.post('/auth/resend-verification', data);
  },
  
  /**
   * Request password reset
   * @param {Object} data - Email data
   * @returns {Promise<Object>} Reset request result
   */
  forgotPassword: async (data) => {
    if (USE_MOCK_API) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful request
      return {
        success: true,
        message: 'Password reset link sent to your email.',
      };
    }
    
    return apiClient.post('/auth/forgot-password', data);
  },
  
  /**
   * Reset password with token
   * @param {Object} data - Reset data (token, password)
   * @returns {Promise<Object>} Reset result
   */
  resetPassword: async (data) => {
    if (USE_MOCK_API) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        message: 'Password reset instructions sent to your email',
      };
    }
    
    return apiClient.post('/auth/reset-password', data);
  },
  
  /**
   * Logout user
   * @returns {Promise<Object>} Logout result
   */
  logout: async () => {
    if (USE_MOCK_API) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    }
    
    return apiClient.post('/auth/logout');
  },
};

export default authService; 
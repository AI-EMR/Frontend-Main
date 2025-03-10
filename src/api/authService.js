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
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        return {
          user: {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
          },
          token: 'mock-jwt-token',
          permissions: [
            'view_all_patients',
            'edit_all_patients',
            'view_all_records',
            'edit_all_records',
            'manage_users',
            'view_analytics',
            'manage_system',
          ],
        };
      }

      if (credentials.email === 'doctor@example.com' && credentials.password === 'doctor123') {
        return {
          user: {
            id: 2,
            name: 'Doctor User',
            email: 'doctor@example.com',
            role: 'doctor',
          },
          token: 'mock-jwt-token',
          permissions: [
            'view_assigned_patients',
            'edit_assigned_patients',
            'view_medical_records',
            'create_medical_records',
            'edit_medical_records',
            'prescribe_medication',
            'view_limited_analytics',
          ],
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
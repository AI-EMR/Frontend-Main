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
      return mockApi.login(credentials);
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful registration
      return {
        success: true,
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful verification
      // In a real app, you'd validate the OTP
      if (data.otp === '123456') {
        return {
          success: true,
          message: 'Email verified successfully.',
        };
      } else {
        throw new Error('Invalid verification code.');
      }
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful reset
      return {
        success: true,
        message: 'Password reset successful.',
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
      // No need to do anything for mock logout
      return { success: true };
    }
    
    return apiClient.post('/auth/logout');
  },
};

export default authService; 
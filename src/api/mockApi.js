// Mock API utility to simulate backend responses
import { ROLES, PERMISSIONS } from '../store/authStore';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Mock login API
  login: async (credentials) => {
    // Simulate network delay
    await delay(800);
    
    // Simple validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    
    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Determine role based on email (for demo purposes)
    let role = ROLES.PATIENT;
    if (credentials.email.includes('admin')) {
      role = ROLES.ADMIN;
    } else if (credentials.email.includes('doctor')) {
      role = ROLES.DOCTOR;
    } else if (credentials.email.includes('nurse')) {
      role = ROLES.NURSE;
    } else if (credentials.email.includes('reception')) {
      role = ROLES.RECEPTIONIST;
    }
    
    // Return mock user data
    return {
      user: {
        id: '1',
        name: role === ROLES.DOCTOR ? 'Dr. Jane Smith' : 
              role === ROLES.NURSE ? 'Nurse Michael Johnson' :
              role === ROLES.ADMIN ? 'Admin Sarah Williams' :
              role === ROLES.RECEPTIONIST ? 'Receptionist David Brown' :
              'Patient John Doe',
        email: credentials.email,
        role: role,
      },
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
      permissions: PERMISSIONS[role] || [],
    };
  },
  
  // Add more mock API methods as needed
};

export default mockApi; 
import { createContext, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { isAuthenticated, user, hasPermission, hasRole } = useAuthStore();
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, hasPermission, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children, permissions = [], roles = [] }) {
  const { isAuthenticated, hasPermission, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/login', { state: { from: location } });
      return;
    }

    // Check permissions if specified
    if (permissions.length > 0) {
      const hasAllPermissions = permissions.every(permission => 
        hasPermission(permission)
      );
      
      if (!hasAllPermissions) {
        navigate('/unauthorized', { state: { from: location } });
        return;
      }
    }

    // Check roles if specified
    if (roles.length > 0) {
      const hasAnyRole = roles.some(role => hasRole(role));
      
      if (!hasAnyRole) {
        navigate('/unauthorized', { state: { from: location } });
        return;
      }
    }
  }, [isAuthenticated, hasPermission, hasRole, navigate, location, permissions, roles]);

  return children;
}

export function RequireAdmin({ children }) {
  return (
    <RequireAuth roles={['admin']}>
      {children}
    </RequireAuth>
  );
}

export function RequireDoctor({ children }) {
  return (
    <RequireAuth roles={['doctor']}>
      {children}
    </RequireAuth>
  );
}

export function RequireNurse({ children }) {
  return (
    <RequireAuth roles={['nurse']}>
      {children}
    </RequireAuth>
  );
}

export function RequireReceptionist({ children }) {
  return (
    <RequireAuth roles={['receptionist']}>
      {children}
    </RequireAuth>
  );
}

export function RequirePatient({ children }) {
  return (
    <RequireAuth roles={['patient']}>
      {children}
    </RequireAuth>
  );
} 
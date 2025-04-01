
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample user data - in a real app this would come from an API
const users = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user'
  }
];

// Create context
const AuthContext = createContext(null);

// Create provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing session on first load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email, password) => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = users.find(
          user => user.email === email && user.password === password
        );
        
        if (foundUser) {
          // Create a safe user object without password
          const safeUser = {
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role
          };
          
          setUser(safeUser);
          localStorage.setItem('user', JSON.stringify(safeUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800); // Simulated API delay
    });
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const authValues = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    loading
  };
  
  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected route component
export function RequireAuth({ children, adminOnly = false }) {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
    
    if (!loading && adminOnly && user?.role !== 'admin') {
      navigate('/'); // Not admin, redirect to home
    }
  }, [isAuthenticated, loading, navigate, user, adminOnly]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : null;
}

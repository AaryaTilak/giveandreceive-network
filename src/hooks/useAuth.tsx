
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// Define types for user
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Define types for mock users including password
interface MockUser extends User {
  password: string;
}

// Mock users for demo purposes
const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user'
  }
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      setUser(parsedUser);
      
      // Redirect admin to admin dashboard if on homepage
      if (parsedUser.role === 'admin' && location.pathname === '/') {
        navigate('/admin');
      }
    }
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      
      // Redirect admin users to admin dashboard after login
      if (userWithoutPassword.role === 'admin') {
        navigate('/admin');
      }
      
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    toast.info('You have been logged out');
    navigate('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login, 
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

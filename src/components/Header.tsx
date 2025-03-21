
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// Define a type for the links including the optional icon property
type NavLink = {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  // Track scroll position to add background to header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          >
            GiveReceive
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {user?.name} ({user?.role})
                </span>
                <button 
                  onClick={logout}
                  className="flex items-center gap-1 text-sm font-medium text-destructive hover:underline"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <User size={16} />
                Login
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-6 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <NavLinks isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
              
              {isAuthenticated ? (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <div className="py-2 text-sm font-medium">
                    {user?.name} ({user?.role})
                  </div>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-1 text-sm font-medium text-destructive hover:underline"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1 py-2 text-sm font-medium"
                >
                  <User size={16} />
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLinks({ isAuthenticated, isAdmin }: { isAuthenticated: boolean, isAdmin: boolean }) {
  const location = useLocation();
  
  // Basic links for everyone
  const links: NavLink[] = [
    { to: '/', label: 'Home' },
    { to: '/donations', label: 'Donate' },
    { to: '/requests', label: 'Request Help' },
  ];
  
  // Add profile for authenticated users
  if (isAuthenticated) {
    links.push({ to: '/profile', label: 'My Profile', icon: User });
  }
  
  // Add admin link for admins
  if (isAdmin) {
    links.push({ to: '/admin', label: 'Admin Panel' });
  }
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`py-2 px-1 text-base font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full flex items-center ${
            location.pathname === link.to 
              ? 'text-primary after:w-full' 
              : 'text-foreground/80 hover:text-foreground'
          }`}
        >
          {link.icon && <link.icon className="h-4 w-4 mr-1" />}
          {link.label}
        </Link>
      ))}
    </>
  );
}

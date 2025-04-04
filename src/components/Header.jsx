
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Gift, Heart, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-xl md:text-2xl text-primary">
              <span>Give</span>
              <span className="text-foreground">&</span>
              <span>Receive</span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/donations" 
              className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
            >
              Donations
            </Link>
            <Link 
              to="/requests" 
              className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
            >
              Help Requests
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
            >
              About
            </Link>
            
            {/* Action Buttons */}
            {isAuthenticated ? (
              <div className="ml-4 flex items-center space-x-3">
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <UserIcon size={16} className="mr-1" />
                    {user?.name || "Profile"}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" className="ml-4">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}
            
            <div className="h-6 w-px bg-border mx-2" />
            
            <Link to="/donate">
              <Button size="sm" className="flex items-center">
                <Gift size={16} className="mr-1" />
                <span className="hidden sm:inline">Donate</span>
              </Button>
            </Link>
            
            <Link to="/request">
              <Button variant="outline" size="sm" className="flex items-center">
                <Heart size={16} className="mr-1" />
                <span className="hidden sm:inline">Request Help</span>
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link to="/donations" className="px-3 py-2 rounded-md hover:bg-muted transition-colors">
              Donations
            </Link>
            <Link to="/requests" className="px-3 py-2 rounded-md hover:bg-muted transition-colors">
              Help Requests
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md hover:bg-muted transition-colors">
              About
            </Link>
            
            <div className="h-px bg-muted my-2" />
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-center">
                  <UserIcon size={18} className="mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={logout}
                  className="px-3 py-2 rounded-md hover:bg-muted transition-colors text-left text-muted-foreground flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-2 rounded-md hover:bg-muted transition-colors">
                Login
              </Link>
            )}
            
            <div className="h-px bg-muted my-2" />
            
            <div className="flex flex-col space-y-3">
              <Link to="/donate">
                <Button className="w-full flex items-center justify-center">
                  <Gift size={18} className="mr-2" />
                  Donate
                </Button>
              </Link>
              <Link to="/request">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <Heart size={18} className="mr-2" />
                  Request Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

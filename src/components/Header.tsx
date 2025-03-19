
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            <NavLinks />
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
              <NavLinks />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLinks() {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Home' },
    { to: '/donations', label: 'Donate' },
    { to: '/requests', label: 'Request Help' },
  ];
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`py-2 px-1 text-base font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
            location.pathname === link.to 
              ? 'text-primary after:w-full' 
              : 'text-foreground/80 hover:text-foreground'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

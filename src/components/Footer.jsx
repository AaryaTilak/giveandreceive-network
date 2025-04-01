
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 pt-12 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="font-bold text-xl text-primary">
              <span>Give</span>
              <span className="text-foreground">&</span>
              <span>Receive</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-4">
              Connecting those who can give with those who are in need. Building a community of support and generosity.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="mailto:info@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={18} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/donations" className="text-muted-foreground hover:text-foreground transition-colors">Donations</Link>
              </li>
              <li>
                <Link to="/requests" className="text-muted-foreground hover:text-foreground transition-colors">Help Requests</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/community-guidelines" className="text-muted-foreground hover:text-foreground transition-colors">Community Guidelines</Link>
              </li>
            </ul>
          </div>
          
          {/* Take Action */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Take Action</h3>
            <div className="flex flex-col space-y-3">
              <Link to="/donate">
                <Button className="w-full flex items-center justify-center">
                  Make a Donation
                </Button>
              </Link>
              <Link to="/request">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  Request Help
                </Button>
              </Link>
              <Link to="/volunteer" className="text-sm mt-2 text-muted-foreground hover:text-foreground transition-colors">
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            Made with <Heart size={14} className="text-primary mx-1 fill-primary" /> for all who give and receive
          </p>
          <p className="mt-2">
            &copy; {currentYear} Give & Receive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

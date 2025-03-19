
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-12 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link 
              to="/" 
              className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            >
              GiveReceive
            </Link>
            <p className="mt-4 text-muted-foreground">
              Connecting those who want to give with those in need.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="col-span-1">
            <h3 className="font-medium text-base mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/donations" className="text-muted-foreground hover:text-foreground transition-colors">Donate</Link></li>
              <li><Link to="/requests" className="text-muted-foreground hover:text-foreground transition-colors">Request Help</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Success Stories</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-span-1">
            <h3 className="font-medium text-base mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
          <p>© {currentYear} GiveReceive. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center">
            Made with <Heart size={16} className="mx-1 text-red-500" /> for a better world
          </p>
        </div>
      </div>
    </footer>
  );
}

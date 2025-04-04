
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RequestSuccess() {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Request Submitted Successfully!</h1>
            
            <p className="text-muted-foreground mb-8">
              Your help request has been posted. You will be notified when someone 
              responds to your request. Thank you for using our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/requests" className="flex items-center">
                  <List className="mr-2 h-4 w-4" />
                  View All Requests
                </Link>
              </Button>
              
              <Button asChild>
                <Link to="/" className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

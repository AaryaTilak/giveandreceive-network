
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function RequestSuccess() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect if user navigated here directly without submitting a request
  useEffect(() => {
    const hasSubmittedRequest = sessionStorage.getItem('requestSubmitted');
    
    if (!hasSubmittedRequest) {
      navigate('/request');
    }
    
    // Clean up session storage
    return () => {
      sessionStorage.removeItem('requestSubmitted');
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-lg border border-border/50 bg-card p-6 shadow-sm">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Request Submitted Successfully!</h1>
            <p className="text-muted-foreground mb-6">
              Your request for help has been successfully posted. You'll be notified when someone responds to your request.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/requests">View All Requests</Link>
              </Button>
              
              {isAuthenticated && (
                <Button asChild variant="outline">
                  <Link to="/profile">Go to My Profile</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}


import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DonationSuccess() {
  const navigate = useNavigate();
  
  // Redirect to donations page if accessing directly
  useEffect(() => {
    const hasSubmitted = sessionStorage.getItem('donationSubmitted');
    if (!hasSubmitted) {
      navigate('/donations');
    } else {
      // Clear the flag after 1 minute
      const timer = setTimeout(() => {
        sessionStorage.removeItem('donationSubmitted');
      }, 60000);
      
      return () => clearTimeout(timer);
    }
  }, [navigate]);
  
  // Set flag when component mounts
  useEffect(() => {
    sessionStorage.setItem('donationSubmitted', 'true');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Thank You for Your Donation!</h1>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Your generous donation has been successfully submitted and is now listed in our available donations. 
              Someone in need will be able to request it soon.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/donations">
                  <Gift className="mr-2 h-4 w-4" />
                  View All Donations
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/donate">
                  Offer Another Donation
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-4 rounded-lg bg-muted/40">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mb-3">
                    <span className="font-semibold text-primary">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Your donation is listed</h3>
                  <p className="text-sm text-muted-foreground">
                    Your donation is now visible to those in need browsing the platform.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/40">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mb-3">
                    <span className="font-semibold text-primary">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Someone requests it</h3>
                  <p className="text-sm text-muted-foreground">
                    When someone wants your donation, you'll receive a notification with their details.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/40">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mb-3">
                    <span className="font-semibold text-primary">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Coordinate handover</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll arrange a convenient time and place to hand over your donation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-primary font-medium inline-flex items-center hover:underline">
              Return to Home
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Heart, Package, Calendar, MapPin, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonationCard, { DonationItem } from '@/components/DonationCard';
import RequestCard, { RequestItem } from '@/components/RequestCard';
import AnimatedElement from '@/components/AnimatedElement';

// Sample data
const featuredDonations: DonationItem[] = [
  {
    id: '1',
    title: 'Winter Clothing Package',
    category: 'Clothing',
    description: 'Gently used winter clothes including jackets, sweaters, and boots. Suitable for adults.',
    location: 'Brooklyn, NY',
    donorName: 'Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    postedDate: '2 days ago'
  },
  {
    id: '2',
    title: 'Non-perishable Food Items',
    category: 'Food',
    description: 'Assorted canned goods, pasta, rice, and other non-perishable items. All within expiry date.',
    location: 'Seattle, WA',
    donorName: 'Michael Chen',
    imageUrl: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    postedDate: '3 days ago'
  },
  {
    id: '3',
    title: 'Kids Toys and Books',
    category: 'Children',
    description: 'Collection of toys and books for children ages 3-8. All items are in excellent condition.',
    location: 'Chicago, IL',
    donorName: 'Emily Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80',
    postedDate: '1 week ago'
  }
];

const featuredRequests: RequestItem[] = [
  {
    id: '1',
    title: 'Need School Supplies for Children',
    category: 'Education',
    description: 'Looking for notebooks, pens, backpacks and other school supplies for three children starting school next month.',
    location: 'Portland, OR',
    requesterName: 'Lisa Patel',
    urgency: 'medium',
    postedDate: '4 days ago'
  },
  {
    id: '2',
    title: 'Wheelchair Assistance',
    category: 'Medical',
    description: 'In need of a wheelchair for elderly parent who recently had surgery. Temporary or permanent donation appreciated.',
    location: 'Austin, TX',
    requesterName: 'Robert Kim',
    urgency: 'high',
    postedDate: '1 day ago'
  }
];

export default function Index() {
  // For animation purposes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
        
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedElement animation="fade-up" delay={100}>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Connecting Generosity with Need
              </span>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={300}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Give What You Can,<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Receive What You Need
                </span>
              </h1>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={500}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                A platform that bridges the gap between those with resources to share
                and those in need of assistance, creating a community of support and kindness.
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="bounce-in" delay={700}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/donations" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow w-full sm:w-auto hover-shine overflow-hidden"
                >
                  <span className="flex items-center justify-center">
                    <Gift size={20} className="mr-2" />
                    I Want to Donate
                  </span>
                </Link>
                <Link 
                  to="/requests" 
                  className="px-6 py-3 rounded-full bg-white text-foreground font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow border border-border w-full sm:w-auto hover-lift"
                >
                  <span className="flex items-center justify-center">
                    <Heart size={20} className="mr-2" />
                    I Need Assistance
                  </span>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform simplifies the process of giving and receiving help, making it easy for people to connect and support each other.
              </p>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <AnimatedElement animation="fade-up" delay={200}>
              <div className="p-6 rounded-xl border border-border/50 text-center hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 hover-lift">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 pulse-soft">
                  <Gift size={30} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">List Your Donation</h3>
                <p className="text-muted-foreground">
                  Create a listing for items or services you'd like to donate, including details and photos.
                </p>
              </div>
            </AnimatedElement>
            
            {/* Step 2 */}
            <AnimatedElement animation="fade-up" delay={400}>
              <div className="p-6 rounded-xl border border-border/50 text-center hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 hover-lift">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 pulse-soft">
                  <Heart size={30} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Request Assistance</h3>
                <p className="text-muted-foreground">
                  Post your needs, whether it's clothing, food, or other forms of support, and get connected with donors.
                </p>
              </div>
            </AnimatedElement>
            
            {/* Step 3 */}
            <AnimatedElement animation="fade-up" delay={600}>
              <div className="p-6 rounded-xl border border-border/50 text-center hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 hover-lift">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 pulse-soft">
                  <Package size={30} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect & Share</h3>
                <p className="text-muted-foreground">
                  Connect with others in your community, arrange pick-ups or drop-offs, and share resources.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      
      {/* Featured Donations */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Donations</h2>
            <Link to="/donations" className="text-primary font-medium hover:underline">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDonations.map((donation, index) => (
              <DonationCard 
                key={donation.id} 
                donation={donation} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Requests */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Help Needed</h2>
            <Link to="/requests" className="text-primary font-medium hover:underline">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredRequests.map((request, index) => (
              <RequestCard 
                key={request.id} 
                request={request} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10 -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our community of givers and receivers today. Every donation, big or small, 
            can make a significant impact on someone's life.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/donations" 
              className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow w-full sm:w-auto"
            >
              Start Donating
            </Link>
            <Link 
              to="/requests" 
              className="px-6 py-3 rounded-full bg-white text-foreground font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow border border-border w-full sm:w-auto"
            >
              Request Help
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

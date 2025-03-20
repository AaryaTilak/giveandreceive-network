import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RequestCard from '@/components/RequestCard';
import { Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRequests } from '@/hooks/useRequests';

// Categories for filtering
const categories = [
  "All",
  "Clothing",
  "Food", 
  "Children",
  "Furniture",
  "Services",
  "Household",
  "Medical",
  "Electronics",
  "Education"
];

// Urgency levels for filtering
const urgencyLevels = [
  "All",
  "high",
  "medium",
  "low"
];

export default function Requests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const { requests } = useRequests();
  
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || request.category === selectedCategory;
    const matchesUrgency = selectedUrgency === 'All' || request.urgency === selectedUrgency;
    
    return matchesSearch && matchesCategory && matchesUrgency;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Requests</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse through requests from people in need of assistance.
              Find someone you can help today.
            </p>
            
            <Link to="/request" className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center mx-auto inline-flex">
              <Plus size={20} className="mr-2" />
              Create a Request
            </Link>
          </div>
        </section>
        
        {/* Filters and Search */}
        <section className="py-8 border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter by Category */}
              <div className="relative w-full md:w-52">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-muted-foreground" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Filter by Urgency */}
              <div className="relative w-full md:w-52">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-muted-foreground" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                >
                  {urgencyLevels.map(urgency => (
                    <option key={urgency} value={urgency}>
                      {urgency === 'All' ? 'All Urgency Levels' : 
                       `${urgency.charAt(0).toUpperCase() + urgency.slice(1)} Priority`}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Requests List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRequests.map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No requests found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                <Link 
                  to="/request" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all inline-flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Create a Request
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

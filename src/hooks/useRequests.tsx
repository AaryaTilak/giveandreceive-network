
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { RequestItem } from '@/components/RequestCard';

// Sample initial data
const initialRequests: RequestItem[] = [
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
  },
  {
    id: '3',
    title: 'Winter Coat for Teenager',
    category: 'Clothing',
    description: 'Looking for a warm winter coat for a 16-year-old boy. Size L/XL preferred.',
    location: 'Chicago, IL',
    requesterName: 'Maria Gonzalez',
    urgency: 'medium',
    postedDate: '3 days ago'
  },
  {
    id: '4',
    title: 'Basic Groceries Needed',
    category: 'Food',
    description: 'Family of four in need of basic groceries for the week. Any help with non-perishable items would be greatly appreciated.',
    location: 'Atlanta, GA',
    requesterName: 'James Wilson',
    urgency: 'high',
    postedDate: '1 day ago'
  },
  {
    id: '5',
    title: 'Furniture for New Apartment',
    category: 'Furniture',
    description: 'Recently moved into a new apartment and in need of basic furniture - a table, chairs, and a bed frame if possible.',
    location: 'San Francisco, CA',
    requesterName: 'Alex Johnson',
    urgency: 'low',
    postedDate: '1 week ago'
  },
  {
    id: '6',
    title: 'Math Tutoring for 8th Grader',
    category: 'Services',
    description: 'Looking for someone who can provide math tutoring for my 8th-grade daughter who is struggling with algebra.',
    location: 'Remote',
    requesterName: 'Patricia Lee',
    urgency: 'medium',
    postedDate: '5 days ago'
  }
];

interface RequestsContextType {
  requests: RequestItem[];
  addRequest: (request: Omit<RequestItem, 'id' | 'postedDate'>) => void;
  loading: boolean;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export function RequestsProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<RequestItem[]>(() => {
    const savedRequests = localStorage.getItem('requests');
    return savedRequests ? JSON.parse(savedRequests) : initialRequests;
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests));
  }, [requests]);

  const addRequest = (newRequest: Omit<RequestItem, 'id' | 'postedDate'>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const request: RequestItem = {
        ...newRequest,
        id: `${Date.now()}`,
        postedDate: 'Just now'
      };
      
      setRequests(prev => [request, ...prev]);
      setLoading(false);
      
      toast({
        title: "Request added successfully",
        description: "Your help request has been posted",
      });
    }, 1000);
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, loading }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (context === undefined) {
    return {
      requests: initialRequests,
      addRequest: (request: Omit<RequestItem, 'id' | 'postedDate'>) => console.warn('RequestsProvider not found'),
      loading: false
    };
  }
  return context;
}

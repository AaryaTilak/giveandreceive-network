
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Sample initial data
const initialRequests = [
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
    title: 'Winter Jackets for Family',
    category: 'Clothing',
    description: 'Family of four needs warm winter jackets for the upcoming cold season. Children ages 5 and 8, and two adults.',
    location: 'Denver, CO',
    requesterName: 'Maria Gonzalez',
    urgency: 'medium',
    postedDate: '2 days ago'
  },
  {
    id: '4',
    title: 'Baby Formula and Diapers',
    category: 'Children',
    description: 'Single mother in need of baby formula and size 2 diapers for 3-month-old baby.',
    location: 'Atlanta, GA',
    requesterName: 'Jasmine Taylor',
    urgency: 'high',
    postedDate: '7 hours ago'
  },
  {
    id: '5',
    title: 'Transportation Help for Medical Appointments',
    category: 'Services',
    description: 'Elderly person needs transportation assistance for weekly medical appointments for the next month.',
    location: 'Chicago, IL',
    requesterName: 'Harold Johnson',
    urgency: 'low',
    postedDate: '6 days ago'
  }
];

const RequestsContext = createContext(undefined);

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState(() => {
    const savedRequests = localStorage.getItem('requests');
    return savedRequests ? JSON.parse(savedRequests) : initialRequests;
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests));
  }, [requests]);

  const addRequest = (newRequest) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const request = {
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

  const editRequest = (updatedRequest) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRequests(prev => 
        prev.map(request => 
          request.id === updatedRequest.id ? updatedRequest : request
        )
      );
      setLoading(false);
      
      toast({
        title: "Request updated successfully",
        description: "Your help request has been updated",
      });
    }, 1000);
  };

  const deleteRequest = (id) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRequests(prev => prev.filter(request => request.id !== id));
      setLoading(false);
    }, 500);
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, editRequest, deleteRequest, loading }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (context === undefined) {
    return {
      requests: initialRequests,
      addRequest: (request) => console.warn('RequestsProvider not found'),
      editRequest: () => console.warn('RequestsProvider not found'),
      deleteRequest: () => console.warn('RequestsProvider not found'),
      loading: false
    };
  }
  return context;
}

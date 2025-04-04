
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

export interface RequestItem {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  requesterName: string;
  urgency: 'low' | 'medium' | 'high';
  postedDate: string;
}

// Sample initial data - will be replaced by data from API
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

const API_URL = 'http://localhost:5000/api/requests';

interface RequestsContextType {
  requests: RequestItem[];
  addRequest: (request: Omit<RequestItem, 'id' | 'postedDate'>) => void;
  editRequest: (request: RequestItem) => void;
  deleteRequest: (id: string) => void;
  loading: boolean;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export function RequestsProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(API_URL);
        // Map MongoDB _id to id for frontend compatibility
        const mappedRequests = response.data.map((request: any) => ({
          ...request,
          id: request._id
        }));
        setRequests(mappedRequests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setRequests(initialRequests); // Fallback to initial data if API fails
        setLoading(false);
        toast({
          title: "Connection error",
          description: "Could not connect to the server. Using sample data instead.",
          variant: "destructive",
        });
      }
    };

    fetchRequests();
  }, [toast]);

  const addRequest = async (newRequest: Omit<RequestItem, 'id' | 'postedDate'>) => {
    setLoading(true);
    
    try {
      const response = await axios.post(API_URL, newRequest);
      const addedRequest: RequestItem = { 
        ...response.data, 
        id: response.data._id,
        postedDate: 'Just now'
      };
      
      setRequests(prev => [addedRequest, ...prev]);
      
      toast({
        title: "Request added successfully",
        description: "Your help request has been posted",
      });
    } catch (error) {
      console.error('Error adding request:', error);
      toast({
        title: "Error",
        description: "Failed to add request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const editRequest = async (updatedRequest: RequestItem) => {
    setLoading(true);
    
    try {
      // Use MongoDB _id for API call
      const { id, ...requestData } = updatedRequest;
      await axios.put(`${API_URL}/${id}`, requestData);
      
      setRequests(prev => 
        prev.map(request => 
          request.id === id ? updatedRequest : request
        )
      );
      
      toast({
        title: "Request updated successfully",
        description: "Your help request has been updated",
      });
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Error",
        description: "Failed to update request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id: string) => {
    setLoading(true);
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRequests(prev => prev.filter(request => request.id !== id));
      
      toast({
        title: "Request deleted successfully",
        description: "Your help request has been removed",
      });
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "Failed to delete request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
      addRequest: (request: Omit<RequestItem, 'id' | 'postedDate'>) => console.warn('RequestsProvider not found'),
      editRequest: () => console.warn('RequestsProvider not found'),
      deleteRequest: () => console.warn('RequestsProvider not found'),
      loading: false
    };
  }
  return context;
}

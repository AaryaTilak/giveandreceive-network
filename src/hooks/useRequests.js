
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

// Sample initial data - will be replaced by data from API
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

const API_URL = 'http://localhost:5000/api/requests';

const RequestsContext = createContext(undefined);

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(API_URL);
        // Map MongoDB _id to id for frontend compatibility
        const mappedRequests = response.data.map(request => ({
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

  const addRequest = async (newRequest) => {
    setLoading(true);
    
    try {
      const response = await axios.post(API_URL, newRequest);
      const addedRequest = { ...response.data, id: response.data._id };
      
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

  const editRequest = async (updatedRequest) => {
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

  const deleteRequest = async (id) => {
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
      addRequest: (request) => console.warn('RequestsProvider not found'),
      editRequest: () => console.warn('RequestsProvider not found'),
      deleteRequest: () => console.warn('RequestsProvider not found'),
      loading: false
    };
  }
  return context;
}


import { useState } from 'react';

// Sample request data
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

export function useRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState(false);
  
  const addRequest = (requestData) => {
    setLoading(true);
    
    // In a real app, you would make an API call here
    setTimeout(() => {
      const newRequest = {
        id: String(Date.now()),
        ...requestData,
        postedDate: 'Just now'
      };
      
      setRequests(prevRequests => [newRequest, ...prevRequests]);
      setLoading(false);
    }, 500);
  };
  
  const editRequest = (updatedRequest) => {
    setLoading(true);
    
    // In a real app, you would make an API call here
    setTimeout(() => {
      setRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === updatedRequest.id ? updatedRequest : request
        )
      );
      
      setLoading(false);
    }, 500);
  };
  
  const deleteRequest = (id) => {
    setLoading(true);
    
    // In a real app, you would make an API call here
    setTimeout(() => {
      setRequests(prevRequests => 
        prevRequests.filter(request => request.id !== id)
      );
      
      setLoading(false);
    }, 500);
  };
  
  return { requests, loading, addRequest, editRequest, deleteRequest };
}

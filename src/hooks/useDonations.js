
import { useState } from 'react';

// Sample donation data
const initialDonations = [
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
  },
  {
    id: '4',
    title: 'Living Room Furniture Set',
    category: 'Furniture',
    description: 'Used but well-maintained sofa, coffee table, and side table. Must pick up.',
    location: 'Austin, TX',
    donorName: 'Robert Williams',
    imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    postedDate: '5 days ago'
  },
  {
    id: '5',
    title: 'English Tutoring Services',
    category: 'Education',
    description: 'Offering free English language tutoring for beginners. Two hours per week, virtual sessions.',
    location: 'Remote',
    donorName: 'Priya Patel',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80',
    postedDate: '1 day ago'
  },
  {
    id: '6',
    title: 'Kitchen Appliances',
    category: 'Household',
    description: 'Microwave and blender in working condition. Available for pickup this weekend.',
    location: 'Portland, OR',
    donorName: 'David Kim',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80',
    postedDate: '4 days ago'
  }
];

export function useDonations() {
  const [donations, setDonations] = useState(initialDonations);
  const [loading, setLoading] = useState(false);

  const addDonation = (donationData) => {
    setLoading(true);
    
    // In a real app, you would make an API call here
    setTimeout(() => {
      const newDonation = {
        id: String(Date.now()),
        ...donationData,
        postedDate: 'Just now'
      };
      
      setDonations(prevDonations => [newDonation, ...prevDonations]);
      setLoading(false);
    }, 500);
  };

  const editDonation = (updatedDonation) => {
    setLoading(true);
    
    // In a real app, you would make an API call here
    setTimeout(() => {
      setDonations(prevDonations => 
        prevDonations.map(donation => 
          donation.id === updatedDonation.id ? updatedDonation : donation
        )
      );
      
      setLoading(false);
    }, 500);
  };

  const deleteDonation = (id) => {
    setLoading(true);
    
    // In a real app, you would make an API call here
    setTimeout(() => {
      setDonations(prevDonations => 
        prevDonations.filter(donation => donation.id !== id)
      );
      
      setLoading(false);
    }, 500);
  };

  return { donations, loading, addDonation, editDonation, deleteDonation };
}

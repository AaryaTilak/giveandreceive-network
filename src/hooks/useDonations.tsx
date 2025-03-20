
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface DonationItem {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  donorName: string;
  imageUrl: string;
  postedDate: string;
}

// Sample initial data
const initialDonations: DonationItem[] = [
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
    title: 'Office Desk and Chair',
    category: 'Furniture',
    description: 'Lightly used office desk and ergonomic chair. Perfect for a home office setup.',
    location: 'Austin, TX',
    donorName: 'David Wilson',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80',
    postedDate: '5 days ago'
  },
  {
    id: '5',
    title: 'Professional Resume Service',
    category: 'Services',
    description: 'Offering free resume review and editing services to help with job applications.',
    location: 'Remote',
    donorName: 'Jennifer Adams',
    imageUrl: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    postedDate: '1 week ago'
  },
  {
    id: '6',
    title: 'Kitchen Appliances',
    category: 'Household',
    description: 'Various kitchen appliances including toaster, blender, and microwave. All in working condition.',
    location: 'Denver, CO',
    donorName: 'Thomas Lee',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    postedDate: '2 weeks ago'
  }
];

interface DonationsContextType {
  donations: DonationItem[];
  addDonation: (donation: Omit<DonationItem, 'id' | 'postedDate'>) => void;
  loading: boolean;
}

const DonationsContext = createContext<DonationsContextType | undefined>(undefined);

export function DonationsProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<DonationItem[]>(() => {
    const savedDonations = localStorage.getItem('donations');
    return savedDonations ? JSON.parse(savedDonations) : initialDonations;
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('donations', JSON.stringify(donations));
  }, [donations]);

  const addDonation = (newDonation: Omit<DonationItem, 'id' | 'postedDate'>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const donation: DonationItem = {
        ...newDonation,
        id: `${Date.now()}`,
        postedDate: 'Just now'
      };
      
      setDonations(prev => [donation, ...prev]);
      setLoading(false);
      
      toast({
        title: "Donation added successfully",
        description: "Your donation has been added to the listings",
      });
    }, 1000);
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation, loading }}>
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationsContext);
  if (context === undefined) {
    return {
      donations: initialDonations,
      addDonation: () => console.warn('DonationsProvider not found'),
      loading: false
    };
  }
  return context;
}

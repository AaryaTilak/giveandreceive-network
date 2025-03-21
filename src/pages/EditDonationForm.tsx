
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Gift,
  Check
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useDonations } from '@/hooks/useDonations';

// List of categories
const categories = [
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

// Form validation schema
const formSchema = z.object({
  id: z.string(),
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  category: z.string().refine(val => categories.includes(val), { message: "Please select a valid category" }),
  location: z.string().min(3, { message: "Location is required" }),
  donorName: z.string().min(3, { message: "Your name is required" }),
  imageUrl: z.string().url({ message: "Please provide a valid image URL" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditDonationForm() {
  const navigate = useNavigate();
  const { editDonation, loading } = useDonations();
  const [previewImage, setPreviewImage] = useState('');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      title: '',
      description: '',
      category: '',
      location: '',
      donorName: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    // Load the donation data from localStorage
    const donationData = localStorage.getItem('editDonation');
    if (donationData) {
      const donation = JSON.parse(donationData);
      form.reset(donation);
      setPreviewImage(donation.imageUrl);
    } else {
      navigate('/profile');
    }
  }, [form, navigate]);

  const onSubmit = (values: FormValues) => {
    editDonation({
      id: values.id,
      title: values.title,
      category: values.category,
      description: values.description,
      location: values.location,
      donorName: values.donorName,
      imageUrl: values.imageUrl,
      postedDate: 'Updated just now' // This would typically be handled by the backend
    });
    
    localStorage.removeItem('editDonation');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/profile')} 
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Edit Donation</h1>
              <p className="text-muted-foreground">
                Update the details of your donation listing
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Hidden ID field */}
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <input type="hidden" {...field} />
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Donation Details</h2>
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a descriptive title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              {...field}
                            >
                              {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about the item or service you're donating" 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Image Update Section */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Image</h2>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-1/2">
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          {previewImage && (
                            <img 
                              src={previewImage} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                      
                      <div className="w-full sm:w-1/2 space-y-4">
                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image URL</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter image URL" 
                                  {...field} 
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setPreviewImage(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Donor Information Section */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                    
                    <FormField
                      control={form.control}
                      name="donorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    <Check className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

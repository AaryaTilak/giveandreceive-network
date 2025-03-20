
import { useState } from 'react';
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
  Upload,
  Loader2
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
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  category: z.string().refine(val => categories.includes(val), { message: "Please select a valid category" }),
  location: z.string().min(3, { message: "Location is required" }),
  donorName: z.string().min(3, { message: "Your name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  imageUrl: z.string().url({ message: "Please provide a valid image URL" }),
});

type FormValues = z.infer<typeof formSchema>;

// Default image placeholders
const defaultImages = [
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
  'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8',
  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4',
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
  'https://images.unsplash.com/photo-1586282391129-76a6df230234',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f'
];

export default function DonationForm() {
  const navigate = useNavigate();
  const { addDonation, loading } = useDonations();
  const [previewImage, setPreviewImage] = useState(defaultImages[0]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Clothing',
      location: '',
      donorName: '',
      email: '',
      phone: '',
      imageUrl: defaultImages[0],
    },
  });

  const onSubmit = (values: FormValues) => {
    addDonation({
      title: values.title,
      category: values.category,
      description: values.description,
      location: values.location,
      donorName: values.donorName,
      imageUrl: values.imageUrl,
    });
    
    setTimeout(() => {
      navigate('/donation-success');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Offer a Donation</h1>
              <p className="text-muted-foreground">
                Fill out the form below to offer an item or service you'd like to donate.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Donation Details Section */}
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
                  
                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Add an Image</h2>
                    
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
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Or select from samples:</p>
                          <div className="grid grid-cols-3 gap-2">
                            {defaultImages.map((url, index) => (
                              <button
                                key={index}
                                type="button"
                                className="aspect-square rounded-md overflow-hidden border border-input hover:border-primary transition-colors"
                                onClick={() => {
                                  form.setValue('imageUrl', url);
                                  setPreviewImage(url);
                                }}
                              >
                                <img 
                                  src={url} 
                                  alt={`Sample ${index + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Donor Information Section */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Your Information</h2>
                    
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Gift className="mr-2 h-4 w-4" />
                        Submit Donation
                      </>
                    )}
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


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRequests } from '@/hooks/useRequests';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { MapPin, HelpCircle, User, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Categories for help requests
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

// Urgency levels
const urgencyLevels = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" }
];

// Form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description cannot exceed 500 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  requesterName: z.string().min(2, "Name must be at least 2 characters"),
  urgency: z.enum(["low", "medium", "high"]),
});

// This ensures the form values match what addRequest expects
type FormValues = z.infer<typeof formSchema>;

export default function RequestForm() {
  const { addRequest, loading } = useRequests();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      location: "",
      requesterName: "",
      urgency: "medium",
    },
  });

  const onSubmit = (values: FormValues) => {
    try {
      // TypeScript knows that values from a validated form will have all required fields
      addRequest(values);
      navigate('/request-success');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Submit a Help Request</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below to let people know what you need. Be specific so donors can understand exactly how they can help.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Request Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Request Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="E.g., Need winter clothes for children"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <select
                            className="w-full h-10 px-3 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            {...field}
                          >
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what you need in detail..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              className="pl-10"
                              placeholder="E.g., Boston, MA or Remote"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Requester Name */}
                  <FormField
                    control={form.control}
                    name="requesterName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              className="pl-10"
                              placeholder="Your full name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Urgency Level */}
                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency Level</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <select
                              className="w-full h-10 pl-10 px-3 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              {...field}
                            >
                              {urgencyLevels.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Privacy Note */}
                  <div className="bg-primary/5 p-4 rounded-lg text-sm text-muted-foreground">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <p>
                        Your name and location will be visible to other users. Please do not share sensitive personal information in the description field.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Help Request"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

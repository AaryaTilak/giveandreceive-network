
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Loader2 } from "lucide-react";
import AnimatedElement from '@/components/AnimatedElement';

// Define validation schemas for each settings section
const generalSettingsSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters" }),
  contactEmail: z.string().email({ message: "Please enter a valid email" }),
  notificationsEnabled: z.boolean().default(true),
});

const donationSettingsSchema = z.object({
  newDonationNotifications: z.boolean().default(true),
  autoApprove: z.boolean().default(false),
  maxDonationItems: z.coerce.number().int().min(1).max(100).default(10),
});

const requestSettingsSchema = z.object({
  newRequestNotifications: z.boolean().default(true),
  requestVerification: z.boolean().default(true),
  maxRequestsPerUser: z.coerce.number().int().min(1).max(10).default(3),
});

type GeneralSettingsFormValues = z.infer<typeof generalSettingsSchema>;
type DonationSettingsFormValues = z.infer<typeof donationSettingsSchema>;
type RequestSettingsFormValues = z.infer<typeof requestSettingsSchema>;

export default function AdminSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize forms with default values
  const generalForm = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: "Community Aid Network",
      contactEmail: "admin@example.com",
      notificationsEnabled: true,
    },
  });

  const donationForm = useForm<DonationSettingsFormValues>({
    resolver: zodResolver(donationSettingsSchema),
    defaultValues: {
      newDonationNotifications: true,
      autoApprove: false,
      maxDonationItems: 10,
    },
  });

  const requestForm = useForm<RequestSettingsFormValues>({
    resolver: zodResolver(requestSettingsSchema),
    defaultValues: {
      newRequestNotifications: true,
      requestVerification: true,
      maxRequestsPerUser: 3,
    },
  });

  const onSubmitGeneral = async (data: GeneralSettingsFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would save to your backend
      console.log("Saving general settings:", data);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      toast({
        title: "Settings Updated",
        description: "Your general settings have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your settings.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitDonation = async (data: DonationSettingsFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Saving donation settings:", data);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      toast({
        title: "Settings Updated",
        description: "Your donation settings have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your settings.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitRequest = async (data: RequestSettingsFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Saving request settings:", data);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      toast({
        title: "Settings Updated",
        description: "Your request settings have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your settings.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatedElement animation="fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your application settings and preferences
            </p>
          </div>
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fade-up" delay={100}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="requests">Help Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Form {...generalForm}>
              <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)}>
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure basic application settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The name displayed throughout the application
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormDescription>
                            Main admin contact email for notifications
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="notificationsEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Email Notifications</FormLabel>
                            <FormDescription>
                              Receive email notifications for important events
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="donations" className="space-y-4">
            <Form {...donationForm}>
              <form onSubmit={donationForm.handleSubmit(onSubmitDonation)}>
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Settings</CardTitle>
                    <CardDescription>
                      Configure how donations are managed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={donationForm.control}
                      name="newDonationNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>New Donation Notifications</FormLabel>
                            <FormDescription>
                              Receive notifications when new donations are added
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={donationForm.control}
                      name="autoApprove"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Auto Approve Donations</FormLabel>
                            <FormDescription>
                              Automatically approve new donations without review
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={donationForm.control}
                      name="maxDonationItems"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Donation Items</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min={1} max={100} />
                          </FormControl>
                          <FormDescription>
                            Maximum number of items allowed per donation
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Form {...requestForm}>
              <form onSubmit={requestForm.handleSubmit(onSubmitRequest)}>
                <Card>
                  <CardHeader>
                    <CardTitle>Help Request Settings</CardTitle>
                    <CardDescription>
                      Configure how help requests are managed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={requestForm.control}
                      name="newRequestNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>New Request Notifications</FormLabel>
                            <FormDescription>
                              Receive notifications when new help requests are submitted
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={requestForm.control}
                      name="requestVerification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Request Verification</FormLabel>
                            <FormDescription>
                              Require verification for new help requests
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={requestForm.control}
                      name="maxRequestsPerUser"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Requests Per User</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min={1} max={10} />
                          </FormControl>
                          <FormDescription>
                            Maximum number of active requests allowed per user
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </AnimatedElement>
    </div>
  );
}

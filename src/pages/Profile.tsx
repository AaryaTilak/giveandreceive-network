
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useDonations, DonationItem } from '@/hooks/useDonations';
import { useRequests, RequestItem } from '@/hooks/useRequests';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pen, Trash, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function Profile() {
  const { donations, editDonation, deleteDonation } = useDonations();
  const { requests, editRequest, deleteRequest } = useRequests();
  const { toast } = useToast();
  const navigate = useNavigate();
  // Simulate a user ID - in a real app this would come from auth
  const currentUserId = "current-user";
  
  // Filter items that belong to the current user (in a real app, we'd use the actual user name from auth)
  // Here we're simulating by assuming all items belong to the current user
  const userDonations = donations;
  const userRequests = requests;

  const handleDeleteDonation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      deleteDonation(id);
      toast({
        title: "Donation deleted",
        description: "Your donation has been removed from the listings",
      });
    }
  };

  const handleDeleteRequest = (id: string) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      deleteRequest(id);
      toast({
        title: "Request deleted",
        description: "Your request has been removed from the listings",
      });
    }
  };

  const handleEditDonation = (donation: DonationItem) => {
    // Navigate to edit page - in a real app you would pass the ID in the URL
    // For now we'll use localStorage to pass the data
    localStorage.setItem('editDonation', JSON.stringify(donation));
    navigate('/edit-donation');
  };

  const handleEditRequest = (request: RequestItem) => {
    localStorage.setItem('editRequest', JSON.stringify(request));
    navigate('/edit-request');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your donations and help requests
            </p>
          </div>
          
          <Tabs defaultValue="donations" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="requests">My Help Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donations" className="space-y-8">
              {userDonations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't created any donations yet</p>
                  <Button asChild>
                    <Link to="/donate">Create a Donation</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Your Donations</h2>
                    <Button asChild>
                      <Link to="/donate">Add New Donation</Link>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userDonations.map((donation) => (
                      <Card key={donation.id} className="hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={donation.imageUrl} 
                            alt={donation.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{donation.title}</CardTitle>
                            <Badge>{donation.category}</Badge>
                          </div>
                          <CardDescription className="line-clamp-2">
                            {donation.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground pb-2">
                          Posted: {donation.postedDate}
                        </CardContent>
                        <CardFooter className="pt-2 gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleEditDonation(donation)}
                          >
                            <Pen className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => handleDeleteDonation(donation.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="requests" className="space-y-8">
              {userRequests.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't created any help requests yet</p>
                  <Button asChild>
                    <Link to="/request">Create a Help Request</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Your Help Requests</h2>
                    <Button asChild>
                      <Link to="/request">Add New Request</Link>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userRequests.map((request) => (
                      <Card key={request.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{request.title}</CardTitle>
                            <div className="flex gap-2">
                              <Badge>{request.category}</Badge>
                              <Badge variant={
                                request.urgency === 'high' ? 'destructive' : 
                                request.urgency === 'medium' ? 'default' : 'outline'
                              }>
                                {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <CardDescription className="line-clamp-2">
                            {request.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground pb-2">
                          Posted: {request.postedDate}
                        </CardContent>
                        <CardFooter className="pt-2 gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleEditRequest(request)}
                          >
                            <Pen className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => handleDeleteRequest(request.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

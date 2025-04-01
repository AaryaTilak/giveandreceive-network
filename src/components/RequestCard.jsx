
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, AlertTriangle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function RequestCard({ request }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form data collection would happen here
    const formData = new FormData(e.currentTarget);
    const offerData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      requestId: request.id,
      requestTitle: request.title
    };

    // Simulate API call
    setTimeout(() => {
      console.log("Offer submitted:", offerData);
      setIsSubmitting(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Offer submitted successfully",
        description: "The requester will be notified of your offer to help.",
      });
    }, 1000);
  };

  // Determine urgency badge style
  const urgencyVariant = 
    request.urgency === 'high' ? 'destructive' : 
    request.urgency === 'medium' ? 'default' : 
    'outline';
  
  return (
    <div className="card-hover rounded-xl overflow-hidden bg-white shadow-sm border animate-scale-in hover-lift">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg line-clamp-1">{request.title}</h3>
          <div className="flex gap-2">
            <Badge>{request.category}</Badge>
            <Badge variant={urgencyVariant} className="capitalize">
              {request.urgency}
            </Badge>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{request.description}</p>
        
        <div className="flex flex-col space-y-2 text-sm mb-4">
          <div className="flex items-center text-muted-foreground">
            <MapPin size={16} className="mr-2" />
            <span>{request.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <User size={16} className="mr-2" />
            <span>{request.requesterName}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar size={16} className="mr-2" />
            <span>{request.postedDate}</span>
          </div>
        </div>
        
        {request.urgency === 'high' && (
          <div className="mb-4 p-2 bg-destructive/10 rounded-md flex items-start">
            <AlertTriangle size={16} className="mr-2 text-destructive shrink-0 mt-0.5" />
            <span className="text-xs text-destructive">This request is marked as high priority and needs immediate assistance.</span>
          </div>
        )}
        
        <Button 
          className="w-full"
          onClick={() => setIsDialogOpen(true)}
        >
          Offer Help
        </Button>
      </div>

      {/* Offer Help Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Offer Help for "{request.title}"</DialogTitle>
            <DialogDescription>
              Your contact information will be shared with the requester so they can coordinate with you.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Your Information</h4>
              
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Your full name" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email" name="email" type="email" placeholder="Your email" className="pl-9" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" name="phone" type="tel" placeholder="Your phone number" className="pl-9" required />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                name="message" 
                placeholder="Explain how you can help with this request..."
                className="h-24"
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Offer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

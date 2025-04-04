
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";
import { DonationItem } from "@/hooks/useDonations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

interface DonationCardProps {
  donation: DonationItem;
}

export default function DonationCard({ donation }: DonationCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form data collection
    const formData = new FormData(e.currentTarget);
    const requestData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      transferMethod: formData.get("transferMethod") as string,
      additionalInfo: formData.get("additionalInfo") as string,
      donationId: donation.id,
      donationTitle: donation.title,
    };

    // Simulate API call
    setTimeout(() => {
      console.log("Request submitted:", requestData);
      setIsSubmitting(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Request submitted successfully",
        description: "The donor will be notified of your request.",
      });
    }, 1000);
  };

  return (
    <div className="card-hover rounded-xl overflow-hidden bg-white animate-scale-in hover-lift">
      <div className="relative h-48 overflow-hidden hover-shine">
        <img
          src={donation.imageUrl}
          alt={donation.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-accent text-white hover:bg-accent/90 pulse-soft">{donation.category}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{donation.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{donation.description}</p>
        
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin size={16} className="mr-2" />
            <span>{donation.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <User size={16} className="mr-2" />
            <span>{donation.donorName}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar size={16} className="mr-2" />
            <span>{donation.postedDate}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            className="w-full btn-primary py-2 px-4 hover-shine overflow-hidden block text-center"
            onClick={() => setIsDialogOpen(true)}
          >
            Request This Item
          </Button>
        </div>
      </div>

      {/* Request Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request "{donation.title}"</DialogTitle>
            <DialogDescription>
              Please provide your details to request this donation.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Information */}
            <div className="space-y-2">
              <h4 className="font-medium">Contact Information</h4>
              
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Your full name" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Your email" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="Your phone number" required />
                </div>
              </div>
            </div>

            {/* Location & Transfer Method */}
            <div className="space-y-2">
              <h4 className="font-medium">Location & Transfer Details</h4>
              
              <div>
                <Label htmlFor="address">Your Address</Label>
                <Textarea 
                  id="address" 
                  name="address" 
                  placeholder="Your full address"
                  required
                />
              </div>

              <div>
                <Label>Transfer Method</Label>
                <RadioGroup defaultValue="pickup" name="transferMethod" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">I can pick up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">I need delivery</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea 
                id="additionalInfo" 
                name="additionalInfo" 
                placeholder="Any specific requirements or questions..."
                className="h-24"
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

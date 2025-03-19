
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";

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

interface DonationCardProps {
  donation: DonationItem;
}

export default function DonationCard({ donation }: DonationCardProps) {
  return (
    <div className="card-hover rounded-xl overflow-hidden bg-white animate-scale-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={donation.imageUrl}
          alt={donation.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-white hover:bg-primary/90">{donation.category}</Badge>
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
          <button className="w-full btn-primary py-2 px-4">
            Request This Item
          </button>
        </div>
      </div>
    </div>
  );
}

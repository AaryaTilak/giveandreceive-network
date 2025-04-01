
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";

export default function RequestCard({ request }) {
  const urgencyColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };
  
  return (
    <div className="card-hover rounded-xl overflow-hidden bg-white animate-scale-in">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge className="bg-primary hover:bg-primary/90">{request.category}</Badge>
          <Badge className={`${urgencyColors[request.urgency]} hover:${urgencyColors[request.urgency]}/90`}>
            {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
          </Badge>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{request.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{request.description}</p>
        
        <div className="flex flex-col space-y-2 text-sm">
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
        
        <div className="mt-6">
          <button className="w-full btn-primary py-2 px-4">
            I Can Help
          </button>
        </div>
      </div>
    </div>
  );
}

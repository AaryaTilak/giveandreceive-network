
import React from 'react';
import { useRequests } from '@/hooks/useRequests';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AnimatedElement from "@/components/AnimatedElement";

export default function AdminRequests() {
  const { requests, deleteRequest } = useRequests();

  const handleDeleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      deleteRequest(id);
      toast.success("Request deleted successfully");
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div>
      <AnimatedElement animation="fade-up">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Available Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{request.category}</Badge>
                    </TableCell>
                    <TableCell>{request.requesterName}</TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.postedDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {requests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No requests available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </AnimatedElement>
    </div>
  );
}

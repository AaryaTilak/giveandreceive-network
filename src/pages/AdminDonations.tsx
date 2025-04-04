
import React from 'react';
import { useDonations } from '@/hooks/useDonations';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AnimatedElement from "@/components/AnimatedElement";

export default function AdminDonations() {
  const { donations, deleteDonation } = useDonations();

  const handleDeleteDonation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      deleteDonation(id);
      toast.success("Donation deleted successfully");
    }
  };

  return (
    <div>
      <AnimatedElement animation="fade-up">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Available Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{donation.category}</Badge>
                    </TableCell>
                    <TableCell>{donation.donorName}</TableCell>
                    <TableCell>{donation.location}</TableCell>
                    <TableCell>{donation.postedDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteDonation(donation.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {donations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No donations available
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

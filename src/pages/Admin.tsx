
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, Coins, Gift, Users, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AnimatedElement from "@/components/AnimatedElement";

// Sample Data - In a real app, this would come from an API
const donationStats = {
  totalDonations: 1250,
  completedDonations: 985,
  pendingRequests: 125,
  activeUsers: 420
};

const monthlyDonations = [
  { name: 'Jan', donations: 65, requests: 40 },
  { name: 'Feb', donations: 75, requests: 55 },
  { name: 'Mar', donations: 90, requests: 70 },
  { name: 'Apr', donations: 110, requests: 85 },
  { name: 'May', donations: 120, requests: 90 },
  { name: 'Jun', donations: 135, requests: 95 },
  { name: 'Jul', donations: 155, requests: 105 },
  { name: 'Aug', donations: 165, requests: 110 },
  { name: 'Sep', donations: 180, requests: 125 },
  { name: 'Oct', donations: 195, requests: 130 },
  { name: 'Nov', donations: 205, requests: 145 },
  { name: 'Dec', donations: 230, requests: 160 },
];

const categoryData = [
  { name: 'Clothing', value: 35 },
  { name: 'Food', value: 25 },
  { name: 'Electronics', value: 15 },
  { name: 'Furniture', value: 10 },
  { name: 'Books', value: 8 },
  { name: 'Toys', value: 7 },
];

const recentDonors = [
  { id: 1, name: 'Sarah Johnson', donations: 12, location: 'New York', lastDonation: '2023-11-15' },
  { id: 2, name: 'Michael Chen', donations: 8, location: 'San Francisco', lastDonation: '2023-11-12' },
  { id: 3, name: 'Emily Davis', donations: 15, location: 'Chicago', lastDonation: '2023-11-08' },
  { id: 4, name: 'David Wilson', donations: 6, location: 'Austin', lastDonation: '2023-11-05' },
  { id: 5, name: 'Sophia Martinez', donations: 10, location: 'Miami', lastDonation: '2023-11-02' },
];

const recentRequests = [
  { id: 1, name: 'James Brown', category: 'Clothing', status: 'Pending', requestDate: '2023-11-14' },
  { id: 2, name: 'Olivia Taylor', category: 'Food', status: 'Completed', requestDate: '2023-11-13' },
  { id: 3, name: 'William Lee', category: 'Electronics', status: 'Pending', requestDate: '2023-11-11' },
  { id: 4, name: 'Emma Harris', category: 'Furniture', status: 'Completed', requestDate: '2023-11-09' },
  { id: 5, name: 'Daniel Clark', category: 'Books', status: 'Completed', requestDate: '2023-11-07' },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Admin() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <AnimatedElement animation="fade-up" className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor donation statistics and user activity</p>
      </AnimatedElement>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnimatedElement animation="fade-up" delay={100}>
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{donationStats.totalDonations}</div>
                <div className="text-xs inline-flex items-center rounded-md bg-emerald-100 px-2 py-1 font-medium text-emerald-700">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  12%
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
        
        <AnimatedElement animation="fade-up" delay={200}>
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Donations</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{donationStats.completedDonations}</div>
                <div className="text-xs inline-flex items-center rounded-md bg-emerald-100 px-2 py-1 font-medium text-emerald-700">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  8%
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
        
        <AnimatedElement animation="fade-up" delay={300}>
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donationStats.pendingRequests}</div>
            </CardContent>
          </Card>
        </AnimatedElement>
        
        <AnimatedElement animation="fade-up" delay={400}>
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donationStats.activeUsers}</div>
            </CardContent>
          </Card>
        </AnimatedElement>
      </div>
      
      {/* Charts and Tables */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donors">Donors</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedElement animation="fade-up">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Monthly Donation Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={{
                      donations: { label: "Donations", color: "#0088FE" },
                      requests: { label: "Requests", color: "#00C49F" }
                    }}>
                      <LineChart data={monthlyDonations}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="donations" 
                          stroke="#0088FE" 
                          name="donations"
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="requests" 
                          stroke="#00C49F" 
                          name="requests"
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={100}>
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Donation Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </TabsContent>
        
        <TabsContent value="donors">
          <AnimatedElement animation="fade-up">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Top Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Total Donations</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Donation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDonors.map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell className="font-medium">{donor.name}</TableCell>
                        <TableCell>{donor.donations}</TableCell>
                        <TableCell>{donor.location}</TableCell>
                        <TableCell>{new Date(donor.lastDonation).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </AnimatedElement>
        </TabsContent>
        
        <TabsContent value="requests">
          <AnimatedElement animation="fade-up">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Requester</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Request Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.category}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </AnimatedElement>
        </TabsContent>
      </Tabs>
      
      {/* Activity Feed */}
      <AnimatedElement animation="fade-up">
        <Card className="hover-lift mb-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-0.5">
                  <span className="flex h-2 w-2 rounded-full bg-sky-500"></span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">New donation added</p>
                  <p className="text-sm text-muted-foreground">Michael Chen donated a laptop</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start">
                <div className="mr-4 mt-0.5">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Request completed</p>
                  <p className="text-sm text-muted-foreground">Emma Harris received furniture donation</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start">
                <div className="mr-4 mt-0.5">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">New request registered</p>
                  <p className="text-sm text-muted-foreground">William Lee requested electronics</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedElement>
    </div>
  );
}

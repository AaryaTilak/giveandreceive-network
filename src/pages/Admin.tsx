
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDonations } from '@/hooks/useDonations';
import { useRequests } from '@/hooks/useRequests';
import { BarChart3, Gift, HeartHandshake, Users, PieChart } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         PieChart as RPieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function Admin() {
  const { donations } = useDonations();
  const { requests } = useRequests();

  const stats = [
    {
      title: 'Total Donations',
      value: donations.length,
      icon: Gift,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      link: '/admin/donations',
    },
    {
      title: 'Total Requests',
      value: requests.length,
      icon: HeartHandshake,
      color: 'text-rose-500',
      bgColor: 'bg-rose-100',
      link: '/admin/requests',
    },
    {
      title: 'Active Users',
      value: 24, // Mock data
      icon: Users,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100',
      link: '#',
    },
    {
      title: 'Completed Matches',
      value: 18, // Mock data
      icon: BarChart3,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100',
      link: '#',
    },
  ];
  
  // Recent activity (mock data)
  const recentActivity = [
    { 
      id: 1, 
      action: "New donation added", 
      description: "Winter clothing package", 
      time: "2 hours ago" 
    },
    { 
      id: 2, 
      action: "New request submitted", 
      description: "Food assistance needed", 
      time: "5 hours ago" 
    },
    { 
      id: 3, 
      action: "Donation matched", 
      description: "School supplies donated to family", 
      time: "Yesterday" 
    },
    { 
      id: 4, 
      action: "New user registered", 
      description: "Emily R. joined the platform", 
      time: "2 days ago" 
    },
  ];

  // Mock data for charts
  const userActivityData = [
    { name: 'Jan', donations: 4, requests: 2, users: 5 },
    { name: 'Feb', donations: 6, requests: 4, users: 8 },
    { name: 'Mar', donations: 8, requests: 7, users: 10 },
    { name: 'Apr', donations: 10, requests: 8, users: 12 },
    { name: 'May', donations: 7, requests: 5, users: 9 },
    { name: 'Jun', donations: 9, requests: 6, users: 14 },
  ];

  const donationCategoryData = [
    { name: 'Clothing', value: 35 },
    { name: 'Food', value: 25 },
    { name: 'Furniture', value: 15 },
    { name: 'Electronics', value: 10 },
    { name: 'Books', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const chartConfig = {
    donations: { label: "Donations", color: "#0088FE" },
    requests: { label: "Requests", color: "#00C49F" },
    users: { label: "New Users", color: "#FFBB28" },
  };

  return (
    <div className="space-y-6">
      <AnimatedElement animation="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index} className="block hover:no-underline">
              <Card className="hover-lift transition-all hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </AnimatedElement>
      
      {/* Statistical Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedElement animation="fade-up" delay={100}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-[4/3]">
                <LineChart data={userActivityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="donations" 
                    stroke="var(--color-donations)" 
                    name="Donations" 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="var(--color-requests)" 
                    name="Requests" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="var(--color-users)" 
                    name="New Users"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={200}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Donation Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RPieChart>
                    <Pie
                      data={donationCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {donationCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </RPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <AnimatedElement animation="fade-up" delay={300}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donations.slice(0, 4).map((donation) => (
                  <div key={donation.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{donation.title}</p>
                      <p className="text-sm text-muted-foreground">{donation.donorName}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{donation.postedDate}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
        
        {/* Recent Activity */}
        <AnimatedElement animation="fade-up" delay={400}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
      </div>
    </div>
  );
}

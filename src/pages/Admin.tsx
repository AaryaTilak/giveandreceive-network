
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDonations } from '@/hooks/useDonations';
import { useRequests } from '@/hooks/useRequests';
import { BarChart3, Gift, HeartHandshake, Users } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import { Link } from 'react-router-dom';

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <AnimatedElement animation="fade-up" delay={200}>
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
        <AnimatedElement animation="fade-up" delay={300}>
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

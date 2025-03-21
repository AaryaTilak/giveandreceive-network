
import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const { isAdmin, logout, user } = useAuth();
  const location = useLocation();
  
  // Redirect to home if not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  const currentPath = location.pathname;
  
  return (
    <div className="flex h-screen bg-muted/10">
      <AdminSidebar className="w-64 hidden md:block" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="bg-background border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>
        
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-4">
            <Tabs value={
              currentPath === "/admin" ? "dashboard" :
              currentPath === "/admin/donations" ? "donations" :
              currentPath === "/admin/requests" ? "requests" : "dashboard"
            } className="mb-6">
              <TabsList className="w-full border-b bg-transparent">
                <TabsTrigger value="dashboard" asChild>
                  <Link to="/admin" className={`px-4 py-2 ${currentPath === '/admin' ? 'border-b-2 border-primary' : ''}`}>
                    Dashboard
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="donations" asChild>
                  <Link to="/admin/donations" className={`px-4 py-2 ${currentPath === '/admin/donations' ? 'border-b-2 border-primary' : ''}`}>
                    Available Donations
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="requests" asChild>
                  <Link to="/admin/requests" className={`px-4 py-2 ${currentPath === '/admin/requests' ? 'border-b-2 border-primary' : ''}`}>
                    Available Requests
                  </Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

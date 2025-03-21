
import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminLayout() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  
  // Redirect to home if not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  const currentPath = location.pathname;
  
  return (
    <div className="flex h-screen">
      <AdminSidebar className="w-64 hidden md:block" />
      <div className="flex-1 overflow-auto bg-muted/20">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          
          <Tabs value={
            currentPath === "/admin" ? "dashboard" :
            currentPath === "/admin/donations" ? "donations" :
            currentPath === "/admin/requests" ? "requests" : "dashboard"
          } className="mb-6">
            <TabsList className="w-full border-b">
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
  );
}

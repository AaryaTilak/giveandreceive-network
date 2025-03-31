
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const { isAdmin, logout, user } = useAuth();
  
  // Redirect to home if not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
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
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <AdminSidebar className="w-64 hidden md:block" />
      <div className="flex-1 overflow-auto bg-muted/20">
        <Outlet />
      </div>
    </div>
  );
}

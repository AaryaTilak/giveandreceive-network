import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { BarChart3, Gift, UserCircle, Settings, LogOut } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  className?: string;
}

export default function AdminSidebar({ className }: AdminSidebarProps) {
  const location = useLocation();
  
  const mainNavItems = [
    { icon: BarChart3, label: "Dashboard", href: "/admin" },
    { icon: Gift, label: "Donations", href: "/admin/donations" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];
  
  const otherNavItems = [
    { icon: LogOut, label: "Logout", href: "/logout" },
  ];

  return (
    <div className={cn("flex flex-col h-screen bg-white border-r", className)}>
      <div className="p-4">
        <div className="flex items-center">
          <UserCircle className="w-8 h-8 text-primary mr-2" />
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="px-2 space-y-1">
          {mainNavItems.map((item) => (
            <NavLink 
              key={item.href}
              icon={item.icon}
              href={item.href}
              label={item.label}
              isActive={location.pathname === item.href}
            />
          ))}
        </nav>
        
        <Separator className="my-4 mx-2" />
        
        <nav className="px-2 space-y-1">
          {otherNavItems.map((item) => (
            <NavLink 
              key={item.href}
              icon={item.icon}
              href={item.href}
              label={item.label}
              isActive={location.pathname === item.href}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="font-semibold">AH</span>
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}

const NavLink = ({ href, label, icon: Icon, isActive }: NavLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </Link>
  );
};


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { BarChart3, Home, Users, Gift, UserCircle, Settings, LifeBuoy, LogOut } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  className?: string;
}

export default function AdminSidebar({ className }: AdminSidebarProps) {
  const location = useLocation();
  
  const mainNavItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BarChart3, label: "Dashboard", href: "/admin" },
    { icon: Gift, label: "Donations", href: "/admin/donations" },
    { icon: Users, label: "Users", href: "/admin/users" },
  ];
  
  const otherNavItems = [
    { icon: Settings, label: "Settings", href: "/admin/settings" },
    { icon: LifeBuoy, label: "Help", href: "/admin/help" },
    { icon: LogOut, label: "Logout", href: "/logout" },
  ];

  return (
    <div className={cn("flex flex-col h-screen bg-[#284b63] border-r border-[#d9d9d9]/30 text-white", className)}>
      <div className="p-4">
        <div className="flex items-center">
          <UserCircle className="w-8 h-8 text-[#d9d9d9] mr-2" />
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
        
        <Separator className="my-4 mx-2 bg-[#d9d9d9]/30" />
        
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
      
      <div className="p-4 border-t border-[#d9d9d9]/30">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#3c6e71] flex items-center justify-center text-white">
            <span className="font-semibold">AH</span>
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-[#d9d9d9]">admin@example.com</p>
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
          ? "bg-[#3c6e71] text-white"
          : "text-[#d9d9d9] hover:bg-[#3c6e71]/50"
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </Link>
  );
};

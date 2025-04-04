
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Donations from "./pages/Donations";
import Requests from "./pages/Requests"; 
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLayout from "./pages/AdminLayout";
import AdminDonations from "./pages/AdminDonations";
import AdminRequests from "./pages/AdminRequests";
import AdminSettings from "./pages/AdminSettings";
import DonationForm from "./pages/DonationForm";
import DonationSuccess from "./pages/DonationSuccess";
import RequestForm from "./pages/RequestForm";
import RequestSuccess from "./pages/RequestSuccess";
import Profile from "./pages/Profile";
import EditDonationForm from "./pages/EditDonationForm";
import EditRequestForm from "./pages/EditRequestForm";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/donate" element={<DonationForm />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/request" element={<RequestForm />} />
            <Route path="/request-success" element={<RequestSuccess />} />
            <Route path="/login" element={<Login />} />
            
            {/* User Profile Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-donation" element={<EditDonationForm />} />
            <Route path="/edit-request" element={<EditRequestForm />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path="donations" element={<AdminDonations />} />
              <Route path="requests" element={<AdminRequests />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

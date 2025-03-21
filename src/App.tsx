
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Donations from "./pages/Donations";
import Requests from "./pages/Requests"; 
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLayout from "./pages/AdminLayout";
import DonationForm from "./pages/DonationForm";
import DonationSuccess from "./pages/DonationSuccess";
import RequestForm from "./pages/RequestForm";
import RequestSuccess from "./pages/RequestSuccess";
import Profile from "./pages/Profile";
import EditDonationForm from "./pages/EditDonationForm";
import EditRequestForm from "./pages/EditRequestForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/donate" element={<DonationForm />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="/request-success" element={<RequestSuccess />} />
          
          {/* User Profile Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-donation" element={<EditDonationForm />} />
          <Route path="/edit-request" element={<EditRequestForm />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="donations" element={<Admin />} /> {/* Placeholder - would be unique component in real app */}
            <Route path="users" element={<Admin />} /> {/* Placeholder - would be unique component in real app */}
            <Route path="settings" element={<Admin />} /> {/* Placeholder - would be unique component in real app */}
            <Route path="help" element={<Admin />} /> {/* Placeholder - would be unique component in real app */}
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

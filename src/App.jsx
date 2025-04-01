
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./hooks/useAuth";

// Public Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Donations from "./pages/Donations";
import Requests from "./pages/Requests";
import NotFound from "./pages/NotFound";
import DonationSuccess from "./pages/DonationSuccess";
import RequestSuccess from "./pages/RequestSuccess";
import Profile from "./pages/Profile";
import DonationForm from "./pages/DonationForm";
import RequestForm from "./pages/RequestForm";
import EditDonationForm from "./pages/EditDonationForm";
import EditRequestForm from "./pages/EditRequestForm";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/donations" element={<Donations />} />
      <Route path="/requests" element={<Requests />} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
      <Route path="/donate" element={
        <RequireAuth>
          <DonationForm />
        </RequireAuth>
      } />
      <Route path="/request" element={
        <RequireAuth>
          <RequestForm />
        </RequireAuth>
      } />
      <Route path="/donation-success" element={
        <RequireAuth>
          <DonationSuccess />
        </RequireAuth>
      } />
      <Route path="/request-success" element={
        <RequireAuth>
          <RequestSuccess />
        </RequireAuth>
      } />
      <Route path="/edit-donation" element={
        <RequireAuth>
          <EditDonationForm />
        </RequireAuth>
      } />
      <Route path="/edit-request" element={
        <RequireAuth>
          <EditRequestForm />
        </RequireAuth>
      } />
      
      {/* Admin Routes */}
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

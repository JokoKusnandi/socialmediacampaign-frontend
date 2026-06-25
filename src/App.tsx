
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import ServiceProviderDashboard from "./pages/ServiceProviderDashboard";
import AddCampaign from "./pages/AddCampaign";
import ManageCampaigns from "./pages/ManageCampaigns";
import NotFound from "./pages/NotFound";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard/advertiser" 
              element={
                <ProtectedRoute allowedRoles={['advertiser']}>
                  <AdvertiserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/service-provider" 
              element={
                <ProtectedRoute allowedRoles={['service_provider']}>
                  <ServiceProviderDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/campaigns/add" 
              element={
                <ProtectedRoute allowedRoles={['advertiser']}>
                  <AddCampaign />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/campaigns/manage" 
              element={
                <ProtectedRoute allowedRoles={['advertiser']}>
                  <ManageCampaigns />
                </ProtectedRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

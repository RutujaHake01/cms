import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

// Pages
import ContractorDashboard from "@/pages/contractor/ContractorDashboard";
import BookletForm from "@/pages/contractor/BookletForm";
import PaymentPage from "@/pages/contractor/PaymentPage";
import UploadPage from "@/pages/contractor/UploadPage";
import StatusPage from "@/pages/contractor/StatusPage";

import ClerkDashboard from "@/pages/clerk/ClerkDashboard";
import ClerkVerification from "@/pages/clerk/ClerkVerification";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminReview from "@/pages/admin/AdminReview";

import HodDashboard from "@/pages/hod/HodDashboard";
import HodApprovals from "@/pages/hod/HodApprovals";

import SuperAdminDashboard from "@/pages/superadmin/SuperAdminDashboard";
import UserManagement from "@/pages/superadmin/UserManagement";
import SystemSettings from "@/pages/superadmin/SystemSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            
            {/* Contractor Routes */}
            <Route path="/contractor" element={<Layout allowedRoles={["contractor"]}><ContractorDashboard /></Layout>} />
            <Route path="/contractor/booklet" element={<Layout allowedRoles={["contractor"]}><BookletForm /></Layout>} />
            <Route path="/contractor/payment" element={<Layout allowedRoles={["contractor"]}><PaymentPage /></Layout>} />
            <Route path="/contractor/upload" element={<Layout allowedRoles={["contractor"]}><UploadPage /></Layout>} />
            <Route path="/contractor/status" element={<Layout allowedRoles={["contractor"]}><StatusPage /></Layout>} />

            {/* Clerk Routes */}
            <Route path="/clerk" element={<Layout allowedRoles={["clerk"]}><ClerkDashboard /></Layout>} />
            <Route path="/clerk/verification" element={<Layout allowedRoles={["clerk"]}><ClerkVerification /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Layout allowedRoles={["admin"]}><AdminDashboard /></Layout>} />
            <Route path="/admin/review" element={<Layout allowedRoles={["admin"]}><AdminReview /></Layout>} />

            {/* HOD Routes - Fixed Accessibility */}
            <Route path="/hod" element={<Layout allowedRoles={["hod"]}><HodDashboard /></Layout>} />
            <Route path="/hod/approvals" element={<Layout allowedRoles={["hod"]}><HodApprovals /></Layout>} />

            {/* SuperAdmin Routes - Fixed Accessibility */}
            <Route path="/superadmin" element={<Layout allowedRoles={["superadmin"]}><SuperAdminDashboard /></Layout>} />
            <Route path="/superadmin/users" element={<Layout allowedRoles={["superadmin"]}><UserManagement /></Layout>} />
            <Route path="/superadmin/settings" element={<Layout allowedRoles={["superadmin"]}><SystemSettings /></Layout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
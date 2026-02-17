import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import AppSidebar from "./AppSidebar";

interface LayoutProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const Layout = ({ children, allowedRoles }: LayoutProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return (
    <div className="gradient-bg flex min-h-screen w-full relative">
      <div className="orb orb-1 animate-pulse-glow" />
      <div className="orb orb-2 animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="orb orb-3 animate-pulse-glow" style={{ animationDelay: "4s" }} />
      <AppSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;

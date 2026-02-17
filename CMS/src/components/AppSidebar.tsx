import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth, UserRole, roleLabels } from "@/contexts/AuthContext";
import {
  LayoutDashboard, FileText, CreditCard, Upload, 
  Users, Sliders, LogOut, ChevronLeft, ChevronRight, Shield,
  FileCheck, FileSearch, Award
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const navByRole: Record<UserRole, NavItem[]> = {
  contractor: [
    { label: "Overview", icon: LayoutDashboard, path: "/contractor" },
    { label: "Application Form", icon: FileText, path: "/contractor/booklet" },
    { label: "Payments", icon: CreditCard, path: "/contractor/payment" },
    { label: "Upload Docs", icon: Upload, path: "/contractor/upload" },
    { label: "Status Track", icon: FileCheck, path: "/contractor/status" },
  ],
  clerk: [
    { label: "Overview", icon: LayoutDashboard, path: "/clerk" },
    { label: "Scrutiny Queue", icon: FileSearch, path: "/clerk/verification" },
  ],
  admin: [
    { label: "Overview", icon: LayoutDashboard, path: "/admin" },
    { label: "Financial Review", icon: Shield, path: "/admin/review" },
  ],
  hod: [
    { label: "Overview", icon: LayoutDashboard, path: "/hod" },
    { label: "Approvals", icon: Award, path: "/hod/approvals" },
  ],
  superadmin: [
    { label: "Overview", icon: LayoutDashboard, path: "/superadmin" },
    { label: "User Management", icon: Users, path: "/superadmin/users" },
    { label: "System Settings", icon: Sliders, path: "/superadmin/settings" },
  ],
};

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;
  const items = navByRole[user.role];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="glass-strong flex flex-col h-screen sticky top-0 z-40 border-r border-white/10"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="overflow-hidden">
                <h2 className="text-sm font-bold text-foreground">CMS Portal</h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{roleLabels[user.role]}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                active
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
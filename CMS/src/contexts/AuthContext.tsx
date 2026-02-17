import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "contractor" | "clerk" | "admin" | "hod" | "superadmin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  region?: string;
  district?: string;
}

const mockUsers: Record<UserRole, User> = {
  contractor: { id: "c1", name: "Rajesh Kumar", email: "rajesh@example.com", role: "contractor" },
  clerk: { id: "cl1", name: "Priya Sharma", email: "priya@example.com", role: "clerk", region: "Dehradun" },
  admin: { id: "a1", name: "Vikram Singh", email: "vikram@example.com", role: "admin" },
  hod: { id: "h1", name: "Dr. Anand Mishra", email: "anand@example.com", role: "hod" },
  superadmin: { id: "s1", name: "System Admin", email: "admin@cms.gov.in", role: "superadmin" },
};

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => setUser(mockUsers[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const roleLabels: Record<UserRole, string> = {
  contractor: "Contractor",
  clerk: "Clerk",
  admin: "Admin",
  hod: "HOD",
  superadmin: "Super Admin",
};

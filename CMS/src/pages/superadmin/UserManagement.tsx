import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { mockManagedUsers, ManagedUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Plus, MoreHorizontal, Search, Shield, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockManagedUsers);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search));

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast({ title: "User Deleted", description: "Account has been permanently removed." });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage internal staff access and roles</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4"/> Add User</Button>
      </motion.div>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input 
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-black/20">
              <tr className="text-left text-muted-foreground">
                <th className="p-4 font-medium">User Details</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Assignment</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{u.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail size={10}/> {u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/50 border border-secondary text-xs font-medium capitalize">
                      <Shield size={10} /> {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{u.assignedRegion || u.assignedDistrict || "—"}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${u.active ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.active ? 'bg-success' : 'bg-destructive'}`} />
                      {u.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10"><MoreHorizontal className="h-4 w-4"/></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-strong border-white/10">
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(u.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default UserManagement;
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole, roleLabels } from "@/contexts/AuthContext";
import { Shield, HardHat, ClipboardList, UserCog, Crown, Settings } from "lucide-react";

const roles: { role: UserRole; icon: React.ElementType; desc: string; color: string }[] = [
  { role: "contractor", icon: HardHat, desc: "Apply for contractor registration", color: "from-cyan-500/20 to-blue-500/20" },
  { role: "clerk", icon: ClipboardList, desc: "Level 1 scrutiny & verification", color: "from-emerald-500/20 to-teal-500/20" },
  { role: "admin", icon: UserCog, desc: "Level 2 verification & review", color: "from-violet-500/20 to-purple-500/20" },
  { role: "hod", icon: Crown, desc: "Final authority & certificate issuance", color: "from-amber-500/20 to-orange-500/20" },
  { role: "superadmin", icon: Settings, desc: "System management & analytics", color: "from-rose-500/20 to-red-500/20" },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    const paths: Record<UserRole, string> = {
      contractor: "/contractor",
      clerk: "/clerk",
      admin: "/admin",
      hod: "/hod",
      superadmin: "/superadmin",
    };
    navigate(paths[role]);
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="orb orb-1 animate-pulse-glow" />
      <div className="orb orb-2 animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="orb orb-3 animate-pulse-glow" style={{ animationDelay: "4s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-strong glow-primary mb-6"
          >
            <Shield className="h-10 w-10 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
            Contractor Management
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Government of Uttarakhand — Registration & Certification Portal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map(({ role, icon: Icon, desc, color }, i) => (
            <motion.button
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin(role)}
              className={`glass-strong rounded-2xl p-6 text-left group cursor-pointer transition-shadow hover:glow-primary bg-gradient-to-br ${color}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{roleLabels[role]}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </motion.button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Demo Mode — Click any role to login instantly
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

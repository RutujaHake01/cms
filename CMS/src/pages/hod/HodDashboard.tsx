import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { Award, XCircle, Users, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Pending Signatures", value: 12, icon: Award, color: "text-warning" },
  { label: "Certificates Issued", value: 128, icon: CheckCircle2, color: "text-success" },
  { label: "Total Contractors", value: 1450, icon: Users, color: "text-primary" },
  { label: "Rejections (YTD)", value: 45, icon: XCircle, color: "text-destructive" },
];

const HodDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">HOD Overview</h1>
        <p className="text-muted-foreground">Department Performance Metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <GlassCard key={stat.label} className="!p-6 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="flex items-center justify-center h-64 border-dashed border-2 border-white/10 bg-transparent">
          <p className="text-muted-foreground">Regional Distribution Chart Placeholder</p>
        </GlassCard>
        <GlassCard className="flex items-center justify-center h-64 border-dashed border-2 border-white/10 bg-transparent">
          <p className="text-muted-foreground">Monthly Issuance Trends Placeholder</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default HodDashboard;
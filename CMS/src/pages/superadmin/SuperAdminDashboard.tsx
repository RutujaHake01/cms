import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Mock trend data split by class activity
const activityData = [
  { month: 'Jan', ClassA: 40, ClassB: 24, ClassC: 24 },
  { month: 'Feb', ClassA: 30, ClassB: 13, ClassC: 22 },
  { month: 'Mar', ClassA: 20, ClassB: 58, ClassC: 22 },
  { month: 'Apr', ClassA: 27, ClassB: 39, ClassC: 20 },
  { month: 'May', ClassA: 18, ClassB: 48, ClassC: 21 },
  { month: 'Jun', ClassA: 23, ClassB: 38, ClassC: 25 },
];

const SuperAdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">System Overview</h1>
        <p className="text-muted-foreground">Class-wise Registration Trends</p>
      </motion.div>

      <GlassCard className="h-[500px]">
        <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Registration Trends by Class (Last 6 Months)</h3>
        </div>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={activityData}>
            <defs>
              <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{fill: '#94a3b8'}} />
            <YAxis tick={{fill: '#94a3b8'}} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
            <Legend />
            <Area type="monotone" dataKey="ClassA" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorA)" />
            <Area type="monotone" dataKey="ClassB" stroke="#22c55e" fillOpacity={1} fill="url(#colorB)" />
            <Area type="monotone" dataKey="ClassC" stroke="#eab308" fillOpacity={0.1} fill="#eab308" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
};

export default SuperAdminDashboard;
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { CheckCircle2, Clock, XCircle, FileText } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", verified: 4 },
  { name: "Tue", verified: 7 },
  { name: "Wed", verified: 5 },
  { name: "Thu", verified: 8 },
  { name: "Fri", verified: 6 },
];

const ClerkDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Clerk Overview</h1>
        <p className="text-muted-foreground">My Performance & Queue Status</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="!p-6 space-y-2">
          <div className="flex items-center gap-3 text-warning">
             <Clock className="h-5 w-5" />
             <span className="font-semibold">Pending Queue</span>
          </div>
          <p className="text-4xl font-bold text-foreground">14</p>
          <p className="text-xs text-muted-foreground">Applications awaiting scrutiny</p>
        </GlassCard>

        <GlassCard className="!p-6 space-y-2">
          <div className="flex items-center gap-3 text-success">
             <CheckCircle2 className="h-5 w-5" />
             <span className="font-semibold">Verified Today</span>
          </div>
          <p className="text-4xl font-bold text-foreground">8</p>
          <p className="text-xs text-muted-foreground">Target: 10 per day</p>
        </GlassCard>

        <GlassCard className="!p-6 space-y-2">
          <div className="flex items-center gap-3 text-destructive">
             <XCircle className="h-5 w-5" />
             <span className="font-semibold">Queries Raised</span>
          </div>
          <p className="text-4xl font-bold text-foreground">2</p>
          <p className="text-xs text-muted-foreground">Returned for correction</p>
        </GlassCard>
      </div>

      <GlassCard variant="strong">
        <h3 className="text-lg font-semibold mb-4">Weekly Output</h3>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={data}>
               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
               <Tooltip contentStyle={{ backgroundColor: 'hsl(222, 47%, 11%)', borderRadius: '8px', border: 'none' }} />
               <Bar dataKey="verified" fill="hsl(152, 69%, 40%)" radius={[4, 4, 0, 0]} barSize={40} />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

export default ClerkDashboard;
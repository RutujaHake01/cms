import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import StatusTimeline from "@/components/StatusTimeline";

const StatusPage = () => (
  <div className="max-w-2xl mx-auto space-y-6">
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold text-foreground mb-1">Application Status</h1>
      <p className="text-muted-foreground">Track your registration progress in real-time</p>
    </motion.div>

    <GlassCard variant="strong">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Application ID</p>
          <p className="font-mono text-lg font-bold text-foreground">APP-2024-001</p>
        </div>
        <div className="glass rounded-lg px-3 py-1.5 text-xs font-semibold text-primary">Class A — Dehradun</div>
      </div>
      <StatusTimeline currentStatus="Under Scrutiny by Clerk" />
    </GlassCard>
  </div>
);

export default StatusPage;

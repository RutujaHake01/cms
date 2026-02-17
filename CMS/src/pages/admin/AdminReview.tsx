import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { mockApplications } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ShieldCheck, TrendingUp } from "lucide-react";

const AdminReview = () => {
  const [apps] = useState(mockApplications.filter((a) => ["Verified by Clerk", "Under Review by Admin"].includes(a.status)));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Financial Review</h1>
        <p className="text-muted-foreground">Check solvency and turnover details</p>
      </motion.div>

      <div className="grid gap-4">
        {apps.map((app) => (
          <GlassCard key={app.id} variant="strong">
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-2 text-primary font-mono text-sm">
                  <ShieldCheck className="w-4 h-4" /> {app.id}
               </div>
               <div className="text-right">
                  <div className="text-xl font-bold">₹ {app.amount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Solvency Amount</div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
               <div className="p-3 rounded-lg bg-black/20">
                  <span className="text-muted-foreground block text-xs">Contractor Name</span>
                  <span className="font-medium">{app.contractorName}</span>
               </div>
               <div className="p-3 rounded-lg bg-black/20">
                  <span className="text-muted-foreground block text-xs">Firm Name</span>
                  <span className="font-medium">{app.firmName}</span>
               </div>
            </div>

            <div className="flex justify-end gap-3">
               <Button variant="ghost">View Details</Button>
               <Button className="bg-primary">Recommend Approval</Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
export default AdminReview;
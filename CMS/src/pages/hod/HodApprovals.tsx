import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { mockApplications, Application } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Award, CheckCircle, XCircle, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

const HodApprovals = () => {
  const { toast } = useToast();
  const [apps, setApps] = useState(mockApplications.filter((a) => a.status === "Recommended by Admin"));

  const handleAction = (id: string, action: "approve" | "reject") => {
    setApps(prev => prev.filter(a => a.id !== id));
    toast({ 
      title: action === "approve" ? "Certificate Issued" : "Application Rejected", 
      description: action === "approve" ? "Digital signature applied successfully." : "Application returned to admin."
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Pending Approvals</h1>
        <p className="text-muted-foreground">Final authority review for certificate issuance</p>
      </motion.div>

      <div className="space-y-4">
        {apps.map((app, i) => (
          <motion.div 
            key={app.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-primary/30 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary">{app.id}</span>
                  <span className="text-xs text-muted-foreground border border-white/10 px-2 py-0.5 rounded">Class {app.contractorClass}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{app.contractorName}</h3>
                <p className="text-sm text-muted-foreground">M/S {app.firmName}</p>
                <div className="mt-3 p-3 rounded-lg bg-secondary/30 text-sm text-muted-foreground italic border-l-2 border-primary">
                  "Recommendation: {app.adminNotes || "Financials verified. Recommended for approval."}"
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={() => handleAction(app.id, 'reject')}>
                  <XCircle className="mr-2 h-4 w-4" /> Reject
                </Button>
                <Button className="bg-success hover:bg-success/90 text-white min-w-[140px]" onClick={() => handleAction(app.id, 'approve')}>
                  <Feather className="mr-2 h-4 w-4" /> Sign & Issue
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}

        {apps.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">All Caught Up</h3>
            <p className="text-muted-foreground">No pending applications for approval.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HodApprovals;
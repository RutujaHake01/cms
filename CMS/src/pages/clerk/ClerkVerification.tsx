import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { mockApplications } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { FileText, Check, AlertCircle } from "lucide-react";

const ClerkVerification = () => {
  const [apps] = useState(mockApplications.filter((a) => ["Under Scrutiny by Clerk", "Document Uploaded"].includes(a.status)));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Scrutiny Queue</h1>
        <p className="text-muted-foreground">Verify documents and eligibility</p>
      </motion.div>

      <div className="grid gap-4">
        {apps.map((app) => (
          <GlassCard key={app.id} className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="p-3 bg-secondary/50 rounded-xl h-fit">
                   <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{app.contractorName}</h3>
                  <p className="text-sm text-muted-foreground">{app.firmName}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-black/20 px-2 py-1 rounded text-muted-foreground">Class {app.contractorClass}</span>
                    <span className="text-xs bg-black/20 px-2 py-1 rounded text-muted-foreground">{app.submittedAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" className="bg-success hover:bg-success/90"><Check className="w-4 h-4 mr-2"/> Verify</Button>
                <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10"><AlertCircle className="w-4 h-4 mr-2"/> Query</Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
export default ClerkVerification;
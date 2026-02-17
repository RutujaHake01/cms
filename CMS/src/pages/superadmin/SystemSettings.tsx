import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { Save, AlertTriangle, Calendar, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SystemSettings = () => {
  const { toast } = useToast();
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">System Configuration</h1>
        <p className="text-muted-foreground">Global settings and environmental variables</p>
      </motion.div>

      <GlassCard variant="strong" className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="p-2 bg-primary/20 rounded-lg text-primary"><Calendar className="h-5 w-5" /></div>
          <div>
            <h3 className="font-semibold text-foreground">Fiscal Year Settings</h3>
            <p className="text-sm text-muted-foreground">Determines the current active session for applications</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Current Session</Label>
            <Input defaultValue="2024-2025" className="bg-black/20 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label>Application Deadline</Label>
            <Input type="date" className="bg-black/20 border-white/10" />
          </div>
        </div>
      </GlassCard>

      <GlassCard variant="strong" className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="p-2 bg-success/20 rounded-lg text-success"><CreditCard className="h-5 w-5" /></div>
          <div>
            <h3 className="font-semibold text-foreground">Fee Structure</h3>
            <p className="text-sm text-muted-foreground">Update registration base fees by class</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Class A", "Class B", "Class C", "Class D"].map((cls) => (
            <div key={cls} className="space-y-2">
              <Label>{cls}</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                <Input defaultValue="2500" className="pl-7 bg-black/20 border-white/10" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="border-destructive/30 bg-destructive/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-destructive/20">
          <div className="p-2 bg-destructive/20 rounded-lg text-destructive"><Lock className="h-5 w-5" /></div>
          <div>
            <h3 className="font-semibold text-foreground">Emergency Controls</h3>
            <p className="text-sm text-muted-foreground">Critical system overrides</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-warning h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">Prevents non-admin users from logging in</p>
            </div>
          </div>
          <Switch checked={maintenance} onCheckedChange={setMaintenance} />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => toast({ title: "Settings Saved" })} className="bg-foreground text-background hover:bg-muted">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default SystemSettings;
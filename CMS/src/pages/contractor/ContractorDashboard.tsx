import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import { FileText, CreditCard, Upload, Download, ArrowRight, Shield, Clock, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

const steps = [
  { label: "Booklet Form", icon: FileText, path: "/contractor/booklet", status: "completed" },
  { label: "Make Payment", icon: CreditCard, path: "/contractor/payment", status: "pending" },
  { label: "Upload Documents", icon: Upload, path: "/contractor/upload", status: "pending" },
  { label: "Download Certificate", icon: Download, path: "/contractor/status", status: "locked" },
];

const ContractorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your registration progress</p>
        </div>
        <div className="px-3 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full border border-warning/20">
          Action Required
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard className="!p-4 flex items-center gap-3">
               <div className="p-2 bg-primary/20 rounded text-primary"><Shield className="h-5 w-5"/></div>
               <div><p className="text-xl font-bold">55%</p><p className="text-xs text-muted-foreground">Complete</p></div>
            </GlassCard>
            <GlassCard className="!p-4 flex items-center gap-3">
               <div className="p-2 bg-info/20 rounded text-info"><Clock className="h-5 w-5"/></div>
               <div><p className="text-xl font-bold">12 Days</p><p className="text-xs text-muted-foreground">Elapsed</p></div>
            </GlassCard>
            <GlassCard className="!p-4 flex items-center gap-3">
               <div className="p-2 bg-warning/20 rounded text-warning"><AlertTriangle className="h-5 w-5"/></div>
               <div><p className="text-xl font-bold">1 Alert</p><p className="text-xs text-muted-foreground">Pending Pay</p></div>
            </GlassCard>
          </div>

          <GlassCard variant="strong">
            <h2 className="text-lg font-semibold mb-4">Registration Steps</h2>
            <div className="space-y-3">
              {steps.map((step) => (
                <div 
                   key={step.label}
                   onClick={() => step.status !== 'locked' && navigate(step.path)}
                   className={`flex items-center p-3 rounded-xl border transition-all cursor-pointer ${step.status === 'completed' ? 'bg-success/5 border-success/20' : step.status === 'locked' ? 'opacity-50 cursor-not-allowed border-transparent bg-white/5' : 'bg-white/5 border-white/10 hover:border-primary/50'}`}
                >
                  <div className={`p-2 rounded-lg mr-3 ${step.status === 'completed' ? 'text-success bg-success/10' : 'text-primary bg-primary/10'}`}>
                    <step.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{step.status}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground"/>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
           <GlassCard className="flex flex-col items-center justify-center text-center h-64">
              <div className="h-32 w-32 relative mb-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{val: 55, fill: 'hsl(190, 80%, 45%)'}]} startAngle={90} endAngle={-180}>
                     <RadialBar background dataKey="val" cornerRadius={30} />
                   </RadialBarChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">55%</div>
              </div>
              <p className="text-sm font-medium">Application Status</p>
              <p className="text-xs text-muted-foreground">Under Clerk Scrutiny</p>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;
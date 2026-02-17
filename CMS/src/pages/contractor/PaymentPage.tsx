import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Check, IndianRupee } from "lucide-react";

const PaymentPage = () => {
  const [paid, setPaid] = useState(false);
  const { toast } = useToast();

  const handlePay = () => {
    setPaid(true);
    toast({ title: "Payment Successful", description: "₹2,500 has been received. You may now download your certificate." });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground mb-1">Payment</h1>
        <p className="text-muted-foreground">Complete the registration fee payment</p>
      </motion.div>

      <GlassCard variant="strong">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            {paid ? <Check className="h-10 w-10 text-success" /> : <IndianRupee className="h-10 w-10 text-primary" />}
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Registration Fee</p>
            <p className="text-4xl font-bold text-foreground">₹2,500</p>
          </div>
          <div className="glass rounded-xl p-4 text-sm text-left space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Application ID</span><span className="text-foreground font-mono">APP-2024-001</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Class</span><span className="text-foreground">Class A</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={paid ? "text-success" : "text-warning"}>{paid ? "Paid" : "Pending"}</span></div>
          </div>
          {!paid ? (
            <button onClick={handlePay} className="glass-strong rounded-xl px-8 py-3 text-sm font-semibold bg-primary/20 text-primary hover:bg-primary/30 transition-all glow-primary flex items-center gap-2 mx-auto">
              <CreditCard className="h-5 w-5" /> Pay Now
            </button>
          ) : (
            <p className="text-success font-semibold">✓ Payment Completed Successfully</p>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default PaymentPage;

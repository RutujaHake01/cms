import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { mockApplications } from "@/data/mockData";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell 
} from "recharts";

// Process Data for Graphs
const classDistribution = ['A', 'B', 'C', 'D', 'E'].map(cls => ({
  name: `Class ${cls}`,
  value: mockApplications.filter(a => a.contractorClass === cls).length
}));

const solvencyByClass = ['A', 'B', 'C', 'D', 'E'].map(cls => {
  const apps = mockApplications.filter(a => a.contractorClass === cls);
  const totalSolvency = apps.reduce((sum, a) => sum + (a.solvencyAmount || 0), 0);
  return {
    name: `Class ${cls}`,
    avgSolvency: apps.length ? (totalSolvency / apps.length) / 100000 : 0 // in Lakhs
  };
});

const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#f97316', '#ef4444'];

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Admin Analytics</h1>
        <p className="text-muted-foreground">Class-wise Segmentation & Financials</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Graph 1: Application Distribution by Class */}
        <GlassCard className="h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Total Applications by Class</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={classDistribution} 
                  cx="50%" cy="50%" 
                  innerRadius={60} 
                  outerRadius={100} 
                  paddingAngle={5} 
                  dataKey="value"
                >
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Graph 2: Solvency Analysis */}
        <GlassCard className="h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Avg. Solvency Amount (in Lakhs)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={solvencyByClass} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Bar dataKey="avgSolvency" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={30}>
                  {solvencyByClass.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Graph 3: Status Breakdown */}
      <GlassCard className="h-[350px]">
        <h3 className="text-lg font-semibold mb-6">Application Status vs Class</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={['A','B','C','D','E'].map(c => ({
              class: `Class ${c}`,
              approved: mockApplications.filter(a => a.contractorClass === c && a.status.includes("Certificate")).length,
              pending: mockApplications.filter(a => a.contractorClass === c && !a.status.includes("Certificate")).length
          }))}>
            <XAxis dataKey="class" tick={{fill: '#94a3b8'}} />
            <YAxis tick={{fill: '#94a3b8'}} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
            <Legend />
            <Bar dataKey="approved" stackId="a" fill="#22c55e" name="Certificate Issued" />
            <Bar dataKey="pending" stackId="a" fill="#eab308" name="In Process" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
};

export default AdminDashboard;
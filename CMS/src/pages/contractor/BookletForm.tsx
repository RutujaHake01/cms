import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Check, FileText, Printer } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Define the steps matching the PDF Appendix E structure
const steps = [
  "Class Selection",
  "Personal / Firm Details",
  "Solvency & Property",
  "Technical Staff",
  "Machinery & Tools",
  "Work Experience",
  "Relatives & Security",
  "Declaration"
];

const BookletForm = () => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  
  // Massive state object to hold all PDF fields
  const [form, setForm] = useState({
    // Step 0: Class
    category: "Civil Works",
    contractorClass: "A",
    regionOrDistrict: "",
    
    // Step 1: Personal/Firm (Appendix E - A & B)
    applicantType: "Individual", // or Firm/Company
    fullName: "",
    fatherName: "",
    dob: "",
    placeOfBirth: "",
    permanentAddress: "",
    presentAddress: "",
    mobile: "",
    email: "",
    pan: "",
    gst: "",
    firmName: "",
    firmRegistrationNo: "",
    partners: [{ name: "", address: "" }], // Dynamic list
    
    // Step 2: Solvency (Appendix B) & Property (Appendix E - v)
    solvencyAmount: "",
    immovableProperty: [{ description: "", value: "", location: "" }],
    movableProperty: [{ description: "", value: "" }],
    
    // Step 3: Technical Staff (Appendix C)
    techStaff: [{ name: "", qualification: "", designation: "", dateOfJoining: "" }],
    
    // Step 4: Machinery (Appendix C-1/C-2)
    machinery: [{ name: "", capacity: "", quantity: "", age: "" }],
    
    // Step 5: Experience (Appendix D)
    works: [{ name: "", department: "", year: "", amount: "" }],
    
    // Step 6: Relatives & Security (Appendix E - xiii)
    relativesInDept: [{ name: "", relationship: "", designation: "", address: "" }],
    securityAmount: "",
    securityMode: "FDR",
    
    // Step 7: Refs
    ref1Name: "", ref1Address: "",
    ref2Name: "", ref2Address: ""
  });

  const update = (key: string, val: any) => setForm((p) => ({ ...p, [key]: val }));
  
  // Helper for dynamic arrays
  const addRow = (key: string, emptyObj: any) => {
    setForm(p => ({ ...p, [key]: [...(p as any)[key], emptyObj] }));
  };
  
  const updateRow = (key: string, index: number, field: string, val: string) => {
    const list = [...(form as any)[key]];
    list[index][field] = val;
    setForm(p => ({ ...p, [key]: list }));
  };
  
  const removeRow = (key: string, index: number) => {
    const list = [...(form as any)[key]];
    list.splice(index, 1);
    setForm(p => ({ ...p, [key]: list }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(16);
    doc.text("IRRIGATION DEPARTMENT, UTTARAKHAND", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Application for Enlistment - Class ${form.contractorClass}`, 105, 30, { align: "center" });
    
    // Personal Details
    autoTable(doc, {
      startY: 40,
      head: [['Personal / Firm Details', '']],
      body: [
        ['Applicant Name', form.fullName],
        ['Father Name', form.fatherName],
        ['Address', form.presentAddress],
        ['Category', form.category],
        ['Firm Name', form.firmName || "N/A"],
        ['GST No', form.gst],
      ],
      theme: 'grid',
    });

    // Technical Staff
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Name', 'Qualification', 'Designation']],
      body: form.techStaff.map(t => [t.name, t.qualification, t.designation]),
      headStyles: { fillColor: [22, 163, 74] } // Green header
    });

    // Machinery
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Machinery', 'Capacity', 'Qty', 'Age']],
      body: form.machinery.map(m => [m.name, m.capacity, m.quantity, m.age]),
      headStyles: { fillColor: [234, 179, 8] } // Yellow header
    });
    
    // Works
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Work Name', 'Department', 'Amount (Lakhs)', 'Year']],
      body: form.works.map(w => [w.name, w.department, w.amount, w.year]),
      headStyles: { fillColor: [59, 130, 246] } // Blue header
    });

    doc.save("Enlistment_Application_Form.pdf");
    toast({ title: "PDF Generated", description: "Application form downloaded successfully." });
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-input/50 border border-border/40 text-sm focus:ring-2 focus:ring-primary/50 transition-all";
  const labelClass = "text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wide";

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
           <FileText className="h-8 w-8 text-primary" /> 
           Contractor Enlistment Booklet
        </h1>
        <p className="text-muted-foreground">Comprehensive Application Form (Appendix A-E)</p>
      </motion.div>

      {/* Steps Rail */}
      <GlassCard className="!p-0 overflow-hidden">
        <div className="flex overflow-x-auto no-scrollbar">
            {steps.map((s, i) => (
                <div key={i} 
                     className={`flex-none px-6 py-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap
                     ${i === step ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:bg-white/5"}`}
                     onClick={() => setStep(i)}
                >
                    {i + 1}. {s}
                </div>
            ))}
        </div>
      </GlassCard>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            <GlassCard variant="strong" className="min-h-[400px]">
                
                {/* STEP 0: Class Selection */}
                {step === 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold border-b border-border/50 pb-2">Classification (Rule-3)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Category of Work</label>
                                <select className={inputClass} value={form.category} onChange={e => update("category", e.target.value)}>
                                    <option>Civil Works</option>
                                    <option>Electrical/Mechanical Works</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Class Applied For</label>
                                <div className="flex gap-2">
                                    {['A', 'B', 'C', 'D', 'E'].map(c => (
                                        <button key={c} onClick={() => update("contractorClass", c)}
                                            className={`flex-1 py-2 rounded-lg font-bold border ${form.contractorClass === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent border-border text-muted-foreground'}`}>
                                            {c}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Class A & B: All Uttarakhand | Class C, D, E: Specific Zone
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 1: Personal Details */}
                {step === 1 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold border-b border-border/50 pb-2">Personal & Firm Details (Appendix E)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-3">
                                <label className={labelClass}>Applicant Type</label>
                                <select className={inputClass} value={form.applicantType} onChange={e => update("applicantType", e.target.value)}>
                                    <option>Individual</option>
                                    <option>Firm</option>
                                    <option>Company</option>
                                </select>
                            </div>
                            <div className="md:col-span-1"><label className={labelClass}>Full Name</label><input className={inputClass} value={form.fullName} onChange={e => update("fullName", e.target.value)} /></div>
                            <div className="md:col-span-1"><label className={labelClass}>Father's Name</label><input className={inputClass} value={form.fatherName} onChange={e => update("fatherName", e.target.value)} /></div>
                            <div className="md:col-span-1"><label className={labelClass}>DOB</label><input type="date" className={inputClass} value={form.dob} onChange={e => update("dob", e.target.value)} /></div>
                            
                            <div className="md:col-span-3"><label className={labelClass}>Permanent Address</label><input className={inputClass} value={form.permanentAddress} onChange={e => update("permanentAddress", e.target.value)} /></div>
                            
                            {form.applicantType !== "Individual" && (
                                <>
                                    <div className="md:col-span-2"><label className={labelClass}>Firm/Company Name</label><input className={inputClass} value={form.firmName} onChange={e => update("firmName", e.target.value)} /></div>
                                    <div><label className={labelClass}>Registration No.</label><input className={inputClass} value={form.firmRegistrationNo} onChange={e => update("firmRegistrationNo", e.target.value)} /></div>
                                </>
                            )}
                            
                            <div><label className={labelClass}>GST Number</label><input className={inputClass} value={form.gst} onChange={e => update("gst", e.target.value)} /></div>
                            <div><label className={labelClass}>PAN Number</label><input className={inputClass} value={form.pan} onChange={e => update("pan", e.target.value)} /></div>
                            <div><label className={labelClass}>Mobile</label><input className={inputClass} value={form.mobile} onChange={e => update("mobile", e.target.value)} /></div>
                        </div>
                    </div>
                )}

                {/* STEP 3: Technical Staff */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-border/50 pb-2">
                             <h3 className="text-xl font-semibold">Technical Staff (Appendix C)</h3>
                             <button onClick={() => addRow("techStaff", {name:"", qualification:"", designation:"", dateOfJoining:""})} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded hover:bg-primary/30">+ Add Staff</button>
                        </div>
                        {form.techStaff.map((staff, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-white/5 rounded-lg relative group">
                                <div><input placeholder="Name" className={inputClass} value={staff.name} onChange={e => updateRow("techStaff", i, "name", e.target.value)} /></div>
                                <div><input placeholder="Qualification (e.g. B.Tech)" className={inputClass} value={staff.qualification} onChange={e => updateRow("techStaff", i, "qualification", e.target.value)} /></div>
                                <div><input placeholder="Designation" className={inputClass} value={staff.designation} onChange={e => updateRow("techStaff", i, "designation", e.target.value)} /></div>
                                <div><input type="date" className={inputClass} value={staff.dateOfJoining} onChange={e => updateRow("techStaff", i, "dateOfJoining", e.target.value)} /></div>
                                {i > 0 && <button onClick={() => removeRow("techStaff", i)} className="absolute -top-2 -right-2 bg-red-500/20 text-red-500 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100">×</button>}
                            </div>
                        ))}
                    </div>
                )}

                {/* STEP 6: Relatives & Security */}
                {step === 6 && (
                    <div className="space-y-6">
                         <h3 className="text-xl font-semibold border-b border-border/50 pb-2">Security Deposit (Appendix G)</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className={labelClass}>Security Amount (Rs.)</label><input type="number" className={inputClass} value={form.securityAmount} onChange={e => update("securityAmount", e.target.value)} /></div>
                            <div>
                                <label className={labelClass}>Mode of Security</label>
                                <select className={inputClass} value={form.securityMode} onChange={e => update("securityMode", e.target.value)}>
                                    <option>FDR</option>
                                    <option>NSC</option>
                                    <option>Bank Guarantee</option>
                                </select>
                            </div>
                         </div>
                         <h3 className="text-xl font-semibold border-b border-border/50 pb-2 mt-6">Relatives in Dept</h3>
                         <div className="p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground text-sm">
                            Any relatives working in Irrigation Dept? 
                            <button className="ml-2 text-primary underline" onClick={() => addRow("relativesInDept", {name:"", relationship:""})}>Add Details</button>
                         </div>
                    </div>
                )}

                {/* Final Step */}
                {step === 7 && (
                    <div className="text-center py-10 space-y-6">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold">Booklet Ready for Submission</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            You have completed the data entry for Class {form.contractorClass} Enlistment. 
                            Please generate the PDF, sign it, and upload the scanned copy.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button onClick={generatePDF} className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all">
                                <Printer className="w-5 h-5" /> Generate PDF Booklet
                            </button>
                        </div>
                    </div>
                )}

                {/* Default placeholder for other steps to keep code short */}
                {[2, 4, 5].includes(step) && (
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                        Section {steps[step]} form fields would go here (similar array mapping structure).
                    </div>
                )}

            </GlassCard>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} 
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        {step < steps.length - 1 && (
            <button onClick={() => setStep(step + 1)} 
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/20 text-primary hover:bg-primary/30">
                Next <ChevronRight className="w-4 h-4" />
            </button>
        )}
      </div>
    </div>
  );
};

export default BookletForm;
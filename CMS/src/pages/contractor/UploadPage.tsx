import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileCheck, X } from "lucide-react";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const handleUpload = () => {
    if (!file) return;
    setUploaded(true);
    toast({ title: "Document Uploaded", description: "Your notarized document has been uploaded successfully." });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground mb-1">Upload Document</h1>
        <p className="text-muted-foreground">Upload the signed and notarized certificate</p>
      </motion.div>

      <GlassCard variant="strong">
        {!uploaded ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="glass rounded-xl border-2 border-dashed border-border/40 p-12 text-center hover:border-primary/40 transition-colors"
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-medium mb-1">Drop your file here or click to browse</p>
            <p className="text-sm text-muted-foreground mb-4">PDF, JPG or PNG (max 10MB)</p>
            <input type="file" id="fileInput" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} />
            <label htmlFor="fileInput" className="glass rounded-xl px-6 py-2.5 text-sm font-medium text-primary cursor-pointer hover:bg-primary/10 transition-all">
              Browse Files
            </label>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileCheck className="h-16 w-16 text-success mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground">Document Uploaded Successfully</p>
            <p className="text-sm text-muted-foreground mt-1">Your application is now under review</p>
          </div>
        )}

        {file && !uploaded && (
          <div className="mt-4 glass rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setFile(null)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                <X className="h-4 w-4" />
              </button>
              <button onClick={handleUpload} className="glass rounded-lg px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary hover:bg-primary/30 transition-all">
                Upload
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default UploadPage;

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, AlertTriangle, CheckCircle } from "lucide-react";
import desertHero from "@/assets/desert-hero.jpg";
import desertSegmented from "@/assets/desert-segmented.jpg";

const loadingSteps = [
  "Analyzing Terrain...",
  "Extracting Multi-scale Features...",
  "Generating Pixel-level Mask...",
  "Computing IoU...",
  "Evaluating Confidence...",
];

const defaultClasses = [
  { name: "Landscape", pct: 48, color: "bg-primary" },
  { name: "Sky", pct: 20, color: "bg-electric" },
  { name: "Rocks", pct: 12, color: "bg-warning" },
  { name: "Bushes", pct: 10, color: "bg-emerald-400" },
  { name: "Dry Grass", pct: 6, color: "bg-amber-600" },
  { name: "Logs", pct: 4, color: "bg-destructive" },
];

const DemoSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(false);
  const [classes, setClasses] = useState(defaultClasses);
  const [alertMsg, setAlertMsg] = useState("");

  const runSegmentation = useCallback(async () => {
    setLoading(true);
    setResult(false);

    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i);
      await new Promise((r) => setTimeout(r, 800));
    }

    // Simulated reasoning
    const name = file?.name?.toLowerCase() || "";
    if (name.includes("rock")) {
      setClasses([
        { name: "Rocks", pct: 42, color: "bg-warning" },
        { name: "Landscape", pct: 30, color: "bg-primary" },
        { name: "Sky", pct: 15, color: "bg-electric" },
        { name: "Bushes", pct: 8, color: "bg-emerald-400" },
        { name: "Dry Grass", pct: 3, color: "bg-amber-600" },
        { name: "Logs", pct: 2, color: "bg-destructive" },
      ]);
      setAlertMsg("⚠️ High Rock Density Detected – Slow Down Recommended");
    } else if (name.includes("log")) {
      setClasses([
        { name: "Logs", pct: 18, color: "bg-destructive" },
        { name: "Landscape", pct: 40, color: "bg-primary" },
        { name: "Sky", pct: 22, color: "bg-electric" },
        { name: "Rocks", pct: 10, color: "bg-warning" },
        { name: "Bushes", pct: 7, color: "bg-emerald-400" },
        { name: "Dry Grass", pct: 3, color: "bg-amber-600" },
      ]);
      setAlertMsg("⚠️ Obstacle Detected – Slow Down Recommended");
    } else {
      setClasses(defaultClasses);
      setAlertMsg("");
    }

    setLoading(false);
    setResult(true);
  }, [file]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(false);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(false);
    }
  }, []);

  return (
    <section className="section-padding relative" id="demo">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Live <span className="gradient-text">Segmentation</span> Demo
          </h2>
          <p className="text-muted-foreground">Upload a desert image to see AI-powered terrain analysis in action</p>
        </motion.div>

        {/* Upload */}
        {!preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="upload-zone max-w-lg mx-auto p-12 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto mb-4 text-primary" size={48} />
            <p className="text-foreground font-semibold mb-2">Upload Desert Image</p>
            <p className="text-sm text-muted-foreground mb-4">Drag & drop or click to browse</p>
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">
              Browse Files
              <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
            </label>
          </motion.div>
        )}

        {/* Preview + Controls */}
        {preview && !result && !loading && (
          <div className="text-center space-y-6">
            <div className="glass-card inline-block p-2 max-w-md mx-auto">
              <img src={preview} alt="Uploaded" className="rounded-lg max-h-64 mx-auto" />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={runSegmentation}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold neon-glow hover:opacity-90 transition"
              >
                Run Segmentation
              </button>
              <button
                onClick={() => { setPreview(null); setFile(null); }}
                className="px-6 py-3 rounded-lg border border-glass-border bg-glass/40 text-foreground font-medium hover:border-primary/40 transition"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card max-w-md mx-auto p-8 text-center"
            >
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              {loadingSteps.map((step, i) => (
                <motion.p
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i <= loadingStep ? 1 : 0.2 }}
                  className={`font-mono text-sm mb-2 ${i === loadingStep ? "text-primary text-glow-green" : i < loadingStep ? "text-muted-foreground" : "text-muted"}`}
                >
                  {i < loadingStep ? "✓" : i === loadingStep ? "▸" : "○"} {step}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* 3-column output */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-3">
                <p className="text-xs font-mono text-muted-foreground mb-2 text-center">ORIGINAL</p>
                <img src={preview || desertHero} alt="Original" className="rounded-lg w-full h-48 object-cover" />
              </div>
              <div className="glass-card p-3">
                <p className="text-xs font-mono text-muted-foreground mb-2 text-center">SEGMENTED OUTPUT</p>
                <img src={desertSegmented} alt="Segmented" className="rounded-lg w-full h-48 object-cover" />
              </div>
              <div className="glass-card p-3 relative overflow-hidden">
                <p className="text-xs font-mono text-muted-foreground mb-2 text-center">CONFIDENCE HEATMAP</p>
                <img src={desertSegmented} alt="Heatmap" className="rounded-lg w-full h-48 object-cover opacity-70" style={{ filter: "hue-rotate(90deg) saturate(1.5)" }} />
              </div>
            </div>

            {/* Class percentages */}
            <div className="glass-card p-6 mb-6">
              <h4 className="font-semibold mb-4 text-sm font-mono text-muted-foreground">DETECTED CLASS DISTRIBUTION</h4>
              <div className="space-y-3">
                {classes.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="w-24 text-sm font-medium text-foreground">{c.name}</span>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.pct}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${c.color}`}
                      />
                    </div>
                    <span className="w-10 text-right text-sm font-mono text-muted-foreground">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Alert */}
            {alertMsg ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card border-warning/50 p-4 flex items-center gap-3"
              >
                <AlertTriangle className="text-warning flex-shrink-0" size={24} />
                <p className="font-semibold text-warning">{alertMsg}</p>
              </motion.div>
            ) : (
              <div className="glass-card border-primary/30 p-4 flex items-center gap-3">
                <CheckCircle className="text-primary flex-shrink-0" size={24} />
                <p className="font-semibold text-primary">Clear Path – Safe to Proceed</p>
              </div>
            )}

            <div className="text-center mt-6">
              <button
                onClick={() => { setPreview(null); setFile(null); setResult(false); }}
                className="px-6 py-3 rounded-lg border border-glass-border bg-glass/40 text-foreground font-medium hover:border-primary/40 transition"
              >
                Try Another Image
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DemoSection;

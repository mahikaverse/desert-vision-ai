import { motion } from "framer-motion";
import desertHero from "@/assets/desert-hero.jpg";
import desertSegmented from "@/assets/desert-segmented.jpg";
import { useState, useEffect } from "react";
import { Play, FileText } from "lucide-react";

const HeroSection = () => {
  const [showSegmented, setShowSegmented] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setShowSegmented((v) => !v), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />

      <div className="relative z-10 container mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              AUTONOMOUS NAVIGATION AI
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4">
              <span className="gradient-text">Desert</span>
              <span className="gradient-text">Vision</span>{" "}
              <span className="text-foreground">AI</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-3 max-w-lg">
              AI-Powered Pixel-Level Desert Understanding for Autonomous Offroad Systems
            </p>

            <p className="text-sm text-muted-foreground/70 font-mono mb-8 max-w-md">
              Enhancing safety and perception in extreme environments using synthetic digital twin data.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition neon-glow"
              >
                <Play size={18} />
                Launch Live Demo
              </a>
              <a
                href="#performance"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-glass-border bg-glass/40 text-foreground font-semibold hover:border-primary/40 transition"
              >
                <FileText size={18} />
                View Technical Report
              </a>
            </div>
          </motion.div>

          {/* Right - animated image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-glass-border neon-glow">
              <img
                src={desertHero}
                alt="Desert terrain"
                className={`w-full h-auto transition-opacity duration-1000 ${showSegmented ? "opacity-0" : "opacity-100"}`}
              />
              <img
                src={desertSegmented}
                alt="Segmented desert terrain"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showSegmented ? "opacity-100" : "opacity-0"}`}
              />
              {/* Scan line */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
              </div>
              {/* Label */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-background/80 backdrop-blur text-xs font-mono text-primary border border-primary/30">
                {showSegmented ? "SEGMENTATION MASK" : "RAW INPUT"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

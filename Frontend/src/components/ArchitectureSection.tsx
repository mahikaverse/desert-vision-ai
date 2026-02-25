import { motion } from "framer-motion";

const steps = [
  { label: "Synthetic Data", sub: "Falcon Digital Twin" },
  { label: "Data Augmentation", sub: "Color, Flip, Noise" },
  { label: "SegFormer Model", sub: "Transformer Backbone" },
  { label: "Multi-scale Features", sub: "Hierarchical Extraction" },
  { label: "Pixel Classification", sub: "Per-pixel Labeling" },
  { label: "Confidence Layer", sub: "Uncertainty Estimation" },
  { label: "Nav Decision", sub: "Autonomous Support" },
];

const ArchitectureSection = () => {
  return (
    <section className="section-padding relative" id="architecture">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            System <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-muted-foreground">End-to-end pipeline from synthetic data to navigation decisions</p>
        </motion.div>

        <div className="flex flex-col items-center gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="glass-card-hover px-8 py-4 text-center min-w-[260px]">
                <p className="font-semibold text-foreground">{step.label}</p>
                <p className="text-xs font-mono text-muted-foreground">{step.sub}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent opacity-50" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Deployment badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mt-16"
        >
          {["Real-time", "Safety-aware", "Domain Robust", "GPU Optimized", "Edge Ready"].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono"
            >
              ✔ {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

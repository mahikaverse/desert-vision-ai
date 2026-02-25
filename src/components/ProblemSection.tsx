import { motion } from "framer-motion";
import { Mountain, Sun, TreePine, Cloud, Eye, AlertTriangle } from "lucide-react";

const challenges = [
  { icon: Mountain, label: "Rocks", desc: "Similar textures make rocks blend with terrain" },
  { icon: TreePine, label: "Dry Grass", desc: "Sparse vegetation hard to distinguish from sand" },
  { icon: Sun, label: "Harsh Lighting", desc: "Extreme exposure and shadow variations" },
  { icon: Eye, label: "Small Objects", desc: "Logs and debris nearly invisible at distance" },
  { icon: Cloud, label: "Domain Shift", desc: "Synthetic training vs real-world gap" },
  { icon: AlertTriangle, label: "Safety Critical", desc: "Misclassification risks collision" },
];

const pipelineSteps = [
  "Input Image",
  "Semantic Segmentation",
  "Obstacle Reasoning",
  "Navigation Decision",
];

const ProblemSection = () => {
  return (
    <section className="section-padding relative" id="problem">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Desert Navigation is <span className="gradient-text">Hard</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Offroad desert environments present unique perception challenges that standard autonomous systems fail to handle.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {challenges.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6"
            >
              <item.icon className="text-primary mb-3" size={28} />
              <h3 className="font-semibold text-lg mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pipeline infographic */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h3 className="text-center font-semibold text-lg mb-8 text-muted-foreground">Processing Pipeline</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {pipelineSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="px-5 py-3 rounded-lg border border-primary/30 bg-primary/5 text-sm font-mono text-primary text-center min-w-[160px]">
                  {step}
                </div>
                {i < pipelineSteps.length - 1 && (
                  <span className="text-primary text-xl hidden sm:block">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;

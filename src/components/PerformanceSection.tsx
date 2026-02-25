import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const lossData = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  loss: 1.2 * Math.exp(-0.15 * i) + 0.08 + Math.random() * 0.03,
}));

const classIoU = [
  { name: "Sky", iou: 94 },
  { name: "Landscape", iou: 88 },
  { name: "Rocks", iou: 76 },
  { name: "Bushes", iou: 72 },
  { name: "Dry Grass", iou: 65 },
  { name: "Logs", iou: 58 },
];

const CircularProgress = ({ value, label }: { value: number; label: string }) => {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 300);
    return () => clearTimeout(t);
  }, [value]);

  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animated / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="relative -mt-24 text-center">
        <span className="text-3xl font-bold text-foreground">{animated}%</span>
        <p className="text-xs font-mono text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  );
};

const PerformanceSection = () => {
  return (
    <section className="section-padding relative" id="performance">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Model <span className="gradient-text">Performance</span>
          </h2>
          <p className="text-muted-foreground">Quantitative evaluation of segmentation accuracy and speed</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 flex justify-center"
          >
            <CircularProgress value={82} label="Mean IoU" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 flex justify-center"
          >
            <CircularProgress value={91} label="Pixel Accuracy" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 text-center flex flex-col items-center justify-center"
          >
            <span className="text-4xl font-bold text-primary text-glow-green">38ms</span>
            <p className="text-xs font-mono text-muted-foreground mt-2">Avg Inference Time</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Training Loss */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h4 className="font-semibold text-sm font-mono text-muted-foreground mb-4">TRAINING LOSS</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 16%)" />
                <XAxis dataKey="epoch" stroke="hsl(215 15% 55%)" fontSize={12} />
                <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(220 18% 8%)", border: "1px solid hsl(220 15% 20%)", borderRadius: "8px", color: "hsl(210 20% 92%)" }} />
                <Line type="monotone" dataKey="loss" stroke="hsl(142 70% 45%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Per-class IoU */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h4 className="font-semibold text-sm font-mono text-muted-foreground mb-4">PER-CLASS IoU</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={classIoU}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 16%)" />
                <XAxis dataKey="name" stroke="hsl(215 15% 55%)" fontSize={11} />
                <YAxis stroke="hsl(215 15% 55%)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "hsl(220 18% 8%)", border: "1px solid hsl(220 15% 20%)", borderRadius: "8px", color: "hsl(210 20% 92%)" }} />
                <Bar dataKey="iou" fill="hsl(200 100% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;

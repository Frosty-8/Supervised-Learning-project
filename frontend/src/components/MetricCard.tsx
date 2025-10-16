// src/components/MetricCard.jsx
import { motion } from "framer-motion";

export default function MetricCard({ title, value, loading }) {
  if (loading) {
    return <div className="bg-white/10 animate-pulse p-6 rounded-xl h-32 w-full"></div>;
  }

  return (
    <motion.div
      className="bg-white/10 p-6 rounded-xl border border-white/10 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-2xl">{value}</p>
    </motion.div>
  );
}

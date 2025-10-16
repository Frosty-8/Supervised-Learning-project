// src/components/ChartPanel.jsx
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartPanel({ title = "Chart", data = [], loading = false }) {
  return (
    <motion.div
      className="bg-white/10 p-6 rounded-xl border border-white/10 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>

      {loading ? (
        <div className="h-80 w-full animate-pulse bg-white/10 rounded-xl" />
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
            <XAxis dataKey="index" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="actual" stroke="#00ffcc" />
            <Line type="monotone" dataKey="predicted" stroke="#ff33ff" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-300">No data available.</p>
      )}
    </motion.div>
  );
}

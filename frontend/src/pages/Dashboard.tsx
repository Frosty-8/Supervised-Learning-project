import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import MetricCard from "../components/MetricCard";
import ChartPanel from "../components/ChartPanel";
import PredictionPanel from "../components/PredictionPanel";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [algorithm, setAlgorithm] = useState("linear"); // linear or tree
  const [loading, setLoading] = useState(true);

  // Fetch metrics & sample predictions
  const fetchMetrics = async (alg) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/metrics?algorithm=${alg}`);
      setMetrics(res.data.metrics);
      setChartData(res.data.sample_predictions);
    } catch (err) {
      console.error(err);
      setMetrics(null);
      setChartData([]);
    }
    setLoading(false);
  };

  // Fetch on algorithm change
  useEffect(() => {
    fetchMetrics(algorithm);
  }, [algorithm]);

  return (
    <motion.div
      className="min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">📊 Dashboard</h1>

      {/* Algorithm Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {["linear", "tree"].map((alg) => (
          <button
            key={alg}
            onClick={() => setAlgorithm(alg)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              algorithm === alg
                ? "bg-fuchsia-500 text-white"
                : "bg-white/20 text-gray-200 hover:bg-fuchsia-400/50"
            }`}
          >
            {alg === "linear" ? "Linear Regression" : "Decision Tree"}
          </button>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <AnimatePresence>
          {loading
            ? [0, 1].map((i) => <MetricCard key={i} loading />)
            : metrics &&
              [
                { title: "R² Score", value: metrics.r2_score },
                { title: "Mean Squared Error", value: metrics.mse },
              ].map((item, idx) => (
                <MetricCard key={idx} title={item.title} value={item.value} />
              ))}
        </AnimatePresence>
      </div>

      {/* Chart Panel */}
      <ChartPanel
        title="Actual vs Predicted"
        data={chartData}
        loading={loading}
      />

      {/* Prediction Panel */}
      <PredictionPanel algorithm={algorithm} />
    </motion.div>
  );
}

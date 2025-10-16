// src/components/PredictionPanel.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function PredictionPanel({ algorithm = "linear" }) {
  const [input, setInput] = useState({
    area_sqft: 1200,
    bedrooms: 3,
    stories: 1,
    year_built: 2010,
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setPrediction(null);
    try {
      const res = await axios.post("http://localhost:8000/predict", { algorithm, ...input });
      setPrediction(res.data.predicted_price);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="bg-white/10 p-6 rounded-xl border border-white/10 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold mb-4">Predict Price</h3>

      {/* Input fields */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {["area_sqft", "bedrooms", "stories", "year_built"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 capitalize">{field.replace("_", " ")}</label>
            <input
              type="number"
              value={input[field]}
              onChange={(e) =>
                setInput({ ...input, [field]: parseFloat(e.target.value) })
              }
              className="p-2 rounded-lg bg-white/20 text-white focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Predict button */}
      <button
        onClick={handlePredict}
        className="mt-2 px-6 py-2 bg-fuchsia-500 rounded-xl font-semibold hover:bg-fuchsia-400 transition"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {/* Animated prediction result */}
      <AnimatePresence>
        {prediction && !loading && (
          <motion.p
            key="prediction"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-2xl text-green-300"
          >
            Predicted Price: ${prediction.toLocaleString()}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

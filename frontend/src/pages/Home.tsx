import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br 
    from-indigo-900 via-black to-purple-900 text-white flex flex-col items-center justify-center px-6 pt-16">
      {/* Background animated blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        animate={{ x: [0, -100, 100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center z-10"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-clip-text text-transparent 
        bg-gradient-to-r from-pink-400 to-violet-400">
          Supervised Learning
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Explore how machines learn from labeled data to predict outcomes. Dive
          into regression and classification models with real-time insights.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold shadow-lg shadow-fuchsia-500/20"
        >
          🚀 Explore the Model
        </motion.button>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl z-10">
        {[
          {
            title: "📊 Regression Models",
            desc: "Predict continuous values like house prices using algorithms such as Linear Regression and Decision Trees.",
          },
          {
            title: "🧠 Classification Models",
            desc: "Classify data into categories — like spam detection or medical diagnoses — using supervised learning techniques.",
          },
          {
            title: "📈 Evaluation Metrics",
            desc: "Understand how models are evaluated using Mean Squared Error (MSE) and R² Score for performance insights.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition"
          >
            <h3 className="text-2xl font-bold mb-3 text-fuchsia-300">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-gray-500 text-sm z-10">
        Built with ❤️ using FastAPI, Vite, and Framer Motion
      </div>
    </div>
  );
}

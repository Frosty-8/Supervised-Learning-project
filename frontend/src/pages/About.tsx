import { motion } from "framer-motion";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="min-h-screen p-8 bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.h1
        className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400"
        variants={fadeInUp}
      >
        About This Project
      </motion.h1>

      {/* Introduction */}
      <motion.div className="mb-12" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4">Introduction</h2>
        <p className="text-gray-300 mb-4">
          This project demonstrates <span className="font-bold text-pink-400">Supervised Learning</span>, a machine learning approach where models learn from <span className="font-semibold text-yellow-400">labeled data</span> to predict outcomes for unseen data. We focus on <span className="font-bold text-green-400">Regression</span> problems, predicting house prices using real-world datasets.
        </p>
        <p className="text-gray-300 mb-4">
          In supervised learning, the algorithm receives input-output pairs during training and learns the mapping function. The trained model then makes predictions on new, unseen data.
        </p>
        <p className="text-gray-300">
          Supervised learning has two main types:
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-300">
          <li><span className="font-semibold text-indigo-300">Regression:</span> Predict continuous values (e.g., house price, temperature, salary, stock prices). The output is a real number within a range.</li>
          <li><span className="font-semibold text-indigo-300">Classification:</span> Predict discrete categories (e.g., spam detection, medical diagnosis, image classification). The output is from a finite set of classes.</li>
        </ul>
        <p className="text-gray-300 mt-4">
          <span className="font-bold text-pink-400">Key Challenge:</span> Generalization - ensuring the model performs well on unseen data, not just the training data.
        </p>
      </motion.div>

      {/* Linear Regression */}
      <motion.div className="mb-12 p-6 bg-white/10 rounded-2xl border border-white/20" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4 text-pink-300">Linear Regression</h2>
        <p className="text-gray-300 mb-2">
          Linear Regression models the relationship between a <span className="font-semibold text-yellow-400">target variable</span> (dependent variable) and one or more <span className="font-semibold text-yellow-400">features</span> (independent variables) using a linear equation:
        </p>
        <p className="text-gray-300 mb-2 font-mono bg-white/10 p-2 rounded inline-block">
          y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
        </p>
        <p className="text-gray-300 mb-2">
          Where:
          <ul className="list-disc ml-6 mt-2 text-gray-300">
            <li><span className="font-semibold text-yellow-400">y:</span> Target/predicted value</li>
            <li><span className="font-semibold text-yellow-400">x₁, x₂, ..., xₙ:</span> Feature values</li>
            <li><span className="font-semibold text-yellow-400">w₁, w₂, ..., wₙ:</span> Weights/coefficients (importance of each feature)</li>
            <li><span className="font-semibold text-yellow-400">b:</span> Bias/intercept term</li>
          </ul>
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-bold text-green-400">Training Process:</span> The model learns optimal weights using optimization techniques like <span className="font-semibold text-pink-400">Gradient Descent</span> or <span className="font-semibold text-pink-400">Normal Equation</span>.
        </p>
        <p className="text-gray-300 mb-2">
          Use-cases include predicting house prices based on location, size, and amenities; sales forecasting; or stock price prediction.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-bold text-green-400">Assumptions:</span> Linear relationship, homoscedasticity, no multicollinearity, normally distributed residuals.
        </p>
        <p className="text-gray-300">
          <span className="font-bold text-green-400">GATE Notes:</span> Gradient descent variants (batch, stochastic, mini-batch), least squares method, coefficient interpretation (feature importance), R² score, multicollinearity detection, regularization techniques (Ridge, Lasso).
        </p>
      </motion.div>

      {/* Decision Tree Regression */}
      <motion.div className="mb-12 p-6 bg-white/10 rounded-2xl border border-white/20" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4 text-pink-300">Decision Tree Regression</h2>
        <p className="text-gray-300 mb-2">
          Decision Trees predict continuous values by recursively splitting the dataset into subsets based on feature values that best reduce prediction error. Each leaf node represents a predicted value calculated as the <span className="font-semibold text-yellow-400">mean</span> of target values in that leaf.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-bold text-green-400">Splitting Criteria:</span> Uses <span className="font-semibold text-pink-400">Mean Squared Error (MSE)</span> or <span className="font-semibold text-pink-400">Mean Absolute Error (MAE)</span> to determine the best splits.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-bold text-yellow-400">Advantages:</span> Handles non-linear relationships, no need for feature scaling, interpretable tree structure, captures feature interactions automatically.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-bold text-yellow-400">Disadvantages:</span> Prone to overfitting, unstable (small data changes can create different trees), high variance.
        </p>
        <p className="text-gray-300 mb-2">
          Use-cases: predicting real estate prices with complex feature interactions, insurance claims estimation, product demand forecasting, medical cost prediction.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-bold text-green-400">Hyperparameters:</span> max_depth, min_samples_split, min_samples_leaf, max_features.
        </p>
        <p className="text-gray-300">
          <span className="font-bold text-green-400">GATE Notes:</span> Splitting criteria (MSE reduction), tree depth control, overfitting prevention (pruning: pre-pruning vs post-pruning), impurity measures, ensemble methods (Random Forest as improvement).
        </p>
      </motion.div>

      {/* Evaluation Metrics */}
      <motion.div className="mb-12 p-6 bg-white/10 rounded-2xl border border-white/20" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4 text-pink-300">Model Evaluation</h2>
        <p className="text-gray-300 mb-4">
          Evaluation metrics help assess how well regression models generalize to unseen data:
        </p>
        <ul className="list-disc ml-6 text-gray-300">
          <li>
            <span className="font-semibold text-yellow-400">Mean Squared Error (MSE):</span> 
            <span className="text-gray-300">Average squared difference between actual and predicted values. 
            <span className="font-mono text-sm">MSE = (1/n) Σ(y_true - y_pred)²</span>
            Higher penalty for large errors, sensitive to outliers.
            </span>
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Root Mean Squared Error (RMSE):</span> 
            <span className="text-gray-300">Square root of MSE, interpretable in original units. 
            <span className="font-mono text-sm">RMSE = √MSE</span>
            </span>
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Mean Absolute Error (MAE):</span> 
            <span className="text-gray-300">Average absolute difference. 
            <span className="font-mono text-sm">MAE = (1/n) Σ|y_true - y_pred|</span>
            Less sensitive to outliers than MSE.
            </span>
          </li>
          <li>
            <span className="font-semibold text-yellow-400">R² Score (Coefficient of Determination):</span> 
            <span className="text-gray-300">Proportion of variance in target explained by features. 
            <span className="font-mono text-sm">R² = 1 - (SS_res/SS_tot)</span>
            Ranges from 0 to 1 (higher is better), negative values indicate poor fit.
            </span>
          </li>
        </ul>
        <p className="text-gray-300 mt-4">
          <span className="font-bold text-green-400">Best Practice:</span> Use cross-validation and compare multiple metrics for robust evaluation.
        </p>
      </motion.div>

      {/* Notes for GATE */}
      <motion.div className="mb-12 p-6 bg-white/10 rounded-2xl border border-white/20" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4 text-pink-300">Important Notes for GATE</h2>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-green-400">Regression Fundamentals:</span> Linear regression assumes linearity and is computationally efficient; decision trees capture complex non-linear relationships but require careful tuning to prevent overfitting.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-green-400">Feature Engineering Impact:</span> In linear regression, coefficients represent feature importance and direction of impact; in decision trees, feature importance is determined by total reduction in impurity across splits.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-green-400">Bias-Variance Tradeoff:</span> Linear regression typically has high bias (underfits complex patterns); decision trees have high variance (overfit training data). Regularization and ensemble methods balance this tradeoff.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-green-400">Key Optimization Concepts:</span> Gradient descent convergence, learning rate selection, early stopping, cross-validation for hyperparameter tuning.
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-green-400">Advanced Topics:</span> Polynomial regression, regularization (L1/L2), ensemble methods (bagging, boosting), model interpretability techniques.
        </p>
        <p className="text-gray-300">
          <span className="font-semibold text-green-400">Practical Applications:</span> Predict house prices using features like location, size, age, amenities; student performance prediction; sales forecasting; medical cost estimation. Always compare algorithm performance using cross-validation and multiple evaluation metrics.
        </p>
      </motion.div>

      {/* Implementation Notes */}
      <motion.div className="mb-12 p-6 bg-white/10 rounded-2xl border border-white/20" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4 text-pink-300">Implementation Best Practices</h2>
        <ul className="list-disc ml-6 text-gray-300">
          <li><span className="font-semibold text-yellow-400">Data Preprocessing:</span> Handle missing values, encode categorical variables, scale numerical features, detect and remove outliers.</li>
          <li><span className="font-semibold text-yellow-400">Train-Test Split:</span> Use 80-20 or 70-30 split, ensure random sampling, use stratified sampling for imbalanced datasets.</li>
          <li><span className="font-semibold text-yellow-400">Cross-Validation:</span> K-fold (typically k=5 or 10) for robust performance estimation, prevents overfitting to validation set.</li>
          <li><span className="font-semibold text-yellow-400">Hyperparameter Tuning:</span> Grid search, random search, Bayesian optimization for finding optimal model parameters.</li>
          <li><span className="font-semibold text-yellow-400">Model Persistence:</span> Save trained models using joblib/pickle, version control experiments with MLflow or similar tools.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
# 📊 Finance Loan Default Prediction Web App

Welcome to the **Finance Loan Default Prediction Web App**! This application helps financial institutions and users predict the likelihood of loan defaults using machine learning models. Additionally, it provides tailored financial advice based on the prediction results, making it a comprehensive tool for financial health and risk management.

---

## 🌟 Key Features

- **Accurate Loan Default Prediction**: Analyzes financial data to estimate the risk of loan defaults.
- **Personalized Financial Advice**: Offers recommendations based on prediction outcomes, covering:
  - Budgeting Tips
  - Investment Advice
  - Debt Management Strategies
  - Savings Goals
- **Deployment Ready**: Set up for easy API deployment through OnDemand by Airev.

---

## 🗂️ Project Structure

This repository contains all necessary resources to understand, develop, and deploy the Finance Loan Default Prediction Web App.

-**dataset/**: Dataset files used for training model
- **notebooks/**: Jupyter notebooks that walk through data preprocessing, model training, tuning, and financial advice generation.
- **models/**: Contains the trained model saved in `joblib` format.
- **api/**: Contains resources for deploying the model as an API on OnDemand by Airev.
- **requirements.txt**: Lists all dependencies required to run the project.

---

## 🗂️ Notebooks Overview

Each notebook covers a specific step in the app’s development process:

1. **LoanPredict(unbalanced).ipynb**: Trains models on unbalanced dataset
2. **DefaultPredict(balanced).ipynb**: Trains models (Logistic Regression, Random Forest, Gradient Boosting, XGBoost), evaluates metrics, and visualizes results on balanced dataset.

---

## 🛠️ Requirements

To run the app, make sure you have the following dependencies installed:

- **Python**: 3.8 or higher
- **Libraries**: Install using `pip install -r requirements.txt`
  - pandas
  - numpy
  - scikit-learn
  - joblib
  - flask (for API deployment)
  - nltk (for NLP)
- **Additional Tools**:
  - Jupyter Notebook or Jupyter Lab for running and editing notebooks
  - OnDemand by Airev account for API deployment

---

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/loan-default-prediction-app.git
   cd loan-default-prediction-app
   ```

2. **Install Requirements**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Notebooks**: Open each notebook to explore and execute data preparation, model training, tuning, and advice generation.

4. **API Deployment**:
   - Use the scripts in the `api` folder to deploy the model API on OnDemand by Airev.

---

## 💬 Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or new features.

---

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Calculator() {
  const navigate = useNavigate();

  const initialFields = [
    { name: 'total_payment', label: 'Total Payment' },
    { name: 'income_to_loan_ratio', label: 'Income to Loan Ratio' },
    { name: 'dti_revol_util', label: 'DTI Revolving Utilization' },
    { name: 'total_recovery', label: 'Total Recovery' },
    { name: 'balance_to_credit_ratio', label: 'Balance to Credit Ratio' },
    { name: 'recoveries_to_balance_ratio', label: 'Recoveries to Balance Ratio' },
    { name: 'batch_enrolled_to_total_rec_int', label: 'Batch Enrolled to Total Received Interest' },
    { name: 'loan_amnt_total_rec_int_ratio', label: 'Loan Amount to Total Received Interest Ratio' },
    { name: 'emp_length_missing', label: 'Employment Length Missing' }
  ];

  const [input, setInput] = useState(
    initialFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    const emptyFields = Object.keys(input).filter(key => input[key] === '');
    if (emptyFields.length > 0) {
      setError('All fields are required. Please fill in all inputs.');
      setLoading(false);
      return;
    }

    // Prepare data for API call using parseFloat
    const parsedInput = Object.keys(input).reduce((acc, key) => {
      acc[key] = parseFloat(input[key]);
      return acc;
    }, {});

    try {
      const response = await axios.post(
        'https://f1e0-106-194-118-25.ngrok-free.app/predict',
        parsedInput,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setResult(response.data);
      console.log(response.data); // Log the response data
      setLoading(false);
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Submission error. Please check your inputs or try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-extrabold text-orange-500 mb-6 text-center">
        FinTrack
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Enter your financial details to calculate loan predictions and assess the risk of loan default.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="text-gray-300 mb-2 font-medium text-lg">
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={input[field.name]}
              onChange={handleChange}
              className="border bg-orange border-gray-700 text-black rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-md hover:shadow-lg"
              placeholder={`Enter ${field.label}`}
              required
            />
          </div>
        ))}

        <div className="md:col-span-2 flex justify-center">
          <button 
            type="submit" 
            className="w-1/2 py-3 mt-6 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
          >
            {loading ? 'Loading...' : 'Predict'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center text-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-400 mb-2">Prediction Result</h2>
          <p className="text-gray-300">
            <strong>Prediction:</strong> {result.prediction}
          </p>
          <p className="text-gray-300 mt-2">
            <strong>Probability of Default:</strong> {(result.probability * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default Calculator;

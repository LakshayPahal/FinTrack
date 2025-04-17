import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Calculator() {
  const navigate = useNavigate();

  const initialFields = [
    { name: 'loan_amount_requested', label: 'Loan Amount Requested' },
    { name: 'existing_debt_or_other_payments', label: 'Existing Debt or Other Payments' },
    { name: 'annual_income', label: 'Annual Income' },
    { name: 'total_outstanding_debt', label: 'Total Outstanding Debt' },
    { name: 'monthly_income', label: 'Monthly Income' },
    { name: 'recoveries', label: 'Recoveries' },
    { name: 'total_rec_int', label: 'Total Received Interest' },
    { name: 'total_current_balance', label: 'Total Current Balance' },
    { name: 'total_credit_limit', label: 'Total Credit Limit' },
    { name: 'batch_enrolled', label: 'Batch Enrolled' },
    { name: 'emp_length', label: 'Employment Length' }
  ];

  const [input, setInput] = useState(
    initialFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value) || name === 'emp_length') { // Allow input for emp_length as a string
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

    // Perform calculations based on the provided formulas
    const loan_amount_requested = parseFloat(input.loan_amount_requested);
    const existing_debt_or_other_payments = parseFloat(input.existing_debt_or_other_payments);
    const annual_income = parseFloat(input.annual_income);
    const total_outstanding_debt = parseFloat(input.total_outstanding_debt);
    const monthly_income = parseFloat(input.monthly_income);
    const recoveries = parseFloat(input.recoveries);
    const total_rec_int = parseFloat(input.total_rec_int);
    const total_current_balance = parseFloat(input.total_current_balance);
    const total_credit_limit = parseFloat(input.total_credit_limit);
    const batch_enrolled = parseFloat(input.batch_enrolled);
    const emp_length = input.emp_length ? 1 : 0; // Convert employment length presence to 1 or 0

    // Calculate derived values
    const total_payment = loan_amount_requested + existing_debt_or_other_payments;
    const income_to_loan_ratio = annual_income / loan_amount_requested;
    const dti_revol_util = total_outstanding_debt / monthly_income;
    const total_recovery = recoveries + total_rec_int;
    const balance_to_credit_ratio = total_current_balance / total_credit_limit;
    const recoveries_to_balance_ratio = recoveries / (total_current_balance + 1);
    const batch_enrolled_to_total_rec_int = batch_enrolled / (total_rec_int + 1);
    const loan_amnt_total_rec_int_ratio = loan_amount_requested / (total_rec_int + 1);
    const emp_length_missing = emp_length;

    // Prepare data for API call
    const calculatedData = {
      total_payment,
      income_to_loan_ratio,
      dti_revol_util,
      total_recovery,
      balance_to_credit_ratio,
      recoveries_to_balance_ratio,
      batch_enrolled_to_total_rec_int,
      loan_amnt_total_rec_int_ratio,
      emp_length_missing
    };

    try {
      const response = await axios.post(
        'https://f1e0-106-194-118-25.ngrok-free.app/predict',
        calculatedData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setResult(response.data);
      console.log(result);
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
            <strong>Probability of Default:</strong> {(result.probability)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default Calculator;


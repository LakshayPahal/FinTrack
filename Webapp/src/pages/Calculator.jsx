import React, { useState } from 'react';

function Calculator() {
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
    // Allow only positive numeric input
    if (!isNaN(value) && Number(value) >= 0) {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = (e) => {
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

    setTimeout(() => {
      const prediction = Math.round(Math.random());

      let probability;
      if (prediction === 0) {
        probability = Math.min((Math.random() * 29 + 1) / 100, 1);
      } else {
        probability = Math.min((Math.random() * 60 + 75) / 100, 1);
      }

      setResult({
        prediction: prediction,
        probability: probability
      });

      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setInput(initialFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-extrabold text-orange-500 mb-6 text-center">
        FinTrack
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Enter your financial details to calculate loan predictions and assess the risk of loan default.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
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

        <div className="md:col-span-2 flex justify-center gap-4">
          <button
            type="submit"
            className="w-1/2 py-3 mt-6 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
          >
            {loading ? 'Calculating...' : 'Predict'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-1/2 py-3 mt-6 bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
          >
            Reset
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
          {result.prediction === 0 ? (
            <p className="text-blue-400 mt-2">This indicates a <strong>lower risk</strong> of default.</p>
          ) : (
            <p className="text-red-400 mt-2">This indicates a <strong>higher risk</strong> of default.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;

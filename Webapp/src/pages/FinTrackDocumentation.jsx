import React from 'react';

const FinTrackDocumentation = () => {
  return (
    <div className="bg-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Platform Overview */}
        <section>
          <h1 className="text-4xl font-bold text-orange-500">FinTrack Loan Default Prediction Platform</h1>
          <p className="text-lg text-gray-300">
            The FinTrack Loan Default Prediction platform is designed to assess the risk of loan default based on various financial and employment-related details. By inputting specific parameters, users can receive predictions on the likelihood of an applicant defaulting on a loan along with a probability score. This platform is ideal for financial institutions, lenders, and credit assessors looking for a quick, reliable method to evaluate loan risks.
          </p>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-3xl font-bold text-orange-400">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Risk Assessment:</strong> Evaluates an applicant’s financial health by analyzing key financial inputs, such as loan amount, income, and outstanding debt.</li>
            <li><strong>Predictive Output:</strong> Provides a prediction indicating whether an applicant is “likely to default” or “less likely to default.”</li>
            <li><strong>Default Probability:</strong> Offers a quantitative score on the likelihood of default, giving a more nuanced assessment for risk evaluation.</li>
          </ul>
        </section>

        {/* Input Parameters Explained */}
        <section>
          <h2 className="text-3xl font-bold text-orange-400">Input Parameters Explained</h2>
          <p className="text-gray-300">The platform requires various financial and employment-related parameters to make an accurate prediction. Below is a detailed explanation of each parameter, including how to calculate derived fields for more refined analysis.</p>

          <div className="space-y-4">
            {/* Parameter Items */}
            {[
              {
                title: 'Loan Amount Requested (loan_amount_requested)',
                description: 'The amount of money the applicant has requested as a loan.',
                type: 'number (float)',
              },
              {
                title: 'Existing Debt or Other Payments (existing_debt_or_other_payments)',
                description: 'The applicant\'s current debt obligations or other ongoing payments.',
                type: 'number (float)',
              },
              {
                title: 'Annual Income (annual_income)',
                description: 'The total yearly income of the applicant.',
                type: 'number (float)',
              },
              {
                title: 'Monthly Income (monthly_income)',
                description: 'The applicant\'s income on a monthly basis.',
                type: 'number (float)',
              },
              {
                title: 'Total Outstanding Debt (total_outstanding_debt)',
                description: 'The cumulative amount of debt the applicant currently owes.',
                type: 'number (float)',
              },
              {
                title: 'Recoveries (recoveries)',
                description: 'The amount of money recovered from the applicant\'s past financial history.',
                type: 'number (float)',
              },
              {
                title: 'Total Received Interest (total_rec_int)',
                description: 'The total interest received by the applicant.',
                type: 'number (float)',
              },
              {
                title: 'Total Current Balance (total_current_balance)',
                description: 'The current balance in the applicant’s account.',
                type: 'number (float)',
              },
              {
                title: 'Total Credit Limit (total_credit_limit)',
                description: 'The total credit limit available to the applicant.',
                type: 'number (float)',
              },
              {
                title: 'Batch Enrolled (batch_enrolled)',
                description: 'Binary indicator showing whether the applicant has batch enrollment.',
                type: 'integer (0 or 1)',
              },
              {
                title: 'Employment Length (emp_length)',
                description: 'Number of years the applicant has been employed.',
                type: 'integer (nullable)',
              },
            ].map((param, index) => (
              <div key={index} className="border border-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-500">{param.title}</h3>
                <p>{param.description}</p>
                <p className="text-gray-400">Data Type: {param.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Derived Fields */}
        <section>
          <h2 className="text-3xl font-bold text-orange-400">Derived Fields</h2>
          <p className="text-gray-300">The platform also allows users to input calculated fields based on the primary parameters to provide more insights for prediction.</p>

          <div className="space-y-4">
            {[
              {
                title: 'Total Payment',
                calculation: 'loan_amount_requested + existing_debt_or_other_payments',
                description: 'Sum of the requested loan amount and existing debt.',
              },
              {
                title: 'Income to Loan Ratio',
                calculation: 'annual_income / loan_amount_requested',
                description: 'Ratio of annual income to loan amount requested.',
              },
              {
                title: 'Debt-to-Income (DTI) Ratio',
                calculation: 'total_outstanding_debt / monthly_income',
                description: 'Measures the applicant\'s debt in relation to monthly income.',
              },
              {
                title: 'Total Recovery',
                calculation: 'recoveries + total_rec_int',
                description: 'Sum of recoveries and total received interest.',
              },
              {
                title: 'Balance to Credit Ratio',
                calculation: 'total_current_balance / total_credit_limit',
                description: 'Proportion of current balance to the total credit limit.',
              },
              {
                title: 'Recoveries to Balance Ratio',
                calculation: '(recoveries / total_current_balance) + 1',
                description: 'Ratio of recoveries to current balance, adjusted by 1.',
              },
              {
                title: 'Batch Enrolled to Total Received Interest Ratio',
                calculation: '(batch_enrolled / total_rec_int) + 1',
                description: 'Proportion of batch enrollment indicator to total received interest, adjusted by 1.',
              },
              {
                title: 'Loan Amount to Total Received Interest Ratio',
                calculation: '(loan_amount_requested / total_rec_int) + 1',
                description: 'Ratio of loan amount requested to total received interest, adjusted by 1.',
              },
              {
                title: 'Employment Length Missing Indicator',
                calculation: 'isnull(emp_length).astype(int)',
                description: 'Indicates if the employment length is missing (1 if missing, otherwise 0).',
              },
            ].map((field, index) => (
              <div key={index} className="border border-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-500">{field.title}</h3>
                <p><strong>Calculation:</strong> {field.calculation}</p>
                <p>{field.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Making a Prediction */}
        <section>
          <h2 className="text-3xl font-bold text-orange-400">Making a Prediction</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Fill Out the Fields: Enter the applicant’s financial details in the platform’s left panel. The system will automatically calculate derived fields based on these inputs for more detailed analysis.</li>
            <li>Submit the Prediction Request: Once all inputs are filled out, press the “Predict” button to receive the output. This action sends your data to the backend model, which generates a prediction and a probability score for default.</li>
            <li>Interpret the Result: 
              <ul className="list-disc list-inside mt-2">
                <li>Prediction: Text output, such as “Likely to Default” or “Less Likely to Default.”</li>
                <li>Probability of Default: A score between 0 and 1, indicating the likelihood of loan default.</li>
              </ul>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default FinTrackDocumentation;

// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 py-8">
    <div className="text-center max-w-4xl mx-auto space-y-10">
      {/* Header Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-orange-500 animate-fadeIn">
        Welcome to <span className="text-orange-400">FinTrack</span>
      </h1>
      
      <p className="text-lg md:text-2xl text-gray-300 animate-fadeIn delay-200 max-w-3xl mx-auto">
        FinTrack empowers you to analyze loan default risks, providing valuable insights for data-driven financial decisions.
      </p>

      {/* Key Features Section */}
      <div className="bg-gray-900 rounded-lg p-8 md:p-12 mt-8 animate-fadeIn delay-400 shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">Key Features</h2>
        
        <ul className="list-disc text-xl list-inside text-left text-gray-300 space-y-4 max-w-xl mx-auto">
          <li>Calculate loan-to-income ratios for a strong financial overview.</li>
          <li>Analyze debt-to-income ratios to manage your debt load.</li>
          <li>Assess credit utilization for better loan approval chances.</li>
          <li>Evaluate loan repayment feasibility and default risk.</li>
        </ul>
      </div>

      {/* Call-to-Action Section */}
      <div className="space-y-6 text-center mt-12">
        <p className="text-xl text-gray-200">
          Take charge of your financial future with FinTrack’s insights!
        </p>
        <Link 
          to="/predictor" 
          className="inline-block px-10 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-lg mt-4">
          Start Now
        </Link>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16 space-y-8 bg-gray-800 p-10 rounded-lg shadow-md animate-fadeIn delay-600">
        <h3 className="text-3xl text-orange-400 font-semibold">What Our Users Say</h3>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <p className="text-gray-300 italic">"FinTrack transformed my financial planning. Knowing my risk before applying saved me from potential financial setbacks!"</p>
            <p className="text-orange-400 mt-3 font-semibold">- Ritu</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <p className="text-gray-300 italic">"The insights from FinTrack are clear and help me make smarter financial choices."</p>
            <p className="text-orange-400 mt-3 font-semibold">- Piyush</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-sm text-gray-500 mt-16 border-t border-gray-700 pt-6">
        <p>© 2024 FinTrack. All rights reserved.</p>
      </footer>
    </div>
  </div>
);

export default Home;

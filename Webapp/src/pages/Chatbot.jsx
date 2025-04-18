import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [error, setError] = useState('');

  // Function to submit a query to Groq
  const submitQuery = async () => {
    if (!query.trim()) {
      alert('Please enter a question.');
      return;
    }

    setLoading(true);
    setBotTyping(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey) {
        throw new Error('API key not found');
      }

      const payload = {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are FinTrack, an expert financial assistant. You ONLY answer questions related to finance, investing, personal budgeting, financial planning, stock markets, mutual funds, banking, insurance, or economics. If the user asks anything outside these topics, politely respond with: "I'm here to help only with finance-related topics. Please ask me something in that domain."`
          },
          { role: 'user', content: query }
        ],
        temperature: 0.2
      };

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const answer = response.data.choices?.[0]?.message?.content;
      if (answer) {
        setResponses(prev => [...prev, { query, response: answer.trim() }]);
        setQuery('');
      } else {
        throw new Error('No response from model');
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      
      if (error.message === 'API key not found') {
        setError('API key not found. Please check your .env file.');
      } else if (error.response?.status === 401) {
        setError('Authentication failed. Please check your API key.');
      } else if (error.response?.status === 403) {
        setError('API access forbidden. Check your account permissions.');
      } else {
        setError('Error connecting to the API. Please try again later.');
      }
    } finally {
      setLoading(false);
      setBotTyping(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      submitQuery();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 py-8">
      <div className="text-center max-w-xl mx-auto space-y-6">
        {/* Chatbot Header */}
        <h2 className="text-4xl font-bold text-orange-500 animate-fadeIn">Chat with FinTrack Bot</h2>
        <p className="text-lg text-gray-300">Get real-time insights and guidance on financial topics.</p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Chat Window */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto space-y-4 animate-fadeIn delay-200">
          <div className="chat-window h-80 overflow-y-auto border border-gray-700 rounded-lg p-4 bg-gray-800 space-y-4">
            {responses.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                Ask FinTrack a finance-related question to get started.
              </div>
            ) : (
              responses.map((item, index) => (
                <div key={index} className="fade-in space-y-2">
                  <div className="text-left">
                    <strong className="text-orange-400">You:</strong>{' '}
                    <span className="text-gray-300 bg-gray-700 px-2 py-1 rounded-lg inline-block">
                      {item.query}
                    </span>
                  </div>
                  <div className="text-left">
                    <strong className="text-green-400">Bot:</strong>
                    <div className="mt-2 prose prose-invert text-gray-200">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.response}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))
            )}
            {botTyping && <div className="text-left text-gray-400">Bot is typing...</div>}
          </div>

          {/* Input Section */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about finance..."
              className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
            />
            <button
              onClick={submitQuery}
              className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
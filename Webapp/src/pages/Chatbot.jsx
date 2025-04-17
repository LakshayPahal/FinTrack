import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

const apiKey = import.meta.env.VITE_API_KEY;
const externalUserId = import.meta.env.VITE_EXTERNAL_USER_ID;

const Chatbot = () => {
  const [sessionId, setSessionId] = useState(null);
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState(false);

  // Function to create a chat session
  const createChatSession = async () => {
    try {
      const response = await axios.post(
        'https://api.on-demand.io/chat/v1/sessions',
        { pluginIds: [], externalUserId },
        { headers: { apikey: apiKey } }
      );
      const id = response.data.data.id;
      setSessionId(id);
    } catch (error) {
      console.error('Error creating chat session:', error);
      alert("Failed to create chat session. Please try again."); // User feedback
    }
  };

  // Function to submit a query
  const submitQuery = async () => {
    if (!sessionId || !query.trim()) {
      alert("Please enter a question."); // Feedback for empty input
      return;
    }
    setLoading(true);
    setBotTyping(true);
    try {
      const response = await axios.post(
        `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
        {
          endpointId: 'predefined-openai-gpt4o',
          query,
          pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1729881043'],
          responseMode: 'sync',
        },
        { headers: { apikey: apiKey } }
      );

      // Ensure that the response contains the expected data
      if (response.data && response.data.data) {
        const answer = response.data.data.answer;
        setResponses((prevResponses) => [
          ...prevResponses,
          { query, response: answer },
        ]);
        setQuery('');
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      alert("There was an error. Please try again."); // Error feedback
    } finally {
      setLoading(false);
      setBotTyping(false);
    }
  };

  // Effect to create a session when the component mounts
  useEffect(() => {
    createChatSession();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 py-8">
      <div className="text-center max-w-xl mx-auto space-y-6">
        {/* Chatbot Header */}
        <h2 className="text-4xl font-bold text-orange-500 animate-fadeIn">Chat with FinTrack Bot</h2>
        <p className="text-lg text-gray-300">Get real-time insights and guidance on financial topics.</p>

        {/* Chat Window */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto space-y-4 animate-fadeIn delay-200">
          <div className="chat-window h-60 overflow-y-auto border border-gray-700 rounded-lg p-4 bg-gray-800 space-y-3">
            {responses.map((item, index) => (
              <div key={index} className="fade-in">
                <div className="text-left">
                  <strong className="text-orange-400">You:</strong>{' '}
                  <span className="text-gray-300 bg-gray-700 px-2 py-1 rounded-lg inline-block">{item.query}</span>
                </div>
                <div className="text-left mt-1">
                  <strong className="text-green-400">Bot:</strong>{' '}
                  <span className="text-gray-300 bg-gray-700 px-2 py-1 rounded-lg inline-block">{item.response}</span>
                </div>
              </div>
            ))}
            {botTyping && (
              <div className="text-left text-gray-400">Bot is typing...</div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me something..."
              className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
            />
            <button
              onClick={submitQuery}
              className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

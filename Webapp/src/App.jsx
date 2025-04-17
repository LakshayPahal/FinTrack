// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Calculator from './pages/Calculator';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import FinTrackDocumentation from './pages/FinTrackDocumentation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/predictor" element={<Calculator />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/docs" element={<FinTrackDocumentation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

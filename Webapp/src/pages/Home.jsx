// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showStory, setShowStory] = useState(false);
  const [storyPromptVisible, setStoryPromptVisible] = useState(false);
  const [storyPromptAnimation, setStoryPromptAnimation] = useState(false);

  const slides = [
    {
      title: "Scene 1: The Dream Begins",
      content: "Rakesh Malhotra, a 32-year-old ambitious entrepreneur from a small town near Indore, had one dream — to launch his own eco-friendly packaging startup. Armed with an MBA and confidence, he pitched his idea to banks and secured a ₹2.5 crore business loan under a government MSME scheme.",
      visual: "👨‍💼📝🏦",
    },
    {
      title: "Scene 2: The Rise",
      content: "Within the first year, \"GreenPack Solutions\" made headlines. He set up a manufacturing unit, hired 50 workers, and got contracts from two major FMCG companies. His success story was covered by local newspapers.",
      visual: "📰🏆👥",
    },
    {
      title: "Scene 3: The Struggle",
      content: "But COVID-19 hit. Orders were canceled. Raw material prices soared. Employees left. Rakesh kept borrowing more—credit cards, personal loans, even mortgaged his father's land. He thought the situation was temporary.",
      visual: "⏰📉🏭",
    },
    {
      title: "Scene 4: The Fall",
      content: "By mid-2024, Rakesh defaulted on three EMIs in a row. The bank issued notices. His CIBIL score plummeted. He received a SARFAESI Act seizure notice. Local lenders began threatening him. Friends distanced themselves.",
      visual: "❌📄🔒",
    },
    {
      title: "Scene 5: The Public Backlash",
      content: "The once-admired entrepreneur became the talk of the town—but not in a good way. News channels ran the story: \"Startup Star Turns Defaulter: What Went Wrong?\" Rakesh went into hiding, unable to face society or repay his dues.",
      visual: "📺💬👤",
    },
    {
      title: "Scene 6: The Message",
      content: "This isn't just Rakesh's story—it's a warning. Many loan defaulters don't start with bad intentions. Lack of financial planning, unexpected crises, and overconfidence can turn anyone from dreamer to defaulter.",
      visual: "⚠️💭💰",
      isFinal: true,
    },
  ];

  useEffect(() => {
    // Check if the story prompt has been shown in this session
    const hasSeenPrompt = sessionStorage.getItem('hasSeenStoryPrompt');
    
    if (!hasSeenPrompt) {
      // Set a slight delay before showing the prompt for better UX
      const promptTimer = setTimeout(() => {
        setStoryPromptVisible(true);
        
        // Add animation after a brief delay
        setTimeout(() => {
          setStoryPromptAnimation(true);
        }, 100);
        
        // Mark that user has seen the prompt in this session
        sessionStorage.setItem('hasSeenStoryPrompt', 'true');
      }, 1500);
      
      return () => clearTimeout(promptTimer);
    }
  }, []);

  const closeStoryPrompt = () => {
    setStoryPromptAnimation(false);
    setTimeout(() => {
      setStoryPromptVisible(false);
    }, 500); // Match this with your CSS transition duration
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Dynamic animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-orange-500 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-orange-600 rounded-full opacity-10 blur-3xl animate-float-delay"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-orange-400 rounded-full opacity-10 blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-20 right-1/3 w-56 h-56 bg-orange-500 rounded-full opacity-15 blur-3xl animate-float-alt"></div>
        
        {/* Add subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      {/* Story prompt notification */}
      {storyPromptVisible && (
        <div className={`fixed bottom-8 right-8 z-50 max-w-md bg-gradient-to-br from-gray-900 to-black border border-orange-500 rounded-lg shadow-xl transition-all duration-500 ${storyPromptAnimation ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-orange-400">Discover a Real-Life Loan Story</h3>
              <button 
                onClick={closeStoryPrompt}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-gray-300 mt-2">See the journey of an entrepreneur and understand how loan defaults happen in real life.</p>
            <div className="mt-4 flex space-x-3">
              <button 
                onClick={() => {
                  closeStoryPrompt();
                  setShowStory(true);
                }}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
              >
                Read Story
              </button>
              <button 
                onClick={closeStoryPrompt}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-6 py-8">
        {/* Main content container */}
        <div className="text-center max-w-4xl mx-auto space-y-16">
          {/* Header Section with animated text */}
          <div className="space-y-6 py-12">
            <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 animate-pulse-slow">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">FinTrack</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              FinTrack empowers you to analyze loan default risks, providing valuable insights for data-driven financial decisions.
            </p>
          </div>

          {/* Story Slideshow Section (Only visible when showStory is true) */}
          {showStory && (
            <div className="w-full max-w-4xl bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-800 shadow-2xl overflow-hidden transition-all duration-500 animate-fadeIn">
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-800">
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-300" 
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Slide content */}
              <div className="p-8 md:p-12">
                <div className="text-6xl md:text-7xl text-center mb-8 transition-all duration-500">
                  {slides[currentSlide].visual}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-orange-400">
                  {slides[currentSlide].title}
                </h3>
                
                <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                  {slides[currentSlide].content}
                </p>
                
                {slides[currentSlide].isFinal && (
                  <div className="mt-10 text-center">
                    <p className="text-xl md:text-2xl font-bold text-orange-400 mb-6">
                      "Before taking a loan, plan your backup. Before chasing dreams, secure your reality."
                    </p>
                    <Link 
                      to="/predictor"
                      className="inline-block px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Learn how to manage loans responsibly →
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center gap-2 pb-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index ? 'bg-orange-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Navigation buttons and Close button */}
              <div className="flex justify-between px-6 pb-6 items-center">
                <button 
                  onClick={prevSlide} 
                  className={`px-4 py-2 rounded-full transition-all ${
                    currentSlide === 0 
                      ? 'text-gray-600 cursor-not-allowed' 
                      : 'text-white hover:bg-gray-800 hover:shadow-md'
                  }`}
                  disabled={currentSlide === 0}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </div>
                </button>
                
                <button
                  onClick={() => setShowStory(false)}
                  className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
                >
                  Close Story
                </button>
                
                <button 
                  onClick={nextSlide} 
                  className={`px-4 py-2 rounded-full transition-all ${
                    currentSlide === slides.length - 1 
                      ? 'text-gray-600 cursor-not-allowed' 
                      : 'text-white hover:bg-gray-800 hover:shadow-md'
                  }`}
                  disabled={currentSlide === slides.length - 1}
                >
                  <div className="flex items-center">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Key Features Section - Enhanced with glass-morphism effect */}
          {/* You can add the key features section here */}
          
          {/* Call-to-Action Section with animated button */}
          <div className="space-y-6 text-center py-6">
            <p className="text-xl text-gray-200">
              Take charge of your financial future with FinTrack's insights!
            </p>
            <Link 
              to="/predictor" 
              className="relative inline-flex group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-slow"></div>
              <button className="relative inline-block px-10 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-500 hover:to-orange-400 transition-all duration-300 transform group-hover:scale-105 shadow-xl mt-4">
                Start Now
              </button>
            </Link>
          </div>

          {/* Testimonials Section with hover effects */}
          <div className="space-y-8 bg-gray-900 bg-opacity-40 backdrop-blur-lg p-10 rounded-xl shadow-xl border border-gray-800">
            <h3 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300 font-semibold">What Our Users Say</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-orange-900">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic">"FinTrack transformed my financial planning. Knowing my risk before applying saved me from potential financial setbacks!"</p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">R</div>
                  <p className="text-orange-400 font-semibold">Ritu</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-orange-900">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic">"The insights from FinTrack are clear and help me make smarter financial choices."</p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">P</div>
                  <p className="text-orange-400 font-semibold">Piyush</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section with improved styling */}
          <footer className="text-gray-500 mt-16 border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2024 FinTrack. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
      
      {/* CSS for animated backgrounds */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(15px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes float-delay {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(-25px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes float-alt {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(15px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 18s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-alt {
          animation: float-alt 12s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
// Replace ALL content in src/App.js with this:

import React, { useState } from 'react';

// Import the components.
// This assumes SlackInsightBot, EnhancedSlackAlertSystem, and SystemExplanation
// are all exported from './components/EnhancedSlackAlertSystem'.
// Adjust the import path if you placed SystemExplanation in its own file
// or if your components are exported differently.
import { SlackInsightBot, EnhancedSlackAlertSystem, SystemExplanation } from './components/EnhancedSlackAlertSystem';

// Keep this line if you have custom styles in App.css you need
import './App.css';

function App() {
  // Manage state for the currently active view
  const [activeView, setActiveView] = useState('pipeline'); // Default view

  return (
    // Main container with Tailwind classes for layout and background
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center py-10 font-sans">
      {/* Constrain content width */}
      <div className="w-full max-w-7xl px-4">

        {/* View Navigation Buttons */}
        <div className="mb-6 text-center space-x-2 sm:space-x-4">
          {/* Button for Pipeline View */}
          <button
            onClick={() => setActiveView('pipeline')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'pipeline'
                ? 'bg-indigo-600 text-white shadow-md' // Active style
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300' // Inactive style
            }`}
          >
            Pipeline Visualization
          </button>

          {/* Button for Alerts View */}
          <button
            onClick={() => setActiveView('alerts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'alerts'
                ? 'bg-indigo-600 text-white shadow-md' // Active style
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300' // Inactive style
            }`}
          >
            Detailed Alert View
          </button>

          {/* Button for Explanation View */}
          <button
            onClick={() => setActiveView('explanation')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'explanation'
                ? 'bg-indigo-600 text-white shadow-md' // Active style
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300' // Inactive style
            }`}
          >
            System Explanation
          </button>
        </div>

        {/* Conditionally Rendered View based on activeView state */}
        <div className="w-full">
          {activeView === 'pipeline' && <SlackInsightBot />}
          {activeView === 'alerts' && <EnhancedSlackAlertSystem />}
          {activeView === 'explanation' && <SystemExplanation />}
        </div>

      </div>
    </div>
  );
}

export default App;
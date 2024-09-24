// src/components/SWOTAnalyzer/SWOTAnalyzerComponent.js

import React, { useState } from 'react';
import { performSWOTAnalysis } from './SWOTAnalyzer';

const SWOTAnalyzerComponent = ({ marketData }) => {
  const [userInput, setUserInput] = useState({
    Strengths: ['', '', ''],
    Weaknesses: ['', '', ''],
    Opportunities: ['', '', ''],
    Threats: ['', '', '']
  });
  const [analysis, setAnalysis] = useState(null);

  const handleInputChange = (category, index, value) => {
    setUserInput(prevState => ({
      ...prevState,
      [category]: prevState[category].map((item, i) => i === index ? value : item)
    }));
  };

  const handleAnalyze = () => {
    const result = performSWOTAnalysis(userInput, marketData);
    setAnalysis(result);
  };

  return (
    <div>
      <h2>SWOT Analyzer</h2>
      {Object.keys(userInput).map(category => (
        <div key={category}>
          <h3>{category}</h3>
          {userInput[category].map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => handleInputChange(category, index, e.target.value)}
              placeholder={`Enter ${category.toLowerCase()} ${index + 1}`}
            />
          ))}
        </div>
      ))}
      <button onClick={handleAnalyze}>Perform SWOT Analysis</button>

      {analysis && (
        <div>
          <h3>SWOT Analysis Results:</h3>
          {Object.entries(analysis).map(([category, items]) => (
            <div key={category}>
              <h4>{category}</h4>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SWOTAnalyzerComponent;
// src/components/MarketingStrategyPlanner/MarketingStrategyPlannerComponent.js

import React, { useState } from 'react';
import { generateMarketingStrategy } from './MarketingStrategyPlanner';

const MarketingStrategyPlannerComponent = () => {
  const [inputs, setInputs] = useState({
    audience: {
      demographics: '',
      interests: [],
      painPoints: []
    },
    budget: 10000,
    goals: ''
  });

  const [strategy, setStrategy] = useState(null);

  const handleInputChange = (category, field, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [category]: {
        ...prevInputs[category],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (category, field, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [category]: {
        ...prevInputs[category],
        [field]: value.split(',').map(item => item.trim())
      }
    }));
  };

  const handleGenerateStrategy = () => {
    const result = generateMarketingStrategy(inputs);
    setStrategy(result);
  };

  return (
    <div>
      <h2>Marketing Strategy Planner</h2>
      
      <div>
        <h3>Target Audience</h3>
        <label>
          Demographics:
          <input
            type="text"
            value={inputs.audience.demographics}
            onChange={(e) => handleInputChange('audience', 'demographics', e.target.value)}
            placeholder="e.g., 25-40 year old professionals"
          />
        </label>
        <label>
          Interests (comma-separated):
          <input
            type="text"
            value={inputs.audience.interests.join(', ')}
            onChange={(e) => handleArrayInputChange('audience', 'interests', e.target.value)}
            placeholder="e.g., technology, fitness, travel"
          />
        </label>
        <label>
          Pain Points (comma-separated):
          <input
            type="text"
            value={inputs.audience.painPoints.join(', ')}
            onChange={(e) => handleArrayInputChange('audience', 'painPoints', e.target.value)}
            placeholder="e.g., lack of time, need for efficiency"
          />
        </label>
      </div>

      <div>
        <h3>Budget and Goals</h3>
        <label>
          Marketing Budget ($):
          <input
            type="number"
            value={inputs.budget}
            onChange={(e) => handleInputChange('', 'budget', parseInt(e.target.value))}
          />
        </label>
        <label>
          Marketing Goals:
          <textarea
            value={inputs.goals}
            onChange={(e) => handleInputChange('', 'goals', e.target.value)}
            placeholder="e.g., Increase brand awareness, generate leads"
          />
        </label>
      </div>

      <button onClick={handleGenerateStrategy}>Generate Marketing Strategy</button>

      {strategy && (
        <div>
          <h3>Marketing Strategy</h3>
          
          <h4>Target Audience</h4>
          <p>Demographics: {strategy.targetAudience.demographics}</p>
          <p>Interests: {strategy.targetAudience.interests.join(', ')}</p>
          <p>Pain Points: {strategy.targetAudience.pain_points.join(', ')}</p>

          <h4>Channel Strategy</h4>
          <ul>
            {strategy.channelStrategy.map((channel, index) => (
              <li key={index}>{channel.name} (Suitability: {(channel.suitability * 100).toFixed(2)}%)</li>
            ))}
          </ul>

          <h4>Content Strategy</h4>
          {strategy.contentStrategy.map((channel, index) => (
            <div key={index}>
              <h5>{channel.channel}</h5>
              <ul>
                {channel.contentTypes.map((content, cIndex) => (
                  <li key={cIndex}>
                    {content.type} - {content.frequency}
                    <br />
                    Topics: {content.topics.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h4>Budget Allocation</h4>
          <ul>
            {strategy.budgetAllocation.map((allocation, index) => (
              <li key={index}>{allocation.channel}: ${allocation.allocation}</li>
            ))}
          </ul>

          <h4>Key Performance Indicators (KPIs)</h4>
          {strategy.kpis.map((channel, index) => (
            <div key={index}>
              <h5>{channel.channel}</h5>
              <ul>
                {channel.kpis.map((kpi, kIndex) => (
                  <li key={kIndex}>{kpi.name}: {kpi.target}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketingStrategyPlannerComponent;
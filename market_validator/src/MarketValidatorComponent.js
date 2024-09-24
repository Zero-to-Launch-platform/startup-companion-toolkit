import React, { useState } from 'react';
import { generateIdeas } from './IdeaGenerator';

const IdeaGeneratorComponent = () => {
  const [userInterests, setUserInterests] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);

  const handleGenerateIdeas = () => {
    const userData = {
      interests: userInterests,
      skills: userSkills
    };
    const ideas = generateIdeas(userData);
    setGeneratedIdeas(ideas);
  };

  return (
    <div>
      <h2>Idea Generator</h2>
      <div>
        <h3>Your Interests</h3>
        <input 
          type="text" a// src/components/MarketValidator/MarketValidatorComponent.js

          import React, { useState } from 'react';
          import { validateMarket } from './MarketValidator';
          
          const MarketValidatorComponent = () => {
            const [idea, setIdea] = useState('');
            const [result, setResult] = useState(null);
          
            const handleValidate = () => {
              const validationResult = validateMarket(idea);
              setResult(validationResult);
            };
          
            return (
              <div>
                <h2>Market Validator</h2>
                <div>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Enter your business idea"
                    rows="4"
                    cols="50"
                  />
                </div>
                <button onClick={handleValidate}>Validate Market</button>
                {result && (
                  <div>
                    <h3>Validation Results:</h3>
                    <p><strong>Industry:</strong> {result.industry}</p>
                    <p><strong>Estimated Market Size:</strong> ${result.marketSize.toLocaleString()}</p>
                    <p><strong>Predicted Growth Rate:</strong> {(result.growthRate * 100).toFixed(2)}%</p>
                    <p><strong>Competition Level:</strong> {result.competitionLevel}</p>
                    <p><strong>Consumer Sentiment:</strong> {result.consumerSentiment}</p>
                    <p><strong>Validation Score:</strong> {result.validationScore.toFixed(2)}/1.00</p>
                  </div>
                )}
              </div>
            );
          };
          
          export default MarketValidatorComponent;
          value={userInterests.join(', ')} 
          onChange={(e) => setUserInterests(e.target.value.split(', '))}
          placeholder="Enter interests separated by commas"
        />
      </div>
      <div>
        <h3>Your Skills</h3>
        <input 
          type="text" 
          value={userSkills.join(', ')} 
          onChange={(e) => setUserSkills(e.target.value.split(', '))}
          placeholder="Enter skills separated by commas"
        />
      </div>
      <button onClick={handleGenerateIdeas}>Generate Ideas</button>
      <div>
        <h3>Generated Ideas:</h3>
        {generatedIdeas.map((idea, index) => (
          <div key={index}>
            <p><strong>Idea {index + 1}:</strong> {idea.description}</p>
            <p>Potential Score: {idea.potentialScore}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaGeneratorComponent;
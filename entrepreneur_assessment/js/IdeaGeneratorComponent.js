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
          type="text" 
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
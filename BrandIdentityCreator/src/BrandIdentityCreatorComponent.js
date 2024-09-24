// src/components/BrandIdentityCreator/BrandIdentityCreatorComponent.js

import React, { useState } from 'react';
import { createBrandIdentity } from './BrandIdentityCreator';

const BrandIdentityCreatorComponent = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [values, setValues] = useState(['']);
  const [brandIdentity, setBrandIdentity] = useState(null);

  const handleValueChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const addValue = () => {
    setValues([...values, '']);
  };

  const removeValue = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
  };

  const handleCreateIdentity = () => {
    const identity = createBrandIdentity(companyName, industry, values.filter(v => v !== ''));
    setBrandIdentity(identity);
  };

  return (
    <div>
      <h2>Brand Identity Creator</h2>
      <div>
        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="industry">Industry:</label>
        <input
          id="industry"
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>
      <div>
        <label>Brand Values:</label>
        {values.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              value={value}
              onChange={(e) => handleValueChange(index, e.target.value)}
            />
            <button onClick={() => removeValue(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addValue}>Add Value</button>
      </div>
      <button onClick={handleCreateIdentity}>Create Brand Identity</button>

      {brandIdentity && (
        <div>
          <h3>Your Brand Identity:</h3>
          <p><strong>Company Name:</strong> {brandIdentity.companyName}</p>
          <p><strong>Style:</strong> {brandIdentity.style}</p>
          <p><strong>Color Scheme:</strong> {brandIdentity.colorScheme.join(', ')}</p>
          <p><strong>Font Suggestions:</strong> {brandIdentity.fonts.join(', ')}</p>
          <p><strong>Logo Idea:</strong> {brandIdentity.logoIdea}</p>
          <p><strong>Brand Personality:</strong> {brandIdentity.brandPersonality.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default BrandIdentityCreatorComponent;
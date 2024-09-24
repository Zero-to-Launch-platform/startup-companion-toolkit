// src/components/BusinessPlanGenerator/BusinessPlanGeneratorComponent.js

import React, { useState } from 'react';
import { generateBusinessPlan } from './BusinessPlanGenerator';

const BusinessPlanGeneratorComponent = () => {
  const [inputs, setInputs] = useState({
    companyName: '',
    industry: '',
    missionStatement: '',
    productDescription: '',
    marketNeed: '',
    marketSize: '',
    marketGrowth: '',
    competitiveAdvantage: '',
    revenueProjectionYear1: '',
    revenueProjectionYear3: '',
    fundingAmount: '',
    fundingPurpose: '',
    companyStructure: '',
    foundingYear: '',
    founderNames: '',
    founderExpertise: '',
    location: '',
    targetMarket: '',
    industryOverview: '',
    customerSegments: '',
    competitors: '',
    legalStructure: '',
    managementTeam: [{ name: '', role: '', experience: '' }],
    advisors: [{ name: '', expertise: '' }],
    developmentStage: '',
    intellectualProperty: '',
    futurePlans: '',
    marketingStrategy: [''],
    salesStrategy: [''],
    pricingStrategy: '',
    useOfFunds: [{ purpose: '', amount: '' }],
    futureFundingNeeds: '',
    revenueProjectionYear2: '',
    profitProjectionYear1: '',
    profitProjectionYear2: '',
    profitProjectionYear3: '',
    breakEvenAnalysis: '',
    keyAssumptions: ''
  });

  const [businessPlan, setBusinessPlan] = useState(null);

  const handleInputChange = (field, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field, index, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [field]: prevInputs[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleObjectArrayInputChange = (field, index, subfield, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [field]: prevInputs[field].map((item, i) => i === index ? {...item, [subfield]: value} : item)
    }));
  };

  const handleAddArrayItem = (field, template) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [field]: [...prevInputs[field], template]
    }));
  };

  const handleGenerateBusinessPlan = () => {
    const plan = generateBusinessPlan(inputs);
    setBusinessPlan(plan);
  };

  return (
    <div>
      <h2>Business Plan Generator</h2>
      
      {/* Basic Information */}
      <div>
        <h3>Basic Information</h3>
        <input
          type="text"
          value={inputs.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          placeholder="Company Name"
        />
        <input
          type="text"
          value={inputs.industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          placeholder="Industry"
        />
        <textarea
          value={inputs.missionStatement}
          onChange={(e) => handleInputChange('missionStatement', e.target.value)}
          placeholder="Mission Statement"
        />
      </div>

      {/* Product/Service Information */}
      <div>
        <h3>Product/Service Information</h3>
        <textarea
          value={inputs.productDescription}
          onChange={(e) => handleInputChange('productDescription', e.target.value)}
          placeholder="Product/Service Description"
        />
        <input
          type="text"
          value={inputs.marketNeed}
          onChange={(e) => handleInputChange('marketNeed', e.target.value)}
          placeholder="Market Need"
        />
      </div>

      {/* Market Information */}
      <div>
        <h3>Market Information</h3>
        <input
          type="text"
          value={inputs.marketSize}
          onChange={(e) => handleInputChange('marketSize', e.target.value)}
          placeholder="Market Size"
        />
        <input
          type="text"
          value={inputs.marketGrowth}
          onChange={(e) => handleInputChange('marketGrowth', e.target.value)}
          placeholder="Market Growth (%)"
        />
        <input
          type="text"
          value={inputs.competitiveAdvantage}
          onChange={(e) => handleInputChange('competitiveAdvantage', e.target.value)}
          placeholder="Competitive Advantage"
        />
      </div>

      {/* Financial Projections */}
      <div>
        <h3>Financial Projections</h3>
        <input
          type="text"
          value={inputs.revenueProjectionYear1}
          onChange={(e) => handleInputChange('revenueProjectionYear1', e.target.value)}
          placeholder="Revenue Projection Year 1"
        />
        <input
          type="text"
          value={inputs.revenueProjectionYear3}
          onChange={(e) => handleInputChange('revenueProjectionYear3', e.target.value)}
          placeholder="Revenue Projection Year 3"
        />
      </div>

      {/* Funding Information */}
      <div>
        <h3>Funding Information</h3>
        <input
          type="text"
          value={inputs.fundingAmount}
          onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
          placeholder="Funding Amount"
        />
        <input
          type="text"
          value={inputs.fundingPurpose}
          onChange={(e) => handleInputChange('fundingPurpose', e.target.value)}
          placeholder="Funding Purpose"
        />
      </div>

      {/* Add more input fields for other sections as needed */}

      <button onClick={handleGenerateBusinessPlan}>Generate Business Plan</button>

      {businessPlan && (
        <div>
          <h3>Generated Business Plan</h3>
          {Object.entries(businessPlan).map(([section, content]) => (
            <div key={section}>
              <h4>{section}</h4>
              <p>{content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessPlanGeneratorComponent;